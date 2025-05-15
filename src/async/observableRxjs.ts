import { filter, Observable, pipe, take } from 'rxjs';

const isEven = (n: number) => n % 2 === 0;

const integerObservable: Observable<number> = new Observable((subscribe) => {
    let i = 0;
    setInterval(() => {
        i = i + 1;
        subscribe.next(i);
    }, 1000);
});

const ns: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const rxObservable = () => {
    // const xs = ns.filter(isEven).slice(0, 3);
    // const xs = ns.filter(isEven).slice(0, 3);

    // filter:: (A => boolean) => Observable<A> => Observable<A>
    const evenFilter = filter(isEven);
    const take3 = take(3);
    const take3EvenNumbers = pipe(evenFilter, take3);

    take3EvenNumbers(integerObservable).subscribe({
        next: (n) => {
            console.log(n);
        },
    });
};
