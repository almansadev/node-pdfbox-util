export const stingtobase64 = (str: string) => {
    return Buffer.from(str).toString('base64');
}
export const base64tostring = (str: string) => {
    return Buffer.from(str, 'base64').toString('utf8');
}

