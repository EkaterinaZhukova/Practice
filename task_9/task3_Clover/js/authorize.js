let authorization = (function () {
    function destroy(main) {
        if (main.childElementCount > 0) {
            while (main.firstChild)
                main.removeChild(main.firstChild);
        }
    }
    return{
        destroy:destroy
    }
})();

function logIN() {
    if(localStorage.getItem('login')!==null) {
        let isExit = confirm("Are you sure?");
        if (isExit) {
            localStorage.removeItem('login');
            localStorage.removeItem('password');
            let name = document.getElementsByClassName('user')[0];
            createHeader();
            createMainPage();
            return;
        }
        else
            return;
    }
    let main = document.querySelector('.main');
    authorization.destroy(main);
    console.log('TRy');
    let loginPage = document.createElement('div');
    loginPage.className = 'login-page';
    let form = document.createElement('div');
    form.className = 'form';
    let loginForm = document.createElement('form');
    loginForm.className = 'login-form';
    let login = document.createElement('input');
    login.id="login_authorize";
    login.setAttribute('type','text');
    login.setAttribute('placeholder','UserName');
    let password = document.createElement('input');
    password.id="password_authorize";
    password.setAttribute('type','password');
    password.setAttribute('placeholder','Password');
    let button = document.createElement('button');
    button.textContent = 'LogIn';
    button.addEventListener('click',authorize);

    loginForm.appendChild(login);
    loginForm.appendChild(password);
    loginForm.appendChild(button);
    form.appendChild(loginForm);
    loginPage.appendChild(form);
    main.appendChild(loginPage);
    createHeader();
}

function authorize() {
    let login = document.getElementById('login_authorize').value||null;
    let password=document.getElementById('password_authorize').value||null;
    if(login && password) {
        localStorage.setItem('login',JSON.stringify(login));
        localStorage.setItem('password',JSON.stringify(password));
        createMainPage();
        createHeader();
    }
  else{
        if(!alert("Incorrect data!")){
            return false;
        }
    }
}