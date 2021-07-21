import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import RequestType, { CategoryType } from './serverTypes';
import auth, { getAccessToken } from './auth';
import {
  createCategory,
  createWords,
  deleteCategory,
  deleteWord,
  getCategories,
  getWords,
  initMongoDb,
  renameCategory,
  updateWord,
} from './database';

const app = express();
const PORT = process.env.PORT || 3012;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const logins = [
  {
    login: 'Admin',
    password: 'Admin',
  },
  {
    login: 'admin',
    password: 'admin',
  },
];

app.get('/categories', (req: RequestType, res) => {
  const skip = +req.query.skip;
  const limit = +req.query.limit;
  getCategories(
    skip,
    limit,
    (docs) =>
      res.send(
        docs.map((el: CategoryType) => {
          return { ...el, id: el['_id'] };
        }),
      ),
    () => res.sendStatus(500),
  );
});

app.get('/words/:id', (req: RequestType, res) => {
  const skip = +req.query.skip;
  const limit = +req.query.limit;
  getWords(
    req.params.id,
    skip,
    limit,
    (doc) => res.send(doc),
    () => res.sendStatus(500),
  );
});

app.post('/categories', auth, (req, res) => {
  const category = {
    name: req.body.name,
    words: [],
  };
  createCategory(
    category,
    () => res.send(category),
    () => res.sendStatus(500),
  );
});

app.put('/categories/:id', auth, (req, res) => {
  renameCategory(
    req.body.name,
    req.params.id,
    () => res.sendStatus(200),
    () => res.sendStatus(500),
  );
});

app.delete('/categories/:id', auth, (req, res) => {
  deleteCategory(
    req.params.id,
    () => res.sendStatus(200),
    () => res.sendStatus(500),
  );
});

app.post('/login', (req, res) => {
  const userLogin = req.body.login;
  const userPassword = req.body.password;

  const user = logins.find(
    (login) => login.login === userLogin && login.password === userPassword,
  );
  if (user) {
    const accessToken = getAccessToken(userLogin);
    res.json({
      accessToken,
    });
    return;
  }
  res.sendStatus(403);
});

/* WORDS */
app.post('/words', auth, (req, res) => {
  const word = {
    wordId: `${Date.now()}`,
    english: req.body.english,
    russian: req.body.russian,
    audioSrc: req.body.audioSrc,
    imageSrc: req.body.imageSrc,
  };
  createWords(
    word,
    req.body.id,
    () => res.sendStatus(200),
    () => res.sendStatus(500),
  );
});

app.delete('/words', auth, (req, res) => {
  const { wordId } = req.body;
  const { categoryId } = req.body;
  deleteWord(
    wordId,
    categoryId,
    () => res.sendStatus(200),
    () => res.sendStatus(500),
  );
});

app.put('/words', auth, (req, res) => {
  const { word } = req.body;
  const { categoryId } = req.body;
  updateWord(
    word,
    categoryId,
    () => res.sendStatus(200),
    () => res.sendStatus(500),
  );
});

initMongoDb(() => {
  app.listen(PORT, () => {});
});
