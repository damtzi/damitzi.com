import projectsData from '$lib/assets/data/projects.json';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		personalProjects: projectsData.personal,
		workProjects: projectsData.work
	};
};
