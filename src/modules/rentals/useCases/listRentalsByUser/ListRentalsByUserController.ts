import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase'

class ListRentalsByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user
    const listRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase)
    const rentals = await listRentalsByUserUseCase.execute({ user_id })
    return res.status(200).json(rentals)
  }
}
export { ListRentalsByUserController }
