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
    (fn) => {
        setTimeout(() => {
            console.log('f : ' + str);
            fn(str.length * 2);
        }, 500);
    };

// f(str)=> (fn:(a) => void) => void;
//

const g =
    (n: number): Async<number> =>
    (fn) => {
        console.log(n);
        setTimeout(() => {
            console.log('g : ' + n);
            fn(n + 1);
        }, 500);
        return n + 1;
    };

const h =
    (x: number): Async<boolean> =>
    (fn) => {
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

const run = <A>(a: Async<A>) => {
    a(() => {
        return;
    });
};

export const promiseFunc = () => {
    // console.log(a);
    const a = f('test');
    //('test') => f('test') 5초 뒤 f: test 출력 && f('test');
    const b = flatMap(a, (a_) => g(a_));
    // flatMap(a: Async<number>, (b: number)=>
    const c = flatMap(b, (b_) => h(b_));
    const result = map(c, (c_) => program(c_));
    f('gg')(() => {
        return;
    });
    // run(result);
    // greeting('world');
    // console.log('프로그램이 종료 되었습니다.');
};
