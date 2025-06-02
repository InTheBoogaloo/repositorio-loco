"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const db_1 = __importDefault(require("../config/db"));
jest.mock('../config/db');
describe('connectDB', () => {
    it('debería manejar el error de conexión a la base de datos', async () => {
        jest.spyOn(db_1.default, 'authenticate').mockRejectedValue(new Error('Hubo un error al conectar a la BD'));
        const consoleSpy = jest.spyOn(console, 'log');
        await (0, server_1.connectDB)();
        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Hubo un error al conectar a la BD'));
    });
});
//# sourceMappingURL=server.test.js.map