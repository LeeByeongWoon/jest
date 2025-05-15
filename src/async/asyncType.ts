// Option<A> = None | Some<A>
// Try<E, A> = Failed<E> | Success<A>
// Async<A> = ??

type Async<A> = (ret: (x: A) => void) => void;

//Async<void> = (ret: (x: undefined)=> void) => void;

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

const f =
    (str: string): Async<number> =>
    (resolve) => {
        setTimeout(() => {
            console.log('f : ' + str);
            resolve(str.length * 2);
        }, 500);
    };

// f(str)=> (fn:(a) => void) => void;
//

const g =
    (n: number): Async<number> =>
    (resolve) => {
        setTimeout(() => {
            console.log('g : ' + n);
            resolve(n + 1);
        }, 500);
    };

const h =
    (x: number): Async<boolean> =>
    (resolve) => {
        setTimeout(() => {
            console.log('h : ' + x);
            resolve(x % 3 === 3);
        }, 500);
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
    const runfunc = () => {
        return;
    };

    // f('abcd').then(g).then(h).then(program).catch(handleError);
    const a = f('abcd');
    const b = flatMap(a, g);
    const c = flatMap(b, h);
    // a - b - c - d 연달아 실행 되는 lazy 상태
    // d(c(b(a)))
    // return 이 언제 될 지 모르므로, 값이 반환 되면 전달 됨 ==> async 타입
    const d = map(c, program);
    run(d);
    // run(result);

    greeting('world');
    console.log('프로그램이 종료 되었습니다.');
};
