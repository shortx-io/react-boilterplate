import {SyntheticEvent} from "react";

export type FormFieldValue = undefined | string | number | boolean | string[] | number[] | boolean[];

export interface Validator {
    validate(value: FormFieldValue): boolean;

    message(field: string, value?: FormFieldValue): string;
}

export class Email implements Validator {
    validate(value: FormFieldValue): boolean {
        return typeof value === "string" && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    }

    message(): string {
        return `The email address is invalid`;
    }
}

export class Min implements Validator {
    min: number;

    constructor(min: number) {
        this.min = min;
    }

    validate(value: FormFieldValue): boolean {
        return typeof value === "string" ? value.length >= this.min : +(value || 0) >= this.min;
    }

    message(field: string): string {
        return `The ${field} field must be minimum ${this.min} characters`;
    }
}

export class Max implements Validator {
    max: number;

    constructor(max: number) {
        this.max = max;
    }

    validate(value: FormFieldValue): boolean {
        return typeof value === "string" ? value.length <= this.max : +(value || 0) <= this.max;
    }

    message(field: string): string {
        return `The ${field} field must be less than ${this.max} characters`;
    }
}

export class Required implements Validator {
    validate(value: FormFieldValue): boolean {
        return value !== undefined && value !== null && value !== "";
    }

    message(field: string): string {
        return `The ${field} field is required`;
    }
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
            // @ts-ignore
            this._value = e.currentTarget.checked;
        }
        else if(e.currentTarget.type === "select-multiple") {
            // @ts-ignore
            const options = e.currentTarget.options;
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

export class Form<T> {
    readonly fields: FormField[];
    isValid = true;
    isInvalid = false;
    isDirty = false;
    isPristine = true;

    constructor(fields: FormField[]) {
        this.fields = fields;
    }

    static fromObject<T>(obj: { fields: FormField[] }): Form<T> {
        return new Form<T>(obj.fields);
    }

    addField = (field: FormField) => {
        this.fields.push(field);
    };

    getField = (field: string) => {
        return this.fields.find(f => f.field === field);
    };

    getFields = () => {
        return this.fields;
    };

    validate = () => {
        this.isInvalid = false;
        this.fields.forEach(field => {
            const valid = field.validate();
            if(!valid) {
                this.isInvalid = true;
            }
        });

        this.isValid = !this.isInvalid;
        this.isDirty = this.fields.some(field => field.isDirty);
        this.isPristine = !this.isDirty;

        return this.isValid;
    };

    errorBag = () => {
        const bags = this.fields.map(field => ({
            [field.field]: field.errorBag,
        }));

        let errors: { [k: string]: string[] } = {};
        for(const bag of bags) {
            errors = {...errors, ...bag};
        }

        for(const key in errors) {
            if(errors[key].length === 0) {
                delete errors[key];
            }
        }

        return errors;
    };

    getValues = (): T => {
        return this.fields.reduce((acc, field) => {
            return {
                ...acc,
                [field.field]: field._value,
            };
        }, {}) as T;
    };

    setValues = (values: { [key: string]: FormFieldValue }) => {
        this.fields.forEach(field => {
            field._value = values[field.field];
        });
    };

    clone = (): Form<T> => {
        const form = new Form<T>(this.fields);
        form.isInvalid = this.isInvalid;
        form.isDirty = this.isDirty;
        form.isPristine = this.isPristine;
        form.isValid = this.isValid;

        return form;
    };
}
