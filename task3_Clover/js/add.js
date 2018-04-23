function editPage(post) {
    let main = document.querySelector('.main');
    let user = JSON.parse(localStorage.getItem('user'));
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    let sign = document.createElement('figure');
    sign.className = 'sign';

    let dragAndDrop = document.createElement('div');
    dragAndDrop.classList.add("dragAndDrop");
    dragAndDrop.id = 'drop';

    let imgDropArea = document.createElement('img');
    imgDropArea.classList.add('post_image');
    dragAndDrop.appendChild(imgDropArea);

    dragAndDrop.addEventListener("dragover", function (event) {
        event.preventDefault();
    }, false);
    dragAndDrop.addEventListener("drop", function (event) {
        event.preventDefault();
        let files = event.dataTransfer.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = function () {
            imgDropArea.setAttribute('src', reader.result);
        };
    }, false);

    let describtion = document.createElement('label');
    describtion.className = 'text_add';
    describtion.textContent = 'Describtion';

    let text_descr = document.createElement('textarea');
    text_descr.className = 'add_describtion';
    text_descr.id = 'descr';

    let hashtags = document.createElement('label');
    hashtags.className = 'text_add';
    hashtags.textContent = "Hashtags";

    let add_hash = document.createElement('textarea');
    add_hash.className = 'add_describtion';
    add_hash.id = 'hash';

    let buttonAdd = document.createElement('input');
    buttonAdd.classList.add('button');
    buttonAdd.setAttribute('type', 'button');
    buttonAdd.setAttribute('value', 'OK');
    buttonAdd.setAttribute('name', 'fbutton');

    imgDropArea.src = post.photoLink;
    text_descr.textContent = post.description;
    add_hash.textContent = post.hashtags;

    buttonAdd.addEventListener('click', function () {
        console.log(post);

        post.photoLink = dragAndDrop.lastChild.getAttribute('src');
        post.description = text_descr.value;
        console.log(post.description);
        post.hashtags = add_hash.value;
        if (editPhotoPost(post.id, post) === false)
            alert("incorrect data!");
    });
    sign.appendChild(dragAndDrop);
    sign.appendChild(describtion);
    sign.appendChild(text_descr);
    sign.appendChild(hashtags);
    sign.appendChild(add_hash);

    main.appendChild(sign);
    main.appendChild(buttonAdd);
}

function addPage() {
    let main = document.querySelector('.main');
    let user = JSON.parse(localStorage.getItem('login'));
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    let sign = document.createElement('figure');
    sign.className = 'sign';

    let dragAndDrop = document.createElement('div');
    dragAndDrop.classList.add("dragAndDrop");
    dragAndDrop.id = 'drop';

    let imgDropArea = document.createElement('img');
    imgDropArea.classList.add('post_image');
    dragAndDrop.appendChild(imgDropArea);

    dragAndDrop.addEventListener("dragover", function (event) {
        event.preventDefault();
    }, false);
    dragAndDrop.addEventListener("drop", function (event) {
        event.preventDefault();
        let files = event.dataTransfer.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = function () {
            imgDropArea.setAttribute('src', reader.result);
        };
    }, false);

    let describtion = document.createElement('label');
    describtion.className = 'text_add';
    describtion.textContent = 'Describtion';

    let text_descr = document.createElement('textarea');
    text_descr.className = 'add_describtion';
    text_descr.id = 'descr';

    let hashtags = document.createElement('label');
    hashtags.className = 'text_add';
    hashtags.textContent = "Hashtags";

    let add_hash = document.createElement('textarea');
    add_hash.className = 'add_describtion';
    add_hash.id = 'hash';

    let buttonAdd = document.createElement('input');
    buttonAdd.classList.add('button');
    buttonAdd.setAttribute('type', 'button');
    buttonAdd.setAttribute('value', 'OK');
    buttonAdd.setAttribute('name', 'fbutton');
    buttonAdd.addEventListener('click', function () {
            let id = Number.parseInt(JSON.parse(localStorage.getItem('lastID')));
            id += 1;
            localStorage.setItem('lastID', JSON.stringify(id));
            let postNew = {
                id: id,
                description: text_descr.value,
                createdAt: new Date(),
                author: user,
                hashtags: add_hash.value,
                photoLink: dragAndDrop.lastChild.getAttribute('src'),
                likes: []
            }
            if (addPhotoPost(postNew)===false){
                console.log("mistake");
                console.log(imgDropArea.src);
                alert("Invalid data!");
            }
    });
    sign.appendChild(dragAndDrop);
    sign.appendChild(describtion);
    sign.appendChild(text_descr);
    sign.appendChild(hashtags);
    sign.appendChild(add_hash);

    main.appendChild(sign);
    main.appendChild(buttonAdd);
}
function deletePost(id) {
    let ans=confirm('Are you sure?\nPress OK to delete or CANCEL to save');
    if(ans===true) {
        removePhotoPost(id);
        createHeader();
        createMainPage();
    }

}

function filtrPage() {
    let filtrName=document.getElementById('idFiltrName');
    let filtrDate=document.getElementById('idFiltrDate');
    let filtrHash=document.getElementById('idFiltrHash');
    let date;
    if(!filtrDate.value)
       date=undefined;
    else
        date=new Date(filtrDate.value);
    console.log(date);
    let filtrConfig={
        author:filtrName.value,
        createdAt:date,
        hashtags:filtrHash.value
    }
    localStorage.setItem('filtrConfig',JSON.stringify(filtrConfig));
    work.clean();
    showPhotoPosts(0,10,filtrConfig);
}