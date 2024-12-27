import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";

export const initMongoConnection = async () => {
 try{
  const user = getEnvVar("MONGO_USER");
  const password = getEnvVar("MONGO_PASSWORD");
  const url = getEnvVar("MONGO_URL");
  const db = getEnvVar("MONGO_DB");

   //між останнім / і першим ? ввставляємо назву бази до якої підключаємося: /my-contacts?
    await   mongoose.connect(`mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`);
 console.log("Mongo conection succesfully");
   }
 catch(error)
 {
   console.log(`error conection Mongo ${error.message}`);
   throw error;
}
};
