"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const productsService_1 = require("../services/productsService");
const httpTrigger = function (context, req) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        try {
            let products = yield productsService_1.default.read();
            response = { body: products, status: 200 };
        }
        catch (err) {
            response = { body: err.message, status: 500 };
        }
        context.res = response;
    });
};
exports.default = httpTrigger;
//# sourceMappingURL=index.js.map