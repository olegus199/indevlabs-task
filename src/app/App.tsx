import { FC, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './MainLayout';
import ProjectsList from '@/features/projects/ProjectsList';
import ProjectDetails from '@/features/projects/ProjectDetails';

const App: FC = () => {
    useEffect(() => {
        return () => {
            localStorage.clear();
        }
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={<MainLayout />}
                >
                    <Route
                        index
                        element={<ProjectsList />}
                    />
                    <Route
                        path='project'
                        element={
                            <Navigate
                                to='/'
                                replace
                            />
                        }
                    />
                    <Route
                        path='project/:id'
                        element={<ProjectDetails />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
