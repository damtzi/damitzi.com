import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export const MobileNav = ({ currentPath }: { currentPath: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    // disable scrolling when hamburger menu is open
    useEffect(() => {
        const html = document.querySelector('body');
        if (html) html.classList.toggle('overflow-hidden', isOpen);
    }, [isOpen]);

    // reset overflow-hidden class when screen size changes
    useEffect(() => {
        const closeHamburgerNav = () => setIsOpen(false);

        window.addEventListener('orientationchange', closeHamburgerNav);
        window.addEventListener('resize', closeHamburgerNav);

        return () => {
            window.removeEventListener('orientationchange', closeHamburgerNav);
            window.removeEventListener('resize', closeHamburgerNav);
        };
    }, [setIsOpen]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="sm:hidden">
            {/* Animated button */}
            <button
                className="relative w-10 h-10 text-slate-50 rounded-sm focus:outline-none"
                onClick={toggleMenu}
            >
                <span className="sr-only">Toggle menu</span>
                <div className="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                    <span
                        aria-hidden="true"
                        className={`absolute block h-0.5 w-5 bg-foreground transition duration-500 ease-in-out ${isOpen ? 'rotate-45' : '-translate-y-1.5'}`}
                    >
                    </span>
                    <span
                        aria-hidden="true"
                        className={`absolute block  h-0.5 w-5 bg-foreground   transition duration-500 ease-in-out ${isOpen && 'opacity-0'}`}
                    >
                    </span>
                    <span
                        aria-hidden="true"
                        className={`absolute block  h-0.5 w-5 bg-foreground transition  duration-500 ease-in-out ${isOpen ? '-rotate-45' : 'translate-y-1.5'}`}
                    >
                    </span>
                </div>
            </button>
            <div
                className={cn(
                    'transition-opacity md:hidden',
                    isOpen ? 'opacity-100' : 'delay-500 opacity-0'
                )}
            >
                <nav
                    className={cn(
                        'h-full fixed inset-x-0 z-20 mx-auto bg-background/50 backdrop-blur-lg overflow-auto',
                        isOpen
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 translate-x-[-100vw]'
                    )}
                >
                    <ul
                        className={cn(
                            'flex h-full flex-col px-6 gap-2',
                            'ease-in [&_a]:flex [&_a]:w-full [&_a]:translate-y-8 [&_a]:items-center [&_a]:text-lg [&_a]:transition-[color,transform] [&_a]:duration-300',
                            isOpen && '[&_a]:translate-y-0'
                        )}
                    >
                        <li>
                            <a
                                href="/"
                                className={cn('font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer', currentPath === '/' ? 'text-foreground' : '')}
                            >
                                home
                            </a>
                        </li>
                        <li>
                            <a
                                href="/about"
                                className={cn('font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer', currentPath === '/about' ? 'text-foreground' : '')}
                            >
                                about
                            </a>
                        </li>
                        <li>
                            <a
                                href="/projects"
                                className={cn('font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer', currentPath === '/projects' ? 'text-foreground' : '')}
                            >
                                projects
                            </a>
                        </li>
                        <li>
                            <a
                                href="/hobbies"
                                className={cn('font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer', currentPath === '/hobbies' ? 'text-foreground' : '')}
                            >
                                hobbies
                            </a>
                        </li>
                        <li>
                            <a
                                href="/music"
                                className={cn('font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer', currentPath.includes('/music') ? 'text-foreground' : '')}
                            >
                                music
                            </a>
                        </li>
                        <li>
                            <a
                                href="/bread"
                                className={cn('font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer', currentPath.includes('/bread') ? 'text-foreground' : '')}
                            >
                                bread
                            </a>
                        </li>
                        <li>
                            <a
                                href="/socials"
                                className={cn('font-serif font-medium text-gray-400 transition-colors duration-150 ease-out hover:text-foreground hover:cursor-pointer', currentPath === '/socials' ? 'text-foreground' : '')}
                            >
                                socials
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};
