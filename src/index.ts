import { promiseFunc } from '@/async/promise.ts';

function main() {
    console.clear();
    console.log('\x1b[3m\x1b[90m%s\x1b[0m', 'Console was cleared');
    promiseFunc();
}

main();
