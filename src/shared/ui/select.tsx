import { Select as HeadlessSelect, SelectProps } from "@headlessui/react";

import styles from './select.module.css';

export type Option<T = string> = {
    label: string | React.ReactNode;
    value: T;
}

type CustomProps<T extends string = string> = {
    options: Option<T>[];
    value: T;
    onChange: (value: T) => void;
}

export function Select<T extends string = string>({
    options,
    value,
    onChange,
    className,
    ...props
}: Omit<SelectProps, 'onChange' | 'value'> & CustomProps<T>) {
    return (
        <HeadlessSelect
            className={`py-1 px-2 bg-[#d7b494] ${styles.select} ${className}`}
            value={value}
            onChange={(event) => onChange(event.target.value as T)}
            {...props}
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </HeadlessSelect>
    )
}