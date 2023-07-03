import {ExclamationCircleIcon} from "@heroicons/react/20/solid";
import {Trans} from "react-i18next";
import {ifStringOr} from "utils/helpers";
import {Input, InputFieldProperties} from "./InputBase";

const defaultLabelClass = "block text-sm font-medium leading-6 text-gray-900";
const defaultInputContainerClass = "mt-2 relative";
const defaultInputClass = "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";

type TextBoxProps = InputFieldProperties & { error?: boolean, message?: string }

function prepareProps(props: TextBoxProps) {
    const labelClass = ifStringOr(props.labelClass, defaultLabelClass);
    const inputContainerClass = ifStringOr(props.inputContainerClass, defaultInputContainerClass);
    const inputClass = ifStringOr(props.inputClass, defaultInputClass) + " " + (props.error ? "text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500" : "");
    const type = ifStringOr(props.type, "text");
    const id = ifStringOr(props.id, "id_" + props.name);

    const inputProps = {...props};
    delete inputProps.labelClass;
    delete inputProps.inputContainerClass;
    delete inputProps.boxClass;
    delete inputProps.inputClass;
    delete inputProps.label;
    delete inputProps.error;

    inputProps.id = id;
    inputProps.type = type;
    inputProps.className = inputClass;

    if(props.error) {
        inputProps["aria-invalid"] = "true";
        inputProps["aria-describedby"] = `${props.name}-error`;
    }

    return {
        labelClass,
        inputContainerClass,
        inputProps,
    };
}

export default function TextBox(props: TextBoxProps) {
    const {labelClass, inputContainerClass, inputProps} = prepareProps(props);

    return (
        <div className={props.boxClass}>
            {props.label && <label htmlFor={inputProps.id} className={labelClass}>{props.label}</label>}
            <div className={inputContainerClass}>
                <Input {...inputProps} />
                {props.error && <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true"/>
                </div>}
            </div>
            {props.error && <p className="mt-2 text-sm text-red-600" id={`${props.name}-error`}>
                <Trans>{props.message}</Trans>
            </p>}
        </div>
    );
}
