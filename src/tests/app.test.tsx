import {
    afterEach,
    beforeAll,
    describe,
    expect,
    it,
    vi,
} from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render as rtlRender } from "@testing-library/react";
import App from '../app/App.tsx';
import { ATTRIBUTES } from '../attributesForTests';
import { mockProjects } from '@/mockData.ts';

function render() {
    return rtlRender(getApp(), {
        wrapper: ({ children }) => children,
    });
}

export function getApp() {
    return (
        <App />
    );
}

let mockUseProjectsReturnValue = {
    projects: [...mockProjects],
    isLoading: false,
    error: null,
    getProjectById: vi.fn(),
};

vi.mock('@/features/projects/useProjects', () => ({
    default: vi.fn(() => mockUseProjectsReturnValue)
}));

const {
    projectItem,
    searchInput,
    loader,
    noData,
    projectDetailsLink,
    projectDetailsItem,
} = ATTRIBUTES;

describe('Main tests', () => {
    beforeAll(() => {
        const localStorageMock = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
            length: 0,
            key: vi.fn(),
        };

        Object.defineProperty(window, 'localStorage', {
            value: localStorageMock,
            writable: true
        });
    });

    afterEach(() => {
        mockUseProjectsReturnValue = {
            projects: [...mockProjects],
            isLoading: false,
            error: null,
            getProjectById: vi.fn(),
        };

        vi.clearAllMocks();

        window.history.pushState({}, '', '/');
    });

    describe('Projects list tests', () => {
        it('Renders project items', () => {
            render();

            mockProjects.forEach(({ id }) => {
                expect(screen.getByTestId(projectItem + id)).toBeInTheDocument();
            });
        });

        it('Filters items when search input changes', async () => {
            render();

            await userEvent.type(screen.getByTestId(searchInput), mockProjects[0].title);

            expect(screen.getByTestId(projectItem + mockProjects[0].id)).toBeInTheDocument();

            mockProjects.slice(1).forEach(({ id }) => {
                expect(screen.queryByTestId(projectItem + id)).not.toBeInTheDocument();
            });
        });

        it('Renders loader when list is loading', () => {
            mockUseProjectsReturnValue = {
                projects: [],
                isLoading: true,
                error: null,
                getProjectById: vi.fn(),
            };

            render();

            expect(screen.getByTestId(loader)).toBeInTheDocument();
        });

        it('Renders no data when array is empty', () => {
            mockUseProjectsReturnValue = {
                projects: [],
                isLoading: false,
                error: null,
                getProjectById: vi.fn(),
            };

            render();

            expect(screen.getByTestId(noData)).toBeInTheDocument();
        });
    });

    describe('Project details tests', () => {
        it('Renders project details', async () => {
            mockUseProjectsReturnValue = {
                projects: [...mockProjects],
                isLoading: false,
                error: null,
                getProjectById: vi.fn().mockReturnValueOnce({ ...mockProjects[0] }),
            };

            render();

            await userEvent.click(screen.getByTestId(projectDetailsLink + mockProjects[0].id));

            expect(screen.getByTestId(projectDetailsItem)).toBeInTheDocument();
        });

        it('Renders no data if id is not valid', async () => {
            mockUseProjectsReturnValue = {
                projects: [...mockProjects],
                isLoading: false,
                error: null,
                getProjectById: vi.fn().mockReturnValueOnce(undefined),
            };

            render();

            await userEvent.click(screen.getByTestId(projectDetailsLink + mockProjects[0].id));

            expect(screen.getByTestId(noData)).toBeInTheDocument();
        });

        it('Renders loading if loading', () => {
            window.history.pushState({}, '', '/project/1');

            mockUseProjectsReturnValue = {
                projects: [...mockProjects],
                isLoading: true,
                error: null,
                getProjectById: vi.fn(),
            };

            render();

            expect(screen.getByTestId(loader)).toBeInTheDocument();
        });
    });
});
