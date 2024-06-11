import * as T from '../KnowledgeBase/errorHandling/error1';

const f = (str: string): T.Try<string, number> => {
    if (str === '') {
        return T.failed('빈 문자열은 입력할 수 없습니다.');
    }
    return T.success(str.length * 2);
};

const g = (n: number): T.Try<string, number> => {
    if (n === 6) {
        return T.failed('6은 입력할 수 없습니다.');
    }
    return T.success(n + 1);
};

const h = (x: number): T.Try<string, boolean> => {
    if (x === 5) {
        T.failed('5는 입력 할 수 없습니다.');
    }
    return T.success(x % 3 === 0);
};
const handleError = (e: unknown) => {
    console.log('handleError:' + e);
};

const greeting = (name: string) => {
    console.log('hello' + name);
};

const program = (b: boolean) => {
    console.log(b);
};

const main = () => {
    const a = 'ABC';
    const b = f(a);
    const c = T.tryFlatMap(b, (b_) => T.success(T.getOrElse(g(b_), () => 3)));
    const d = T.tryFlatMap(c, h);
    const result = T.tryMap(d, program);
    T.getOrElse(result, handleError);

    greeting('world');
    console.log('프로그램이 종료 되었습니다.');
};

main();
