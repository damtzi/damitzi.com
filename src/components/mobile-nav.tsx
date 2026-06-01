import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type NavLink = { href: string; label: string; match: (path: string) => boolean };

const links: NavLink[] = [
	{ href: '/', label: 'home', match: (p) => p === '/' },
	{ href: '/about', label: 'about', match: (p) => p === '/about' },
	{ href: '/projects', label: 'projects', match: (p) => p === '/projects' },
	{ href: '/hobbies', label: 'hobbies', match: (p) => p === '/hobbies' },
	{ href: '/music', label: 'music', match: (p) => p.includes('/music') },
	{ href: '/bread', label: 'bread', match: (p) => p.includes('/bread') },
	{ href: '/socials', label: 'socials', match: (p) => p === '/socials' }
];

export default function MobileNav({ pathname }: { pathname: string }) {
	const [isOpen, setIsOpen] = useState(false);

	// Disable scrolling when the menu is open.
	useEffect(() => {
		document.body.classList.toggle('overflow-hidden', isOpen);
	}, [isOpen]);

	// Close the menu when the screen size changes.
	useEffect(() => {
		const close = () => setIsOpen(false);
		window.addEventListener('orientationchange', close);
		window.addEventListener('resize', close);

		return () => {
			window.removeEventListener('orientationchange', close);
			window.removeEventListener('resize', close);
		};
	}, []);

	return (
		<div className="sm:hidden">
			{/* Animated button */}
			<button
				className="relative h-10 w-10 rounded-sm text-slate-50 focus:outline-none"
				onClick={() => setIsOpen((open) => !open)}
			>
				<span className="sr-only">Toggle menu</span>
				<div className="absolute top-1/2 left-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform">
					<span
						aria-hidden="true"
						className={cn(
							'absolute block h-0.5 w-5 bg-foreground transition duration-500 ease-in-out',
							isOpen ? 'rotate-45' : '-translate-y-1.5'
						)}
					/>
					<span
						aria-hidden="true"
						className={cn(
							'absolute block h-0.5 w-5 bg-foreground transition duration-500 ease-in-out',
							isOpen && 'opacity-0'
						)}
					/>
					<span
						aria-hidden="true"
						className={cn(
							'absolute block h-0.5 w-5 bg-foreground transition duration-500 ease-in-out',
							isOpen ? '-rotate-45' : 'translate-y-1.5'
						)}
					/>
				</div>
			</button>
			<div
				className={cn(
					'transition-opacity md:hidden',
					isOpen ? 'opacity-100' : 'opacity-0 delay-500'
				)}
			>
				<nav
					className={cn(
						'fixed inset-x-0 z-20 mx-auto h-full overflow-auto bg-background/50 backdrop-blur-lg',
						isOpen ? 'translate-x-0 opacity-100' : 'translate-x-[-100vw] opacity-0'
					)}
				>
					<ul
						className={cn(
							'flex h-full flex-col gap-2 px-6',
							'ease-in [&_a]:flex [&_a]:w-full [&_a]:translate-y-8 [&_a]:items-center [&_a]:text-lg [&_a]:transition-[color,transform] [&_a]:duration-300',
							isOpen && '[&_a]:translate-y-0'
						)}
					>
						{links.map((link) => (
							<li key={link.href}>
								<a
									href={link.href}
									className={cn(
										'font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:cursor-pointer hover:text-foreground',
										link.match(pathname) && 'text-foreground'
									)}
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</div>
	);
}
