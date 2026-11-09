/**
 * Time (ms) at which an Apple-style spring (`duration` in seconds, `bounce`)
 * first reaches `progress` (0..1). Lets JS sync with a CSS `linear()` easing
 * generated from the same spring, e.g. to fire a reveal when a morphing edge
 * passes an element.
 */
export function springTimeAt(progress: number, duration = 0.5, bounce = 0.3): number {
	const stiffness = ((2 * Math.PI) / duration) ** 2;
	const damping = (4 * Math.PI * (1 - bounce)) / duration;
	const w0 = Math.sqrt(stiffness);
	const zeta = damping / (2 * w0);
	const wd = w0 * Math.sqrt(1 - zeta * zeta);
	const position = (t: number) =>
		1 - Math.exp(-zeta * w0 * t) * (Math.cos(wd * t) + ((zeta * w0) / wd) * Math.sin(wd * t));

	for (let t = 0; t < duration * 2; t += 0.002) {
		if (position(t) >= progress) return t * 1000;
	}
	return duration * 1000;
}
