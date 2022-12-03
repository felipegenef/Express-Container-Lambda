"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const logger_1 = __importDefault(require("../logger"));
let db;
async function createCache() {
    if (!db) {
        logger_1.default.info({ level: "info", message: "New Connection Created" });
        db = await data_source_1.AppDataSource.initialize();
        return db;
    }
    logger_1.default.info({ level: "info", message: "Using existing connection" });
    return db;
}
exports.default = createCache;
//# sourceMappingURL=db.js.map