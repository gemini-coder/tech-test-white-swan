import React, { ReactElement } from 'react';

const FieldWrapper = ({
    children,
}: {
    children: ReactElement;
    label: string;
}) => {
    return <div>{children}</div>;
};

export default FieldWrapper;
