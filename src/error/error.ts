import axios, { AxiosError } from 'axios';

type ErrorName = 'GET_PROJECT_ERROR' | 'CREATE_PROJECT_ERROR' | 'PROJECT_LIMIT_REACHED;';

interface ErrorParam<T extends string> {
    name: T;
    message: string;
    cause: unknown;
}

export class ProjectError<T extends string> extends Error {
    name: T;
    message: string;
    cause: unknown;

    constructor({ name, message, cause }: ErrorParam<T>) {
        super();
        this.name = name;
        this.message = message;
        this.cause = cause;
    }
}

export async function createProject() {
    try {
        const response = await axios.get('http://localhost:9090/notes');
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error();
        }

        throw new ProjectError<ErrorName>({
            name: 'CREATE_PROJECT_ERROR',
            message: 'API ERROR occurred while creating project',
            cause: error,
        });
    }
}
