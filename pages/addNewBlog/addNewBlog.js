// check button
let isAuthor = false;
let isTitle = false;
let isDescription = false;
let isDate = false;
let isCategory = false;
let isEmail = false;
const submitBtn = document.getElementById("submit");

function checkBtn() {
  const data = JSON.parse(localStorage.getItem("userInfo")) || {};
  if (
    data.author &&
    data.author !== "" &&
    Array.isArray(data.categories) &&
    data.categories.length !== 0 &&
    data.description &&
    data.description !== "" &&
    data.publish_date &&
    data.publish_date !== null &&
    data.title &&
    data.title !== "" &&
    data.image &&
    data.image !== null &&
    data.email &&
    data.email !== null
  ) {
    submitBtn.classList.add("active");
    submitBtn.disabled = false;
  } else {
    submitBtn.classList.remove("active");
    submitBtn.disabled = true;
  }
}
// mail containers

// date containers

// category containers
const selectedCategories = document.querySelector(".category__items");
const categoryBtn = document.querySelector(".category__icon");
const categoriesList = document.querySelector(".categories");
// delete blog with buttoon
async function deleteBlog(data) {
  const categoryElement = document.getElementById(data);
  if (categoryElement) {
    categoryElement.remove();
    const storedObj = JSON.parse(localStorage.getItem("userInfo")) || {};
    let changedList = storedObj.categories.filter(
      (item) => item !== parseInt(data)
    );
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        ...storedObj,
        categories: changedList,
      })
    );
    checkBtn();
  } else {
    return;
  }
}

// add blogs in html element (for onload)
async function fetchBlogs(id) {
  const resp = await fetch(`https://george.pythonanywhere.com/api/categories/`);
  const data = await resp.json();
  let filteredData = data.filter((item) => item.id === id);
  let blog = filteredData[0];
  selectedCategories.innerHTML += `
    <div class="category__item" id="${blog.id}" style="background-color:  ${blog.background_color}; color: #fff">
    ${blog.title}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      onclick="deleteBlog('${blog.id}')"
    >
      <path
        d="M5.17188 10.8284L10.8287 5.17151"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.8287 10.8285L5.17188 5.17163"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
    `;
}
function blogHTML(id) {
  fetchBlogs(id);
}

// add blogs in html (without onload)
async function addBlog(id) {
  try {
    const resp = await fetch(
      `https://george.pythonanywhere.com/api/categories`
    );
    const data = await resp.json();
    let filtereData = data.filter((item) => item.id === parseInt(id, 10));
    const storedObj = JSON.parse(localStorage.getItem("userInfo")) || {};
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        ...storedObj,
        categories: [...(storedObj.categories || []), filtereData[0].id],
      })
    );
    // add in html
    blogHTML(filtereData[0].id);
    checkBtn();
  } catch (error) {
    alert.error("Error fetching data:", error);
  }
}

// create  - DOM list box
function createBlogList(data) {
  for (let key in data) {
    const blogId = data[key].id;
    categoriesList.innerHTML += `
      <div class="category__toggle"
        style="background-color:${data[key].background_color}; color: #fff;" 
        id="${data[key].id}" onclick="addBlog('${blogId}')">
        ${data[key].title}
      </div>
    `;
  }
}

// get data from backend and -> DOM
async function getCategories() {
  try {
    const resp = await fetch(
      `https://george.pythonanywhere.com/api/categories/`
    );
    const data = await resp.json();

    createBlogList(data);
    if (!resp.ok) throw new Error("something went wrong");
  } catch (error) {
    alert(error.message);
  }
}

let dropDown = false;
categoryBtn.addEventListener("click", () => {
  dropDown = !dropDown;
  if (dropDown) {
    categoriesList.style.display = "flex";
    getCategories();
  } else {
    categoriesList.innerHTML = ``;
    categoriesList.style.display = "none";
  }
});

// all input section
const authorInput = document.getElementById("author");
const blogNameInput = document.getElementById("blogName");
const descriptionInput = document.getElementById("description");
const mailInput = document.getElementById("mail");
const checkMail = document.querySelector(".mail__error");
const dateInput = document.getElementById("date");

