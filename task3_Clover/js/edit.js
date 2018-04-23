function ediasasastPage(post) {
    console.log('edittt');

    const main = document.querySelector('.main');
    while(main.firstChild){
        main.removeChild(main.firstChild);
    }
    let sign = document.createElement('figure');
    sign.className = 'sign';


    let describtion = document.createElement('label');
    describtion.className = 'text_add';
    describtion.textContent = 'Describtion';


    let text_descr = document.createElement('textarea');
    text_descr.className = 'add_describtion';
    text_descr.textContent = post.description;

    let hash= document.createElement('label');
    hash.className='text_add';
    let add_hash = document.createElement('textarea');
    add_hash.className = 'add_describtion';
    add_hash.textContent = post.hashtags;
    sign.appendChild(describtion);
    sign.appendChild(text_descr);
    sign.appendChild(hash);
    sign.appendChild(add_hash);
    main.appendChild(sign);
};