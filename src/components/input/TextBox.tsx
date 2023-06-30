import {ifStringOr} from "../../utils/helpers.ts";
import {defaultInputClass, defaultInputContainerClass, defaultLabelClass} from "../../utils/input-helpers.ts";
import {InputFieldProperties} from "./InputBase.tsx";

export default function TextBox(props: InputFieldProperties & { [key: string]: any }) {
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
    _props.id = id;
    _props.type = type;
    _props.className = inputClass;

    return (
        <div className={props.boxClass}>
            {props.label && <label htmlFor={id} className={labelClass}>{props.label}</label>}
            <div className={inputContainerClass}>
                <input {..._props}/>
            </div>
        </div>
    );
}
