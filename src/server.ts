import express from "express";
import { port } from "./config";
import connectToDB from "./databases/connect";
import logger from "./utils/logger";
import waitlistRouter from "./routes/router";

const app = express();

connectToDB();
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());

app.use("/api/v1", waitlistRouter);

const server = app.listen(port, () => {
  logger.info(`
    ###########################################
    Server is currently running at port ${port}
    ###########################################`);
});

export default server;
