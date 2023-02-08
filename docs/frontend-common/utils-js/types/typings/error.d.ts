import { Detail } from "./UA";
export interface ErrorConfig {
    code?: string | number | unknown;
    message?: string | unknown;
    source?: "request" | "response";
    UA?: Detail;
    raw?: Record<string, unknown>;
}
