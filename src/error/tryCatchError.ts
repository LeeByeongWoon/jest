const f = (str: string) => {
    if (str === '') {
        throw new Error('빈 문자열은 입력 할 수 없습니다.');
    }
    return str.length * 2;
};

const g = (n: number) => {
    if (n === 6) {
        throw new Error('6은 입력할 수 없습니다.');
    }
    return n + 1;
};

const h = (x: number) => {
    if (x === 5) {
        throw new Error('5는 입력할 수 없습니다.');
    }
    return x % 3 === 0;
};

const handleError = (e: unknown) => {
    console.log('handleError: ' + e);
};

const program = (b: boolean) => {
    console.log(b);
};

const greeting = (name: string) => {
    console.log('hello ' + name);
};

// 이전 결과에 의존하게 됨
// 예외처리가 발생 시 뒷코드 진행 불가
const main = () => {
    try {
        const a = 'ABC';
        const b = f(a);
        let c;
        try {
            c = g(b);
        } catch (e) {
            c = 3;
        }
        const d = h(c);
        program(d);
    } catch (e) {
        handleError(e);
    }

    greeting('world');
    console.log('프로그램이 종료 되었습니다.');
    console.log('aa');
};

main();
