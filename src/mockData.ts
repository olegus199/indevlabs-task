import { IProject, ProjectStatus } from './components/projects/projectsTypes';

export const mockProjects: IProject[] = [
    {
        description: 'Complete overhaul of company website with modern React frontend, improved mobile responsiveness, and optimized SEO performance.',
        id: '1',
        status: ProjectStatus.Pending,
        title: 'Website Redesign',
    },
    {
        description: 'Migrate on-premise PostgreSQL database to AWS RDS with automated backups, read replicas, and zero downtime migration strategy.',
        id: '2',
        status: ProjectStatus.Cancelled,
        title: 'Database Migration',
    },
    {
        description: 'Build cross-platform mobile app for task management with offline support, push notifications, and real-time sync across devices.',
        id: '3',
        status: ProjectStatus.Completed,
        title: 'Mobile App Development',
    },
    {
        description: 'Implement OAuth2 authentication system with social login providers, role-based access control, and session management.',
        id: '4',
        status: ProjectStatus.Completed,
        title: 'User Authentication System',
    },
    {
        description: 'Create interactive analytics dashboard with real-time metrics, custom date ranges, and export functionality for reports.',
        id: '5',
        status: ProjectStatus.Pending,
        title: 'Analytics Dashboard',
    },
    {
        description: 'Set up automated CI/CD pipeline with GitHub Actions, including test coverage reports, security scanning, and automated deployments.',
        id: '6',
        status: ProjectStatus.Completed,
        title: 'CI/CD Pipeline Setup',
    },
    {
        description: 'Conduct comprehensive security audit, implement OWASP recommendations, and obtain SOC2 Type II certification.',
        id: '7',
        status: ProjectStatus.Cancelled,
        title: 'Security Compliance',
    }
];
