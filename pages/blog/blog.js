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
    const checkToken = localStorage.getItem("token");
    if (checkToken) {
      headerContainerValid.classList.add("active");
      headerContainer.classList.remove("active");
      headerBtn.style.display = "none";
      blogBtn.style.display = "block";
      blogBtn.addEventListener("click", () => {
        window.location.href = "../addNewBlog/addNewBlog.html";
      });
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
    blogBtn.addEventListener("click", () => {
      window.location.href = "../addNewBlog/addNewBlog.html";
    });
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
// blog html
const main = document.getElementById("main__blog");
const blogSimilar = document.getElementById("blog__similar");

function filterDataByCategoryTitles(dataArray, categoryTitles) {
  let result = [];

  for (let i = 0; i < categoryTitles.length; i++) {
    let filteredArray = dataArray.filter((cat) =>
      cat.categories.some(
        (element) => element.title === categoryTitles[i].title
      )
    );
    result = result.concat(filteredArray);
  }
  return result;
}

// new blog page

function loadNewBlog(newId) {
  localStorage.setItem("blogId", newId);
  window.scrollTo({ top: 0, behavior: "smooth" });
  // smooth scroll
  setTimeout(function () {
    document.location.reload(true);
  }, 600); // Adjust the delay as needed
}

// add in HTML
function addSimilarBlogs(data) {
  for (let blog in data) {
    let element = data[blog];
    let categoryDiv = "";

    for (let i = 0; i < element.categories.length; i++) {
      // Append each category HTML to the existing string
      categoryDiv += `
        <div class="blog__info-category" style="background-color: ${element.categories[i].background_color}">${element.categories[i].title}</div>
      `;
    }
    blogSimilar.innerHTML += `
    <div class="similar__cards">
    <img
      src=${element.image}
      alt="Blog image"
    />
    <p class="author">${element.author}</p>
    <p class="date">${element.publish_date.substring(0, 10)}</p>
    <h2>${element.title}</h2>
    <div class="category-container">
      ${categoryDiv}
    </div>
    <p class="description">
    ${element.description}
    </p>
    <div class="view-full" onclick="loadNewBlog(${element.id})">
      <span>სრულად ნახვა</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M5.93451 13.0052C5.64162 13.2981 5.64162 13.773 5.93451 14.0659C6.22741 14.3587 6.70228 14.3587 6.99517 14.0659L5.93451 13.0052ZM14.2859 6.46446C14.2859 6.05024 13.9501 5.71445 13.5359 5.71446L6.78591 5.71445C6.3717 5.71445 6.03591 6.05024 6.03591 6.46445C6.03591 6.87867 6.3717 7.21445 6.78591 7.21445H12.7859V13.2145C12.7859 13.6287 13.1217 13.9645 13.5359 13.9645C13.9501 13.9645 14.2859 13.6287 14.2859 13.2145L14.2859 6.46446ZM6.99517 14.0659L14.0662 6.99478L13.0056 5.93412L5.93451 13.0052L6.99517 14.0659Z"
          fill="#5D37F3"
        />
      </svg>
    </div>
  </div>
    
    `;
  }
}
const similarStats = async (array) => {
  try {
    const resp = await fetch(`https://george.pythonanywhere.com/api/blogs/`);
    const data = await resp.json();
    let filteredByTitle = filterDataByCategoryTitles(data, array.categories);
    addSimilarBlogs(filteredByTitle);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const loadBlog = async () => {
  const blogId = localStorage.getItem("blogId");
  const resp = await fetch(
    `https://george.pythonanywhere.com/api/blogs/${blogId}`
  );
  const data = await resp.json();
  let categoryDiv = "";

  for (let i = 0; i < data.categories.length; i++) {
    // Append each category HTML to the existing string
    categoryDiv += `
      <div class="blog__info-category" style="background-color: ${data.categories[i].background_color}">${data.categories[i].title}</div>
    `;
  }

  similarStats(data);
  console.log(data);
  main.innerHTML = `
  <div class="blog__img">
        <img
          src="${data.image}"
          alt="blog image"
        />
      </div>

      <div class="blog__info">
        <h3>${data.author}</h3>
        <p><span>${data.publish_date.substring(0, 10)}</span> • ${
    data.email === null ? "" : data.email
    }</p>
        <h1>${data.title}</h1>
        <div class="blog__info-categories">
          ${categoryDiv}
      </div>
        <p class="blog__desc">
         ${data.description}
        </p>
      </div>
  `;
};
loadBlog();
