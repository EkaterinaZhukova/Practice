let work = (function () {
     let user = 'Ekaterina Zhukova';
     //   let user = null;

    let head = document.querySelector('header');
    let name_user = document.createElement('h1');
    name_user.className = 'user';

    let in_out = document.getElementsByClassName('fa-5x')[0];

    let add_post = document.getElementsByClassName('img_in')[1];
    add_post.hidden = 1;
    if (user !== null) {
        in_out.className = "fas fa-sign-out-alt fa-5x";
        name_user.textContent = user;
        add_post.hidden = 0;
        console.log('not null');
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
        image.className = 'post_image';

        image.src = data.photoLink;

        const main_author = document.createElement('figcaption');
        main_author.className = 'main_author';
        main_author.textContent = data.author;

        const describtion_text = document.createElement('figcaption');
        describtion_text.className = 'text';
        describtion_text.textContent = data.description + 'dnjfns jdsk jhfre krjir khuwh skdhw sjdh wuge jshg jhr wjhr';


        const hashtags = document.createElement('figcaption');
        hashtags.className = 'text';
        hashtags.textContent = data.hashtags;

        const date = document.createElement('figcaption');
        date.className = 'date';
        date.textContent = data.createdAt.toLocaleString('en-US', options);

        const img_like = document.createElement('i');
        img_like.className = 'far fa-heart icon size1';


        const edit = document.createElement('i');
        edit.className = 'fas fa-pencil-alt icon size1';

        const del = document.createElement('i');
        del.className = 'fas fa-trash-alt icon size1';

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
        clean();
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
        showPhotoPosts,
        addPost,
        addPhotoPost,
        removePhotoPost,
        editPhotoPost
    }

})();
function showPhotoPosts(skip,top,filterConfig) {
    work.showPhotoPosts(skip,top,filterConfig);
}
function addPhotoPost(post) {
    work.addPhotoPost(post);
}

function editPhotoPost(id,post){
    work.editPhotoPost(id,post);
}

function removePhotoPost(id) {
    work.removePhotoPost(id);
}