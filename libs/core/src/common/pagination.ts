import type { PaginationQueryDto } from '@core/core/dto/common.dto';
import type { SelectQueryBuilder } from 'typeorm';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  totalPages: number;
}

export async function paginate<T>(
  qb: SelectQueryBuilder<T>,
  options: PaginationQueryDto
): Promise<PaginatedResult<T>> {
  const { page, size } = options;

  if (options.sort_by) {
    qb.orderBy(options.sort_by, options.order_by);
  }
  const [data, total] = await qb
    .skip((page - 1) * size)
    .take(size)
    .getManyAndCount();

  const totalPages = Math.ceil(total / size);

  return {
    data,
    total,
    totalPages,
  };
}
