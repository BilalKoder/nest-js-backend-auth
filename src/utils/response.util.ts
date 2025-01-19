// response.util.ts
export function createResponse<T>(data: T, message: string, status: number) {
    return {
      message,
      status,
      data,
    };
  }
  