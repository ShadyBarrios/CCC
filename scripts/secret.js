const secretButton = document.getElementById("secret_button");
if(secretButton){
    secretButton.addEventListener("click", async() =>
    {
        const input = prompt("what is the code...");
        if(input === "cheap beer forever"){
            setTimeout(() => window.location.href = "secret.html", 500);
        }
    })
}