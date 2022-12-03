"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { combine, timestamp, label, printf, colorize, json } = winston_1.format;
const logger = (0, winston_1.createLogger)({
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
        new winston_1.transports.Console(),
        new winston_1.transports.File({
            filename: "../mnt/efs/logs/error.log",
            level: "error",
        }),
        new winston_1.transports.File({
            filename: "../mnt/efs/logs/warn.log",
            level: "warn",
        }),
        new winston_1.transports.File({
            filename: "../mnt/efs/logs/courses.log",
        }),
    ],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map