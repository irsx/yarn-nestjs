import { ApiProperty } from '@nestjs/swagger';

export class PaginateResponse {
  @ApiProperty({
    example: 1,
    type: Number,
  })
  page?: number | string;

  @ApiProperty({
    example: 10,
    type: Number,
  })
  size?: number | string;

  @ApiProperty({
    example: 1,
    type: Number,
  })
  total_pages?: number | string;

  @ApiProperty({
    example: 10,
    type: Number,
  })
  total_data?: number | string;

  @ApiProperty({
    example: 'created_at',
  })
  sort_by?: string;

  @ApiProperty({
    example: 'DESC',
  })
  order_by?: string;
  [key: string]: any;
}
export class Meta extends PaginateResponse {
  @ApiProperty({
    example: 'Data successfully retrieved/transmitted!',
  })
  message?: string;
  options?: {
    status_code?: number;
    excludeData?: boolean;
  };

  @ApiProperty({
    example: true,
    type: Boolean,
  })
  success?: boolean;

  isNotPaginate?: boolean;
}
export interface CustomResponse<T> {
  data: T;
  paginate?: PaginateResponse;
  message: string;
  status_code: number;
  success: boolean;
}

export class OkResponse<T> implements CustomResponse<T> {
  @ApiProperty()
  data: T;

  @ApiProperty()
  paginate?: PaginateResponse;

  @ApiProperty()
  message: string;

  @ApiProperty()
  status_code: number;

  @ApiProperty()
  success: boolean;

  constructor(
    data: T,
    meta?: Meta,
    options?: {
      status_code?: number;
      excludeData?: boolean;
    }
  ) {
    this.data = data;
    if (Array.isArray(data) && !meta?.isNotPaginate) {
      const total_data = Number(meta?.total_data) || 0;
      const size = Number(meta?.size) || 10;
      const total_pages = Math.ceil(total_data / size);

      this.paginate = {
        page: Number(meta && meta?.page) || 1,
        size: Number(meta && meta.size) || 10,
        total_data: meta?.total_data || 0,
        total_pages,
        sort_by: meta?.sort_by || 'created_at',
        order_by: meta?.order_by || 'DESC',
      };
    }
    this.message = meta?.message || 'Data successfully retrieved/transmitted!';

    this.success = true;

    this.status_code = options?.status_code || 200;

    if (options?.excludeData) {
      delete this.data;
    }
  }
}

export class CreateDataResponse<T> implements CustomResponse<T> {
  @ApiProperty()
  data: T;

  @ApiProperty()
  paginate?: PaginateResponse;

  @ApiProperty()
  message: string;

  @ApiProperty()
  status_code: number;

  @ApiProperty()
  success: boolean;
  constructor(
    data: T,
    meta?: Meta,
    options?: {
      status_code?: number;
      excludeData?: boolean;
    }
  ) {
    this.data = data;
    this.message = meta?.message || 'Data successfully created!';
    this.status_code = options?.status_code || 201;
    this.success = true;

    if (options?.excludeData) {
      delete this.data;
    }
  }
}

export class UpdateDataResponse<T> implements CustomResponse<T> {
  @ApiProperty()
  data: T;

  @ApiProperty()
  paginate?: PaginateResponse;

  @ApiProperty()
  message: string;

  @ApiProperty()
  status_code: number;

  @ApiProperty()
  success: boolean;
  constructor(
    data: T,
    meta?: Meta,
    options?: {
      status_code?: number;
      excludeData?: boolean;
    }
  ) {
    this.data = data;
    this.message = meta?.message || 'Data successfully updated!';
    this.status_code = options?.status_code || 201;
    this.success = true;

    if (options?.excludeData) {
      delete this.data;
    }
  }
}

export class DeleteDataResponse<T> implements CustomResponse<T> {
  @ApiProperty()
  data: T;

  @ApiProperty()
  paginate?: PaginateResponse;

  @ApiProperty()
  message: string;

  @ApiProperty()
  status_code: number;

  @ApiProperty()
  success: boolean;
  constructor(
    data: T,
    meta?: Meta,
    options?: {
      status_code?: number;
      excludeData?: boolean;
    }
  ) {
    this.data = data;
    this.message = meta?.message || 'Data successfully deleted!';
    this.status_code = options?.status_code || 200;
    this.success = true;

    if (options?.excludeData) {
      delete this.data;
    }

    return this;
  }
}
