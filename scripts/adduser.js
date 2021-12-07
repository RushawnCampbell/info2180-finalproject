window.addEventListener("load", event => {
    const adduser =  document.querySelector("aside div.menucombo button#adduser");
    const changearea= document.querySelector("section#changearea");
    const cleanUrl = "scripts/getuserform.php".replace( /"[^-0-9+&@#/%=~_|!:,.;\(\)]"/g,'');
    const parserObj = new DOMParser();


    let userForm = setInterval( ()=>{
        if(document.contains(document.getElementById("adduserform"))){
            const adduserbtn = document.querySelector("form#adduserform button#adduserbtn");
            const cleanUrl = "scripts/adduser.php".replace( /"[^-0-9+&@#/%=~_|!:,.;\(\)]"/g,'');
            const fname = document.querySelector("form#adduserform input#fname");
            const lname = document.querySelector("form#adduserform input#lname");
            const password = document.querySelector("form#adduserform input#password");
            const email = document.querySelector("form#adduserform input#email");
            const formstatus = document.querySelector("section#changearea form div.adduserstat");
            const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g;
            const errors =[
                "Your email is invalid, please check and try again.",
                "Your first name is not of the correct format. Please check and try again.",
                "Your last name is not of the correct format. Please check and try again.",
                "An account with this email address already exists. Contact your Administrator for help.",
                
            ];

                adduserbtn.onclick = (event) =>{
                event.preventDefault();

                if ( (email.value.length == 0 || !emailRegex.test(email.value.toLowerCase())) && password.value.length !=0 && fname.value.length !=0 && lname.value.length !=0){
                    formstatus.classList.remove("hide");
                    formstatus.classList.remove("success");
                    formstatus.classList.add("fail");
                    email.classList.remove("inputnormal");
                    email.classList.add("inputerror");
                    fname.classList.remove("inputerror");
                    fname.classList.add("inputnormal");
                    lname.classList.remove("inputerror");
                    lname.classList.add("inputnormal");
                    password.classList.remove("inputerror");
                    password.classList.add("inputnormal");
                    formstatus.innerHTML = "Please check the email field and try again.";
                }
                else if ( (password.value.length == 0 || !passwordRegex.test(password.value))&& email.value.length !=0 && fname.value.length !=0 && lname.value.length !=0){

                    formstatus.classList.remove("hide");
                    formstatus.classList.remove("success");
                    formstatus.classList.add("fail");
                    password.classList.remove("inputnormal");
                    password.classList.add("inputerror");
                    fname.classList.remove("inputerror");
                    fname.classList.add("inputnormal");
                    lname.classList.remove("inputerror");
                    lname.classList.add("inputnormal");
                    email.classList.remove("inputerror");
                    email.classList.add("inputnormal");
                    formstatus.innerHTML = "Check your password field and try again. Your password must be atleast 8 characters, with atleast 1 capital letter, lowercase letter and number.";

                }
                else if(fname.value.length == 0 && email.value.length !=0 && password.value.length !=0 && lname.value.length !=0){
                    formstatus.classList.remove("hide");
                    formstatus.classList.remove("success");
                    formstatus.classList.add("fail");                    fname.classList.remove("inputnormal");
                    fname.classList.add("inputerror");
                    email.classList.remove("inputerror");
                    email.classList.add("inputnormal");
                    password.classList.remove("inputerror");
                    password.classList.add("inputnormal");
                    lname.classList.remove("inputerror");
                    lname.classList.add("inputnormal");
                    formstatus.innerHTML = "You must enter a firstname";
                }
                else if(lname.value.length == 0 && email.value.length !=0 && password.value.length !=0 && fname.value.length !=0){
                    formstatus.classList.remove("hide");
                    formstatus.classList.remove("success");
                    formstatus.classList.add("fail");
                    fname.classList.remove("inputnormal");
                    fname.classList.add("inputerror");
                    email.classList.remove("inputerror");
                    email.classList.add("inputnormal");
                    password.classList.remove("inputerror");
                    password.classList.add("inputnormal");
                    lname.classList.remove("inputnormal");
                    lname.classList.add("inputerror");
                    formstatus.innerHTML = "You must enter a lastname";
                }
                else if (password.value.length == 0 && email.value.length == 0 && fname.value.length == 0 && lname.value.length == 0){

                    formstatus.classList.remove("hide");
                    formstatus.classList.remove("success");
                    formstatus.classList.add("fail");
                    fname.classList.remove("inputnormal");
                    fname.classList.add("inputerror");
                    lname.classList.remove("inputnormal");
                    lname.classList.add("inputerror");
                    email.classList.remove("inputnormal");
                    email.classList.add("inputerror");
                    password.classList.remove("inputnormal");
                    password.classList.add("inputerror");
                    formstatus.innerHTML = "All fields can't be empty.";

                }
                else{
                    const formData = {
                        firstname: fname.value,
                        lastname: lname.value,
                        password: password.value,
                        email: email.value,
                    };
                    fetch(cleanUrl, {
                        method : 'POST',
                        headers: {
                            "Content-Type" : "application/json",
                            "Accept" : "application/json",
                        },
                        body: JSON.stringify(formData),
                        mode: "cors",
                    })
                    .then(resp => resp.text())
                    .then(resp =>{
                        if (parseInt(resp) === 0 || parseInt(resp) === 1 || parseInt(resp) === 2 || parseInt(resp) === 3){
                            formstatus.classList.remove("hide");
                            formstatus.classList.remove("success");
                            formstatus.classList.add("fail");
                            formstatus.innerHTML = errors[parseInt(resp)];
                        }
                        else if (parseInt(resp) === 4){
                            formstatus.classList.remove("hide");
                            formstatus.classList.remove("fail");
                            formstatus.classList.add("success");
                            formstatus.innerHTML = "New user added successfully!"

                        }
                        else{
                            formstatus.classList.remove("hide");
                            formstatus.innerHTML = resp; 
                        }
                    })
                }
            }
            
        
        }
    },1000);


   adduser.onclick = (event) =>{
        event.preventDefault();
        changearea.innerHTML = "";
        fetch(cleanUrl, {method : 'GET'})
        .then(resp => resp.text())
        .then(resp=>{
            //let parsedDom = parserObj.parseFromString(resp, "text/html");
            changearea.innerHTML = resp;
        })
    }
});