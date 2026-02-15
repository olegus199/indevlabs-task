import { FC } from 'react';
import styles from './Project.module.scss';
import { ProjectProps } from './projectsTypes';
import { Link } from 'react-router-dom';
import { ATTRIBUTES } from '@/attributesForTests';

const baseClassName = 'project';

const Project: FC<ProjectProps> = ({
    project,
}) => {
    const {
        description,
        id,
        status,
        title,
    } = project;

    return (
        <div
            className={styles[baseClassName]}
            data-testid={ATTRIBUTES.projectItem + id}
        >
            <h4 className={styles[`${baseClassName}__title`]}>
                {title}
            </h4>
            <p className={styles[`${baseClassName}__status`]}>
                {status}
            </p>
            <p className={styles[`${baseClassName}__description`]}>
                {description}
            </p>
            <Link
                className={styles[`${baseClassName}__link`]}
                data-testid={ATTRIBUTES.projectDetailsLink + id}
                to={`/project/${id}`}
            >
                More info
            </Link>
        </div>
    );
};

export default Project;
