// Option<A> = None | Some<A>
// Try<E, A> = Failed<E> | Success<A>
// Async<A> = ??

//Async<void> = (ret: (x: undefined)=> void) => void;

import { Async, Iterable } from '@/async/observeTpe.ts';

const resolve = <A>(a: A): Async<A> => {
    return (ret) => {
        ret(a);
    };
};

const flatMap = <A, B>(a: Async<A>, f: (a: A) => Async<B>): Async<B> => {
    return (ret) => {
        a((a_) => {
            const b = f(a_);
            b((b_) => ret(b_));
        });
    };
};
const map = <A, B>(a: Async<A>, f: (a: A) => B): Async<B> => {
    return flatMap(a, (a_) => resolve(f(a_)));
};
const promiseF = (str: string): Promise<string> =>
    new Promise((resolve, reject) => {
        if (str === '') {
            reject('빈 문자열은 입력 할 수 없습니다.');
            return;
        }
        setTimeout(() => {
            resolve('promiseF 1: ' + str);
        }, 500);

        setTimeout(() => {
            resolve('promiseF 2: ' + str);
        }, 1000);
    });

const asyncF =
    (str: string): Async<string> =>
    (resolve) => {
        setTimeout(() => {
            resolve('asyncF 1: ' + str);
        }, 500);

        setTimeout(() => {
            resolve('asyncF 2: ' + str);
        }, 1000);
    };

const ns: Array<number> = [1, 2, 3, 4, 5];

const integers = (n: number): Array<number> => {
    const ret: number[] = [];
    let i = 0;
    while (i < n) {
        i = i + 1;
        ret.push(i);
    }
    return ret;
};

const integerGenerator: Iterable<number> = () => {
    let i = 0;
    return () => {
        i = i + 1;
        return i;
    };
};

const promiseIntegers = (n: number): Promise<number[]> =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(integers(n));
        }, 1000);
    });

const integerObservable: Async<number> = (ret) => {
    const iter = integerGenerator();
    const interval = setInterval(() => {
        const i = iter();
        if (i > 4) {
            clearInterval(interval);
        }
        ret(i);
    }, 1000);
};

const iter = integerGenerator();

const onStep = () => {
    const n = iter();
    console.log(n);
};

const onManyIntegers = (n: number) => {
    const arr = integers(n);
    console.log(arr);
};

const greeting = (name: string) => {
    console.log('hello ' + name);
};

// continuation-passing style -> CPS callback 함수

const run = <A>(a: Async<A>) => {
    a(() => {
        return;
    });
};

// 함수 선언만 하여 실제 값은 실행 전까지 나오지 않음 lazy
const lazyFour = () => 2 * 2;

//서술: 행동을 정의 하는 것 == 함수 구현
//실행: 실제 계산을 나타내는 것 == 함수 호출
export const observable = async () => {
    // run(map(asyncF('test'), console.log));
    //
    // //한번만 발생하는 이벤트
    // promiseF('test').then(console.log);
    // promiseIntegers(5).then(console.log);
    // onManyIntegers(5);
    integerObservable(console.log);
};
