import {FormFieldValue, Validator} from "../form-field";

export class Email implements Validator {
    validate(value: FormFieldValue): boolean {
        return typeof value === "string" && /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
    }

    message(): string {
        return `The email address is invalid`;
    }
}

export default Email;
