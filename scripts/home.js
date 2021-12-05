window.addEventListener("load",event=>{

    let home= document.querySelector("aside div.menucombo button#home");
    let changearea= document.querySelector("section#changearea");
    let issuelinks = document.querySelectorAll("table#issuetable tr td a");
    home.onclick= event=>{
        changearea.innerHTML="";
        let listUrl = "scripts/issuelist.php".replace( /"[^-0-9+&@#/%=~_|!:,.;\(\)]"/g,'');

        fetch(listUrl, {method : 'GET'})
            .then(resp => resp.text())
            .then(resp=>{
            // let parsedDom = parserObj.parseFromString(resp, "text/html");
            changearea.innerHTML =resp;
            document.querySelector("table#issuetable").classList.add("issuetable");
            })
       
    }

    issuelinks.forEach((issuelink)=>{
        issuelink.onclick = event => {
            event.preventDefault();
            let id = issuelink.getAttribute("href");
            let issueUrl = new URL('http://localhost/info2180-finalproject/scripts/singleissue.php');
            let params = {issueid: id};
            issueUrl.search = new URLSearchParams(params).toString();
            fetch(issueUrl, {
                method : 'GET',  
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json",
                },
            })
            .then(resp => resp.text())
            .then(resp=>{
                changearea.innerHTML = "";
                changearea.innerHTML = resp;
            }) 
        }

    });

});