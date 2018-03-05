;(function () {
    var photoPosts = [
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
            createdAt: new Date('2018-03-02T21:05:00'),
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

    function getPhotoPost(id) {
        return photoPosts.filter(function (value) {
            return value.id == id;
        })[0];
    }

    function getPhotoPosts(skip, top, filterConfig) {
        var newPhotoPosts = photoPosts;
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
        var hash = filterConfig.hashtags.split('#');
        return arr.filter(function (value) {
            return hash.every(function (hash) {
                return value.hashtags.indexOf(hash) >= 0;

            })
        })
    }

    function validatePhotoPost(post) {
        if (post === undefined)
            return false;
        if (post.id === undefined )
            return false;
        for(var i = 0;i<photoPosts.length; i++)
        {
            if(post.id===photoPosts[i].id)
                return false;
        }
        if (post.description === undefined || post.description.length > 255)
            return false;
        if (post.createdAt === undefined || !(post.createdAt instanceof Date))
            return false;
        if (post.author === undefined || post.author.length === 0)
            return false;
        if (post.photoLink === undefined || post.photoLink.length === 0)
            return false;
        if (post.hashtags === undefined)
            return false;
        if (post.likes === undefined)
            return false;
        return true;
    }

    function addPhotoPost(post) {
        if (!validatePhotoPost(post))
        {
            return false;
        }
        photoPosts.push(post);
        return true;
    }

    function removePhotoPost(id) {
        if (id === undefined)
        {
            return false;
        }
        var post=getPhotoPost(id);
        var index = photoPosts.indexOf(post);
        if (index === -1)
            return false;
        photoPosts.splice(index, 1);
        return true;
    }

    function editPhotoPost(id, post) {
        if (id === undefined || post === undefined||post===null || post.id !== undefined
            || post.createdAt !== undefined || post.author !== undefined)
            return false;

        var previousPost = getPhotoPost(id);
        var index = photoPosts.indexOf(previousPost);

        post.id = previousPost.id;
        post.author = previousPost.author;
        post.createdAt = previousPost.createdAt;
        post.likes=previousPost.likes;
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
        return true;
    }

    function setLike(id, post) {
        if (id === undefined || post === undefined === post.author === undefined)
            return null;
        // var photopost=getPhotoPost(id);
        var post_1 = getPhotoPost(id);
        var index = photoPosts.indexOf(post_1);
        if (photoPosts[index].likes.indexOf(post.author) === -1) {
            photoPosts[index].likes.push(post.author);
            return true;
        }
        else {
            photoPosts[index].likes.splice(photoPosts[index].likes.indexOf(post.author), 1);
            console.log(photoPosts[index].likes.indexOf(post.author));
            return true;
        }
    }

    function Check() {
        console.log("My Array : ");
        console.log(photoPosts);
        console.log('getPhotoPost work for id==1');
        console.log(getPhotoPost(1));
        console.log('getPhotoPost work for id==16, more than length of array');
        console.log(getPhotoPost(16));
        console.log('getPhotoPosts work for date from fifth post without Date');
        console.log(getPhotoPosts(0, 10, {
            author: 'Ekaterina Zhukova',
            //createdAt: new Date('2018-02-15T03:44:00'),
            hashtags: '#beauty#smile'
        }));
        console.log('getPhotoPosts work for date from fifth post with Date');
        console.log(getPhotoPosts(0, 10, {
            author: 'Ekaterina Zhukova',
            createdAt: new Date('2018-02-15T03:44:00'),
            hashtags: '#beauty#smile'
        }));
        console.log('getPhotoPost work for id==1');
        console.log(getPhotoPost(1));
        console.log('getPhotoPosts work on author');
        console.log(getPhotoPosts(0, 10, {
            author: 'Harry Potter'
        }));
        console.log('getPhotoPosts shows first 10 posts sorted by date');
        console.log(getPhotoPosts(0, 10));
        console.log('getPhotoPosts shows second 10 posts sorted by date');
        console.log(getPhotoPosts(10, 10));

        console.log('add like. ');
        setLike(14, {author: 'Ekaterina Zhukova'});

        console.log(getPhotoPost(14));
        // console.log('delete like. ');
        //setLike(14,{author:'Ekaterina Zhukova'});
        //console.log(getPhotoPost(14));


        // console.log(getPhotoPost(14));
        // addRemoveLike(14,{author:'Ekaterina Zhukova'});
        // console.log(getPhotoPost(14));
        if(addPhotoPost({
            id: '16',
            description: 'This post is created by function addPhotoPost',
            createdAt: new Date('2018-03-05T11:49:00'),
            author: 'William Shakespeare',
            photoLink: 'photos/fog.jpg',
            likes: ['Thomas More', 'Miguel de Cervantes Saavedra'],
            hashtags:'#hashtag#marvellous'
        })) console.log(photoPosts);
        else  console.log('mistake');
        removePhotoPost(16);
        console.log(photoPosts);
        editPhotoPost(15,{description:'It\'s changed description',hashtags:'#changed#hashgtag'});
        console.log(getPhotoPost(15));
        if(addPhotoPost({
                id: '13',
                description: 'This post is created by function addPhotoPost',
                createdAt: new Date('2018-03-05T11:49:00'),
                author: 'William Shakespeare',
                photoLink: 'photos/fog.jpg',
                likes: ['Thomas More', 'Miguel de Cervantes Saavedra'],
                hashtags:'#hashtag#marvellous'
            })) console.log(photoPosts);
        else console.log('addPhtotPost mistake: not unique id')
        if(!validatePhotoPost({
                id: '5',
                description: 'This post is created by function addPhotoPost',
                createdAt: new Date('2018-03-05T11:49:00'),
                author: 'William Shakespeare',
                photoLink: 'photos/fog.jpg',
                likes: ['Thomas More', 'Miguel de Cervantes Saavedra'],
                hashtags:'#hashtag#marvellous'
            }))console.log('invalid object!');

    }

    Check();
})();
