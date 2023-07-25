import React from 'react';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TableSortIcon = ({ way }: { way: 'asc' | 'desc' }) => {
    return (
        <FontAwesomeIcon
            className={`ml-2`}
            size={'sm'}
            icon={way == 'asc' ? faArrowUp : faArrowDown}
        />
    );
};

export default TableSortIcon;
