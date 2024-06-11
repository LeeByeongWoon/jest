import readline from 'node:readline';

export const fetchMock = (callback: (param: string) => string) => {
    setTimeout(() => {
        return callback('peanut butter');
    }, 1000);
};

export const setIntervalTimer = (
    millisecond: number,
    total: number,
    action: (count: number, totalTime: number) => unknown
) => {
    let count = 0;
    return setInterval(() => {
        count++;
        action(count, total);
    }, millisecond);
};

type ArrayProperties = Array<unknown> & { [index: number]: unknown };

const myArrayHandler = {
    get: <T extends ArrayProperties>(target: T, prop: string | symbol) => {
        if (prop === 'toString') {
            return () => target.reduce((prev, curr) => `${prev}${curr}`, '');
        }
        return target[prop as keyof T];
    },
};

const timeLogger = (count: number, totalTime: number) => {
    /*
        clearLine(outputStream, clearPosition)
        cursorTo(outputStream, cursorPosition)
     */
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0);

    const progressBar = Array(Math.round(totalTime / 1000))
        .fill('░')
        .map((bar, index) => (index <= count - 1 ? '▒' : bar));
    const ProgressToString = new Proxy(progressBar, myArrayHandler);
    // process.stdout.write(`Time elapsed: ${ProgressToString} ${count}/${Math.round(totalTime / 1000)}`);
    process.stdout.write(`Time elapsed: ${ProgressToString} ${(count / Math.round(totalTime / 1000)) * 100}%`);
};

const getElapsedTime = () => {
    const start = performance.now();
    return () => {
        const end = performance.now();
        return Math.round(end / 1000) - Math.round(start / 1000);
    };
};

const IS_PARAMETER_NUMBER = (param: unknown) => typeof param === 'number';

export const executeAfterDelay =
    <T>(action: (param: T, time: string) => unknown) =>
    async (param: T) => {
        const totalTime = 10000;
        const timer = setIntervalTimer(1000, totalTime, timeLogger);
        const elapsedTime = getElapsedTime();

        try {
            return await new Promise((resolve, reject) => {
                if (IS_PARAMETER_NUMBER(param)) {
                    //error reject
                    return reject("Param can't be number");
                }
                return setTimeout(() => {
                    //log
                    const timeElapsed = elapsedTime();
                    const totalCount = Math.round(totalTime / 1000);
                    timeLogger(totalCount, totalTime);

                    //resolve
                    const result = action(param, timeElapsed + 's');
                    return resolve(result);
                }, totalTime);
            });
        } finally {
            clearInterval(timer);
        }
    };
export const action = <T>(t: T, time: string): [T, string] => [t, time];
