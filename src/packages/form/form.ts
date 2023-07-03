import {FormField, FormFieldValue} from "./form-field";


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

export default Form;
