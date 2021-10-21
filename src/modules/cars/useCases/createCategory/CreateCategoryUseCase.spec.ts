import { AppError } from '../../../../errors/AppError';
import CategoriesRepositoryMock from '../../repositories/mocks/CategoriesRepositoryMock';
import CreateCategoryUseCase from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryMock: CategoriesRepositoryMock;

describe('Create category', () => {
  beforeEach(() => {
    categoriesRepositoryMock = new CategoriesRepositoryMock();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryMock);
  });

  it('should be able to create a new category', async () => {
    const createdCategory = await createCategoryUseCase.execute({
      name: 'Category Test',
      description: 'Description Test',
    });

    expect(createdCategory).toHaveProperty('id');
    expect(createdCategory).toEqual(
      expect.objectContaining({
        name: 'Category Test',
        description: 'Description Test',
      })
    );
  });

  it('should not be able to create a new category with an existing name', async () => {
    expect(async () => {
      const category = {
        name: 'Category Test',
        description: 'Description Test',
      };

      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
