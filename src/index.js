import { setupServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoConnection.js";
//06iEtnAQsqVDDMRP
const boostrap = async ()=>{
    //спочатку підключаємось до бази
    await initMongoConnection();
    // потім запускаємо сервер
    setupServer();
};
boostrap();
