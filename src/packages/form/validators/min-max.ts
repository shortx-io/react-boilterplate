import {FormFieldValue, Validator} from "../form-field";

export class MinMax implements Validator {
    min: number;
    max: number;

    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }

    validate(value: FormFieldValue): boolean {
        return typeof value === "string"
            ? (value.length >= this.min && value.length <= this.max)
            : (+(value || 0) >= this.min && +(value || 0) <= this.max);
    }

    message(field: string): string {
        return `The ${field} field must be between ${this.min} and ${this.max} characters`;
    }
}

export default MinMax;
