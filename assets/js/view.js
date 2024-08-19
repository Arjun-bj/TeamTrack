let url = new URLSearchParams(document.location.search);
let employeeId = url.get("id");
var editId = employeeId;

let employeeImg = document.getElementById("employeeImg");
let employeeName = document.getElementById("employeeName");
let employeeEmail = document.getElementById("employeeEmail");
let employeeGender = document.getElementById("employeeGender");
let employeeAge = document.getElementById("employeeAge");
let employeeDob = document.getElementById("employeeDob");
let employeeNumber = document.getElementById("employeeNumber");
let employeeQualificatiion = document.getElementById("employeeQualificatiion");
let employeeAddress = document.getElementById("employeeAddress");
let employeeUsername = document.getElementById("employeeUsername");


let salutation = document.getElementById("salutation");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let username = document.getElementById("username");
let password = document.getElementById("password");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let dob = document.getElementById("dob");
let qualifications = document.getElementById("qualifications");
let address = document.getElementById("address");
let country = document.getElementById("country");
let state = document.getElementById("state");
let city = document.getElementById("city");
let pinZip = document.getElementById("pinZip");
const male = document.getElementById("flexRadioDefault1");
const female = document.getElementById("flexRadioDefault2");

function fetchdata() {
    fetch("http://localhost:3000/employees/"+ employeeId)
    .then((employeeData) => {
        return employeeData.json()
    })
    .then((employeeDetails) => {
        // employeeImg.src ="http://localhost:3000/employees/"+ employeeDetails.id+"/avatar";
        employeeName.textContent = `${employeeDetails.salutation} ${employeeDetails.firstName} ${employeeDetails.lastName}`
        employeeEmail.textContent = employeeDetails.email;
        employeeGender.textContent = employeeDetails.gender;
        employeeAge.textContent = ageCalculation(employeeDetails.dob);
        employeeDob.textContent = dateOfBirth(employeeDetails.dob);
        employeeNumber.textContent = employeeDetails.phone
        employeeQualificatiion.textContent = employeeDetails.qualifications
        employeeAddress.textContent = employeeDetails.address;
        employeeUsername.textContent = employeeDetails.username;
        employeeImg.src = `/uploads/${employeeDetails.avatar}`;
    })
}
fetchdata()
function ageCalculation(Dob){

    let birthDate = Dob.split("-");
    let dobArray = [];
    for(let i = 0; i < 3;i++){ 
        dobArray.push(parseInt(birthDate[i]));
    }
    const currentDay = new Date();
    const currentYear = currentDay.getFullYear();

    let age = currentYear - dobArray[2];
    // console.log(currentDay.getDate());
    let month = currentDay.getMonth();
    if(month + 1 < dobArray[1] || month +1 === dobArray[1] && currentDay.getDate() < dobArray[0]){
        age --;
    }
    return age;
}

function dateOfBirth(date){
    return date;
}

function clickfunction()
{
    let add_form = document.getElementById("add_form");
    let overlay = document.getElementById("overlay");

    add_form.style.display = "block";
    overlay.style.display = "block";
    edit_btn.style.display = "none";
    edit_form.style.display = "none";
}
function form_hide(){
    user_details = ""
    add_form.style.display = "none"; 
    overlay.style.display = "none";
    delete_message.style.display = "none";
}

// Date reverse function-------------------------------------------------
function birth(birthdate)
{
    let date = birthdate.split('-').reverse().join('-');
    return date
}
// END date reverse function----------------------------------------------

//-------------------------------Delete function----------------------------

let delete_message = document.getElementById("delete_message");
let delete_btn = document.getElementById("delete_btn");
function delete_employee(){

    delete_message.style.display = "block"
    overlay.style.display = "block"
    delete_btn.addEventListener("click",function(){

        fetch("http://localhost:3000/employees/"+employeeId,{
            method:"DELETE",
        })
        .then((res) => {
            if(res.ok){
                deletePopup()
                setTimeout (() => {
                    successpopup.classList.remove("show")
                },3000);
                window.location.href = '/home';
            }
        });
    });
};

