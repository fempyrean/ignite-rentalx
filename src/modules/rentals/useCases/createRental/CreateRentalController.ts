import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { CreateRentalUseCase } from '@modules/rentals/useCases/createRental/CreateRentalUseCase'

class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { car_id, expected_return_date } = req.body
    const { id: user_id } = req.user
    const createRentalUseCase = container.resolve(CreateRentalUseCase)
    const rental = await createRentalUseCase.execute({
      user_id,
      car_id,
      expected_return_date
    })
    return res.status(201).json(rental)
  }
}
export { CreateRentalController }
