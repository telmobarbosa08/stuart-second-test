import { PrismaClient, Courier } from '@prisma/client'

class CourierService {
  public prisma = new PrismaClient()

  public async get (
    take: number | undefined,
    skip: number | undefined,
    sortBy: string | undefined,
    sortOrder: string | undefined
  ): Promise<Courier[]> {
    const couriers: Courier[] = await this.prisma.courier.findMany({
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      orderBy: sortBy
        ? [
            { [sortBy]: sortOrder || 'asc' }
          ]
        : undefined
    })
    return couriers
  }

  public async getSingle (id: number): Promise<Courier | null> {
    return await this.prisma.courier.findUnique({ where: { id } })
  }

  public async create (attributes: any) {
    const { max_capacity } = attributes
    const newCourier = await this.prisma.courier.create({
      data: {
        max_capacity
      }
    })

    return newCourier
  }

  public async updateCapacity (id: number, difference: number) {
    const newCourier = await this.prisma.courier.update({
      where: {
        id
      },
      data: {
        max_capacity: {
          increment: difference // atomic operation to avoid race conditions
        }
      }
    })

    return newCourier
  }

  public async remove (id: number) {
    const courier = await this.prisma.courier.delete({
      where: {
        id
      }
    })

    return courier
  }

  public async lookupAvailableCouriers (
    capacity_required: number,
    take: number | undefined,
    skip: number | undefined,
    sortBy: string | undefined,
    sortOrder: string | undefined): Promise<Courier[]> {
    const couriers: Courier[] = await this.prisma.courier.findMany({
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      where: { max_capacity: { gte: capacity_required } },
      orderBy: sortBy
        ? [
            { [sortBy]: sortOrder || 'asc' }
          ]
        : undefined
    })
    return couriers
  }
}

export default CourierService
