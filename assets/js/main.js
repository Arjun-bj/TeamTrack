const form = document.getElementById("registrationForm");
let newPage = 1
let employeeList = document.getElementById("employeeList")
let start = 0
let end = start + (parseInt(employeeList.value));
let employeData = [];
let employeDatalength
let tableDetails = document.getElementsByClassName("tableDetails");
let searchResult;
let page = 1;
let list = employeeList.value;
let totalPages;
let totalDatas;
let totalCount = document.getElementById("totalCount");
let searchQuery = '';
employeeList.addEventListener("change", function () {
    list = parseInt(this.value);
    // employeeListValue = start + (parseInt(list));
    pagination();
    fetchData(page, list);
    console.log(list);
    console.log(page);
    // dataPerpage(this.value, newPage)
});

document.getElementById("searchInput").addEventListener("input", () => {
    page = 1;
    searchQuery = document.getElementById("searchInput").value
    list = employeeList.value;

    fetchData(page, list)
    // pagination();

});

// Fetching data 
const fetchData = async (page, list) => {
    console.log(list);
    try {
        const response = await fetch(`http://localhost:3000/employees/getDatas?page=${page}&limit=${list}&search=${searchQuery}`);
        const data = await response.json();
        if (data.success) {
            employeData = data.data;
            console.log(employeData);
            totalDatas = data.totalDatas;
            totalPages = data.totalPages;
            searchResult = data.searchResult;
            employeDatalength = employeData.length;
            if (searchQuery) {
                employeData = searchResult;
            }
            totalCount.textContent = `of ${totalDatas}`
            console.log(totalDatas);
            displayData(employeData, page, list)

            pagination();
        } else {
            console.log(data.message);
        }
    } catch (error) {
        console.log(error);
    }
}
fetchData(page, list);
// End fetching data

// Displaying data
function displayData(employeData, page, list) {
    start = (page - 1) * list;
    console.log(start);
    let tmpdata = "";
    const table_body = document.getElementsByClassName('table_body')[0];
    if (employeData.length === 0) {
        tmpdata = `<tr><td colspan="8" style="text-align: center; font-size: 20px;"><img src="/img/user.png" style="height: 30px; margin-right: 10px;"/>Employee not found</td></tr>`;
    } else {
        for (let i = 0; i < employeData.length; i++) {
            console.log(employeData.length)
            tmpdata += `<tr class="tableDetails">`
            tmpdata += `<td scope="row">#${serialNum(start + 1)}</td>`
            tmpdata += `<td>
                        <img class="me-2 rounded-circle" height=35 width=35 src="/uploads/${employeData[i].avatar}"/>
                            ${employeData[i].salutation} ${employeData[i].firstName} ${employeData[i].lastName}
                    </td>`
            tmpdata += `<td>${employeData[i].email}</td>`
            tmpdata += `<td>${employeData[i].phone}</td>`
            tmpdata += `<td>${employeData[i].gender}</td>`
            tmpdata += `<td>${employeData[i].dob}</td>`
            tmpdata += `<td>${employeData[i].country}</td>`
            tmpdata += `<td>
                            <button onclick="button_popup(this.nextElementSibling)" id="dot_btn" class="close_btn  d-flex">
                                <i class="fa-solid fa-ellipsis"></i>
                            </button> 
                            <div id="options_box${i}" class="options_box d-flex flex-column justify-content-between">
                                <a href="/view?id=${employeData[i]._id}" target="_blank" ><i class="fa-regular fa-eye"></i>View Details</a>
                                <a onclick="edit_employee('${employeData[i]._id}')" ><i class="fa-solid fa-pen"></i>Edit</a>
                                <a onclick="delete_employee('${employeData[i]._id}')"><i class="fa-regular fa-trash-can"></i>Delete</a>
                            </div>
                        </td>`
            tmpdata += `</tr>`
            start++
        }
    }
    table_body.innerHTML = tmpdata;
};

// End displaying data 

function clickfunction() {
    let add_form = document.getElementById("add_form");
    let overlay = document.getElementById("overlay");

    add_form.style.display = "block";
    overlay.style.display = "block";
    main_heading.textContent = "Add Employee";
    edit_btn.style.display = "none";
    add_btn.style.display = "block";
    img_upload.style.display = "block";
    edit_form.style.display = "none";
    // add_btn.textContent = "Add Employee"

}
function form_hide() {
    user_details = ""
    add_form.style.display = "none";
    overlay.style.display = "none";
    delete_message.style.display = "none";
    // reload();
    clearForm();
    // error reload
    let form = document.getElementsByTagName('form')[0]
    let inputs = form.getElementsByTagName('input');
    let select = form.getElementsByTagName('select');
    let allInputs = [...inputs, ...select];
    let error = document.getElementsByClassName("error");
    for (let index = 0; index < allInputs.length; index++) {
        if (error[index]) {
            error[index].innerHTML = " ";
        }
        allInputs[index].classList.remove('inputBorder')
    }
    //END error reload
}

