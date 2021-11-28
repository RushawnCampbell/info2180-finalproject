<html>
    <!Doctype html>
    <head>
        <meta charset ="UTF-8"/>
        <meta name= "viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="stylesheet"  href="styles/style.css"/>
        <script  src="scripts/login.js"> </script>
        <title>main</title>
    </head>
    <body>
        <section id="grid-parent">

            <header> 
                <h3 id="logotitle">BugMe Issue Tracker</h3>
            </header>
            <aside>
                <h3 id="logotitle">BugMe Issue Tracker</h3>
            </aside>
            <section id="changearea"> 
                <form>
                    <h2 class="formtitle">Login</h2>
                    <div class="formstatus"> </div>
                     <div class="formgrp"> 
                        <label>Email</label>
                        <input class="inputnormal" type="email" placeholder="abc@example.com" name="loginemail" required>
                     </div>
                     <div class="formgrp"> 
                        <label>Password</label>
                        <input class="inputnormal" type="password" placeholder="Enter password here" name="password" required>
                     </div>
                    <button type= "submit" name="submitbtn" id="submitbtn"> Submit </button>
                </form> 
            </section>    

        </section>
    </body>

</html>