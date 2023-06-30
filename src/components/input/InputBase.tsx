import React from "react";

export type InputFieldProperties = {
    id?: string,
    name: string,
    type?: string,
    required?: boolean,
    label?: string,
    labelClass?: string,
    inputContainerClass?: string,
    boxClass?: string,
    inputClass?: string,
    placeholder?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onInput?: (event: React.FormEvent<HTMLInputElement>) => void,
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void,
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void,
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
};