const button_popup = (btn) => {
    document.getElementById("optionsOverlay").style.display = "block"
    btn.classList.toggle("active");
}
function optionshide() {
    for (let i = 0; i <= employeeList.value; i++) {
        let box = document.getElementById("options_box" + i)
        if (box.classList.contains('active')) {
            document.getElementById("optionsOverlay").style.display = "none"
            box.classList.remove('active')
        }
    }
}

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
const male = document.getElementById("flexRadioDefault1");
const female = document.getElementById("flexRadioDefault2");
let pin = document.getElementById("pinZip");
let passwords = document.getElementById("password").value;
console.log(passwords);

function formdetails() {

    let user_details =
    {
        salutation: salutation.value,
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        password: password.value,
        email: email.value,
        phone: phone.value,
        dob: birth(dob.value),
        gender: gender(),
        qualifications: qualifications.value,
        address: address.value,
        country: country.value,
        state: state.value,
        city: city.value,
        pin: pin.value

    }

    console.log(user_details)
    return user_details

    function gender() {
        let male = document.getElementById("flexRadioDefault1");
        if (male.checked) {
            return "Male"
        } else {
            return "Female"
        }
    }
}
// slNo function
function serialNum(slno) {
    // slno = Number(slno);

    // if (slno <= 9) {
    //     return "0" + slno
    // }
    // else {
    //     return slno
    // }
    return slno <= 9 ? "0" + slno : slno;
}
console.log(formdetails);
// END slNo function

// Date reverse function
function birth(birthdate) {
    let date = birthdate.split('-').reverse().join('-');
    return date
}
// END date reverse function

// Add employee POST function
function add_employee() {
    console.log(formdetails);
    formValidation()
    try {
        fetch("http://localhost:3000/employees/create",
            {
                method: "POST",
                headers: {
                    "content-Type": "application/json"
                },
                body: JSON.stringify(formdetails()),
            })
            // .then((res) => res.json())
            .then((res) => {
                if (res.ok) {
                    fetchData(page, list, searchQuery);
                    form_hide();
                    popupActive()
                }
                return res.json();
            }).then((result) => {

                avatarUpload(result.data, profileImage)
            })
    } catch (error) {
        console.log(error);
    }
    setTimeout(() => {
        successpopup.classList.remove("show")
    }, 3000);
    setTimeout(() => {
        checkmark.style.display = "block";
    }, 500);
}
// END add employee POST function

// Form clear function
function clearForm() {
    form.reset();
}
// END Form reload function

// Delete function

let delete_message = document.getElementById("delete_message");
let delete_btn = document.getElementById("delete_btn");
function delete_employee(deleteid) {
    document.getElementById("optionsOverlay").style.display = "none"
    delete_message.style.display = "block"
    overlay.style.display = "block"

    delete_btn.addEventListener("click", function () {
        fetch("http://localhost:3000/employees/" + deleteid, {
            method: "DELETE",
        })
            .then((res) => {

                if (res.ok) {
                    console.log('response ok');
                    fetchData(page, list, searchQuery);
                    deletePopup()
                }
            })
        setTimeout(() => {
            successpopup.classList.remove("show")
        }, 3000);
    })
}
// END Delete function

// Edit function
let editEmployeeId
function edit_employee(editId) {
    document.getElementById("optionsOverlay").style.display = "none"
    editEmployeeId = editId
    clickfunction()
    img_upload.style.display = "none";
    main_heading.textContent = "Edit Employee";
    edit_form.style.display = "flex";
    edit_btn.style.display = "block";
    add_btn.style.display = "none";

    fetch("http://localhost:3000/employees/" + editId,)
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
            pin.value = employe.pin
            employe.gender === "Male" ? document.getElementById("flexRadioDefault1").checked = true : document.getElementById("flexRadioDefault2").checked = true;
            // editImg.src = "http://localhost:3000/employees/" + editId + "/avatar";
            editImg.src = `/uploads/${employe.avatar}`
        })
}
// END Edit function

// avatar upload
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
// END avatar upload

