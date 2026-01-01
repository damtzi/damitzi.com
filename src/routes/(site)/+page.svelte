<script lang="ts">
	import SeoHead from '$lib/components/seo-head.svelte';
	import RunCard from '$lib/components/run-card.svelte';
	import LiftCard from '$lib/components/lift-card.svelte';
	import { TypographyH1, TypographyH2, TypographyP } from '$lib/components/typography';
	import type { PageProps } from './$types';
	import VinylPng from '$lib/assets/images/black-vinyl.png';
	import CdPng from '$lib/assets/images/clear-cd.png';

	let { data }: PageProps = $props();
</script>

<SeoHead title="Home" description="Home page" />

<div class="flex flex-col gap-8 stagger-animation">
	<div class="flex flex-col gap-2">
		<TypographyH1>Welcome</TypographyH1>
		<TypographyP>
			Hello there! Welcome to my personal website. Here you can find: information <a href="/about"
				>about me</a
			>, my
			<a
				href="/projects"
				class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
				>projects</a
			>, my
			<a
				href="/music/vinyls"
				class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
				>vinyl collection</a
			>, my
			<a
				href="/music/top-picks"
				class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
				>top picks</a
			>, my <a href="/socials">social links</a>, my
			<a
				href="/hobbies"
				class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
				>hobbies</a
			>, and my
			<a
				href="/bread"
				class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
				>bread</a
			>.
		</TypographyP>
		<TypographyP>
			You can check out my work on <a
				href="https://github.com/damtzi"
				target="_blank"
				rel="noopener noreferrer"
				class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
				>GitHub</a
			>, follow me on
			<a
				href="https://bsky.app/profile/damitzi.com"
				target="_blank"
				rel="noopener noreferrer"
				class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
				>Bluesky</a
			>,
			<a
				href="https://www.instagram.com/damitzi__"
				target="_blank"
				rel="noopener noreferrer"
				class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
				>Instagram</a
			>,
			<a
				href="https://www.discogs.com/user/damitzi__"
				target="_blank"
				rel="noopener noreferrer"
				class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
				>Discogs</a
			>,
			<a
				href="https://www.strava.com/athletes/108759547"
				target="_blank"
				rel="noopener noreferrer"
				class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
				>Strava</a
			>, or drop me an email at
			<a
				href="mailto:damian.tziamtzis@gmail.com"
				class="text-gray-400 transition-colors duration-150 ease-out hover:text-pure-blue hover:cursor-pointer"
				>damian.tziamtzis@gmail.com</a
			>.
		</TypographyP>
	</div>

	<div class="flex flex-col gap-2">
		<TypographyH2>Recent pickups</TypographyH2>
		<div class="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-10">
			{#each data.releases as release (release.id)}
				<a href={`/music/vinyls/${release.id}`} class="relative group">
					<img
						src={release.basic_information.cover_image}
						alt={release.basic_information.title}
						width={200}
						height={200}
						class="hover:scale-105 hover:cursor-pointer hover:shadow transition-all duration-300 rounded-xs shadow-lg relative z-10 aspect-square"
					/>
					<img
						src={release.basic_information.formats
							.map((format) => format.name)
							.find((name) => name === 'Vinyl')
							? VinylPng
							: CdPng}
						alt={release.basic_information.formats
							.map((format) => format.name)
							.find((name) => name === 'Vinyl')
							? 'A black vinyl record'
							: 'A clear CD'}
						width={200}
						height={200}
						class="absolute top-0 group-hover:translate-x-10 transition-transform duration-300 z-0"
					/>
				</a>
			{/each}
		</div>
	</div>

	<div class="flex flex-col gap-2">
		<TypographyH2>Recent runs</TypographyH2>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{#each data.runs as run (run.id)}
				<RunCard date={run.start_date_local} distance={run.distance} movingTime={run.moving_time} />
			{/each}
		</div>
	</div>

	<div class="flex flex-col gap-2">
		<TypographyH2>Recent lifts</TypographyH2>
		<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{#each data.lifts as lift (lift.id)}
				<LiftCard
					date={lift.start_date_local}
					maxHeartRate={lift.max_heartrate}
					movingTime={lift.moving_time}
				/>
			{/each}
		</div>
	</div>
</div>

<style>
	@media (prefers-reduced-motion: no-preference) {
		/* Target all direct children of the stagger-animation container */
		.stagger-animation > * {
			opacity: 0;
			transform: translateY(-10px);
			animation: fadeInDown 0.6s ease-out forwards;
		}

		/* Apply delays to each consecutive child */
		.stagger-animation > :nth-child(1) {
			animation-delay: 0.1s;
		}
		.stagger-animation > :nth-child(2) {
			animation-delay: 0.3s;
		}
		.stagger-animation > :nth-child(3) {
			animation-delay: 0.5s;
		}
		.stagger-animation > :nth-child(4) {
			animation-delay: 0.7s;
		}
		.stagger-animation > :nth-child(5) {
			animation-delay: 0.9s;
		}

		@keyframes fadeInDown {
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}
	}
</style>
