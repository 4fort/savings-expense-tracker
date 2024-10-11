import express, { Express, Request, Response } from "express";
import cors from "cors";

import logger from "@middlewares/logger";
import { setTextStyle } from "@lib/utils";

const app: Express = express();
const port = 3002;

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

(async () => {
  try {
    app.listen(port, () => {
      console.log(
        `⚡[server]: Server is running at ${setTextStyle(
          setTextStyle(`http://localhost:${port}`, "blue"),
          "bold"
        )}`
      );
    });
  } catch (error: any) {
    console.error("❌[server]: Could not start server:", error.message);
  }
})();
