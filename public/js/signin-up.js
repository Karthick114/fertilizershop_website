const loginForm = document.getElementById("loginForm");

loginForm.addEventListener('submit', (event) => {
   event.preventDefault();
   const user_login = new URLSearchParams(new FormData(loginForm));
   fetch("http://localhost:8080/login", {
      method: 'POST',
      body: user_login
   }).then(res => res.json())
      .then(data => {
         if (data.status) {
            if (data.isUser) {
               toggleAlertmsg("Success","Login Successful");
               unvisble_Login();

            } else {
               toggleAlertmsg("Success","Login Successful");
               window.location.href = "/admin";
            }
         } else {
            toggleAlertmsg("Failed","Login Failed");
            
         }
      });
});

const signUp = document.getElementById("signupForm");

signUp.addEventListener('submit', (event) => {
   event.preventDefault();
   const user_signup = new URLSearchParams(new FormData(signUp));
   fetch("http://localhost:8080/signup", {
      method: 'POST',
      body: user_signup
   }).then(res => res.json())
      .then(data => {
         if (data.status) {
            window.location.href = "/admin";
         } else {
            toggleAlertmsg("Warning","MailID already exists!!");
         }
      });
});