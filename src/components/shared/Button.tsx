import React, { useCallback, useMemo } from 'react';

type Props = {
    onClick: () => void;
    disabled?: boolean;
    text: string;
    colour?: 'success' | 'primary';
    fullWidth?: boolean;
    type?: 'button' | 'submit' | 'reset';
};

const Button = ({
    onClick,
    disabled = false,
    text,
    colour = 'primary',
    fullWidth = false,
    type = 'button',
}: Props) => {
    const handleOnClick = useCallback(() => {
        onClick();
    }, [onClick]);

    const buttonColour = useMemo(() => {
        switch (colour) {
            case 'success':
                return `bg-red-900`;
            case 'primary':
                return `bg-cyan-700 text-white`;
        }
    }, [colour]);

    return (
        <button
            type={type}
            onClick={handleOnClick}
            className={`${fullWidth ? 'w-full' : ''} p-3 ${
                disabled ? `opacity-30` : ''
            } ${buttonColour}`}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default Button;
