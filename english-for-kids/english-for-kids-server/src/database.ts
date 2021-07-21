import mongoDB, { Db, MongoClient, MongoError } from 'mongodb';
import { CategoryType, WordType } from './serverTypes';

const { ObjectID } = mongoDB;
let db: Db;

export function getCategories(
  skip: number,
  limit: number,
  resolve: (docs: CategoryType[]) => void,
  reject: () => void,
): void {
  const categories = db.collection('categories');
  categories
    .find()
    .skip(skip)
    .limit(limit)
    .toArray((err, docs: CategoryType[]) => {
      if (err) {
        reject();
      } else {
        resolve(docs);
      }
    });
}

export function getWords(
  id: string,
  skip: number,
  limit: number,
  resolve: (doc: WordType[]) => void,
  reject: () => void,
): void {
  db.collection('categories').findOne(
    { _id: new ObjectID(id) },
    (err: MongoError, doc: CategoryType) => {
      if (err) {
        reject();
      } else {
        resolve(doc.words.slice(skip, skip + limit));
      }
    },
  );
}

export function createCategory(
  category: { name: string; words: WordType[] },
  resolve: () => void,
  reject: () => void,
): void {
  db.collection('categories').insertOne(category, (err: MongoError) => {
    if (err) {
      reject();
      return;
    }
    resolve();
  });
}

export function renameCategory(
  name: string,
  categoryId: string,
  resolve: () => void,
  reject: () => void,
): void {
  db.collection('categories').updateOne(
    { _id: new ObjectID(categoryId) },
    { $set: { name } },
    (err: MongoError) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    },
  );
}

export function deleteCategory(
  id: string,
  resolve: () => void,
  reject: () => void,
): void {
  db.collection('categories').deleteOne(
    { _id: new ObjectID(id) },
    (err: MongoError) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    },
  );
}
/* WORDS */
export function createWords(
  word: WordType,
  categoryId: string,
  resolve: () => void,
  reject: () => void,
): void {
  db.collection('categories').updateOne(
    { _id: new ObjectID(categoryId) },
    { $push: { words: word } },
    (err: MongoError) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    },
  );
}

export function deleteWord(
  wordId: string,
  categoryId: string,
  resolve: () => void,
  reject: () => void,
): void {
  db.collection('categories').updateOne(
    { _id: new ObjectID(categoryId) },
    { $pull: { words: { wordId } } },
    (err: MongoError) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    },
  );
}

export function updateWord(
  word: WordType,
  categoryId: string,
  resolve: () => void,
  reject: () => void,
): void {
  db.collection('categories').updateOne(
    { _id: new ObjectID(categoryId), 'words.wordId': word.wordId },
    { $set: { 'words.$': word } },
    (err: MongoError) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    },
  );
}

export function initMongoDb(onDbStarted: () => void): void {
  const mongoDbAddress =
    'mongodb+srv://zena:zena30121986@cluster0.neus5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
  const mongoClient = new MongoClient(mongoDbAddress, {
    useUnifiedTopology: true,
  });
  mongoClient.connect((err: MongoError, client: MongoClient) => {
    if (err) {
      return;
    }
    db = client.db('efk');
    onDbStarted();
  });
}
