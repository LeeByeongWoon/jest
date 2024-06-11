export interface Credentials {
    userId: string;
    userName: string;
    departmentRole: string;
    departmentCode: string;
    departmentUserRole: string;
    departmentUserRoleCode: string;
    globalUserRole: string;
    signInDateTime: string;
    accessToken?: string;
    refreshToken?: string;
}
