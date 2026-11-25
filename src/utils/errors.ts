export class AppError extends Error {
  status: number;
  kode: string;

  constructor(status: number, pesan: string, kode: string) {
    super(pesan);
    this.name = "AppError";
    this.status = status;
    this.kode = kode;
  }
}

export function httpError(message: string, status = 400, kode?: string) {
  const defaultCodes: Record<number, string> = {
    400: "BAD_REQUEST",
    401: "UNAUTHORIZED",
    403: "FORBIDDEN",
    404: "NOT_FOUND",
    409: "CONFLICT",
    422: "VALIDATION_ERROR",
    500: "INTERNAL_SERVER_ERROR",
  };
  return new AppError(status, message, kode || defaultCodes[status] || "ERROR");
}
