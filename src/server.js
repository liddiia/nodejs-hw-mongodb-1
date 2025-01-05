import express from "express";
import cors from "cors";

// import { logger } from "./middelwares/logger.js";
import { notFoundHandler } from "./middelwares/notFoundHandler.js";

import { getEnvVar } from "./utils/getEnvVar.js";
import contactsRouter from "./routers/contacts-routers.js";
import { errorHandler } from "./middelwares/errorHandler.js";

export const setupServer =()=>{

    const app = express();

    app.use(cors());
    app.use(express.json()); //відповідає за обробку запиту в форматі json
    // app.use(logger);

app.use("/contacts", contactsRouter);

app.use(notFoundHandler);
    app.use(errorHandler);
const port = Number(getEnvVar("PORT", 3000) );
app.listen(port, ()=>{console.log(`Server is running on port ${port}`);
});
};
