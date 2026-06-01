import { Moon, Sun } from 'lucide-react';

/** Toggles the `dark` class on <html> and persists the choice. Icons swap via CSS. */
export default function ThemeToggle() {
	const toggleTheme = () => {
		const isDark = document.documentElement.classList.toggle('dark');
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	};

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label="Toggle Theme"
			className="relative hidden cursor-pointer sm:block"
		>
			<Sun className="size-6 scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90" />
			<Moon className="absolute inset-0 size-6 scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0" />
			<span className="sr-only">Toggle theme</span>
		</button>
	);
}
