const passwordDisplay = document.querySelector("#genpwd");
const copytxt = document.querySelector("#copytxt");
const copyicon = document.querySelector("#copycon");
const pwdlength = document.querySelector("#length");
const sliderip = document.querySelector("#slider");
const uppercheck = document.querySelector("#uppercase");
const lowercheck = document.querySelector("#lowercase");
const numcheck = document.querySelector("#numbers");
const symcheck = document.querySelector("#symbols");
const strengthcol = document.querySelector("#color");
const genpass = document.querySelector(".generate");
const allCheckBox = document.querySelectorAll("input[type = checkbox]");
const keyboardSymbols = "~`!@#$%^&*()-_+={[}]|\\:;\"'<,>.?/";

let password = "";
let passwordlength = 10;
let checkCount= 0 ;
handleslider();

function handleslider() {
  //this functions task is to reflect pwdlen to UI
  sliderip.value = passwordlength;
  pwdlength.innerText = passwordlength;
}

function getrandint(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getnum() {
  return getrandint(1, 10);
}

function getuppercase() {
  return String.fromCharCode(getrandint(65, 91));
}

function getlowercase() {
  return String.fromCharCode(getrandint(97, 122));
}

function getsymbols() {
  let sym = getrandint(0, keyboardSymbols.length);
  return keyboardSymbols.charAt(sym);
}

console.log(1);

function setindicator(backgroundColor) {
  strengthcol.style.backgroundColor = backgroundColor;
}

function setStrength() {
  let hasupper = false;
  let haslower = false;
  let hasnum = false;
  let hassym = false;

  if (uppercheck.checked) hasupper = true;
  if (lowercheck.checked) haslower = true;
  if (numcheck.checked) hasnum = true;
  if (symcheck.checked) hassym = true;

  if (hasupper && haslower && (hasnum || hassym) && passwordlength <= 20) {
    setindicator("green");
  } 
  else if (
    (hasupper ||
    hasupper) && (hasnum || hassym) && passwordlength <= 10)
 {
    setindicator("yellow");
  } 
  else if(passwordlength <= 5){
    setindicator("red");
  }
}
console.log(1);
async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copytxt.innerText = "copied !";
  } catch (e) {
    copytxt.innerText = "copy failed";
  }

  copytxt.classList.add("active");

  setTimeout(() => {
    copytxt.classList.remove("active");
  }, 2000);
}

sliderip.addEventListener("input", (e) => {
  passwordlength = e.target.value;
  handleslider();
});

copyicon.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent();
});


function shufflePassword(array){
    for(let i= array.length-1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el)=>(str += el));
    return str;
}


console.log(1);
function handleCheckboxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) {
      checkCount++;
    }
  });

  if (checkCount > passwordlength) {
    passwordlength = checkCount;
    handleslider();
  }
}

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener('change', handleCheckboxChange);
});

sliderip.addEventListener('input',(e)=>{
passwordlength = e.target.value;
handleslider();
})

console.log(1);
genpass.addEventListener("click", () => {
  if (checkCount == 0) {
    return;
  }

  if (passwordlength < checkCount) {
    passwordlength = checkCount;
    handleslider();
  }
  console.log(1);
  password = "";
  
  let funcArr = [];

  if(uppercheck.checked){
    funcArr.push(getuppercase);
  }

  if(lowercheck.checked){
    funcArr.push(getlowercase);
  }

  if(numcheck.checked){
    funcArr.push(getnum);
  }

  if(symcheck.checked){
    funcArr.push(getsymbols);
  }

for(let i=0;i<funcArr.length;i++){
    password += funcArr[i]();
}

for(let i = 0;i<passwordlength-funcArr.length;i++){
    let randindex = getrandint(0,funcArr.length);
    password += funcArr[randindex]();
}
console.log(1);

password=shufflePassword(Array.from(password));
passwordDisplay.value = password;
setStrength();

});
