window.addEventListener("load", (event)=>{

    let issueupdatecheck = setInterval( ()=>{
        
        const btnparent = document.querySelector("aside#issueaside");
        if(document.contains(btnparent)){
            let mkasclose = document.querySelector("#issueaside button#mkasclose");
            let mkascloseval = mkasclose.getAttribute("chk");
            let mkinpro = document.querySelector("#issueaside button#mkinpro");
            let metap = document.querySelector("#issuebody  #contentcombo section#issuemetasec p#updated");
            let metastat = document.querySelector(".infogrp span#statuspan")
            let updateIssueUrl = "";
                
                mkasclose.onclick = event => {
                    event.preventDefault();
                    updateIssueUrl = new URL(`http://localhost/info2180-finalproject/scripts/issueupdate.php`);
                    let params = {check: "mkasclose", issueid: mkascloseval};
                    updateIssueUrl.search = new URLSearchParams(params).toString();
                    fetch(updateIssueUrl, {
                        method : 'POST',  
                    })
                    .then(resp => resp.text())
                    .then(resp=>{
    
                        metap.innerHTML= resp.substr(0, resp.indexOf('*'))
                        metastat.innerHTML = resp.substring(resp.indexOf('*') + 1);
                    }) 
                     
                }
                mkinpro.onclick = event => {
                    event.preventDefault();
                    updateIssueUrl = new URL(`http://localhost/info2180-finalproject/scripts/issueupdate.php`);
                    let params = {check: "mkinpro", issueid: mkascloseval};
                    updateIssueUrl.search = new URLSearchParams(params).toString();
                    fetch(updateIssueUrl, {
                        method : 'POST',
                    })
                    .then(resp => resp.text())
                    .then(resp=>{
                        
                        metap.innerHTML= resp.substr(0, resp.indexOf('*'));
                        metastat.innerHTML = resp.substring(resp.indexOf('*') + 1);
                    })  
                }   
        }
    }, 1000);

});