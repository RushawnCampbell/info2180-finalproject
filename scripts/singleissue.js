window.addEventListener("load", (event)=>{

    let singleissue = setInterval( ()=>{
        let issuelinks = document.querySelectorAll("table#issuetable tr td a");
        let changearea= document.querySelector("section#changearea");
        if(document.contains(issuelinks[0])) {
            clearInterval(singleissue);
            

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
        }
    }, 1000);

});