const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imgView = document.getElementById("img-view");
const addedImage = document.querySelector(".img-view__added");

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

// the first thing check token
const checkToken = () => {
  const localToken = localStorage.getItem("user");
  if (!localToken) {
    window.location.href = "../../index.html";
    console.log(window.location.href);
  } else {
    return;
  }
};

// checking if there is no token
checkToken();
