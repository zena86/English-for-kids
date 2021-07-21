"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importStar(require("./auth"));
const database_1 = require("./database");
const app888888888888 = express_1.default();
const PORT = process.env.PORT || 3012;
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
let logins = [
    {
        login: '1',
        password: '1',
    },
    {
        login: 'Admin',
        password: 'Admin',
    },
    {
        login: 'admin',
        password: 'admin',
    },
];
app.get('/categories', function (req, res) {
    const skip = +req.query.skip;
    const limit = +req.query.limit;
    database_1.getCategories(skip, limit, (docs) => res.send(addIdsToArray(docs)), () => res.sendStatus(500));
});
function addIdsToArray(docs) {
    return docs.map((el) => {
        return { ...el, id: el._id };
    });
}
app.get('/words/:id', function (req, res) {
    const skip = +req.query.skip;
    const limit = +req.query.limit;
    database_1.getWords(req.params.id, skip, limit, (doc) => res.send(doc), () => res.sendStatus(500));
});
app.post('/categories', auth_1.default, function (req, res) {
    const category = {
        name: req.body.name,
        words: [],
    };
    database_1.createCategory(category, () => res.send(category), () => res.sendStatus(500));
});
app.put('/categories/:id', auth_1.default, function (req, res) {
    database_1.renameCategory(req.body.name, req.params.id, () => res.sendStatus(200), () => res.sendStatus(500));
});
app.delete('/categories/:id', auth_1.default, function (req, res) {
    database_1.deleteCategory(req.params.id, () => res.sendStatus(200), () => res.sendStatus(500));
});
app.post('/login', function (req, res) {
    const userLogin = req.body.login;
    const userPassword = req.body.password;
    const user = logins.find((login) => login.login === userLogin && login.password === userPassword);
    if (user) {
        const accessToken = auth_1.getAccessToken(userLogin);
        res.json({
            accessToken
        });
        return;
    }
    res.sendStatus(403);
});
app.post('/words', auth_1.default, function (req, res) {
    const word = {
        wordId: `${Date.now()}`,
        english: req.body.english,
        russian: req.body.russian,
        audioSrc: req.body.audioSrc,
        imageSrc: req.body.imageSrc
    };
    database_1.createWords(word, req.body.id, () => res.sendStatus(200), () => res.sendStatus(500));
});
app.delete('/words', auth_1.default, function (req, res) {
    const wordId = req.body.wordId;
    const categoryId = req.body.categoryId;
    database_1.deleteWord(wordId, categoryId, () => res.sendStatus(200), () => res.sendStatus(500));
});
app.put('/words', auth_1.default, function (req, res) {
    const word = req.body.word;
    const categoryId = req.body.categoryId;
    database_1.updateWord(word, categoryId, () => res.sendStatus(200), () => res.sendStatus(500));
});
database_1.initMongoDb(() => {
    app.listen(PORT, function () {
        console.log('API app started');
    });
});
