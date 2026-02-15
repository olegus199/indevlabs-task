import { FC, useState } from 'react';
import styles from './ProjectsList.module.scss';
import useProjects from './useProjects';
import Project from './Project';
import { ATTRIBUTES } from '@/attributesForTests';

const baseClassName = 'projects-list';

const ProjectsList: FC = () => {
    const { projects, isLoading } = useProjects();
    const [term, setTerm] = useState('');

    const projectsToRender = projects.filter((project) => project.title.toLowerCase().includes(term.toLowerCase()));

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
        setTerm(e.target.value);
    }

    return (
        <div>
            <input
                aria-label='Filter projects by title'
                className={styles[`${baseClassName}__input`]}
                data-testid={ATTRIBUTES.searchInput}
                onChange={handleInputChange}
                placeholder='Filter by project title'
                type='search'
                value={term}
            />

            <ul aria-label='projects-list'>
                {isLoading
                    ? (
                        <div
                            aria-live='polite'
                            data-testid={ATTRIBUTES.loader}
                        >
                            loading...
                        </div>
                    ) : projectsToRender.length === 0
                        ? (
                            <div data-testid={ATTRIBUTES.noData}>No projects found!</div>
                        )
                        : (
                            projectsToRender.map((project) => (
                                <Project
                                    key={project.id}
                                    project={project}
                                />
                            ))
                        )}
            </ul>
        </div>
    );
};

export default ProjectsList;
