export function throwErrorTest(input: unknown) {
    if (typeof input === 'number') {
        throw new Error('Cannot input Number');
    }
    return input;
}
