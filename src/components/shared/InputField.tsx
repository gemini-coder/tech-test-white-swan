import React, { useCallback } from 'react';

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

const InputField = ({ value, onChange, placeholder }: Props) => {
    const handleOnChange = useCallback(
        (value: string) => {
            onChange(value);
        },
        [onChange]
    );

    return (
        <input
            className={`w-full mb-2 p-3`}
            value={value}
            onChange={(e) => handleOnChange(e.target.value)}
            placeholder={placeholder}
        />
    );
};

export default InputField;
