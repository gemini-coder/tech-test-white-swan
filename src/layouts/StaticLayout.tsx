import React, { ReactElement } from 'react';

const StaticLayout = ({ children }: { children: ReactElement }) => {
    return <div className={`h-full`}>{children}</div>;
};

export default StaticLayout;
