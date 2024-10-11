import express, { Request, Response } from "express";
import { formatDate, setTextStyle } from "@utils";

function statusCodeDecorator(
  statusCode: number
): Record<"status" | "emoji", string> {
  let status;
  let emoji;
  if (statusCode >= 500) {
    status = setTextStyle(statusCode, "yellow");
    emoji = "⚠️";
  } else if (statusCode >= 400) {
    status = setTextStyle(statusCode, "red");
    emoji = "❌";
  } else if (statusCode >= 200) {
    status = setTextStyle(statusCode, "green");
    emoji = "✅";
  } else {
    status = setTextStyle(statusCode, "reset");
    emoji = "✅";
  }
  return { status, emoji };
}

const logger = express().use((req: Request, res: Response, next) => {
  const { method, url } = req;
  const timestamp = formatDate(new Date(new Date().toISOString()));

  res.on("finish", () => {
    const statusCode = res.statusCode;
    let { status, emoji } = statusCodeDecorator(statusCode);

    console.log(
      `${emoji}[${timestamp}]:\x1b[1m ${status} ${method} \x1b[0m${url}`
    );
  });

  next();
});

export default logger;
