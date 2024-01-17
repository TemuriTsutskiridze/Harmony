const headerBtn = document.getElementById("header__btn");
const blogBtn = document.getElementById("blog__btn");
const darkTheme = document.getElementById("dark__theme");
const headerContainer = document.getElementById("header__container");
const headerContainerValid = document.getElementById("header__container-valid");
const cancelBtn = document.getElementById("cancel__btn");
const cancelBtnValid = document.getElementById("cancel__btn-valid");
const signInBtn = document.getElementById("signin__btn");
const confirmBtn = document.getElementById("confirm__btn");
const headerErrorText = document.getElementById("header__error");

let userLoged = true;
// login function
const headerBtnClick = () => {
  darkTheme.classList.add("active");
  headerContainer.classList.add("active");
};

// remove login container
const cancelHeaderContainer = () => {
  darkTheme.classList.remove("active");
  headerContainer.classList.remove("active");
  headerContainerValid.classList.remove("active");
};

// checking validation
const checkValidation = () => {
  try {
    if (userLoged) {
      localStorage.setItem("user", true);
      headerContainerValid.classList.add("active");
      headerContainer.classList.remove("active");
      headerBtn.style.display = "none";
      blogBtn.style.display = "block";
    } else {
      throw new Error("ელ-ფოსტა არ მოიძებნა");
    }
  } catch (error) {
    headerErrorText.classList.add("active");
  }
};

// automatic load
const automaticLoad = () => {
  let localUser = localStorage.getItem("user");
  if (localUser !== null) {
    headerBtn.style.display = "none";
    blogBtn.style.display = "block";
  }
};


// 1st click
headerBtn.addEventListener("click", headerBtnClick);
// 2nd click
signInBtn.addEventListener("click", checkValidation);
// 3d click
confirmBtn.addEventListener("click", cancelHeaderContainer);

// click to cancel the container of header
cancelBtn.addEventListener("click", cancelHeaderContainer);
cancelBtnValid.addEventListener("click", cancelHeaderContainer);
darkTheme.addEventListener("click", cancelHeaderContainer);

// check is there is user in localstorage
automaticLoad();
