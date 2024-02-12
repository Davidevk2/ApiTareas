
const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", login);

function login(){
    let inputNombre = document.getElementById("username");
    let inputPass = document.getElementById("password");

    if(inputNombre.value != "" && inputPass.value != ""){

        fetch("http://localhost:3000/usuarios")
        .then(respuesta =>{ return respuesta.json()})
        .then(data => {
         
            let usuario = data.filter(user =>{
                return inputNombre.value == user.username && inputPass.value == user.password;
            })

            console.log(usuario);

            if(usuario.length > 0){
                let nombre = usuario[0].username;
                let idUser = usuario[0].id;

                localStorage.setItem("nombre", nombre);
                localStorage.setItem("id", idUser);

                location.href = "admin.html";

            }else{
                alert("usuario y/o contraseña incorrectos");
            }
            
        })

    }else{
        alert("los campos están vacios!");
    }

}