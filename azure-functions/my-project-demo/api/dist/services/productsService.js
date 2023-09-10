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
const cosmos_1 = require("@azure/cosmos");
// Set connection string from CONNECTION_STRING value in local.settings.json
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const productService = {
    init() {
        try {
            this.client = new cosmos_1.CosmosClient(CONNECTION_STRING);
            this.database = this.client.database("tailwind");
            this.container = this.database.container("products");
        }
        catch (err) {
            console.log(err.message);
        }
    },
    create(productToCreate) {
        return __awaiter(this, void 0, void 0, function* () {
            const { resource } = yield this.container.items.create(productToCreate);
            return resource;
        });
    },
    read() {
        return __awaiter(this, void 0, void 0, function* () {
            const iterator = this.container.items.readAll();
            const { resources } = yield iterator.fetchAll();
            return JSON.stringify(resources);
        });
    },
    update(product) {
        return __awaiter(this, void 0, void 0, function* () {
            const { resource } = yield this.container.item(product.id, product.brand.name)
                .replace(product);
            return resource;
        });
    },
    delete(id, brandName) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.container.item(id, brandName).delete();
        });
    },
};
productService.init();
exports.default = productService;
//# sourceMappingURL=productsService.js.map