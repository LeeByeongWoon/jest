"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryFlatMap = exports.keepSuccess = exports.tryMap = exports.getOrElse = exports.isFailed = exports.isSuccess = exports.failed = exports.success = exports.tenDivideByTest = void 0;
var tenDivideByWithThrow = function (n) {
    if (n === 0) {
        // 예외를 발생 시켜도 return 값이 number 임
        throw new Error('0으로 나눌 수 없습니다.');
    }
    return 10 / n;
};
var tenDivideByTest = function () {
    // try 블록 밖으로 코드를 옮길 경우 동작이 달라지므로 순수하지 않음
    try {
        return tenDivideByWithThrow(0);
    }
    catch (e) {
        return 1;
    }
};
exports.tenDivideByTest = tenDivideByTest;
var success = function (result) { return ({
    _tag: 'success',
    result: result,
}); };
exports.success = success;
var failed = function (error) { return ({
    _tag: 'failed',
    error: error,
}); };
exports.failed = failed;
var isSuccess = function (ta) { return ta._tag === 'success'; };
exports.isSuccess = isSuccess;
var isFailed = function (ta) { return ta._tag === 'failed'; };
exports.isFailed = isFailed;
var getOrElse = function (ta, defaultValue) {
    //error 발생 시 기본 값 사용,
    if ((0, exports.isFailed)(ta))
        return defaultValue(ta.error);
    //결과가 성공이면 해당 값 사용.
    return ta.result;
};
exports.getOrElse = getOrElse;
var tryMap = function (ta, f) {
    if ((0, exports.isFailed)(ta))
        return ta;
    return (0, exports.success)(f(ta.result));
};
exports.tryMap = tryMap;
// Array<T.Try<ParseError, ParsedItem>> => Array<ParsedItem>
// 선언적 방식
var keepSuccess = function (tas) {
    return tas.flatMap(function (ta) { return ((0, exports.isSuccess)(ta) ? [ta.result] : []); }); // 가독성은 좀 떨어지나 성능에 이점이 있음.
    // return tas.filter(isSuccess).map((item) => item.result); //가독성이 높으나 배열 두번 순환으로 성능 이슈.
};
exports.keepSuccess = keepSuccess;
//명령적 방식
// eslint-disable-next-line @typescript-eslint/no-unused-vars
var keepSuccessWithFor = function (tas) {
    var arr = [];
    for (var _i = 0, tas_1 = tas; _i < tas_1.length; _i++) {
        var ta = tas_1[_i];
        if ((0, exports.isSuccess)(ta)) {
            arr.push(ta.result);
        }
    }
    return arr;
};
// flat :: Try<E,Try<E, A>> => Try<E, A>
var flat = function (tta) {
    if (tta._tag === 'success')
        return tta.result;
    return tta;
};
var tryFlatMap = function (ta, f) {
    return flat((0, exports.tryMap)(ta, f));
};
exports.tryFlatMap = tryFlatMap;
