"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMongoDb = exports.updateWord = exports.deleteWord = exports.createWords = exports.deleteCategory = exports.renameCategory = exports.createCategory = exports.getWords = exports.getCategories = void 0;
const mongodb_1 = __importDefault(require("mongodb"));
const MongoClient = mongodb_1.default.MongoClient;
const ObjectID = mongodb_1.default.ObjectID;
let db;
function getCategories(skip, limit, resolve, reject) {
    const categories = db.collection('categories');
    categories.find().skip(skip).limit(limit).toArray(function (err, docs) {
        if (err) {
            console.log(err);
            return reject();
        }
        resolve(docs);
    });
}
exports.getCategories = getCategories;
function getWords(id, skip, limit, resolve, reject) {
    console.log(`skip=${skip}; limit=${limit}`);
    db.collection('categories').findOne({ _id: new ObjectID(id) }, function (err, doc) {
        if (err) {
            console.log(err);
            return reject();
        }
        resolve(doc.words.slice(skip, skip + limit));
    });
}
exports.getWords = getWords;
function createCategory(category, resolve, reject) {
    db.collection('categories').insertOne(category, function (err, result) {
        if (err) {
            console.log(err);
            reject();
            return;
        }
        resolve();
    });
}
exports.createCategory = createCategory;
function renameCategory(name, categoryId, resolve, reject) {
    db.collection('categories').updateOne({ _id: new ObjectID(categoryId) }, { $set: { name: name } }, function (err, result) {
        if (err) {
            console.log(err);
            return reject();
        }
        resolve();
    });
}
exports.renameCategory = renameCategory;
function deleteCategory(id, resolve, reject) {
    db.collection('categories').deleteOne({ _id: new ObjectID(id) }, function (err, result) {
        if (err) {
            return reject();
        }
        resolve();
    });
}
exports.deleteCategory = deleteCategory;
function createWords(word, categoryId, resolve, reject) {
    db.collection('categories').updateOne({ _id: new ObjectID(categoryId) }, { $push: { words: word } }, function (err, result) {
        if (err) {
            console.log(err);
            return reject();
        }
        resolve();
    });
}
exports.createWords = createWords;
function deleteWord(wordId, categoryId, resolve, reject) {
    db.collection('categories').updateOne({ _id: new ObjectID(categoryId) }, { $pull: { words: { "wordId": wordId } } }, function (err, result) {
        if (err) {
            console.log(err);
            return reject();
        }
        resolve();
    });
}
exports.deleteWord = deleteWord;
function updateWord(word, categoryId, resolve, reject) {
    db.collection('categories').updateOne({ _id: new ObjectID(categoryId), "words.wordId": word.wordId }, { $set: { "words.$": word } }, function (err, result) {
        if (err) {
            console.log(err);
            return reject();
        }
        resolve();
    });
}
exports.updateWord = updateWord;
function initMongoDb(onDbStarted) {
    const mongoDbAddress = "mongodb+srv://zena:zena30121986@cluster0.neus5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const mongoClient = new MongoClient(mongoDbAddress, { useUnifiedTopology: true });
    mongoClient.connect(function (err, client) {
        if (err) {
            console.error(err);
            return;
        }
        db = client.db("efk");
        onDbStarted();
    });
}
exports.initMongoDb = initMongoDb;
