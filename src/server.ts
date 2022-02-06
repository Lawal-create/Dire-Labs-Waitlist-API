import express from "express";
import { port } from "./config";
import connectToDB from "./databases/connect";
import logger from "./utils/logger";
import waitlistRouter from "./routes/router";
import notFound from "./middlewares/notFound";
import errorHandler from "./middlewares/errorHandler";

const app = express();

connectToDB();
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());

app.use("/api/v1", waitlistRouter);

app.use("*", notFound);

app.use(errorHandler);

const server = app.listen(port, () => {
  logger.info(`
    ###########################################
    Server is currently running at port ${port}
    ###########################################`);
});

export default server;
