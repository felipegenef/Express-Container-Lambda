import { createLogger, transports, format } from "winston";
const { combine, timestamp, label, printf, colorize, json } = format;
const logger = createLogger({
  level: "info",
  exitOnError: false,
  defaultMeta: { service: "Courses" },
  format: json(),
  // format: combine(
  //   timestamp(),
  //   // colorize(),
  //   printf(({ level, message, timestamp, service }) => {
  //     const { httpMethod, status, ...rest } = message;
  //     return `${timestamp} method=${httpMethod}, status=${status} ms=${service}  level=${level} message=${JSON.stringify(
  //       rest
  //     )}`;
  //   })
  // ),

  transports: [
    new transports.Console(),
    new transports.File({
      filename: "/mnt/efs/logs/error.log",
      level: "error",
    }),
    new transports.File({
      filename: "/mnt/efs/logs/warn.log",
      level: "warn",
    }),
    new transports.File({
      filename: "/mnt/efs/logs/courses.log",
    }),
  ],
});

export default logger;
