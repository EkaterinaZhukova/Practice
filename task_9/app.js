const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
const posts = require("./server/module.js");
const jsonFile = "server/data/posts.json";

function parseDate(key, value) {
  if (key === 'createdAt' && typeof value === 'string') {
    return new Date(value);
  }
  return value;
}

app.use(bodyParser.json({limit: '50mb', reviver: parseDate}));
app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(bodyParser.json());
app.use(express.static('./task3_Clover'));
app.get('/', function(req, res) {
  res.sendfile('./task3_Clover/example.html');
});

app.get('/getPhotoPost/', (req, res) => {
  const post = posts.getPhotoPost(req.query.id);
  if (post) {
    res.send(post);
    res.statusCode = 200;

  }
  else {
    res.status(404).end("There isn't such post!");
  }
});

function randomInteger(min, max) { // надо убрать
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

app.post('/addPhotoPost', (req, res) => {
  let newPost = req.body;
  newPost.createdAt = new Date();
  newPost.id = randomInteger(20, 10000).toString(); // это нужно убрать и присвоить уникальный id
  const post = posts.addPhotoPost(newPost);
  if (post) {
    res.status(200).end('Post ' + req.body.id + ' is added successfully');
  }
  else {
    res.status(404).end("Can\'t add post\n" + req.body);
  }
});

app.post('/getPhotoPosts', (req, res) => {
  const photoPosts = posts.getPhotoPosts(req.param);
  let allPosts = JSON.parse(fs.readFileSync(jsonFile));
  let postsFilt;
  let filterConfig = req.body;

  if ("author" in filterConfig || "createdAt" in filterConfig
    || "hashtags" in filterConfig) {
    postsFilt = posts.getPhotoPosts(req.query.skip, req.query.top, filterConfig);
  }
  else {
    postsFilt = posts.getPhotoPosts(req.query.skip, req.query.top);
  }

  if (postsFilt) {
    res.statusCode = 200;
    res.send(postsFilt);
  }
  else {
    res.status(400).end();
  }
});

app.put('/editPhotoPost/', (req, res) => {
  const post = posts.editPhotoPost(req.query.id, req.body);
  if (post) {
    res.status(200).end('Post ' + req.params.id + ' is edited')
  }
  else {
    res.status(404).end('Can\'t edit post');
  }
});

app.delete('/removePhotoPost/', (req, res) => {
  const post = posts.removePhotoPost(req.query.id);
  if (post) {
    res.status(200).end("Post is deleted")
  }
  else {
    res.status(404).end();
  }
});

app.listen(3000, () => {
  console.log('Server is running...');
});
