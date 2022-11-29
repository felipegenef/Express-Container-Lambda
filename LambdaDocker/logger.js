const {
  createLogger,
  transports,
  format: { combine, timestamp, label, printf, colorize },
} = require("winston");

const logger = createLogger({
  level: "info",
  exitOnError: false,
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
      return `${timestamp} [${service}] method=${httpMethod} status=${status} level=${level} message=${JSON.stringify(
        rest
      )}`;
    })
  ),
  defaultMeta: { service: "Courses" },
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
      filename: "/mnt/efs/logs/courses.log",
    }),
  ],
});

module.exports = logger;
