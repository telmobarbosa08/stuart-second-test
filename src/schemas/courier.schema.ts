import { object, number } from 'yup'
import { limitAndSortParams } from '@schemas/limitAndSortParams.schema'

const payload = {
  body: object({
    max_capacity: number().required().positive()
  })
}

const params = {
  params: object({
    id: number().required().min(1)
  })
}

export const getCouriersSchema = object({
  params: limitAndSortParams
})

export const createCourierSchema = object({
  ...payload
})

export const updateCourierSchema = object({
  ...payload,
  ...params
})

export const deleteCourierSchema = object({
  ...params
})

export const getCourierSchema = object({
  ...params
})

export const updateCapacitySchema = object({
  ...params
})
