//LOGIN//

const element = {
    password: document.querySelector("#password"),
    email: document.querySelector("#email"),
    submit: document.querySelector("#submitUserInfo"),
};


let boutonLogin = element.submit.addEventListener("click", (a) => {
    a.preventDefault();

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
        email: element.email.value,
        password: element.password.value,
        }),
        })
        .then((response) => response.json())
        .then((data) => {
            sessionStorage.setItem("Token", data.token);

            if (data.message || data.error) {
                alert("Erreur dans l\'identifiant et le mot de passe");
            } else {
                sessionStorage.setItem("isConnected", JSON.stringify(true));
                window.location.replace("index.html");
            }
        })
});





    

 








