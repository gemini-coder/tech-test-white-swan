import React, { ReactElement } from 'react';
import TopNavigation from './TopNavigation';

const AppLayout = ({ children }: { children: ReactElement }) => {
    return (
        <div className={`h-full p-5`}>
            <TopNavigation />
            {children}
        </div>
    );
};

export default AppLayout;
