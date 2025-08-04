<script lang="ts">
    import { Moon, Sun } from "@lucide/svelte";
    import { gsap } from "gsap";

    // Svelte 5 reactive state
    let theme = $state<"light" | "dark" | "system">("light");
    let moonIcon: HTMLElement;
    let sunIcon: HTMLElement;

    // Effect to initialize theme from localStorage and DOM
    $effect(() => {
        if (
            typeof document !== "undefined" &&
            typeof localStorage !== "undefined"
        ) {
            // First check localStorage for saved preference
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme === "dark" || savedTheme === "light") {
                theme = savedTheme;
            } else {
                // Fallback to DOM classes if no localStorage value
                const isDarkMode =
                    document.documentElement.classList.contains("dark");
                theme = isDarkMode ? "dark" : "light";
            }
        }
    });

    // Effect to apply theme changes
    $effect(() => {
        if (typeof document !== "undefined" && typeof window !== "undefined") {
            const isDark =
                theme === "dark" ||
                (theme === "system" &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches);

            document.documentElement.classList[isDark ? "add" : "remove"](
                "dark",
            );

            // Save to localStorage
            if (typeof localStorage !== "undefined") {
                localStorage.setItem("theme", isDark ? "dark" : "light");
            }
        }
    });

    const handleClick = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        theme = newTheme;

        // GSAP animation
        const currentIcon = theme === "dark" ? moonIcon : sunIcon;
        const nextIcon = theme === "dark" ? sunIcon : moonIcon;

        if (currentIcon && nextIcon) {
            gsap.timeline()
                .to(currentIcon, {
                    y: 32,
                    duration: 0.3,
                    ease: "power2.out",
                })
                .to(
                    nextIcon,
                    {
                        y: -32,
                        duration: 0.3,
                        ease: "power2.out",
                    },
                    "-=0.15",
                ); // Start second animation 0.15s before first one ends
        }

        // Alternative rotation animation like the original
        const container = document.querySelector(".theme-toggle-container");
        if (container) {
            gsap.to(container, {
                rotation: "+=180",
                duration: 0.4,
                ease: "back.out(1.7)",
            });
        }
    };
</script>

<button
    type="button"
    onclick={handleClick}
    aria-label="Toggle Theme"
    class="hover:cursor-pointer theme-toggle-container"
>
    {#if theme === "light"}
        <div bind:this={moonIcon}>
            <Moon class="size-6" />
        </div>
    {:else}
        <div bind:this={sunIcon}>
            <Sun class="size-6" />
        </div>
    {/if}
</button>
