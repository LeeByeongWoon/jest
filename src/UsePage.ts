import { Credentials } from 'src/Credentials';
import { CredentialToken } from './Token';

const token: Credentials = {
    userId: 'P000001',
    userName: '임현석',
    departmentRole: 'dp',
    departmentCode: 'ngenebiodp',
    departmentUserRole: 'Operator',
    departmentUserRoleCode: 'operator',
    globalUserRole: 'user',
    accessToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQMDAwMDAxIiwidXNlcklkIjoiUDAwMDAwMSIsInVzZXJOYW1lIjoi7J6E7ZiE7ISdIiwiZGVwYXJ0bWVudFJvbGUiOiJkcCIsImdsb2JhbFJvbGVDb2RlcyI6WyJ1c2VyIl0sImRlcGFydG1lbnRVc2VyUm9sZUNvZGVzIjpbIm9wZXJhdG9yIl0sImlhdCI6MTcxMjAzNTM4MiwiZXhwIjoxNzEyMDM1NDEyfQ.Kyu6_DREqu5SrjQyv_L6G-PblrmItb3G5Md8aFqy3hY',
    refreshToken:
        'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJQMDAwMDAxIiwidXNlcklkIjoiUDAwMDAwMSIsInVzZXJOYW1lIjoi7J6E7ZiE7ISdIiwiZGVwYXJ0bWVudFJvbGUiOiJkcCIsImdsb2JhbFJvbGVDb2RlcyI6WyJ1c2VyIl0sImRlcGFydG1lbnRVc2VyUm9sZUNvZGVzIjpbIm9wZXJhdG9yIl0sImlhdCI6MTcxMjAzNTM4MiwiZXhwIjoxNzEyMTIxNzgyfQ.54zMflSkLHX4IANU6ykxsrztbUhwUEmAHwVXkx87QAE',
    signInDateTime: '2024-04-02T14:23:02.203983218',
};
const tt = new CredentialToken(token);
console.log(token instanceof CredentialToken);
