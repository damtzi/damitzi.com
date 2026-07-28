export type WorkExperience = {
	company: string;
	homepageCompany?: string;
	period: string;
	location: string;
	role: string;
	website: string;
	icon: string;
	items: string[];
};

export const workExperience: WorkExperience[] = [
	{
		company: 'Campy',
		period: 'Feb 2026-present',
		location: 'Remote',
		role: 'Product Engineer',
		website: 'https://campy.app/',
		icon: '/company-icons/campy.png',
		items: [
			'Led revenue-focused mobile work across campy-app and campy-platform with React Native, Expo, TypeScript, Adapty, GraphQL, and Firebase.',
			'Owned the Adapty migration for Campy Plus, replacing legacy IAP flows with hosted paywalls, entitlements, promo redemption, offline fallbacks, and purchase recovery.',
			'Built backend revenue tooling, including support code redemption, legacy entitlement sync, migration scripts, Firestore services, schemas, and API tests.',
			'Improved attribution reliability across iOS and Android through ATT-aware SDK setup, deep-link routing, SKAN config, tracking permissions, and paywall analytics.'
		]
	},
	{
		company: 'OKE',
		period: 'Jan 2026-present',
		location: 'Remote',
		role: 'Frontend Engineer',
		website: 'https://oke.pl/',
		icon: '/company-icons/oke.png',
		items: [
			'Developed booking, search, and content experiences for Prijsvrij with Next.js, React, TypeScript, Storyblok, tRPC, GraphQL, SCSS, and Vercel.',
			'Built package-holiday booking flows, including room selection, flight alternatives, search behavior, booking analytics, loading states, and confirmation UX.',
			'Improved booking performance by reducing CMS/API overfetching, trimming SSR payloads, optimizing navigation data, seeding basket state, and tuning revalidation.',
			'Delivered Storyblok-powered editorial and SEO features, including blog pages, author pages, CMS headers, rich text layouts, instant revalidation, and responsive content pages.',
			'Strengthened BAS, Amadeus, payment/webhook, email, matrix, and pricing integrations with safer errors, validation, and shared service layers.',
			'Improved D-Connect result accuracy with flight timing, stopover details, sorting, price-check normalization, schema hardening, Redis token fixes, and tested fallbacks.'
		]
	},
	{
		company: 'SoftMetal',
		period: 'Dec 2025-present',
		location: 'Remote',
		role: 'Frontend Engineer',
		website: 'https://softmetal.ch/',
		icon: '/company-icons/softmetal.png',
		items: [
			'Led frontend development for the SoftMetal ferroalloy trading platform with React, TypeScript, Vite, React Router, Redux, Tailwind CSS, Cypress, and Secretarium APIs.',
			'Built core trading workflows, including markets, order books, buy/sell flows, portfolios, tokenization, transfers, redemption, invoices, communications, and warehouse operations.'
		]
	},
	{
		company: 'Secretarium',
		period: 'Sep 2020-Nov 2025',
		location: 'London, UK + Remote',
		role: 'Frontend Engineer',
		website: 'https://secretarium.com/',
		icon: '/company-icons/secretarium.png',
		items: [
			'Led frontend development for Klave AI chat platform with React, Vite, shadcn/ui, Tailwind CSS, TanStack Router, and Fastify.',
			'Built and evolved the Klave CLI, first in Node.js, later rewritten in Rust.',
			'Led frontend work for the Soft Metal trading platform with React, Vite, React Router, Tailwind CSS, and Redux.',
			'Developed and maintained Moai as a privacy-focused PWA with Expo and React Native.',
			'Built marketing, corporate, and documentation sites for Klave, Secretarium, Soft Metal, MoaiApp, Danie.tech, Amlytic.com, and STTS.io.',
			'Integrated Payload CMS for klave.com, softmetal.ch, and secretarium.com.'
		]
	},
	{
		company: 'IT Partnering & Innovation at Lancaster University',
		homepageCompany: 'Lancaster University',
		period: 'Jan 2020-Jul 2020',
		location: 'Lancaster, UK',
		role: 'Frontend Engineer',
		website: 'https://www.lancaster.ac.uk/',
		icon: '/company-icons/lancaster.png',
		items: [
			'Built React internal tools used by 15,000+ users, including booking and time-management apps.',
			'Contributed across design, implementation, testing, and support.',
			'Developed a parking validation app for campus security and students.'
		]
	}
];
