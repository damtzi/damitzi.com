import { useEffect, useState } from 'react';

const formatter = new Intl.DateTimeFormat('en-GB', {
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
	hour12: false,
	timeZone: 'Europe/Warsaw'
});

/** Live Europe/Warsaw clock, ticking every second. */
export default function Clock() {
	const [time, setTime] = useState(() => new Date());

	useEffect(() => {
		const interval = setInterval(() => setTime(new Date()), 1000);
		return () => clearInterval(interval);
	}, []);

	return <span>{formatter.format(time)}</span>;
}
