let my_functions = (function () {
        let photoPostsAll = [
            {
                id: '1',
                description: 'There should be some text',
                createdAt: new Date('2018-01-21T20:00:00'),
                author: 'Ekaterina Zhukova',
                hashtags: '#beauty#smile',
                photoLink: 'photos/forest.jpg',
                likes: ['Rubeus Hagrid', 'Helga Hufflepuff ']
            },
            {
                id: '2',
                description: 'There should be some text',
                createdAt: new Date('2018-02-01T11:10:00'),
                author: 'Ronald Weasley',
                hashtags: '#myway',
                photoLink: ' photos/way.jpg',
                likes: ['Igor Karkaroff']
            },
            {
                id: '3',
                description: 'There should be some text',
                createdAt: new Date('2018-02-03T19:15:00'),
                author: 'Ekaterina Zhukova',
                hashtags: '#rail#way#beauty#smile',
                photoLink: 'photos/rail.jpg',
                likes: ['Bellatrix Lestrange', 'Parvati Patil']
            },
            {
                id: '4',
                description: 'There should be some text',
                createdAt: new Date('2018-02-12T12:09:00'),
                author: 'Ekaterina Zhukova',
                hashtags: '#beauty#water',
                photoLink: 'photos/water.jpg',
                likes: ['Minerva McGonagall', 'Rubeus Hagrid']
            },
            {
                id: '5',
                description: 'There should be some text',
                createdAt: new Date('2018-02-15T03:44:00'),
                author: 'Ekaterina Zhukova',
                hashtags: '#sun#fun',
                photoLink: 'photos/snow.jpg',
                likes: ['Obi-Wan Kenobi', 'Luke Skywalker']
            },
            {
                id: '6',
                description: 'There should be some text',
                createdAt: new Date('2018-02-19T17:14:00'),
                author: 'Ekaterina Zhukova',
                hashtags: '#sun#fun',
                photoLink: 'photos/fog.jpg',
                likes: ['Han Solo', 'Yoda']
            },
            {
                id: '7',
                description: 'There should be some text',
                createdAt: new Date('2018-02-22T12:59:00'),
                author: 'Ekaterina Zhukova',
                hashtags: '#sun#fun',
                photoLink: 'photos/rain.jpg',
                likes: ['Obi-Wan Kenobi', 'Yoda']
            },
            {
                id: '8',
                description: 'There should be some text',
                createdAt: new Date('2018-03-01T01:48:00'),
                author: 'Hermione Granger',
                hashtags: '#sun#fun',
                photoLink: 'photos/winter.jpg',
                likes: ["Harry Potter"]
            },
            {
                id: '9',
                description: 'There should be some text',
                createdAt: new Date('2018-03-02T11:14:00'),
                author: 'Ekaterina Zhukova',
                hashtags: '#sun#fun',
                photoLink: 'photos/death.jpg',
                likes: ['R2-D2', 'Padmé Amidala']
            },
            {
                id: '10',
                description: 'There should be some text',
                createdAt: new Date('2018-03-02T15:35:00'),
                author: 'Ekaterina Zhukova',
                hashtags: '#sun#fun',
                photoLink: 'photos/hogwarts.jpg',
                likes: ['Darth Maul', 'Palpatine']
            }
            ,
            {
                id: '11',
                description: 'There should be some text',
                createdAt: new Date('2019-03-02T21:05:00'),
                author: 'Ekaterina Zhukova',
                hashtags: '#sun#fun',
                photoLink: 'photos/winter.jpg',
                likes: ['Obi-Wan Kenobi', 'R2-D2']
            }
            ,
            {
                id: '12',
                description: 'There should be some text',
                createdAt: new Date('2018-03-03T00:15:00'),
                author: 'Ekaterina Zhukova',
                hashtags: '#sun#fun',
                photoLink: 'photos/rain.jpg',
                likes: ['Padmé Amidala']
            }
            ,
            {
                id: '13',
                description: 'There should be some text',
                createdAt: new Date('2018-03-03T10:09:00'),
                author: 'Harry Potter',
                hashtags: '#sun#fun',
                photoLink: 'photos/fog.jpg',
                likes: ['Hermione Granger']
            }
            ,
            {
                id: '14',
                description: 'There should be some text',
                createdAt: new Date('2018-03-03T14:17:00'),
                author: 'Ekaterina Zhukova',
                hashtags: '#beauty#smile',
                photoLink: 'photos/snow.jpg',
                likes: ['C-3PO', "R2-D2"]
            }
            ,
            {
                id: '15',
                description: 'There should be some text',
                createdAt: new Date('2018-03-04T11:12:00'),
                author: 'Harry Potter',
                hashtags: '#beauty#smile',
                photoLink: 'photos/water.jpg',
                likes: ['Minerva McGonagall', 'Rubeus Hagrid']
            }
        ];
        let photoPosts;
        if(localStorage.getItem("posts")===null ||localStorage.getItem('posts')===undefined)
            localStorage.setItem("posts",JSON.stringify(photoPostsAll));
        photoPosts=Array.from(JSON.parse(localStorage.getItem("posts")));

        if(!localStorage.getItem('lastID'))
            localStorage.setItem('lastID',JSON.stringify(photoPosts.length));
        for(i=0;i<photoPosts.length;i++){
            photoPosts[i].createdAt=new Date(photoPosts[i].createdAt);
        }
        function size() {
            return photoPosts.length;
        }
        function updatePosts() {
            localStorage.setItem("posts",JSON.stringify(photoPosts));
        }
    function getPhotoPost(id) {
        return photoPosts.filter(function (value) {
            return value.id === id;
        })[0];
    }
    function update() {
            localStorage.removeItem('posts');
        localStorage.setItem('posts',JSON.stringify(photoPosts));
    }
    function getPhotoPosts(skip = 0, top = 10, filterConfig) {
        let newPhotoPosts = photoPosts;
        if (filterConfig !== undefined) {
            if (filterConfig.author !== undefined && filterConfig.author !== "")
                newPhotoPosts = filtrByAuthor(newPhotoPosts, filterConfig);
            if (filterConfig.createdAt !== undefined)
                newPhotoPosts = filtrByDate(newPhotoPosts, filterConfig);
            if (filterConfig.hashtags !== undefined && filterConfig.hashtags !== "")
                newPhotoPosts = filtrByHashtags(newPhotoPosts, filterConfig);
        }
        else
            newPhotoPosts.sort(function (a, b) {
                return b.createdAt.getTime() - a.createdAt.getTime();
            })
        newPhotoPosts = newPhotoPosts.slice(skip, skip + top);
        return newPhotoPosts;
    }

    function filtrByAuthor(arr, filterConfig) {
        return arr.filter(function (value) {
            return filterConfig.author === value.author;
        })
    }

    function filtrByDate(arr, filterConfig) {
        return arr.filter(function (value) {
            return filterConfig.createdAt.getTime() >= value.createdAt.getTime();
        })
    }

    function filtrByHashtags(arr, filterConfig) {
        let hash = filterConfig.hashtags.split('#');
        return arr.filter(function (value) {
            return hash.some(function (hash) {
                return value.hashtags.indexOf(hash) >= 0;

            })
        })
    }

    function validatePhotoPost(post) {
        if (post === undefined ||post===null){
            console.log("1");
            return false;
        }
        if (post.id === undefined ||post.id===null){
            console.log("2");
            return false;
        }

        if (post.description === undefined || post.description===null|| post.description.length > 255){
            console.log("3");
            return false;
        }
        if (post.createdAt === undefined || post.createdAt===null||!(post.createdAt instanceof Date)){
            console.log("4");
            return false;
        }
        if (post.author === undefined || post.author===null||post.author.length === 0){
            console.log("5");
            return false;
        }
        if (post.photoLink === undefined ||post.photoLink===null|| post.photoLink.length === 0){
            console.log("6");
            return false;
        }
        if (post.hashtags === undefined||post.hashtags===null){
            console.log("7");
            return false;
        }
        if (post.likes === undefined ){
            console.log("8");
            return false;
        }
        return true;
    }

    function addPhotoPost(post) {
        if (!validatePhotoPost(post)) {
            return false;
        }
        photoPosts.push(post);
        localStorage.setItem('posts',JSON.stringify(photoPosts));
        return true;
    }

    function removePhotoPost(id) {
        if (id === undefined) {
            return false;
        }
        let post = getPhotoPost(id);
        const index = photoPosts.indexOf(post);
        if (index === -1)
            return false;
        photoPosts.splice(index, 1);
        localStorage.setItem('posts',JSON.stringify(photoPosts));
        return true;
    }

    function editPhotoPost(id, post) {
        if (id === undefined || post === undefined || post === null) {
            console.log("-1");
            return false;
        }

        let previousPost = getPhotoPost(id);
        let index = photoPosts.indexOf(previousPost);

        post.id = previousPost.id;
        post.author = previousPost.author;
        post.createdAt = previousPost.createdAt;
        post.likes = previousPost.likes;
        if (post.description === undefined) {
            post.description = previousPost.description;
        }
        if (post.photoLink === undefined)
            post.photoLink = previousPost.photoLink;
        if (post.hashtags === undefined)
            post.hashtags = previousPost.hashtags;
        if (!validatePhotoPost(post))
            return false;
        photoPosts[index] = post;
        localStorage.setItem('posts',JSON.stringify(photoPosts));
        return true;
    }

    function setLike(id, author) {
        if (id === undefined || author === undefined)
            return null;
        let post_1 = getPhotoPost(id);
        let index = photoPosts.indexOf(post_1);
        if (photoPosts[index].likes.indexOf(author) === -1) {
            photoPosts[index].likes.push(author);
            return true;
        }
        else {
            photoPosts[index].likes.splice(photoPosts[index].likes.indexOf(author), 1);
            return true;
        }
    }

    function printArray() {
        console.log(photoPosts);
    }

    return {
        removePhotoPost: removePhotoPost,
        addPhotoPost: addPhotoPost,
        validatePhotoPost: validatePhotoPost,
        editPhotoPost: editPhotoPost,
        getPhotoPosts: getPhotoPosts,
        getPhotoPost: getPhotoPost,
        size:size,
        printArray: printArray,
        setLike:setLike,
        update:update
    }

})();
function last_id() {

}