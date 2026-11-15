/**
 * Fragment shader for the header cover: paints a little motion into the photo
 * and then runs it through an 8x8 Bayer dither in the photo's own colours
 * (the same look as Paper's image dithering shader, which it is based on).
 *
 * The motion is added before the dither, so it lands on the same pixel grid as
 * the rest of the picture instead of floating on top of it.
 *
 * `u_scene` picks the motion:
 * - 0 (`day`): soft clouds drift across whatever reads as sky.
 * - 1 (`dusk`): the sea ripples and glints where the sun hits it.
 *
 * Both scenes find their region from the photo's colours, so the masks are
 * tuned to the two current cover photos; retune them when a photo changes.
 */
export const CoverScenes = { day: 0, dusk: 1 } as const;

export type CoverScene = keyof typeof CoverScenes;

export const coverFragmentShader = `#version 300 es
precision highp float;

uniform float u_time;
uniform sampler2D u_image;

// Shared with Paper's vertex shader, which declares them mediump; the
// precisions have to match or the program fails to link.
uniform mediump vec2 u_resolution;
uniform mediump float u_pixelRatio;
uniform mediump float u_imageAspectRatio;

uniform float u_scene;
uniform float u_pxSize;
uniform float u_colorSteps;

out vec4 fragColor;

const vec3 LUMA = vec3(.2126, .7152, .0722);

float hash21(vec2 p) {
  p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
  p += dot(p, p + 19.19);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3. - 2. * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1., 0.)), u.x),
    mix(hash21(i + vec2(0., 1.)), hash21(i + vec2(1., 1.)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float sum = 0.;
  float amp = .5;
  for (int i = 0; i < 5; i++) {
    sum += amp * valueNoise(p);
    p = p * 2.03 + vec2(17.3, 9.1);
    amp *= .5;
  }
  return sum;
}

// object-fit: cover, with (0, 0) at the photo's top left.
vec2 getImageUV(vec2 uv) {
  vec2 box;
  box.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  box.y = box.x / u_imageAspectRatio;
  vec2 imageUV = uv * u_resolution / box + .5;
  imageUV.y = 1. - imageUV.y;
  return imageUV;
}

float getBayerValue(vec2 cell) {
  const int bayer8x8[64] = int[64](
    0, 32, 8, 40, 2, 34, 10, 42,
    48, 16, 56, 24, 50, 18, 58, 26,
    12, 44, 4, 36, 14, 46, 6, 38,
    60, 28, 52, 20, 62, 30, 54, 22,
    3, 35, 11, 43, 1, 33, 9, 41,
    51, 19, 59, 27, 49, 17, 57, 25,
    15, 47, 7, 39, 13, 45, 5, 37,
    63, 31, 55, 23, 61, 29, 53, 21
  );
  ivec2 pos = ivec2(fract(cell / 8.) * 8.);
  return float(bayer8x8[pos.y * 8 + pos.x]) / 64.;
}

// Sky is wherever blue leads: open sky, haze and the photo's own clouds, but
// not the grass or the track across it.
float skyMask(vec3 c) {
  return smoothstep(-.07, -.015, c.b - max(c.r, c.g));
}

vec3 dayScene(vec2 uv, vec3 base) {
  float sky = skyMask(base);
  if (sky <= 0.) return base;

  // Wide, flat cloud shapes, in the photo's own proportions.
  vec2 p = vec2(uv.x * u_imageAspectRatio, uv.y * 1.9) * 2.2;
  float t = u_time;

  // Two layers drift at different speeds so the shapes slowly re-form
  // rather than sliding past as one rigid sheet.
  vec2 wind = vec2(t * .022, 0.);
  float shape = fbm(p - wind + .45 * vec2(fbm(p * 1.4 - wind * 1.7 + 31.), 0.));
  float cloud = smoothstep(.54, .74, shape);

  // Lit from above: thin edges take the hazy blue of the photo's cloud
  // bases, the thick middle goes to white.
  vec3 cloudColor = mix(vec3(.74, .82, .9), vec3(1.), smoothstep(.58, .82, shape));
  return mix(base, cloudColor, cloud * sky * .9);
}

// Water is everything below the horizon that is brighter than the land
// silhouettes.
float waterMask(vec2 uv, vec3 c) {
  return smoothstep(.43, .48, uv.y) * smoothstep(.13, .2, dot(LUMA, c));
}

vec3 duskScene(vec2 uv, vec2 cell, vec3 base) {
  float water = waterMask(uv, base);
  if (water <= 0.) return base;

  float t = u_time;
  // 0 at the horizon, 1 at the bottom edge of the photo.
  float depth = clamp((uv.y - .43) / .57, 0., 1.);

  // Swell: crests packed tight near the horizon and opening up towards the
  // viewer, rolling in slowly, bent by noise so they never read as stripes.
  float bend = fbm(vec2(uv.x * u_imageAspectRatio * 5., uv.y * 9. + t * .05));
  float swell = sin(7. / (depth + .12) + bend * 7. + t * .7);

  // The swell nudges the reflection sideways and shades the surface a touch.
  vec2 shifted = uv + vec2(swell * .0035, swell * .002) * (.35 + depth);
  vec3 rippled = texture(u_image, shifted).rgb;
  vec3 color = mix(base, rippled, waterMask(shifted, rippled));
  color *= 1. + .1 * swell * water;

  // Glints: short horizontal runs of dither cells that flare and fade, each
  // on its own clock. Dense where the low sun lies on the water, with only a
  // stray few elsewhere.
  float sunPath = smoothstep(.1, .38, base.r - base.b) * smoothstep(.22, .5, dot(LUMA, base));
  vec2 glint = floor(cell / vec2(2., 1.));
  float seed = hash21(glint);
  float density = mix(.035, .42, sunPath);
  float lit = step(1. - density, hash21(glint + 7.31));
  float twinkle = pow(max(0., sin(t * (1.2 + 2.6 * seed) + seed * 50.)), 8.);
  color += vec3(1., .86, .55) * lit * twinkle * water * mix(.35, .95, sunPath);

  return color;
}

void main() {
  float pxSize = u_pxSize * u_pixelRatio;
  vec2 cell = floor((gl_FragCoord.xy - .5 * u_resolution) / pxSize);
  vec2 uv = getImageUV((cell + .5) * pxSize / u_resolution);

  vec3 image = texture(u_image, uv).rgb;
  image = u_scene < .5 ? dayScene(uv, image) : duskScene(uv, cell, image);
  image = clamp(image, 0., 1.);

  float colorSteps = max(floor(u_colorSteps), 1.);
  float lum = dot(LUMA, image);
  float dithering = getBayerValue(cell) - .5;
  float brightness = clamp(lum + dithering / colorSteps, 0., 1.);
  float quantLum = floor(brightness * colorSteps + .5) / colorSteps;

  fragColor = vec4(image / max(lum, .001) * quantLum, 1.);
}
`;
