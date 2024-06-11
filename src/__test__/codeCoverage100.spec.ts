import { codeCoverage100 } from '../codeCoverage100';
import 'node:test';

const expectObj = {
    a: { b: 'inner' },
};
describe('codeCoverage100', () => {
    test.skip('condition1과 condition2 가 모두 true 이면 obj1.a.b 를 리턴', () => {
        expect(codeCoverage100(true, true)).toStrictEqual(expectObj);
    });
    test.only('condi1 은 false고 cond2가 true면 undefined에 접근해서 에러가 생김.', () => {
        expect(() => codeCoverage100(false, true)).toThrow(TypeError);
    });
});
