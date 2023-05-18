export type ErrorHandlers<T extends string> = Record<T, (e: Error) => void>;
