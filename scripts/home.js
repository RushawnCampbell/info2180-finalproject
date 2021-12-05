window.addEventListener("load",event=>{

    const home= document.querySelector("aside div.menucombo button#home");
    const changearea= document.querySelector("section#changearea");

    home.onclick= event=>{
        changearea.innerHTML="";
        const listUrl = "scripts/issuelist.php".replace( /"[^-0-9+&@#/%=~_|!:,.;\(\)]"/g,'');
        fetch(listUrl, {method : 'GET'})
        .then(resp => resp.text())
        .then(resp=>{
           // let parsedDom = parserObj.parseFromString(resp, "text/html");
            changearea.innerHTML =resp;
            document.querySelector("table#issuetable").classList.add("issuetable");
        })
    }

});