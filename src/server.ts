import express from "express";
import log from "./logger";

import connect from "./db/connect";
import routes from "./routes";
import config from "./config/default";

const port = config.get("port") as number;
const host = config.get("host") as string;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    log.info(`Server is listening at http://${host}:${port}`);
    connect();
    routes(app);
})
