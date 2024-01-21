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
// user input
const userInput = document.getElementById("user__email");

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
//

// checking validation
const checkValidation = async () => {
  headerErrorText.classList.remove("active");
  try {
    const response = await fetch(
      "https://george.pythonanywhere.com/api/login/",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: `${userInput.value}`,
        }),
      }
    );
    if (!response.ok) throw new Error("something went wrong");
    const data = await response.json();
    localStorage.setItem("token", data.token);
    const checkToken = localStorage.getItem('token');
    if(checkToken){
      headerContainerValid.classList.add("active");
      headerContainer.classList.remove("active");
      headerBtn.style.display = "none";
      blogBtn.style.display = "block";
      blogBtn.addEventListener('click',()=>{
        window.location.href = './pages/addNewBlog/addNewBlog.html'
      })
    }
  } catch (error) {
    headerErrorText.classList.add("active");
  }


};

// automatic load
const automaticLoad = () => {
  let localUser = localStorage.getItem("token");
  if (localUser !== null) {
    headerBtn.style.display = "none";
    blogBtn.style.display = "block";
    blogBtn.addEventListener('click',()=>{
      window.location.href = './pages/addNewBlog/addNewBlog.html'
    })
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

// // Handles the click event on category buttons
function changeCategory(button) {
  button.classList.toggle("active-category");

  const buttons = document.querySelectorAll(".btn-common");
  buttons.forEach((btn) => {
    if (btn !== button && !btn.classList.contains("active-category")) {
      btn.classList.remove("active-category");
    }
  });
}

const mainBlog = document.querySelector(".all-blogs");

async function loadData() {
  const resp = await fetch(`https://george.pythonanywhere.com/api/blogs/`);
  const data = await resp.json();
  mainBlog.innerHTML+=`
  <div class="first-blog">
        <img 
        src="https://s3-alpha-sig.figma.com/img/52fc/43dc/a34f1ce09dc28491de2466e89b81fb71?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Z2viS1u3z4MSi4v-gIAel51wkvnC~YOneM1XCAcnkHcn4Ex35jCeg0KVOBRukSbQ04eHaBukkw4v7BjX4UdZqH6WNYWlqjPK3dZDBW6huUt6LGVypk1ayTDOdDx8ntbNm9v6jI30eke4z1dmFAz2A1cCHJdCdKYYhiwtvjOAYAdv~fnspUqW~xm5gzEDr4YvG9g5itdoBJWk0ohuaVH6KYs652BXvsZnYcRyxI9VZ7up~tU1iOkDLk6LJI3K-VuybQlo5xHWeq5~7MBM19qLCVtK4QsXLtRqKQxtrZYznOg1PM1tQzn14785Fd1aqxkMXg6-z-zldvu-OzTLkGTa9g__" 
        alt="Blog image">
        <p class="author">ნია გოგსაძე</p>
        <p class="date">02.11.2023</p>
        <h2>EOMM-ის მრჩეველთა საბჭოს ნინო ეგაძე შეუერთდა</h2>
        <div class="category-container">
          <button class="shop-category btn-common">მარკეტი</button>
          <button class="app-category btn-common">აპლიკაცია</button>
          <button class="ai-category btn-common">ხელოვნური ინტელექტი</button>
        </div>
        <p class="description">6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური სიზუსტისთვის, ეს პროცესი...</p>
        <div class="view-full">
          <button>სრულად ნახვა</button>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5.93451 13.0052C5.64162 13.2981 5.64162 13.773 5.93451 14.0659C6.22741 14.3587 6.70228 14.3587 6.99517 14.0659L5.93451 13.0052ZM14.2859 6.46446C14.2859 6.05024 13.9501 5.71445 13.5359 5.71446L6.78591 5.71445C6.3717 5.71445 6.03591 6.05024 6.03591 6.46445C6.03591 6.87867 6.3717 7.21445 6.78591 7.21445H12.7859V13.2145C12.7859 13.6287 13.1217 13.9645 13.5359 13.9645C13.9501 13.9645 14.2859 13.6287 14.2859 13.2145L14.2859 6.46446ZM6.99517 14.0659L14.0662 6.99478L13.0056 5.93412L5.93451 13.0052L6.99517 14.0659Z" fill="#5D37F3"/>
          </svg>
        </div>
      </div>
  `
  for(let key in data){
    for(let category in data[key].categories){
         console.log(data[key].categories[category]);
         mainBlog.innerHTML+=`
  <div class="first-blog">
        <img 
        src="https://s3-alpha-sig.figma.com/img/52fc/43dc/a34f1ce09dc28491de2466e89b81fb71?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Z2viS1u3z4MSi4v-gIAel51wkvnC~YOneM1XCAcnkHcn4Ex35jCeg0KVOBRukSbQ04eHaBukkw4v7BjX4UdZqH6WNYWlqjPK3dZDBW6huUt6LGVypk1ayTDOdDx8ntbNm9v6jI30eke4z1dmFAz2A1cCHJdCdKYYhiwtvjOAYAdv~fnspUqW~xm5gzEDr4YvG9g5itdoBJWk0ohuaVH6KYs652BXvsZnYcRyxI9VZ7up~tU1iOkDLk6LJI3K-VuybQlo5xHWeq5~7MBM19qLCVtK4QsXLtRqKQxtrZYznOg1PM1tQzn14785Fd1aqxkMXg6-z-zldvu-OzTLkGTa9g__" 
        alt="Blog image">
        <p class="author">ნია გოგსაძე</p>
        <p class="date">02.11.2023</p>
        <h2>EOMM-ის მრჩეველთა საბჭოს ნინო ეგაძე შეუერთდა</h2>
        <div class="category-container">
          <button class="shop-category btn-common">მარკეტი</button>
          <button class="app-category btn-common">აპლიკაცია</button>
          <button class="ai-category btn-common">ხელოვნური ინტელექტი</button>
        </div>
        <p class="description">6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური სიზუსტისთვის, ეს პროცესი...</p>
        <div class="view-full">
          <button>სრულად ნახვა</button>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5.93451 13.0052C5.64162 13.2981 5.64162 13.773 5.93451 14.0659C6.22741 14.3587 6.70228 14.3587 6.99517 14.0659L5.93451 13.0052ZM14.2859 6.46446C14.2859 6.05024 13.9501 5.71445 13.5359 5.71446L6.78591 5.71445C6.3717 5.71445 6.03591 6.05024 6.03591 6.46445C6.03591 6.87867 6.3717 7.21445 6.78591 7.21445H12.7859V13.2145C12.7859 13.6287 13.1217 13.9645 13.5359 13.9645C13.9501 13.9645 14.2859 13.6287 14.2859 13.2145L14.2859 6.46446ZM6.99517 14.0659L14.0662 6.99478L13.0056 5.93412L5.93451 13.0052L6.99517 14.0659Z" fill="#5D37F3"/>
          </svg>
        </div>
      </div>
  `

    }
  }

}

loadData();
