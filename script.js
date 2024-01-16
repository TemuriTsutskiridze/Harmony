const headerBtn = document.getElementById('header__btn');
const darkTheme = document.getElementById('dark__theme');
const headerContainer = document.getElementById('header__container');
const cancelBtn = document.getElementById('cancel__btn');


// login function
const headerBtnClick = () =>{
    darkTheme.classList.add('active')
    headerContainer.classList.add('active')
}

// remove login container
const cancelHeaderContainer=()=>{
    darkTheme.classList.remove('active')
    headerContainer.classList.remove('active')
}

headerBtn.addEventListener('click',headerBtnClick)
cancelBtn.addEventListener('click',cancelHeaderContainer)
darkTheme.addEventListener('click',cancelHeaderContainer)