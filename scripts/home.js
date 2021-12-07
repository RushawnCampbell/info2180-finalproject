window.addEventListener("load",event=>{

    window.onbeforeunload = function() {
        alert("Don't")
    }

    let home= document.querySelector("aside div.menucombo button#home");
    let changearea= document.querySelector("section#changearea");
    let issuelinks = document.querySelectorAll("table#issuetable tr td a");
    let filterurl = "";
    home.onclick= event=>{
        changearea.innerHTML="";
        const listUrl = new URL('http://localhost/info2180-finalproject/scripts/issuelist.php');
        let params = {btn: "all"};
        listUrl.search = new URLSearchParams(params).toString();
        fetch(listUrl, {method : 'GET'})
            .then(resp => resp.text())
            .then(resp=>{
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
        const getformUrl = "scripts/getissueform.php".replace( /"[^-0-9+&@#/%=~_|!:,.;\(\)]"/g,'');
        if (document.contains(homecreatebtn)){
            let filterall = document.querySelector("section#filter button#all");
            let filteropen = document.querySelector("section#filter button#open");
            let filtermytickets = document.querySelector("section#filter button#mytickets");
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

            filterall.onclick =(event)=>{
                filterurl = new URL('http://localhost/info2180-finalproject/scripts/issuelist.php');
                let params = {btn: "all"};
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