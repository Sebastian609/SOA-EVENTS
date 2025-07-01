import { PaginatedResult } from '../infrastructure/interfaces/pagination.interface';

export async function getPaginated<T>(
  repo: { getPaginated: (limit: number, offset: number) => Promise<T[]>; count: (filter: object) => Promise<number> },
  page: number,
  itemsPerPage: number
): Promise<PaginatedResult<T>> {
  const offset = page * itemsPerPage;
  const limit = itemsPerPage;

  const [items, totalCount] = await Promise.all([
    repo.getPaginated(limit, offset),
    repo.count({ deleted: false }),
  ]);

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const currentPage = page + 1;

  return {
    data: items,
    pagination: {
      currentPage: currentPage,
      itemsPerPage: itemsPerPage,
      totalItems: totalCount,
      totalPages: totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    },
  };
}