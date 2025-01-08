const parseNumber = (value, defaultVelue)=>{
if (typeof value !== "string") return defaultVelue;

const parsedNumber = parseInt(value);
if (Number.isNaN(parsedNumber)) return defaultVelue;

return parsedNumber;
};

export const parsePaginationParams =({page, perPage})=>{
const parsePage = parseNumber(page,1);
const parsePerPage = parseNumber(perPage,10);
return{
    page:parsePage,
    perPage:parsePerPage,
};
};
