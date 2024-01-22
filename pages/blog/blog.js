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
        window.location.href = '../addNewBlog/addNewBlog.html'
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
      window.location.href = '../addNewBlog/addNewBlog.html'
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
// blog html
const main = document. getElementById('main__blog')

const loadBlog = async()=>{
  const blogId = localStorage.getItem('blogId')
  const token = localStorage.getItem('token')
  console.log(blogId);
  const resp = await fetch(`https://george.pythonanywhere.com/api/blogs/12`,{
    method:'GET',
    headers:{
      accept: 'application/json',
      'X-CSRFToken': `${token}`
    }
  })
  // response status is 401
  const data = await resp.json();
  main.innerHTML=`
  <div class="blog__img">
        <img
          src="https://s3-alpha-sig.figma.com/img/f61f/fadf/53c6b0eca0d67f6b1b3b647378282151?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JM6VdU6mXXpbLsl-6LSBj~otjSVxX8e~lbuukxObvHN4VaQ6C2XXf~4T2i9rChTtl7gb515i9i99mo9Ij293mVH83vUCK52NHio9c8iBM7uJDt~hPNkcuSyNywfzsTfR29~gXVJkOe-5KpyinuNlM3NWFlnnz~2~JjInsGmbWtOyqsU6kf~v4iKKLRz6IVOW-3bDeSdMfo2BvkIrOF8LoJZH31LRgqj0mWK4pOZj92dFz0pFzh5yPe6PI7SNT4fDbTxHan6KnNbCRRWm81bhCUeeYk40jQujWCwpOLTau0QhT99iT8pBhWTtxhrEKhTWKNlvmHFyb531mRrq1lKQvw__"
          alt="blog image"
        />
      </div>

      <div class="blog__info">
        <h3>ლილე კs</h3>
        <p><span>02.11.2023</span> • lile.kvaratskhelia@redberry.ge</p>
        <h1>მობილური ფოტოგრაფიის კონკურსის გამარჯვებულთა ვინაობა ცნობილია</h1>
        <div class="blog__info-categories">
          <div class="blog__info-category">market</div>
          <div class="blog__info-category">market</div>
          <div class="blog__info-category">market</div>
        </div>
        <p class="blog__desc">
          6 თვის შემდეგ ყველის ბრმა დეგუსტაციის დროც დადგა. მაქსიმალური
          სიზუსტისთვის, ეს პროცესი ორჯერ გაიმეორეს და ორივეჯერ იმ ყველს მიენიჭა
          უპირატესობა, რომელსაც ჰიპ-ჰოპს ასმენინებდნენ. „მუსიკალური ენერგია
          პირდაპირ ყველის შუაგულში რეზონირებდა“, — აღნიშნა ბერნის ხელოვნების
          უნივერსიტეტის წარმომადგენელმა, მაიკლ ჰერენბერგმა. რა თქმა უნდა, ეს
          ერთი კვლევა საკმარისი არ არის საბოლოო დასკვნების გამოსატანად.
          სანაცვლოდ, მეცნიერებს სურთ, უშუალოდ ჰიპ-ჰოპის ჟანრის სხვადასხვა მუსიკა
          მოასმენინონ რამდენიმე ყველს და უკვე ისინი შეაჯიბრონ ერთმანეთს. აქვე
          საგულისხმოა, რომ როგორც ბერნის მეცნიერები განმარტავენ, ექსპერიმენტს
          საფუძვლად არა ყველის გაუმჯობესებული წარმოება, არამედ კულტურული
          საკითხები დაედო. მათი თქმით, ადამიანებს უყვართ ყველი და მუსიკა,
          ამიტომაც საინტერესოა ამ ორის კავშირის დანახვა.
        </p>
      </div>
  `
}
loadBlog();