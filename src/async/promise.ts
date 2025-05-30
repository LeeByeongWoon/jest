// Option<A> = None | Some<A>
// Try<E, A> = Failed<E> | Success<A>
// Async<A> = ??

type Async<A> = (ret: (x: A) => void) => void;

//Async<void> = (ret: (x: undefined)=> void) => void;

const f = (str: string): Promise<number> =>
    new Promise((resolve, reject) => {
        if (str === '') {
            reject('빈 문자열은 입력 할 수 없습니다.');
            return;
        }
        setTimeout(() => {
            console.log('f : ' + str);
            resolve(str.length * 2);
        }, 500);
    });

const asyncF =
    (str: string): Async<number> =>
    (resolve) => {
        setTimeout(() => {
            console.log('f : ' + str);
            resolve(str.length * 2);
        }, 500);
    };

// f(str)=> (fn:(a) => void) => void;
//

const g = (n: number): Promise<number> =>
    new Promise((resolve, reject) => {
        if (n === 6) {
            reject('6은 입력할 수 없습니다.');
            return;
        }
        setTimeout(() => {
            console.log('g : ' + n);
            resolve(n + 1);
        }, 500);
    });

const h = (x: number): Promise<boolean> =>
    new Promise((resolve, reject) => {
        if (x === 5) {
            reject('5는 입력할 수 없습니다.');
            return;
        }
        setTimeout(() => {
            console.log('h : ' + x);
            resolve(x % 3 === 3);
        }, 500);
    });

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

const run = <A>(a: Async<A>) => {
    a(() => {
        return;
    });
};

// 함수 선언만 하여 실제 값은 실행 전까지 나오지 않음 lazy
const lazyFour = () => 2 * 2;

//서술: 행동을 정의 하는 것 == 함수 구현
//실행: 실제 계산을 나타내는 것 == 함수 호출
export const promiseFunc = async () => {
    // try {
    //     const a = await f('abc');
    //     const b = await g(a);
    //     const c = await h(b);
    //     program(c);
    // } catch (e) {
    //     console.log(e);
    // }

    // f('abcd').then(g).then(h).then(program).catch(handleError);
    // const a = f('abcd');
    // const b = flatMap(a, (a_) => g(a_));
    // const c = flatMap(b, (b_) => h(b_));
    // const result = map(c, (c_) => program(c_));
    // run(result);
    // run(result);

    greeting('world');
    console.log('프로그램이 종료 되었습니다.');
};
