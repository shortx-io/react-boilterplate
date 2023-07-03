import {SyntheticEvent} from "react";

export type FormFieldValue = undefined | string | number | boolean | string[] | number[] | boolean[];
export interface Validator {
    validate(value: FormFieldValue): boolean;

    message(field: string, value?: FormFieldValue): string;
}

export class FormField {
    readonly field: string;
    validators?: Validator[];
    isDirty = false;
    isPristine = true;
    isValid = true;
    isInvalid = false;
    errorBag: string[] = [];
    placeholder?: string;
    label?: string;
    private readonly pristineValue?: FormFieldValue;

    constructor(field: string,
                value?: FormFieldValue,
                validators?: Validator[],
                options?: {
                    label: string,
                    placeholder: string
                }) {
        this.field = field;
        this._value = value;
        this.pristineValue = value;
        this.validators = validators;
        this.label = options?.label;
        this.placeholder = options?.placeholder;
    }

    _value?: FormFieldValue;

    get value() {
        return this._value;
    }

    set value(value: FormFieldValue) {
        this._value = value;
    }

    static fromObject(obj: { field: string, value?: FormFieldValue }) {
        return new FormField(obj.field, obj.value);
    }

    validate = () => {
        this.errorBag = [];

        this.isPristine = this._value === this.pristineValue;
        this.isDirty = !this.isPristine;

        if(!this.validators?.length) {
            return true;
        }

        this.validators.forEach(validator => {
            const valid = validator.validate(this._value);
            if(!valid) {
                this.errorBag.push(validator.message(this.field, this._value));
            }
        });

        this.errorBag = [...this.errorBag];
        this.isInvalid = this.errorBag.length > 0;
        this.isValid = !this.isInvalid;

        return this.isValid;
    };

    onChange = (e: SyntheticEvent<HTMLInputElement | HTMLSelectElement>) => {
        if(e.currentTarget.type === "checkbox") {
            this._value = (e.currentTarget as HTMLInputElement).checked;
        }
        else if(e.currentTarget.type === "select-multiple") {
            const options = (e.currentTarget as HTMLSelectElement).options;
            const selected = [];

            for(let i = 0; i < options.length; i++) {
                if(options[i].selected) {
                    selected.push(options[i].value);
                }
            }

            this._value = selected;
        }

        else {
            this._value = e.currentTarget.value;
        }
    };
}

export default FormField;
