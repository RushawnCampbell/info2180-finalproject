const cleanUrl = "scripts/home.php".replace( /"[^-0-9+&@#/%=~_|!:,.;\(\)]"/g,'');
fetch(cleanUrl, {method : 'GET'})
.then(resp=> resp.text())
.then(resp => {
    if (resp == "home"){
        const changearea= document.querySelector("section#changearea");
        changearea.style.background="red";
    }
})