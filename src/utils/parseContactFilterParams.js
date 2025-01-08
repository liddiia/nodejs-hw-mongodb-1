import { contactTypeList } from "../constants/contacts.js";

const parseContactType = (type) => {

    if (typeof type !== "string") return;
    const parsedType = (type) => contactTypeList.includes(type);
    if (parsedType(type)) return type;
    if (!parsedType(type)) return;
  };

  // const parseContactFavourite = (isFavourite) => {

  //  if (typeof isFavourite !== "boolean" ) return;
  //  return isFavourite;
  // };


export const parseContactFilterParams = ({type, isFavourite}) => {

   const parsedContactType = parseContactType(type);
   const parsedFav = isFavourite;
    return {
        type: parsedContactType,
      isFavourite: parsedFav,
          };
};

// console.log(parseContactFilterParams());