// georgian alphabet for author
const alphabet = [
  "ა",
  "ბ",
  "გ",
  "დ",
  "ე",
  "ვ",
  "ზ",
  "თ",
  "ი",
  "კ",
  "ლ",
  "მ",
  "ნ",
  "ო",
  "პ",
  "ჟ",
  "რ",
  "ს",
  "ტ",
  "უ",
  "ფ",
  "ქ",
  "ღ",
  "ყ",
  "შ",
  "ჩ",
  "ც",
  "ძ",
  "წ",
  "ჭ",
  "ხ",
  "ჯ",
  "ჰ",
  " ",
];
// checking if author input contains only georgian letters
function containsOnlyGeorgian(input) {
  const inputLetters = Array.from(input);
  return inputLetters.every((letter) => alphabet.includes(letter));
}
// add active status to list
const checkAuthorField = (e) => {
  const input = e.target.parentElement.querySelector("input");
  const listEl1 = e.target.parentElement.querySelector(".author-symbol");
  const listEl2 = e.target.parentElement.querySelector(".author-word");
  const listEl3 = e.target.parentElement.querySelector(".author-letter");
  let inputValue = e.target.value.trim();
  let words = inputValue.split(" ");

  setLocal("author", inputValue);

  let isFirsEl = false;
  let issecondEl = false;
  let isThirdEl = false;
  // fix user many (spaces problem)
  const spaceCount = (inputValue.match(/ /g) || []).length;

  // check first element
  if (inputValue.length >= 4 && spaceCount <= 1) {
    isFirsEl = true;
    listEl1.classList.remove("error");
    listEl1.classList.add("active");
  } else {
    isFirsEl = false;
    listEl1.classList.remove("active");
    listEl1.classList.add("error");
  }
  // check second element
  if (words.length >= 2) {
    // active
    issecondEl = true;
    listEl2.classList.remove("error");
    listEl2.classList.add("active");
  } else {
    // disable
    issecondEl = false;
    listEl2.classList.remove("active");
    listEl2.classList.add("error");
  }
  // check third element
  if (containsOnlyGeorgian(inputValue)) {
    // active
    isThirdEl = true;
    listEl3.classList.remove("error");
    listEl3.classList.add("active");
  } else {
    // disable
    isThirdEl = false;
    listEl3.classList.remove("active");
    listEl3.classList.add("error");
  }

  // for each element (list)
  if (inputValue === "") {
    listEl1.classList.remove("error");
    listEl1.classList.remove("active");
    listEl2.classList.remove("error");
    listEl2.classList.remove("active");
    listEl3.classList.remove("error");
    listEl3.classList.remove("active");
    isTwoLetter = false;
  }

  // add in object (for backend)
  if (isFirsEl && issecondEl && isThirdEl) {
    input.classList.remove("error");
    input.classList.add("active");
    return true;
  } else {
    input.classList.add("error");
    input.classList.remove("active");

    return false;
  }
};
const checkTitleField = (e) => {
  const input = e.target.parentElement.querySelector("input");
  let inputValue = e.target.value.trim();
  const errorMessage = e.target.parentElement.querySelector("p");
  setLocal("title", inputValue);
  if (inputValue.length >= 4) {
    errorMessage.classList.remove("error");
    errorMessage.classList.add("active");
    input.classList.remove("error");
    input.classList.add("active");
  } else if (inputValue === "") {
    errorMessage.classList.remove("error");
    errorMessage.classList.remove("active");
    input.classList.remove("error");
    input.classList.remove("active");
  } else {
    errorMessage.classList.remove("active");
    errorMessage.classList.add("error");
    input.classList.remove("active");
    input.classList.add("error");
  }
};
const checkDescriptionField = (e) => {
  const textarea = e.target.parentElement.querySelector("textarea");
  textValue = textarea.value.trim();
  const errorMessage = e.target.parentElement.querySelector("p");
  setLocal("description", textValue);
  if (textValue.length >= 2) {
    errorMessage.classList.remove("error");
    errorMessage.classList.add("active");
    textarea.classList.remove("error");
    textarea.classList.add("active");
  } else if (textValue === "") {
    errorMessage.classList.remove("error");
    errorMessage.classList.remove("active");
    textarea.classList.remove("error");
    textarea.classList.remove("active");
  } else {
    errorMessage.classList.remove("active");
    errorMessage.classList.add("error");
    textarea.classList.remove("active");
    textarea.classList.add("error");
  }
};
const checkEmailField = (e) => {
  let inputValue = e.target.value;
  if (inputValue === "") {
    checkMail.classList.remove("active");
  }

  if (inputValue.length >= 13) {
    // Get the last 12 letters using substring
    let checkValid = inputValue.substring(inputValue.length - 12);
    if (checkValid === "@redberry.ge") {
      checkMail.classList.remove("active");
      setLocal("email", inputValue);
    } else {
      checkMail.classList.add("active");
      setLocal("email", null);
    }
  }
};

