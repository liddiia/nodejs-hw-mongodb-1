export const calcPaginationData = ({totalItems, page, perPage}) => {
 const totalPages = Math.ceil(totalItems/ perPage);
 const hasNextPage = page < totalPages;
 const hasPreviousPage = page > 1;
  return {
    //дані можна вивести тут як ...ginationData, зараз виводяться в контроллері
    // page,
    // perPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
