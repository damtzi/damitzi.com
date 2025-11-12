import { Moon, Sun } from 'lucide-react';
import { animate } from 'motion';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
    const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(
        'light'
    );

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark');
        setThemeState(isDarkMode ? 'dark' : 'light');
    }, []);

    useEffect(() => {
        const isDark
            = theme === 'dark'
                || (theme === 'system'
                    && window.matchMedia('(prefers-color-scheme: dark)').matches);
        document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
    }, [theme]);

    const onClick = () => {
        setThemeState(theme === 'light' ? 'dark' : 'light');

        const moon = document.getElementById('moonIcon');
        const sun = document.getElementById('sunIcon');

        animate([
            [moon, { y: 32 }],
            [sun, { y: -32 }, { at: '+0.5' }]
        ]);
    };

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label="Toggle Theme"
            className="hidden sm:block hover:cursor-pointer"
        >
            {/* <motion.div initial={{ opacity: theme === 'light' ? 1 : 0 }}>
                <Moon id="moonIcon" className="s-6" />
            </motion.div>
            <motion.div initial={{ opacity: theme === 'light' ? 0 : 1 }}>
                <Sun id="sunIcon" className="s-6" />
            </motion.div> */}
            <motion.div
                whileTap={{
                    rotate: theme === 'light' ? 180 : -180
                }}
            >
                {theme === 'light'
                    ? (
                            <Moon id="moonIcon" className="s-6" />
                        )
                    : (
                            <Sun id="sunIcon" className="s-6" />
                        )}
            </motion.div>
        </button>
    );
};
