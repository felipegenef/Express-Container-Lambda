const {
  createLogger,
  transports,
  format: { combine, timestamp, label, printf, colorize },
} = require("winston");

const logger = createLogger({
  level: "info",
  exitOnError: false,
  defaultMeta: { service: "Books" },
  // levels: {
  //   error: 0,
  //   warn: 1,
  //   info: 2,
  //   colors: {
  //     warn: "yellow",
  //     error: "red",
  //     info: "blue",
  //   },
  // },
  format: combine(
    timestamp(),
    // colorize(),
    printf(({ level, message, timestamp, service }) => {
      const { httpMethod, status, ...rest } = message;
      return `${timestamp} method=${httpMethod}, status=${status} ms=${service}  level=${level} message=${JSON.stringify(
        rest
      )}`;
    })
  ),

  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `warn` or less to `warn.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
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
      filename: "/mnt/efs/logs/books.log",
    }),
  ],
});

module.exports = logger;
