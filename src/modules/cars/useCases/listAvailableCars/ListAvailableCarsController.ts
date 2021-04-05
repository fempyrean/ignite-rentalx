import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'
import { ICarsFilters } from '@modules/cars/repositories/ICarsRepository'

class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { category_id, brand, name }: ICarsFilters = req.query
    const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase)
    const availableCars = await listAvailableCarsUseCase.execute({
      category_id,
      brand,
      name
    })
    return res.status(200).json({ cars: availableCars })
  }
}
export { ListAvailableCarsController }
