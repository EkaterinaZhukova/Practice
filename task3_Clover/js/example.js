var k = 20;
function load() {
    let filtrConfig=undefined;
    if(localStorage.getItem('filtrConfig')!==null)
        filtrConfig=JSON.parse(localStorage.getItem('filtrConfig'));
    showPhotoPosts(0,k,filtrConfig);
    k+=10;
}
function createHeader() {
    let user=JSON.parse(localStorage.getItem('login'));
    let head = document.querySelector('header');
    let name_user = document.getElementsByClassName('user')[0];
    name_user.textContent=user;
    let in_out = document.getElementsByClassName('fa-5x')[0];
    if(in_out===null || in_out===undefined)
        console.log("Not working");
    else console.log("It's ok");
    let add_post = document.getElementsByClassName('img_in')[1];
    add_post.hidden = 1;
    //add_post.addEventListener('click',addPage);

    if (user !== null) {
        in_out.classList.add("fa-sign-out-alt");
        name_user.textContent = user;
        console.log('not null');
        add_post.hidden = 0;

    }
    else{
        in_out.classList.remove("fa-sign-out-alt");
        in_out.classList.add("fa-sign-in-alt");

    }
}
function makeTape() {
    let filtrConfig=undefined;
    if(localStorage.getItem('filtrConfig')!==null)
        filtrConfig=JSON.parse(localStorage.getItem('filtrConfig'));
   showPhotoPosts(0,10,filtrConfig);
}
function createMainPage() {
    let filtrConfig=undefined;
    if(localStorage.getItem('filtrConfig')!==null)
        filtrConfig=JSON.parse(localStorage.getItem('filtrConfig'));
    showPhotoPosts(0,k,filtrConfig);
    makeTape();
}
function createFiltrForm() {
    let main=document.querySelector('.main');
    let localhash=document.createElement('div');
    localhash.classList.add('localhash');

    let filtrName=document.createElement('input');
    filtrName.classList.add('filt');
    filtrName.id='idFiltrName';
    filtrName.setAttribute('type','text');
    filtrName.setAttribute('name','fname');
    filtrName.setAttribute('placeholder','Name');

    let filtrDate=document.createElement('input');
    filtrDate.classList.add('filt');
    filtrDate.setAttribute('type','date');
    filtrName.setAttribute('name','calendar');
    filtrDate.id='idFiltrDate';

    let filtrHash=document.createElement('input');
    filtrHash.classList.add('filt');
    filtrHash.setAttribute('type','text');
    filtrHash.setAttribute('name','fname');
    filtrHash.setAttribute('placeholder','Hashtags');
    filtrHash.id='idFiltrHash';

    let buttonClass=document.createElement('div');
    buttonClass.classList.add('filtr_button');
    let buttonFiltr=document.createElement('input');
    buttonFiltr.classList.add('filt1');
    buttonFiltr.setAttribute('type','button');
    buttonFiltr.setAttribute('value','Filtr');
    buttonClass.appendChild(buttonFiltr);
    buttonFiltr.addEventListener('click',filtrPage);

    localhash.appendChild(filtrName);
    localhash.appendChild(filtrDate);
    localhash.appendChild(filtrHash);
    localhash.appendChild(buttonFiltr);
    main.appendChild(localhash);

    let posts=document.querySelector('.posts');
    main.insertBefore(localhash,posts);
}
function createLoadMoreButton() {
    let buttonLoadMore=document.createElement('input');
    buttonLoadMore.classList.add('button');
    buttonLoadMore.setAttribute('type','button');
    buttonLoadMore.setAttribute('value','Load More');
    buttonLoadMore.setAttribute('name','fbutton');
    buttonLoadMore.addEventListener('click',load);
    let main=document.querySelector('.main');
    main.appendChild(buttonLoadMore);
}
function likeDisLike(post,count){
    let user=JSON.parse(localStorage.getItem('login'));
    let img = document.getElementById('like'+post.id);
    if(post.likes.indexOf(user)!==-1){
        post.likes.splice(post.likes.indexOf(user),1);
        img.classList.remove('redheart');
        count.textContent=Number.parseInt(count.textContent)-1;
    }
    else{
        post.likes.push(user);
        img.classList.add('redheart');
        count.textContent=Number.parseInt(count.textContent)+1;
    }
    my_functions.update();
}
createFiltrForm();
createMainPage();
createHeader();
createLoadMoreButton();