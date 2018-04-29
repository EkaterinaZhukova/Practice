const express = require('express');
const app = express();
const fs = require("fs");
const bodyParser = require('body-parser');
const posts = require("./server/module.js");
const jsonFile = "server/data/posts.json";

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/getPhotoPost/:id', (req, res) => {
    const post=posts.getPhotoPost(req.params.id);
    if(post){
        res.send(post);
        res.statusCode=200;

    }
    else{
        res.status(404).end("There isn't such post!");
    }
});

app.post('/addPhotoPost', (req, res) => {
    let newPost=req.body;
    newPost.createdAt=new Date();
    const post = posts.addPhotoPost(newPost);
    if(post){
        res.status(200).end('Post '+req.body.id+' is added successfully');
    }
    else{
        res.status(404).end("Can\'t add post\n"+req.body);
    }
});

app.post('/getPhotoPosts', (req, res) => {
    const photoPosts=posts.getPhotoPosts(req.param)
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

app.put('/editPhotoPost/:id', (req, res) => {
    const post=posts.editPhotoPost(req.params.id,req.body);
    if(post){
        res.status(200).end('Post '+req.params.id+' is edited')
    }
    else{
        res.status(404).end('Can\'t edit post');
    }
});

app.delete('/removePhotoPost/:id', (req, res) => {
    const post = posts.removePhotoPost(req.params.id);
    if(post){
        res.status(200).end("Post is deleted")
    }
    else{
        res.status(404).end();
    }
});

app.use((req, res) => {
    res.sendFile('error.html', { root: 'public' });
});

app.listen(3000, () => console.log("Server is working!"));
