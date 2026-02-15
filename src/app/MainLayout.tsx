import styles from './MainLayout.module.scss';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

const baseClassName = 'main-layout';

const MainLayout: FC = () => {
    return (
        <main className={styles[baseClassName]}>
            <div className={styles[`${baseClassName}__content-container`]}>
                <h1 className={styles[`${baseClassName}__h1`]}>Projects App</h1>
                <Outlet />
            </div>
        </main>
    );
};

export default MainLayout;
