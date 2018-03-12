let work = (function () {
     let user = 'Ekaterina Zhukova';
    //let user = null;

    let head = document.querySelector('header');
    let name_user = document.createElement('h1');
    name_user.className = 'user';


    let add_post = document.getElementsByClassName('img_add')[0];
    add_post.hidden = 1;
    if (user !== null) {
        name_user.textContent = user;
        add_post.hidden = 0;
    }
    head.insertBefore(name_user, document.getElementsByClassName('img1')[0]);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
        timezone: 'UTC',
        hour: 'numeric',
        minute: 'numeric'
    };
    let isShown = 0;
    const main = document.querySelector('.main');

    function addPost(data) {
        const sign = document.createElement('figure');
        sign.className = 'sign';
        sign.id = data.id;
        const image = document.createElement('img');
        image.setAttribute("height", "600px");
        image.setAttribute("width", "600px");
        image.src = data.photoLink;

        const main_author = document.createElement('figcaption');
        main_author.className = 'main_author';
        main_author.textContent = data.author;

        const describtion_text = document.createElement('figcaption');
        describtion_text.className = 'text';
        describtion_text.textContent = data.description;


        const hashtags = document.createElement('figcaption');
        hashtags.className = 'text';
        hashtags.textContent = data.hashtags;

        const date = document.createElement('figcaption');
        date.className = 'date';
        date.textContent = data.createdAt.toLocaleString('en-US', options);

        const img_like = document.createElement('img');
        img_like.className = 'icon';
        img_like.setAttribute("height", "30px");
        img_like.setAttribute("width", "30px");
        img_like.src = "img/heart.png";

        const edit = document.createElement('img');
        edit.className = 'icon';
        edit.setAttribute("height", "30px");
        edit.setAttribute("width", "30px");
        edit.src = "img/redact.png";

        const del = document.createElement('img');
        del.className = 'icon';
        del.setAttribute("height", "30px");
        del.setAttribute("width", "30px");
        del.src = "img/del.png";

        const count_likes = document.createElement('h');
        count_likes.className = 'like';
        count_likes.textContent = data.likes.length;

        sign.appendChild(main_author);
        sign.appendChild(date);
        sign.appendChild(image);
        sign.appendChild(img_like);
        sign.appendChild(count_likes);
        if (user === data.author) {
            sign.appendChild(edit);
            sign.appendChild(del);
        }
        sign.appendChild(describtion_text);
        sign.appendChild(hashtags);
        main.appendChild(sign);
    }

    function showPhotoPosts(skip = 0, top = 10, filterConfig) {
        let posts = my_functions.getPhotoPosts(skip, top, filterConfig);
        console.log(posts);
        for (let i = 0; i < posts.length; i++) {
            addPost(posts[i]);
        }
    }

    function clean() {
        while (document.querySelector('.main').childNodes.length > 0) {
            var whatRemove = document.querySelector('.main').childNodes[0];
            document.querySelector('.main').removeChild(whatRemove);
            console.log('removed ');
        }
    }


    function removePhotoPost(id) {
        {
            if (my_functions.removePhotoPost(id)) {
                let remove = document.getElementById(id);
                if (remove !== undefined) {
                    main.removeChild(remove);
                }
            }
        }
    }

    function addPhotoPost(post) {
        if (my_functions.addPhotoPost(post)) {
            clean();
            showPhotoPosts();
        }
    }

    function editPhotoPost(id, post) {
        if (my_functions.editPhotoPost(id, post)) {
            clean();
            showPhotoPosts();
        }
    }

    return {
        showPhotoPosts: showPhotoPosts,
        addPost: addPost,
        addPhotoPost: addPhotoPost,
        removePhotoPost: removePhotoPost,
        editPhotoPost: editPhotoPost
    }

})();
