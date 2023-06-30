export function wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isUndefined(value: any) {
    return typeof value === 'undefined';
}

export function isNull(value: any) {
    return value === null;
}

export function isNullOrUndefined(value: any) {
    return isUndefined(value) || isNull(value);
}

export function isString(value: any) {
    return typeof value === 'string';
}

export function ifStringOr(value: any, defaultValue: any) {
    return isString(value) ? value : defaultValue;
}

export function isNumber(value: any) {
    return typeof value === 'number';
}
