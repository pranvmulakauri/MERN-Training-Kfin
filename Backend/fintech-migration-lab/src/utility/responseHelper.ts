import type { Response } from "express";
import type { ApiResponse, ApiSuccess, ApiError } from "../types";

export function sendSuccess<T>(res: Response, data: T, statusCode: number = 200): Response {
  const response: ApiSuccess<T> = { success: true, data };
  return res.status(statusCode).json(response);
}

export function sendError(res: Response, message: string, statusCode: number = 400): Response {
  const response: ApiError = { success: false, message };
  return res.status(statusCode).json(response);
}

export function sendNotFound(res: Response, resource: string): Response {
  return sendError(res, `${resource} not found`, 404);
}
