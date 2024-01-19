// image drop containers
const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imgView = document.getElementById("img-view");
const addedImage = document.querySelector(".img-view__added");
// author and blog name container
const authorInput = document.getElementById("author");
const blogNameInput = document.getElementById("blogName");
const descriptionInput = document.getElementById("description");
// category container

const categoryInput = document.querySelectorAll(".item-container");
const categoryOptions = document.querySelectorAll(".drawer li");


// category section
let selectedCategories = [];

categoryOptions.forEach((option) => {
  option.addEventListener('click', (e) => {
    console.log(e);
  });
});



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

  const storedObj = JSON.parse(localStorage.getItem("userInfo")) || {};

  localStorage.setItem(
    "userInfo",
    JSON.stringify({ ...storedObj, author: inputValue })
  );

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
  console.log(categoryInput);
  const input = e.target.parentElement.querySelector("input");
  let inputValue = e.target.value.trim();
  const errorMessage = e.target.parentElement.querySelector("p");

  const storedObj = JSON.parse(localStorage.getItem("userInfo")) || {};

  localStorage.setItem(
    "userInfo",
    JSON.stringify({ ...storedObj, title: inputValue })
  );
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
  textValue = textarea.value.trim()
  const errorMessage = e.target.parentElement.querySelector("p");
  console.log(errorMessage);

  const storedObj = JSON.parse(localStorage.getItem("userInfo")) || {};

  localStorage.setItem(
    "userInfo",
    JSON.stringify({ ...storedObj, description: textValue })
  );
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

// author input field
authorInput.addEventListener("input", (e) => {
  checkAuthorField(e);
});
blogNameInput.addEventListener("input", (e) => {
  checkTitleField(e);
});
descriptionInput.addEventListener('input',(e)=>{
  checkDescriptionField(e)
})
// image drop containers
inputFile.addEventListener("change", uploadImage);
function deleteCurrentImage() {
  //   adding add image section
  imgView.style.display = "block";
  //   deleting current photo section
  addedImage.style.display = "none";
  //   if there is an image in localstorage we need do delete from it
}

function uploadImage() {
  // creating image url
  const file = inputFile.files[0];
  let imgUrl = undefined;
  //   chechking again if there is no image file
  if (file && file.type.startsWith("image/")) {
    imgUrl = URL.createObjectURL(inputFile.files[0]);
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

// header navigation system
const headerClick = () => {
  window.location.href = "../../index.html";
};
// the first thing check token
const checkToken = async() => {
  const isToken = localStorage.getItem('token')
  console.log(isToken);
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
    authorInput.value = storedField.author;
    blogNameInput.value = storedField.title;
    descriptionInput.value = storedField.description;
  } else {
    return;
  }
};

// checking if there is no token
checkToken();
