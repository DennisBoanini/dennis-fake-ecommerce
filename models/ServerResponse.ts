export type ServerResponse<T> = {
	result: T | undefined;
	errorMessage: string | undefined;
};
