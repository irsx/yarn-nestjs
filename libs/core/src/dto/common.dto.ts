import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class PaginationQueryDto {
  @JoiSchema(Joi.number().required().default(1))
  @ApiProperty({
    type: Number,
    example: 1,
  })
  page: number;

  @JoiSchema(Joi.number().required().default(10))
  @ApiProperty({
    type: Number,
    example: 10,
  })
  size: number;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  @ApiProperty({
    example: '2023-01-02T16:00:00.000Z',
    required: false,
  })
  from_date?: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  @ApiProperty({
    example: '2023-12-31T16:00:00.000Z',
    required: false,
  })
  to_date?: string;

  @JoiSchema(Joi.string().lowercase().optional().allow(null, ''))
  @ApiProperty({
    required: false,
  })
  search?: string;

  @JoiSchema(
    Joi.string().lowercase().optional().allow(null, '').default('created_at')
  )
  @ApiProperty({
    default: 'created_at',
    example: 'created_at',
    required: false,
  })
  sort_by?: string;

  @JoiSchema(
    Joi.string()
      .optional()
      .uppercase()
      .valid('asc', 'desc', 'ASC', 'DESC', null, '')
      .default('DESC')
  )
  @ApiProperty({
    example: 'DESC',
    default: 'DESC',
    required: false,
  })
  order_by?: 'ASC' | 'DESC';
}

export class FileUploadDto {
  @JoiSchema(Joi.string().required())
  @ApiProperty()
  project_name: string;

  @JoiSchema(Joi.string().required())
  @ApiProperty()
  document_number: string;

  @JoiSchema(Joi.string().lowercase().required())
  @ApiProperty()
  document_type: string;

  @JoiSchema(Joi.date().required())
  @ApiProperty()
  date: string;

  @JoiSchema(Joi.string().optional().allow(null, ''))
  @ApiProperty()
  note: string;
}

export class ParamIDDto {
  @JoiSchema(Joi.string().guid().required())
  @ApiProperty()
  id: string;
}
