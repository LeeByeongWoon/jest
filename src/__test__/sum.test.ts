import { sum } from '@/sum';
import { throwErrorTest } from '../throwErrorTest';

test('sum(1, 2) => 3', () => {
    expect(sum(1, 2)).toBe(3);
});

it('object matcher', () => {
    const data: { [index: string]: number } = { one: 1 };
    data['two'] = 2;
    expect(data).toEqual({ one: 1, two: 2 });
});

test('one is truthy', () => {
    const n = 1;
    expect(n).toBeTruthy();
});

test('throws on invalid input', () => {
    // 바로 실핼 하지 않고 jest 에 전달해야 jest가 직접 실행하여 throw를 잡을 수 있음.
    expect(() => throwErrorTest(2)).toThrow();
});

test('valid input', () => {
    const input = '2';
    expect(throwErrorTest(input)).toBe(input);
});
