import {ifStringOr, isNull, isNullOrUndefined, isNumber, isString, isUndefined, wait} from "utils/helpers";

describe('wait', () => {
    it('should wait for given timeout', async function () {
        const timeout = 100;
        const start = Date.now();
        await wait(timeout);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(timeout);
    });
});

describe('isUndefined', () => {
    it('should return true if value is undefined', () => {
        expect(isUndefined(undefined)).toBeTruthy();
    });

    it('should return false if value is not undefined', () => {
        expect(isUndefined(null)).toBeFalsy();
        expect(isUndefined('')).toBeFalsy();
        expect(isUndefined(0)).toBeFalsy();
        expect(isUndefined(false)).toBeFalsy();
    });
});

describe('isNull', () => {
    it('should return true if value is null', () => {
        expect(isNull(null)).toBeTruthy();
    });

    it('should return false if value is not null', () => {
        expect(isNull(undefined)).toBeFalsy();
        expect(isNull('')).toBeFalsy();
        expect(isNull(0)).toBeFalsy();
        expect(isNull(false)).toBeFalsy();
    });
});

describe('isNullOrUndefined', () => {
    it('should return true if value is null or undefined', () => {
        expect(isNullOrUndefined(null)).toBeTruthy();
        expect(isNullOrUndefined(undefined)).toBeTruthy();
    });

    it('should return false if value is not null or undefined', () => {
        expect(isNullOrUndefined('')).toBeFalsy();
        expect(isNullOrUndefined(0)).toBeFalsy();
        expect(isNullOrUndefined(false)).toBeFalsy();
    });
});

describe('isString', () => {
    it('should return true if value is string', () => {
        expect(isString('')).toBeTruthy();
    });

    it('should return false if value is not string', () => {
        expect(isString(null)).toBeFalsy();
        expect(isString(undefined)).toBeFalsy();
        expect(isString(0)).toBeFalsy();
        expect(isString(false)).toBeFalsy();
    });
});

describe('ifStringOr', () => {
    it('should return value if value is string', () => {
        expect(ifStringOr('', 'default')).toBe('');
    });

    it('should return default value if value is not string', () => {
        expect(ifStringOr(null, 'default')).toBe('default');
        expect(ifStringOr(undefined, 'default')).toBe('default');
        expect(ifStringOr(0, 'default')).toBe('default');
        expect(ifStringOr(false, 'default')).toBe('default');
    });
});

describe('isNumber', () => {
    it('should return true if value is number', () => {
        expect(isNumber(0)).toBeTruthy();
    });

    it('should return false if value is not number', () => {
        expect(isNumber(null)).toBeFalsy();
        expect(isNumber(undefined)).toBeFalsy();
        expect(isNumber('')).toBeFalsy();
        expect(isNumber(false)).toBeFalsy();
    });
});
