import {ExclamationCircleIcon} from "@heroicons/react/20/solid";
import {Trans} from "react-i18next";
import {ifStringOr} from "utils/helpers";
import {Input, InputFieldProperties} from "./InputBase";

const defaultLabelClass = "block text-sm font-medium leading-6 text-gray-900";
const defaultInputContainerClass = "mt-2 relative";
const defaultInputClass = "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";

export default function TextBox(props: InputFieldProperties & { error?: boolean, message?: string }) {
    const labelClass = ifStringOr(props.labelClass, defaultLabelClass);
    const inputContainerClass = ifStringOr(props.inputContainerClass, defaultInputContainerClass);
    const inputClass = ifStringOr(props.inputClass, defaultInputClass) + " " + (props.error ? "text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500" : "");
    const type = ifStringOr(props.type, "text");
    const id = ifStringOr(props.id, "id_" + props.name);

    const _props = {...props};
    delete _props.labelClass;
    delete _props.inputContainerClass;
    delete _props.boxClass;
    delete _props.inputClass;
    delete _props.label;
    delete _props.error;

    _props.id = id;
    _props.type = type;
    _props.className = inputClass;


    if(props.error) {
        _props["aria-invalid"] = "true";
        _props["aria-describedby"] = `${props.name}-error`;
    }


    return (
        <div className={props.boxClass}>
            {props.label && <label htmlFor={id} className={labelClass}>{props.label}</label>}
            <div className={inputContainerClass}>
                <Input {..._props} />
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
