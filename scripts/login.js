window.addEventListener("load", event => {
    const emailField = document.querySelector("input[type='email']");
    const passwordField = document.querySelector("input[type='password']");
    const formstatus = document.querySelector("section#changearea form div.formstatus");
    formstatus.classList.add("hide");
    const submitbtn = document.querySelector("section#changearea form button#submitbtn");
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;



    submitbtn.addEventListener("click", event => {
        event.preventDefault();

        if ( (  emailField.value.length == 0 || emailRegex.test(emailField.value.toLowerCase()) ) && passwordField.value.length !=0){
            formstatus.classList.remove("hide");
            formstatus.classList.add("fail");
            emailField.classList.remove("inputnormal");
            emailField.classList.add("inputerror");
            passwordField.classList.remove("inputerror");
            passwordField.classList.add("inputnormal");
            formstatus.innerHTML = "Please check your email field and try again.";
        }

        if (passwordField.value.length == 0 && emailField.value.length !=0){

            formstatus.classList.remove("hide");
            formstatus.classList.add("fail");
            passwordField.classList.remove("inputnormal");
            passwordField.classList.add("inputerror");
            emailField.classList.remove("inputerror");
            emailField.classList.add("inputnormal");
            formstatus.innerHTML = "You must enter a password";

        }

        if (passwordField.value.length == 0 && emailField.value.length == 0){

            formstatus.classList.remove("hide");
            formstatus.classList.add("fail");
            emailField.classList.remove("inputnormal");
            emailField.classList.add("inputerror");
            passwordField.classList.remove("inputnormal");
            passwordField.classList.add("inputerror");
            formstatus.innerHTML = "The email and password fields can't be empty.";

        }


    
    });

    
    
});