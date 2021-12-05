window.addEventListener("load", event =>{

    const newissue =  document.querySelector("aside div.menucombo button#newissue");
    const changearea= document.querySelector("section#changearea");
    const cleanUrl = "scripts/getissueform.php".replace( /"[^-0-9+&@#/%=~_|!:,.;\(\)]"/g,'');
    const parserObj = new DOMParser();

    let issueForm = setInterval( ()=>{
        if(document.contains(document.getElementById("issueform"))){
            const addissuebtn = document.querySelector("form#issueform button#addissuebtn");
            const cleanUrl2 = "scripts/newissue.php".replace( /"[^-0-9+&@#/%=~_|!:,.;\(\)]"/g,'');
            const title = document.querySelector("form#issueform input#title");
            const descript = document.querySelector("form#issueform textarea#txtarea");
            const assign = document.querySelector("form#issueform select#assign");
            const type = document.querySelector("form#issueform select#type");
            const priority = document.querySelector("form#issueform select#priority");
            const formstatus = document.querySelector("section#changearea form#issueform div.newissuestat");

            addissuebtn.onclick = (event)=>{
                event.preventDefault();
                if (title.value.length ==0 && descript.value.length !=0 && assign.options[assign.selectedIndex].value.length !=0 && type.options[type.selectedIndex].value.length !=0 && priority.options[priority.selectedIndex].value.length !=0 ){
                    formstatus.classList.remove("hide");
                    formstatus.classList.remove("success");
                    formstatus.classList.add("fail");
                    title.classList.remove("inputnormal");
                    title.classList.add("inputerror");
                    descript.classList.remove("txtAErr");
                    descript.classList.add("txtANormal");
                    assign.classList.remove("inputerror");
                    assign.classList.add("inputnormal");
                    type.classList.remove("inputerror");
                    type.classList.add("inputnormal");
                    priority.classList.remove("inputerror");
                    priority.classList.add("inputnormal");
                }
                else if (descript.value.length ==0 && title.value.length !=0 && assign.options[assign.selectedIndex].value.length !=0 && type.options[type.selectedIndex].value.length !=0 && priority.options[priority.selectedIndex].value.length !=0 ){
                    formstatus.classList.remove("hide");
                    formstatus.classList.remove("success");
                    formstatus.classList.add("fail");
                    title.classList.remove("inputerror");
                    title.classList.add("inputnormal");
                    descript.classList.remove("txtANormal");
                    descript.classList.add("txtAErr");
                    assign.classList.remove("inputerror");
                    assign.classList.add("inputnormal");
                    type.classList.remove("inputerror");
                    type.classList.add("inputnormal");
                    priority.classList.remove("inputerror");
                    priority.classList.add("inputnormal");
                }
                else if (assign.options[assign.selectedIndex].value.length ==0 && descript.value.length !=0 && title.value.length !=0 && type.options[type.selectedIndex].value.length !=0 && priority.options[priority.selectedIndex].value.length !=0 ){
                    formstatus.classList.remove("hide");
                    formstatus.classList.remove("success");
                    formstatus.classList.add("fail");
                    title.classList.remove("inputerror");
                    title.classList.add("inputnormal");
                    descript.classList.remove("txtAErr");
                    descript.classList.add("txtANormal");
                    assign.classList.remove("inputnormal");
                    assign.classList.add("inputerror");
                    type.classList.remove("inputerror");
                    type.classList.add("inputnormal");
                    priority.classList.remove("inputerror");
                    priority.classList.add("inputnormal");
                }
                else if (type.options[type.selectedIndex].value.length ==0 && descript.value.length !=0 && assign.options[assign.selectedIndex].value.length !=0 && title.value.length !=0 && priority.options[priority.selectedIndex].value.length !=0 ){
                    formstatus.classList.remove("hide");
                    formstatus.classList.remove("success");
                    formstatus.classList.add("fail");
                    title.classList.remove("inputerror");
                    title.classList.add("inputnormal");
                    descript.classList.remove("txtAErr");
                    descript.classList.add("txtANormal");
                    assign.classList.remove("inputerror");
                    assign.classList.add("inputnormal");
                    type.classList.remove("inputnormal");
                    type.classList.add("inputerror");
                    priority.classList.remove("inputerror");
                    priority.classList.add("inputnormal");
                }
                else if (priority.options[priority.selectedIndex].value.length ==0 && descript.value.length !=0 && assign.options[assign.selectedIndex].value.length !=0 && type.options[type.selectedIndex].value.length !=0 && title.value.length !=0 ){
                    formstatus.classList.remove("hide");
                    formstatus.classList.remove("success");
                    formstatus.classList.add("fail");
                    title.classList.remove("inputerror");
                    title.classList.add("inputnormal");
                    descript.classList.remove("txtAErr");
                    descript.classList.add("txtANormal");
                    assign.classList.remove("inputerror");
                    assign.classList.add("inputnormal");
                    type.classList.remove("inputerror");
                    type.classList.add("inputnormal");
                    priority.classList.remove("inputnormal");
                    priority.classList.add("inputerror");
                }
                else if (title.value.length ==0 && descript.value.length ==0 && assign.options[assign.selectedIndex].value.length ==0 && type.options[type.selectedIndex].value.length ==0 && priority.value.length ==0 ){
                    formstatus.classList.remove("hide");
                    formstatus.classList.remove("success");
                    formstatus.classList.add("fail");
                    title.classList.remove("inputnormal");
                    title.classList.add("inputerror");
                    descript.classList.remove("txtANormal");
                    descript.classList.add("txtAErr");
                    assign.classList.remove("inputnormal");
                    assign.classList.add("inputerror");
                    type.classList.remove("inputnormal");
                    type.classList.add("inputerror");
                    priority.classList.remove("inputnormal");
                    priority.classList.add("inputerror");
                }
                else{
                    const formData = {
                        title: title.value,
                        description: descript.value,
                        assign: assign.options[assign.selectedIndex].value,
                        type: type.options[type.selectedIndex].value,
                        priority: priority.options[priority.selectedIndex].value,
                    };
                    fetch(cleanUrl2, {
                        method : 'POST',
                        headers: {
                            "Content-Type" : "application/json",
                            "Accept" : "application/json",
                        },
                        body: JSON.stringify(formData),
                        mode: "cors",
                    })
                    .then(resp => resp.text())
                    .then(resp => {
                        formstatus.classList.remove("hide");
                        formstatus.classList.remove("fail");
                        formstatus.classList.add("success");
                        console.log(resp);
                        if (resp == "OK"){
                            formstatus.classList.add("success");
                            formstatus.classList.remove("fail");
                            formstatus.innerHTML = "New issue added successfully!"
                        }
                        else if(resp == "NO"){
                            formstatus.classList.remove("success");
                            formstatus.classList.add("fail");
                            formstatus.innerHTML = "Unable to create issue.";
                        }

                    })
                }
            };  
        }
    }, 1000 );

    newissue.onclick = (event) =>{
        event.preventDefault();
        changearea.innerHTML = "";
        fetch(cleanUrl, {method : 'GET'})
        .then(resp => resp.text())
        .then(resp=>{
            let parsedDom = parserObj.parseFromString(resp, "text/html");
            changearea.appendChild(parsedDom.getElementById("issueform"));
        })
    }
});