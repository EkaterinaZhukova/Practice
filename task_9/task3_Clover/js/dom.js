let work = (function () {
    let user;
    if (localStorage.getItem('login') !== null)
        user = JSON.parse(localStorage.getItem('login'));
    let head = document.querySelector('header');
    let name_user = document.createElement('h1');
    name_user.className = 'user';
    let in_out = document.getElementsByClassName('fa-5x')[0];
    let add_post = document.getElementsByClassName('img_in')[1];
    add_post.hidden = 1;
    name_user.textContent = "";
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
    let main = document.querySelector('.main');
    async function addPost(data) {

        let divPosts = document.getElementsByClassName('posts')[0];
        let user;
        if (localStorage.key('login') !== null) {
            user = JSON.parse(localStorage.getItem("login"));
            console.log(user);
        }
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
        describtion_text.textContent = data.description;

        const hashtags = document.createElement('figcaption');
        hashtags.className = 'text';
        hashtags.textContent = data.hashtags;

        const date = document.createElement('figcaption');
        date.className = 'date';
        date.textContent = data.createdAt.toLocaleString('en-US', options);

        const count_likes = document.createElement('h');
        count_likes.className = 'like';
        count_likes.textContent = data.likes.length;

        const img_like = document.createElement('i');
        const div_like = document.createElement('div');
        div_like.appendChild(img_like);
        img_like.id = 'like' + data.id;

        console.log(div_like.id);
        if (data.likes.indexOf(user) !== -1) {
            img_like.className = 'far fa-heart icon size1 redheart';
        }
        else {
            img_like.className = 'far fa-heart icon size1';
        }

        div_like.addEventListener("click", function () {
            likeDisLike(data, count_likes)
        }, true);

        const edit = document.createElement('i');
        edit.className = 'fas fa-pencil-alt icon size1';
        const div_edit = document.createElement('div');
        div_edit.addEventListener("click", function () {
            editPage(data);
        }, false);
        div_edit.appendChild(edit);
        let posts = await my_functions.getPhotoPosts();

        const div_del=document.createElement('div');
        const del = document.createElement('i');
        del.className = 'fas fa-trash-alt icon size1';
        div_del.appendChild(del);
        div_del.addEventListener('click',function () {
            deletePost(data.id);
        },false);
        sign.appendChild(main_author);
        sign.appendChild(date);
        sign.appendChild(image);
        sign.appendChild(div_like);
        sign.appendChild(count_likes);
        if (user === data.author) {
            sign.appendChild(div_del);
            sign.appendChild(div_edit);
        }
        sign.appendChild(describtion_text);
        sign.appendChild(hashtags);
        divPosts.appendChild(sign);
    }

    async function showPhotoPosts(skip = 0, top = 10, filterConfig) {
        clean();
        let posts = await my_functions.getPhotoPosts(skip, top, filterConfig);
        console.log(posts);
        console.log("-4");
        for (let i = 0; i < posts.length; i++) {
            addPost(posts[i]);
        }
    }

    function clean() {
        let posts = document.querySelector('.posts');
        if (posts !== null)
            authorization.destroy(posts);

    }


    function removePhotoPost(id) {
        {
            let posts=document.getElementsByClassName('posts')[0];
            if (my_functions.removePhotoPost(id)) {
                let remove = document.getElementById(id);
                if (remove !== undefined) {
                    posts.removeChild(remove);
                }
            }
        }
    }

    function addPhotoPost(post) {
        if (my_functions.addPhotoPost(post)) {
            let main = document.querySelector('.main');
            authorization.destroy(main);
            createHeader();
            createFiltrForm();
            let posts = document.querySelector('.posts');
            if (!posts) {
                posts = document.createElement('div');
                posts.classList.add('posts');
                main.appendChild(posts);
            }
            createMainPage();
            createHeader();
            createLoadMoreButton();
            return true;
        }
        else
            return false;
    }

    function editPhotoPost(id, post) {
        if (my_functions.editPhotoPost(id, post)) {
            let main = document.querySelector('.main');
            authorization.destroy(main);
            createHeader();
            createFiltrForm();
            let posts = document.querySelector('.posts');
            if (!posts) {
                posts = document.createElement('div');
                posts.classList.add('posts');
                main.appendChild(posts);
            }
            createMainPage();
            createHeader();
            createLoadMoreButton();
            console.log("-2");
            return true;
        }
        else return false;
    }

    return {
        showPhotoPosts,
        clean,
        addPhotoPost,
        removePhotoPost,
        editPhotoPost
    }

})();

function showPhotoPosts(skip, top, filterConfig) {
    work.showPhotoPosts(skip, top, filterConfig);
}

function addPhotoPost(post) {
    return work.addPhotoPost(post);
}

function editPhotoPost(id, post) {
    work.editPhotoPost(id, post);
}

function removePhotoPost(id) {
    work.removePhotoPost(id);
}

function getUser() {
    return user;
}

