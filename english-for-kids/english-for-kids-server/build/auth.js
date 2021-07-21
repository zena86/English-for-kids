"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const accessTokenSecret = 'catdogelephant';
function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                res.sendStatus(403);
                return;
            }
            next();
        });
    }
    else {
        res.sendStatus(403);
    }
}
exports.default = auth;
function getAccessToken(userLogin) {
    return jsonwebtoken_1.default.sign({ username: userLogin, role: 'admin' }, accessTokenSecret);
}
exports.getAccessToken = getAccessToken;
