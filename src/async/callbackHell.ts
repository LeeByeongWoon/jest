const f = (str: string, fn: (n: number) => void) => {
    setTimeout(() => {
        console.log('f : ' + str);
        fn(str.length * 2);
    }, 500);
};

const g = (n: number, fn: (n: number) => void) => {
    setTimeout(() => {
        console.log('g : ' + n);
        fn(n + 1);
    }, 500);
    return n + 1;
};

const h = (x: number, fn: (n: boolean) => void) => {
    setTimeout(() => {
        console.log('h : ' + x);
        fn(x % 3 === 3);
    }, 500);
    return x % 3 === 0;
};

const handleError = (e: unknown) => {
    console.log('handleError: ' + e);
};

const program = (b: boolean) => {
    setTimeout(() => {
        console.log(b);
    }, 500);
};

const greeting = (name: string) => {
    console.log('hello ' + name);
};

const id = <A>(a: A) => {
    return a;
};

const cpsId = <A>(a: A, ret: (a: A) => void) => {
    ret(a);
};

// continuation-passing style -> CPS callback 함수

export const callbackHell = () => {
    // callback hell
    f('test', (a) => {
        g(a, (b) => {
            h(b, (c) => {
                program(c);
            });
        });
    });
    // console.log(a);

    cpsId('test', (a) => console.log(a));

    greeting('world');
    console.log('프로그램이 종료 되었습니다.');
};
