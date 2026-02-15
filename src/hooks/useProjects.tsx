import { useEffect, useState } from 'react';
import { IProject } from '@/components/projects/projectsTypes';
import { PROJECTS_LOCAL_STORAGE_KEY } from '@/config';
import { mockProjects } from '@/mockData';

const useProjects = () => {
    const [projects, setProjects] = useState<IProject[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProjects(): Promise<void> {
            const localStorageProjects = localStorage.getItem(PROJECTS_LOCAL_STORAGE_KEY);

            if (localStorageProjects) {
                setProjects(JSON.parse(localStorageProjects));

                return;
            }

            try {
                setIsLoading(true);

                await new Promise(resolve => setTimeout(resolve, 1000));

                setProjects(mockProjects);
                localStorage.setItem(PROJECTS_LOCAL_STORAGE_KEY, JSON.stringify(mockProjects));
            } catch (err) {
                setError('Failed to load projects');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    function getProjectById(id: string | undefined): IProject | undefined {
        return projects.find((project) => project.id === id);
    }

    return { projects, isLoading, error, getProjectById }
};

export default useProjects;
