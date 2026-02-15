import { FC } from 'react';
import styles from './ProjectDetails.module.scss';
import useProjects from '@/hooks/useProjects';
import { Link, useParams } from 'react-router-dom';
import { ATTRIBUTES } from '@/attributesForTests';

const baseClassName = 'projects-details';

const ProjectDetails: FC = () => {
    const { id } = useParams();
    const { getProjectById, isLoading } = useProjects();

    const project = getProjectById(id);

    if (isLoading) {
        return (
            <div
                aria-live='polite'
                data-testid={ATTRIBUTES.loader}
            >loading...</div>
        );
    }

    if (!project) {
        return (
            <div data-testid={ATTRIBUTES.noData}>Project not found</div>
        );
    }

    const {
        description,
        status,
        title,
    } = project;

    return (
        <div
            data-testid={ATTRIBUTES.projectDetailsItem}
            className={styles[baseClassName]}
        >
            <h3 className={styles[`${baseClassName}__title`]}>
                {title}
            </h3>
            <p className={styles[`${baseClassName}__description`]}>
                {description}
            </p>
            <p className={styles[`${baseClassName}__status`]}>
                Status: <span>{status}</span>
            </p>
            <Link
                to='/'
                className={styles[`${baseClassName}__link`]}
            >
                Go back
            </Link>
        </div>
    );
};

export default ProjectDetails;
