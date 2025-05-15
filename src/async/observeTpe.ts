export type Async<A> = (ret: (x: A) => void) => void;

export type Iterator<A> = () => A;

export type Iterable<A> = () => Iterator<A>;

export type Observer<A> = (a: A) => void;

export type Observable<A> = (subscribe: Observer<A>) => void;
