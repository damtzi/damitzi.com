import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Array<ClassValue>) {
	return twMerge(clsx(inputs));
}

export function slugify(str: string): string {
	return str
		.toLowerCase()
		.normalize('NFD') // Normalize special characters
		.replace(/[^a-z0-9\s-]/g, '') // Remove special characters
		.trim()
		.replace(/\s+/g, '-') // Replace spaces with hyphens
		.replace(/-+/g, '-'); // Remove consecutive hyphens
}

export function deslugify(slug: string): string {
	return slug.replace(/-/g, ' ').replace(/(^\w|\s\w)/g, (char) => char.toUpperCase());
}

export function dateFormatter(date: Date): string {
	// Using Intl API for locale-aware formatting
	const formatter = new Intl.DateTimeFormat('en-GB', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});

	const formattedDate = formatter.format(date).replace(/\//g, '/');

	return formattedDate;
}

export function formatTime(seconds: number): string {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	const formattedSecs = secs < 10 ? `0${secs}` : secs;
	return `${mins}:${formattedSecs}`;
}

export function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
