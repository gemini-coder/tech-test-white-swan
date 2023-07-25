import React, { ReactElement } from 'react';

const HtmlWrapper = ({ children }: { children: ReactElement }) => {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
};

export default HtmlWrapper;
