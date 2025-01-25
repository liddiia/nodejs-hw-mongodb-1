import { setupServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoConnection.js";
import createDirIfNotExist from "./utils/createDirIfNotExist.js";
import { TEMP_UPLOAD_DIR, UPLOADS_DIR } from "./constants/index.js";

const boostrap = async ()=>{
    // чи є папки для збереження файлів і якщо немає, то створюємо
    await createDirIfNotExist(TEMP_UPLOAD_DIR);
    await createDirIfNotExist(UPLOADS_DIR);
    //спочатку підключаємось до бази
    await initMongoConnection();
    // потім запускаємо сервер
    setupServer();
};
boostrap();