//-------------------------------END Delete function----------------------------


//-----------------------------------Edit function-------------------------------
let editEmployeeId
function editEmployee(){

    editEmployeeId = editId
    clickfunction()
    edit_form.style.display = "flex";
    edit_btn.style.display = "block";
    
    fetch("http://localhost:3000/employees/"+editId,)
    .then((data) => {
        return data.json()
    })

    .then((employe) => {
        
        salutation.value = employe.salutation
        firstName.value = employe.firstName
        lastName.value = employe.lastName
        username.value = employe.username
        password.value = employe.password
        email.value = employe.email
        phone.value = employe.phone
        dob.value = birth(employe.dob)
        qualifications.value = employe.qualifications
        address.value = employe.address
        country.value = employe.country
        state.value = employe.state
        city.value = employe.city
        pinZip.value = employe.pin
        employe.gender === "Male" ? document.getElementById("flexRadioDefault1").checked =true: document.getElementById("flexRadioDefault2").checked=true;
        // editImg.src = "http://localhost:3000/employees/" + editId + "/avatar";
        editImg.src = `/uploads/${employe.avatar}`
    })

} 
//------------------------------------END Edit function-----------------------------------

function avatarUpload(Id, employeeImg) {

    let employeeAvatardata = new FormData()
    employeeAvatardata.append("avatar", employeeImg)
    try {
        fetch("http://localhost:3000/employees/" + Id + "/avatar", {

            method: "POST",
            body: employeeAvatardata
        })
        
    } catch (error) {
        console.log(error);
    }
}

//--------------------------------- Edit update PUT function--------------------------------
function editUpdate(){
    console.log(editEmployeeId);
    
if(profileImage){
    avatarUpload(editEmployeeId,profileImage)
}
if (formValidation()) {
    fetch("http://localhost:3000/employees/"+editEmployeeId,{
        method:"PUT",
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify(formdetails())
    })
    .then((res) => {
        if(res.ok){
            fetchdata()
            form_hide()
            editPopup()
        }
    })
    setTimeout (() => {
        successpopup.classList.remove("show")
    },2500);
}
}
// END Edit PUT update function--------------------------------------------

// Get URL function--------------------------------------------------------

const upload = document.getElementById("upload");
const addImgcover = document.getElementById("addImgcover");
const editImg = document.getElementById("editImg");
const editUpload = document.getElementById("editUpload");

let profileImage;
// upload.addEventListener("change",function(){
//     profileImage = upload.files[0];
//     console.log(profileImage);
    
//     if(profileImage){
//         img_upload.style.display = "none";
//         edit_form.style.display = "flex";
//     }
//     editImg.src=URL.createObjectURL(profileImage);
//     console.log(editImg);
// })

editUpload.addEventListener("change",function(){
    profileImage = editUpload.files[0];
    editImg.src=URL.createObjectURL(profileImage);
})

//END Get URL function-----------------------------------------------------

function formdetails()
{
let user_details = 
{
    salutation:salutation.value,
    firstName:firstName.value,
    lastName:lastName.value,
    username:username.value,
    password:password.value,
    email:email.value,
    phone:phone.value,
    dob:birth(dob.value),
    gender:gender(),
    qualifications:qualifications.value,
    address:address.value,
    country:country.value,
    state:state.value,
    city:city.value,
    pinZip:pinZip.value
}
console.log(user_details)
return user_details

function gender()
{
    let male = document.getElementById("flexRadioDefault1");
    if(male.checked){
        return "Male"
    }else{
        return "Female"
    }
}
}

