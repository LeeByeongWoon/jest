import { action, executeAfterDelay, fetchMock } from 'src/fetch';

describe('fetch', () => {
    let writeSpy: jest.SpyInstance;

    beforeAll(() => {
        // 터미널 에 쓰기 작업을 발생시키는 process.stdout.write mock function 으로 대체
        writeSpy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
    });

    afterAll(() => {
        // 대체 된 spy 함수 원상 복구
        writeSpy.mockRestore();
    });

    test('fetch peanut butter', (done) => {
        const callback = (data: string) => {
            try {
                expect(data).toBe('peanut butter');
                done();
            } catch (error) {
                done(error);
            }
            return data;
        };
        fetchMock(callback);
    });

    test('fetch error occur', () => {
        expect(async () => await executeAfterDelay(action)(1)).rejects.toMatch("Param can't be number");
    });

    test('fetch success', async () => {
        expect(await executeAfterDelay(action)('hello')).toBeTruthy();
    }, 30000);
});
