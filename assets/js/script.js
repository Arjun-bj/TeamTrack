

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const errorMsgLogin = document.getElementById('errorMsgLogin');
const errorMsgSignup = document.getElementById('errorMsgSignup');
const password = document.getElementById('password');
const email = document.getElementById('email');
const loginBtn = document.getElementById('loginBtn');


signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

// Login validation
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    errorMsgLogin.innerHTML = '';
    if (!email || !password) {
        errorMsgLogin.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> All fields are mandatory!`
        
    }
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log(data);

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        document.getElementById("loginSuccess").style.display = "flex";
        // Redirect to home page
        setTimeout(() => {
            document.getElementById("loginSuccess").style.display = "none";
            window.location.href = '/home';
            
        }, 1000);
    } catch (error) {
        errorMsgLogin.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${error.message}`;   
        return;
    }
});
// End login validation

// Signup validation
document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const userName = document.getElementById('userName').value;
    const signupEmail = document.getElementById('Email').value;
    const signupPassword = document.getElementById('Password').value;
    
    errorMsgSignup.innerHTML = '';
    if(!userName || !signupEmail || !signupPassword) {
        errorMsgSignup.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> All fields are mandatory!`;
        console.log(userName,signupEmail,signupPassword);
    }
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: userName, email: signupEmail, password: signupPassword }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }
        document.getElementById("signupPopup").style.display = "flex";
        setTimeout(() => {
            document.getElementById("signupPopup").style.display = "none";
            window.location.href = '/otp';
        }, 1000);

    } catch (error) {
        errorMsgSignup.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${error.message}`;
        // console.log(error);
    }
});
// End signup validation

