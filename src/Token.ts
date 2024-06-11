import { Credentials } from './Credentials';

export class CredentialToken implements Credentials {
    public accessToken: string | undefined;
    public departmentCode: string;
    public departmentRole: string;
    public departmentUserRole: string;
    public departmentUserRoleCode: string;
    public globalUserRole: string;
    public refreshToken: string | undefined;
    public signInDateTime: string;
    public userId: string;
    public userName: string;

    constructor(obj: Credentials) {
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
