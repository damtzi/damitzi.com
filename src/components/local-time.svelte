<script>
    import { onMount } from 'svelte';

    let time = $state(new Date());

    onMount(() => {
        const interval = setInterval(() => {
            time = new Date();
        }, 1000);

        return () => clearInterval(interval);
    });

    const formattedTime = $derived(
        new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
            timeZone: "Europe/Warsaw",
        }).format(time)
    );
</script>

<span>{formattedTime}</span>
