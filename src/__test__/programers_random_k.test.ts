function solution(arr: number[], k: number) {
    const set = new Set(arr);
    return set.size < k ? [...set, ...Array(k - set.size).fill(-1)] : [...set].slice(0, k);
}
let startTime: number;

function solution2(arr: number[], k: number) {
    return arr.reduce((acc: number[], curr, idx) => {
        if (!acc.length) {
            acc = Array(k).fill(-1);
            acc[0] = curr;
            return acc;
        }
        if (acc.includes(curr)) return acc;
        const emptySpace = acc.indexOf(-1);
        if (emptySpace === -1) return acc;
        acc[emptySpace] = curr;
        return acc;
    }, []);
}
beforeEach(() => {
    startTime = performance.now(); // 각 테스트 시작 시간 기록
});
Array(10).length;

afterEach(() => {
    const endTime = performance.now(); // 각 테스트 종료 시간 기록
    console.log(`Test case execution time: ${(endTime - startTime).toFixed(2)}ms`);
});

test('aa - Test Case 1', () => {
    const params1 = {
        arr: [0, 1, 1, 2, 2, 3],
        k: 3,
    };
    expect(solution(params1.arr, params1.k)).toEqual([0, 1, 2]);
});

test('aa - Test Case 1-2', () => {
    const params1 = {
        arr: [0, 1, 1, 2, 2, 3],
        k: 3,
    };
    expect(solution2(params1.arr, params1.k)).toEqual([0, 1, 2]);
});

test('aa - Test Case 2', () => {
    const params2 = {
        arr: [0, 1, 1, 1, 1],
        k: 4,
    };
    expect(solution(params2.arr, params2.k)).toEqual([0, 1, -1, -1]);
});

test('aa - Test Case 2-2', () => {
    const params2 = {
        arr: [0, 1, 1, 1, 1],
        k: 4,
    };
    expect(solution2(params2.arr, params2.k)).toEqual([0, 1, -1, -1]);
});