//form validation------------------------------------------------------------------------------
function validateInput(key, isEmail = false, isPhone = false) {
    let input = document.getElementById(key).value
    let errorMessage = document.getElementById(`${key}Error`);

    function frstLetterCapitalizing(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    if (!input) {
        errorMessage.innerHTML = `<i class="material-symbols-outlined">error</i> ${frstLetterCapitalizing(key)} cannot be empty`
        document.getElementById(key).classList.add("inputBorder");
        return false;
    }

    if (isEmail && !emailFormatValidate(input)) {
        errorMessage.innerHTML = `<i class="material-symbols-outlined">error</i>Invalid email address`;
        document.getElementById(key).classList.add("inputBorder");
        return false;
    }

    if (isPhone && !phoneFormatValidate(input)) {
        errorMessage.innerHTML = `<i class="material-symbols-outlined">error</i>Invalid phone number`;
        document.getElementById(key).classList.add("inputBorder");
        return false;
    }

    if (key === "password") {
        const passwordValidateResult = passwordValidation(input);
        if (passwordValidateResult !== true) {
            errorMessage.innerHTML = passwordValidateResult;
            document.getElementById(key).classList.add("inputBorder");
            return false;
        }
    }
    
    errorMessage ? errorMessage.innerHTML = "" : null;
    document.getElementById(key).classList.remove("inputBorder");
    return true;
}

function emailFormatValidate(email) {
    let emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailFormat.test(email);
}
function phoneFormatValidate(phone) {
    let phoneFormat = /^\+?[0-9]{10,15}$/;
    return phoneFormat.test(phone);
}
function passwordValidation(password) {
    if (!password) {
        return `<i class="material-symbols-outlined">error</i>Password cannot be empty`;
    }

     if (password.length < 6) {
        return `<i class="material-symbols-outlined">error</i>Choose a stronger password`;
    }
    return true;
}
function genderValidation() {
    let male = document.getElementById("flexRadioDefault1");
    let female = document.getElementById("flexRadioDefault2"); 
    genderError = document.getElementById("genderError");

    if (!male.checked && !female.checked) {
        genderError.innerHTML = `<i class="material-symbols-outlined">error</i>gender cannot be empty`;
        male.classList.add("inputBorder");
        female.classList.add("inputBorder");
        return false;
    }
    genderError.innerHTML ="";
    male.classList.remove("inputBorder");
    female.classList.remove("inputBorder");
    return true;
}


function formValidation() {
    let isValid = true;

    isValid = validateInput("salutation") && isValid;
    isValid = validateInput("firstName") && isValid;
    isValid = validateInput("lastName") && isValid;
    isValid = validateInput("username") && isValid;
    isValid = validateInput("password") && isValid;
    isValid = validateInput("email", true) && isValid;
    isValid = validateInput("phone",false, true) && isValid;
    isValid = validateInput("dob") && isValid;
    isValid = validateInput("qualifications") && isValid;
    isValid = validateInput("address") && isValid;
    isValid = validateInput("country") && isValid;
    isValid = validateInput("state") && isValid;
    isValid = validateInput("city") && isValid;
    isValid = genderValidation() && isValid;
    isValid = validateInput("pinZip") && isValid;

    return isValid;
}

//END form validation-------------------------------------------------------------------------
function popupActive(){
    successpopup.classList.add("show")
} 
function deletePopup(){
    successpopup.classList.add("show")
    successpopup.style.backgroundColor = "linear-gradient(150deg, #301F81 12.51%, #0F0441 89.53%)"
    successpopup.style.borderColor ="#EB506C"
    popHead.innerHTML = "DELETED!"
    popSubhead.innerHTML = "Employee deleted successfully!"
    popHead.style.color = "#EB506C"
    checkmark.style.display ="none"
    trashImg.style.display = "block"
}
function editPopup(){
    successpopup.classList.add("show")
    successpopup.style.backgroundColor ="#e8e6f4"
    successpopup.style.borderColor = "#4318FF"
    popHead.innerHTML = "EDIT SUCCESS!"
    popSubhead.innerHTML = "Changes updated successfuly!"
    popHead.style.color = "#4318FF"
    // checkmark.style.stroke = "#4318FF"
    // checkmarkCircle.style.stroke = "#4318FF"
    checkmarkCircle.style.fill = "rgb(232, 230, 244)"
    checkmark.style.display ="none"
    editPopImg.style.display = "block"
}
