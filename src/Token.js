"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialToken = void 0;
class CredentialToken {
    constructor(obj) {
        this.accessToken = obj.accessToken;
        this.departmentCode = obj.departmentCode;
        this.departmentRole = obj.departmentRole;
        this.departmentUserRole = obj.departmentUserRole;
        this.departmentUserRoleCode = obj.departmentUserRoleCode;
        this.globalUserRole = obj.globalUserRole;
        this.refreshToken = obj.refreshToken;
        this.signInDateTime = obj.signInDateTime;
        this.userId = obj.userId;
        this.userName = obj.userName;
    }
}
exports.CredentialToken = CredentialToken;
