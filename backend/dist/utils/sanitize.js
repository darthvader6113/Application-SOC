// Input sanitization utility for extra safety
export const sanitizeString = (val, maxLength = 1000) => {
    if (typeof val !== 'string')
        return '';
    // Strip null bytes and non-printable control characters (except newline/tab)
    const cleaned = val.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
    return cleaned.substring(0, maxLength);
};
export const sanitizeEmail = (val) => {
    const str = sanitizeString(val, 255).toLowerCase();
    // Basic RFC email format check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(str)) {
        throw new Error('Invalid email address format.');
    }
    return str;
};
export const sanitizeNumber = (val, min = 0, max = 100000000) => {
    const num = Number(val);
    if (isNaN(num) || num < min || num > max) {
        throw new Error(`Invalid numerical value. Must be between ${min} and ${max}.`);
    }
    return num;
};
