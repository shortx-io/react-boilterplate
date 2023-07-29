export function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isUndefined(value: never) {
    return typeof value === "undefined";
}

export function isNull(value: never) {
    return value === null;
}

export function isNullOrUndefined(value: never) {
    return isUndefined(value) || isNull(value);
}

export function isString(value: never) {
    return typeof value === "string";
}

export function ifStringOr(value: never, defaultValue: string): string {
    return isString(value) ? value : defaultValue;
}

export function isNumber(value: never) {
    return typeof value === "number";
}
