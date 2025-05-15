import { Observable, Observer } from 'src/async/observeTpe';

const isEven = (n: number) => n % 2 === 0;

const integerObservable: Observable<number> = (subscribe) => {
    let i = 0;
    setInterval(() => {
        i = i + 1;
        subscribe(i);
    }, 1000);
};

const ns: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const nsObserve =
    (data: number[]): Observable<number[]> =>
    (subscribe) => {
        subscribe(data);
    };

const pipeFunctions =
    <A, B, C>(f: (a: A) => B, g: (b: B) => C) =>
    (a: A): C => {
        return g(f(a));
    };

// iterable 한 요소에 모두 함수를 적용 시켜줌
const map =
    <A, B>(f: (a: A) => B) =>
    (source: Observable<A>): Observable<B> => {
        return (subscribe) => {
            source((a) => {
                const b = f(a);
                subscribe(b);
            });
        };
    };

// iterable 한 요소에 조건을 부여 해줌
const filter =
    <A>(pred: (a: A) => boolean) =>
    (source: Observable<A>): Observable<A> => {
        return (subscribe) => {
            source((a) => {
                if (pred(a)) {
                    subscribe(a);
                }
            });
        };
    };

//observer 로 구현하여 단순 해짐
const filterObserver =
    <A>(pred: (a: A) => boolean) =>
    (subscribe: Observer<A>): Observer<A> => {
        return (a) => {
            if (pred(a)) {
                subscribe(a);
            }
        };
    };

// map :: (A => B) => Array<A> => Array<B>
// mapObserver :: (A => B) => Observer<B> => Observer<A> << observable 의 입력 타입이기 떄문에 출력 타입이 달라짐 (반 공변성)
const mapObserver =
    <A, B>(f: (a: A) => B) =>
    (subscribe: Observer<B>): Observer<A> => {
        return (a) => {
            subscribe(f(a));
        };
    };

// map :: ( A => B) => Observable<A> => Observable<B>
// lift:: (Observer<B> => Observer<A>) => Observable<A> => Observable<B>
const lift =
    <A, B>(f: (b: Observer<B>) => Observer<A>) =>
    (source: Observable<A>): Observable<B> => {
        return (subscribe) => {
            source(f(subscribe));
        };
    };

const liftedMap = pipeFunctions(mapObserver, lift);
const liftfilter = pipeFunctions(filterObserver, lift);

export const observableSelf = () => {
    console.log('hello observable');

    const ObserverFunc = <T>(n: T) => {
        console.log(n);
        console.log(n);
    };
    const evenFilter = filter(isEven);
    const nss = nsObserve(ns);
    const mapObserve = map(integerObservable)((n) => console.log(n));
    pipeFunctions(evenFilter, map)(ObserverFunc);
    filter((a: number) => a % 2 === 0);
};
