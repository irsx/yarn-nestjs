export enum ErrorCodeEnum {
  CONFLICT_ERROR = 'CONFLICT_ERROR',
  BAD_REQUEST_ERROR = 'BAD_REQUEST_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  FORBIDDEN_ERROR = 'FORBIDDEN_ERROR',
  UNAUTHORIZED_ERROR = 'UNAUTHORIZED_ERROR',

  // 400 bad request
  INVALID_TOKEN = 'INVALID_TOKEN',
  INVALID_OLD_PASSWORD = 'INVALID_OLD_PASSWORD',

  INVALID_PASSWORD_CONFIRMATION = 'INVALID_PASSWORD_CONFIRMATION',
  EMAIL_NOT_REGISTERED = 'EMAIL_NOT_REGISTERED',
  EMAIL_ALREADY_REGISTERED = 'EMAIL_ALREADY_REGISTERED',
  INVALID_EMAIL_PASSWORD = 'INVALID_EMAIL_PASSWORD',

  // 404 not found
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  ADMIN_NOT_FOUND = 'ADMIN_NOT_FOUND',
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',

  // 400
}

export class MetaError {
  meta: {
    success: boolean;
    errors?: any[];
    message?: string | string[];
    status_code?: number;
    error_code?: ErrorCodeEnum;
    fields?: any;
  };
}

export class CustomError {
  success: boolean;
  errors?: any[];
  message?: string | string[];
  status_code?: number;
  error_code?: ErrorCodeEnum;
  fields?: any;
}

export class BadRequestError extends CustomError {
  success: boolean;
  errors: any[];
  message: string;
  status_code: number;
  error_code: ErrorCodeEnum;
  data: any;
  constructor(message: string, meta?: MetaError['meta'], data: any = null) {
    super();
    this.success = false;
    this.message = message || 'Bad Request';
    this.errors = [message];
    this.status_code = meta?.status_code || 400;
    this.error_code = meta?.error_code || ErrorCodeEnum.BAD_REQUEST_ERROR;
    if (data) {
      this.data = data;
    }
  }
}

export class InternalServerError extends CustomError {
  success: boolean;
  errors: any[];
  message: string;
  status_code: number;
  error_code: ErrorCodeEnum;

  constructor(message?: string, meta?: MetaError['meta']) {
    super();

    this.success = false;
    this.message = message || 'Internal Server Error';
    this.errors = [message];
    this.status_code = meta?.status_code || 500;
    this.error_code = meta?.error_code || ErrorCodeEnum.INTERNAL_SERVER_ERROR;
  }
}

export class NotFoundError extends CustomError {
  success: boolean;
  errors: any[];
  message: string;
  status_code: number;
  error_code: ErrorCodeEnum;

  constructor(message?: string, meta?: MetaError['meta']) {
    super();

    this.success = false;
    this.message = message || 'Document Not Found!';
    this.errors = [message];
    this.status_code = meta?.status_code || 404;
    this.error_code = meta?.error_code || ErrorCodeEnum.NOT_FOUND_ERROR;
  }
}

export class ValidationError extends CustomError {
  success: boolean;
  errors: any[];
  message: string | string[];
  status_code: number;
  error_code: ErrorCodeEnum;
  constructor(message?: string | string[], meta?: MetaError['meta']) {
    super();

    this.status_code = meta?.status_code || 422;
    this.error_code = meta?.error_code || ErrorCodeEnum.VALIDATION_ERROR;
    this.success = false;

    if (Array.isArray(message)) {
      this.message = message[0] || 'Validation error';
      this.errors = message || ['Validation error'];
    } else {
      this.message = message || 'Validation error';
      this.errors = [message || 'Validation error'];
    }
  }
}

export class UnauthorizedError extends CustomError {
  success: boolean;
  errors: any[];
  message: string;
  status_code: number;
  error_code: ErrorCodeEnum;
  constructor(message?: string, meta?: MetaError['meta']) {
    super();

    this.success = false;
    this.message = message || 'Authorization Error';
    this.errors = [message || 'Authorization Error'];
    this.status_code = meta?.status_code || 401;
    this.error_code = meta?.error_code || ErrorCodeEnum.UNAUTHORIZED_ERROR;
  }
}

export class ForbiddenError extends CustomError {
  success: boolean;
  errors: any[];
  message: string;
  status_code: number;
  error_code: ErrorCodeEnum;
  constructor(message?: string, meta?: MetaError['meta']) {
    super();

    this.success = false;
    this.message =
      message ||
      `You don't have permission to access this route / on this server!`;
    (this.errors = [
      message ||
        `You don't have permission to access this route / on this server!`,
    ]),
      (this.status_code = meta?.status_code || 403);
    this.error_code = meta?.error_code || ErrorCodeEnum.FORBIDDEN_ERROR;
  }
}

export class ConflictError extends CustomError {
  success: boolean;
  errors: any[];
  message: string;
  status_code: number;
  error_code: ErrorCodeEnum;
  constructor(message?: string, meta?: MetaError['meta']) {
    super();

    this.success = false;
    this.message =
      message || `Conflict, your data is already exists on our system.`;
    this.errors = [
      message || `Conflict, your data is already exists on our system.`,
    ];
    this.status_code = meta?.status_code || 409;
    this.error_code = meta?.error_code || ErrorCodeEnum.CONFLICT_ERROR;
  }
}
