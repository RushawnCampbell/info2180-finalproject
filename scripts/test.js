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

    setInterval( ()=>{

        const homecreatebtn =  document.querySelector("section.issuelistheadparent button#createissuebtn");
        const filterall = document.querySelector("section#filter button#all");
        const filteropen = document.querySelector("section#filter button#open");
        const filtermytickets = document.querySelector("section#filter button#mytickets");
        let filterurl = "";
        const getformUrl = "scripts/getissueform.php".replace( /"[^-0-9+&@#/%=~_|!:,.;\(\)]"/g,'');
        if (document.contains(homecreatebtn)){

            homecreatebtn.onclick=event=>{
                fetch(getformUrl, {method : 'GET'})
                .then(resp => resp.text())
                .then(resp=>{
                    changearea.innerHTML = resp;
                })
            }

            filteropen.onclick =(event)=>{
                filterurl = new URL('http://localhost/info2180-finalproject/scripts/issuelist.php');
                let params = {btn: "open"};
                filterurl.search = new URLSearchParams(params).toString();
                fetch(filterurl, {method : 'GET'})
                .then(resp => resp.text())
                .then(resp=>{
                    changearea.innerHTML = resp;
                    document.querySelector("table#issuetable").classList.add("issuetable");
                })

            }
            filtermytickets.onclick =(event)=>{
                filterurl = new URL('http://localhost/info2180-finalproject/scripts/issuelist.php');
                let params = {btn: "mytickets"};
                filterurl.search = new URLSearchParams(params).toString();
                fetch(filterurl, {method : 'GET'})
                .then(resp => resp.text())
                .then(resp=>{
                    changearea.innerHTML = resp;
                    document.querySelector("table#issuetable").classList.add("issuetable");
                })

            }

        }
        
        

    },1000);


});