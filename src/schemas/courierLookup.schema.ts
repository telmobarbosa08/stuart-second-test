import { object, number, SchemaOf } from 'yup'
import { limitAndSortParams } from '@schemas/limitAndSortParams.schema'

export interface CourierLookupBody {
  capacity_required: number
}

export const lookupCourierInputBody: SchemaOf<CourierLookupBody> = object({
  capacity_required: number().required().positive()
})

export const lookupCourierInput = object({
  params: limitAndSortParams,
  body: lookupCourierInputBody
})