// author input field
authorInput.addEventListener("input", (e) => {
  checkAuthorField(e);
  checkBtn();
});
blogNameInput.addEventListener("input", (e) => {
  checkTitleField(e);
  checkBtn();
});
descriptionInput.addEventListener("input", (e) => {
  checkDescriptionField(e);
  checkBtn();
});
// image drop containers

mailInput.addEventListener("input", (e) => {
  checkEmailField(e);
  checkBtn();
});
dateInput.addEventListener("change", (e) => {
  setLocal("publish_date", e.target.value);
  checkBtn();
});
// image drop containers
const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imgView = document.getElementById("img-view");
const addedImage = document.querySelector(".img-view__added");
inputFile.addEventListener("change", () => {
  uploadImage();
  checkBtn();
});
// end of inputs
function deleteCurrentImage() {
  //   adding add image section
  imgView.style.display = "block";
  //   deleting current photo section
  addedImage.style.display = "none";

  setLocal("image", null);
}

function uploadImage() {
  // creating image url
  const file = inputFile.files[0];
  let imgUrl = undefined;
  const storedObj = JSON.parse(localStorage.getItem("userInfo")) || {};

  //   chechking again if there is no image file
  if (file && file.type.startsWith("image/")) {
    imgUrl = URL.createObjectURL(inputFile.files[0]);
    localStorage.setItem(
      "userInfo",
      JSON.stringify({ ...storedObj, image: imgUrl })
    );
  } else {
    return;
  }

  //   deleting add image section
  imgView.style.display = "none";
  //   adding current photo section
  addedImage.style.display = "flex";
  //   styling current photo section
  addedImage.querySelector("img").src = `${imgUrl}`;
  addedImage.querySelector("span").textContent = `${inputFile.files[0].name}`;
  const svgElement = addedImage.querySelector("svg");

  svgElement.addEventListener("click", (e) => {
    e.preventDefault();
    deleteCurrentImage();
    checkBtn();
  });
}
// drag an image
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
});
dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  uploadImage();
});
// set local function
function setLocal(key, value) {
  const storedObj = JSON.parse(localStorage.getItem("userInfo")) || {};
  localStorage.setItem(
    "userInfo",
    JSON.stringify({ ...storedObj, [key]: value })
  );
}

// POST blog
submitBtn.addEventListener("click", async () => {
  const data = JSON.parse(localStorage.getItem("userInfo")) || null;
  try {

    // Retrieve CSRF token from local storage
    const csrfToken = localStorage.getItem("token");
    const resp = await fetch(
      "https://george.pythonanywhere.com/api/blogs/create/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": `Token ${csrfToken}`,
        },
        body: JSON.stringify(data),
      }
    );

    // Check if the response status is 401 (Unauthorized)
    if (resp.status === 401) {
      throw new Error("Unauthorized: Check CSRF token.");
    }

    // Log the actual response data
    const responseData = await resp.json();
    console.log(responseData);
    localStorage.removeItem('userInfo')
    location.reload();
  } catch (error) {
    alert(error.message);
  }
});

// header navigation system
const headerClick = () => {
  window.location.href = "../../index.html";
};
// the first thing check token
const checkToken = async () => {
  const isToken = localStorage.getItem("token");
  if (isToken === null) {
    window.location.href = "../../index.html";
  } else {
    return;
  }
};
// load data in inputs
const loadInputs = () => {
  const storedField = JSON.parse(localStorage.getItem("userInfo")) || null;
  if (storedField !== null) {
    if (storedField.author !== undefined) {
      authorInput.value = storedField.author;
    }
    if (storedField.title !== undefined) {
      blogNameInput.value = storedField.title;
    }
    if (storedField.description !== undefined) {
      descriptionInput.value = storedField.description;
    }
    if (storedField.publish_date !== undefined) {
      dateInput.value = storedField.publish_date;
    }
    if (storedField.email !== null && storedField.email !== undefined) {
      mailInput.value = storedField.email;
    }
    if (storedField.categories) {
      for (let i = 0; i < storedField.categories.length; i++) {
        blogHTML(storedField.categories[i]);
      }
    }

    setLocal('image', null)
    checkBtn();
  } else {
    return;
  }
};

// checking if there is no token
checkToken();
