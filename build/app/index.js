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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initServer = void 0;
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
function initServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const typeDefs = `

  type Query {
    books: String,
    say: String
  }`;
        const resolvers = {
            Query: {
                books: () => 'bingo',
                say: () => 'hello'
            },
        };
        const graphqlServer = new server_1.ApolloServer({
            typeDefs,
            resolvers,
        });
        // Note you must call `start()` on the `ApolloServer`
        // instance before passing the instance to `expressMiddleware`
        yield graphqlServer.start();
        // Specify the path where we'd like to mount our server
        //highlight-start
        app.use('/graphql', express_1.default.json(), (0, express4_1.expressMiddleware)(graphqlServer));
        //highlight-end
        return app;
    });
}
exports.initServer = initServer;
