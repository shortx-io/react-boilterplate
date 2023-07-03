import {FormFieldValue, Validator} from "../form-field";

export class Required implements Validator {
    validate(value: FormFieldValue): boolean {
        return value !== undefined && value !== null && value !== "";
    }

    message(field: string): string {
        return `The ${field} field is required`;
    }
}

export default Required;
