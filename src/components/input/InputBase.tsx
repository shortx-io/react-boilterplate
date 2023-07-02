import {ChangeEvent, FocusEvent, FormEvent, KeyboardEvent} from "react";

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
    value?: string,
    defaultValue?: string,
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void,
    onInput?: (event: FormEvent<HTMLInputElement>) => void,
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void,
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void,
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void,
};

export function Input(props: InputFieldProperties) {
    return <input {...props} />;
}
