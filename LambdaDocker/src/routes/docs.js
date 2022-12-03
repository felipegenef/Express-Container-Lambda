"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const swaggerJsDocs = require("swagger-jsdoc");
const express_1 = require("express");
const swaggerUi = __importStar(require("swagger-ui-express"));
const router = (0, express_1.Router)();
const docs = swaggerJsDocs({
    swaggerDefinition: {
        info: {
            title: "Micro serviço de Cursos",
            version: "1.0.0",
        },
    },
    apis: ["./routes/*.ts", "./routes/*.js"],
});
router.get("/", (req, res, next) => {
    console.log("auth here");
    next();
}, swaggerUi.setup(docs));
exports.default = router;
//# sourceMappingURL=docs.js.map