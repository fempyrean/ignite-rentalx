import { Request, Response } from 'express'
import { ListCategoriesUseCase } from './ListCategoriesUseCase'
import { container } from 'tsyringe'

class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoryUseCase = container.resolve(ListCategoriesUseCase)
    const categoryList = await listCategoryUseCase.execute()
    return res.status(200).json(categoryList)
  }
}

export { ListCategoriesController }
