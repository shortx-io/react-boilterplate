import React from "react";
import {ifStringOr} from "utils/helpers";
import {Input, InputFieldProperties} from "./InputBase";

const defaultLabelClass = "block text-sm font-medium leading-6 text-gray-900";
const defaultInputContainerClass = "mt-2";
const defaultInputClass = "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";

export default function TextBox(props: InputFieldProperties & {
    [key: string]: string | boolean | number | ((e: React.SyntheticEvent) => void)
}) {
    const labelClass = ifStringOr(props.labelClass, defaultLabelClass);
    const inputContainerClass = ifStringOr(props.inputContainerClass, defaultInputContainerClass);
    const inputClass = ifStringOr(props.inputClass, defaultInputClass);
    const type = ifStringOr(props.type, "text");
    const id = ifStringOr(props.id, "id_" + props.name);

    const _props = {...props};
    delete _props.labelClass;
    delete _props.inputContainerClass;
    delete _props.boxClass;
    delete _props.inputClass;
    delete _props.label;

    _props.id = id;
    _props.type = type;
    _props.className = inputClass;

    return (
        <div className={props.boxClass}>
            {props.label && <label htmlFor={id} className={labelClass}>{props.label}</label>}
            <div className={inputContainerClass}>
                <Input {..._props}/>
            </div>
        </div>
    );
}
