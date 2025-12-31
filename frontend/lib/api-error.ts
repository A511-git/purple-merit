import axios from "axios";

export type NormalizedApiError = {
    message: string;
    fieldErrors?: Record<string, string[]>;
};

export function normalizeApiError(
    error: unknown,
    fallback = "Something went wrong"
): NormalizedApiError {
    if (!axios.isAxiosError(error)) {
        return { message: fallback };
    }

    const backendError = error.response?.data?.error;

    if (!backendError) {
        return { message: fallback };
    }

    if (
        backendError.name === "UNAUTHORIZED" ||
        error.response?.status === 401
    ) {
        return {
            message: backendError.message || "Invalid credentials",
        };
    }

    if (
        backendError.name === "VALIDATION_ERROR" &&
        backendError.stack &&
        typeof backendError.stack === "object"
    ) {
        return {
            message: "Please fix the highlighted errors",
            fieldErrors: backendError.stack,
        };
    }

    if (backendError.message) {
        return { message: backendError.message };
    }

    return { message: fallback };
}