//Edit update PUT function
function editUpdate() {
    // const vaild = formValidation();


    if (profileImage) {
        console.log(profileImage);
        avatarUpload(editEmployeeId, profileImage)
    }
    if (formValidation()) {
        fetch("http://localhost:3000/employees/" + editEmployeeId, {
            method: "PUT",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(formdetails())
        })
            .then((res) => {
                if (res.ok) {
                    fetchData(page, list, searchQuery);
                    form_hide();
                    editPopup();
                }
            })
        setTimeout(() => {
            successpopup.classList.remove("show")
        }, 2500);
    }


}
// END Edit PUT update function

// Get URL function

const upload = document.getElementById("upload");
const addImgcover = document.getElementById("addImgcover");
const editImg = document.getElementById("editImg");
const editUpload = document.getElementById("editUpload");

let profileImage;
upload.addEventListener("change", function () {
    profileImage = upload.files[0];
    console.log(profileImage);

    if (profileImage) {
        img_upload.style.display = "none";
        edit_form.style.display = "flex";
    }
    editImg.src = URL.createObjectURL(profileImage);
    console.log(editImg);
})

editUpload.addEventListener("change", function () {
    profileImage = editUpload.files[0];
    editImg.src = URL.createObjectURL(profileImage); fetchData();
})

// END Get URL function

// pagination function

// let totalPages = Math.ceil(employeDatalength / employeeListValue)
var employeeListValue = parseInt(employeeList.value);
// console.log(employeeListValue);

function pagination() {
    newPagesbtn.innerHTML = ""

    for (let i = 1; i <= totalPages; i++) {
        let newBtn = document.createElement("span")
        newBtn.textContent = i;
        newBtn.id = "pagebtn" + i;
        newBtn.onclick = () => {
            page = i
            activePage(newBtn)
            fetchData(page, list);

            console.log(employeData);
        }
        if (i === page) {
            newBtn.classList.add("btnColorActive");
        }
        newPagesbtn.appendChild(newBtn)
    }
}

document.getElementById("firstPage").addEventListener("click", () => {
    if (page > 1) {
        page = 1;
        fetchData(page, list);
        activePage(document.getElementById("pagebtn1"));
    }
});

document.getElementById("lastPage").addEventListener("click", () => {
    if (page < totalPages) {
        page = totalPages;
        fetchData(page, list);
        activePage(document.getElementById(`pagebtn${totalPages}`));
    }
});

document.getElementById("prevPage").addEventListener("click", () => {
    if (page > 1) {
        page--; // Decrement page number
        fetchData(page, list);
        activePage(document.getElementById(`pagebtn${page}`));
    }
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (page < totalPages) {
        page = page + 1;
        fetchData(page, list);
        activePage(document.getElementById(`pagebtn${page}`));
    }
});

const activePage = (newBtn) => {
    document.querySelectorAll("#newPagesbtn span").forEach(pageBtn => {
        pageBtn.classList.remove("btnColorActive");
    });
    newBtn.classList.add("btnColorActive");

}

// End pagination function

// form validation
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
    errorMessage.innerHTML = "";
    document.getElementById(key).classList.remove("inputBorder");
    return true;
}

function checkValue(e) {
    console.log(e.target.id)
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
    genderError.innerHTML = "";
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
    isValid = validateInput("phone", false, true) && isValid;
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

// END form validation
function popupActive() {
    successpopup.classList.add("show")
}
function deletePopup() {
    successpopup.classList.add("show")
    successpopup.style.backgroundColor = "#f5eaec"
    successpopup.style.borderColor = "#EB506C"
    popHead.innerHTML = "DELETED!"
    popSubhead.innerHTML = "Employee deleted successfully!"
    popHead.style.color = "#EB506C"
    checkmark.style.display = "none"
    trashImg.style.display = "block"
}
function editPopup() {
    successpopup.classList.add("show")
    successpopup.style.backgroundColor = "#e8e6f4"
    successpopup.style.borderColor = "#4318FF"
    popHead.innerHTML = "EDIT SUCCESS!"
    popSubhead.innerHTML = "Changes updated successfuly!"
    popHead.style.color = "#4318FF"
    checkmarkCircle.style.fill = "rgb(232, 230, 244)"
    checkmark.style.display = "none"
    editPopImg.style.display = "block"
}

// Logout function
document.getElementById("logoutBtn").addEventListener("click", function () {
    document.getElementById("logoutMainCard").style.display = "flex";
});

document.getElementById("confirmBtn").addEventListener("click", async function () {
    try {
        const response = await fetch('http://localhost:3000/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.getElementById("logoutMainCard").style.display = "none";
            window.location.href = "/";
        } else {
            console.error("Failed to logout");
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById("cancelBtn").addEventListener("click", function () {
    document.getElementById("logoutMainCard").style.display = "none";
});

// End logout function

