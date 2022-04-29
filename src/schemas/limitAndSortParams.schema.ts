import { object, number, string, SchemaOf } from 'yup'

export interface LimitAndSortParams {
  skip?: number,
  take?: number,
  sortBy?: string,
  sortOrder?: string
}

export const limitAndSortParams: SchemaOf<LimitAndSortParams> = object({
  skip: number(),
  take: number(),
  sortBy: string(),
  sortOrder: string()
})
