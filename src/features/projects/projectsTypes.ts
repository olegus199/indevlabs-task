export interface IProject {
    description: string;
    id: string;
    status: ProjectStatus;
    title: string;
}

export enum ProjectStatus {
    Cancelled = 'Cancelled',
    Completed = 'Completed',
    Pending = 'Pending',
}

export interface ProjectProps {
    project: IProject;
}
