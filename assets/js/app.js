
const btnAgregar = document.getElementById("btnAgregar");
const btnEditar = document.getElementById("btnEditar");
btnEditar.style.display = "none";

btnAgregar.addEventListener("click", crearTarea);
btnEditar.addEventListener("click", editarTarea);

function crearTarea(){
    let inputNombre = document.getElementById("inputNombre");
    let inputDescrip = document.getElementById("inputDescrip");
    let inputCategoria = document.getElementById("inputCategoria");
    let inputEstado = document.getElementById("inputEstado");


    if(inputNombre.value != "" && inputDescrip.value != "" && inputCategoria.value != "" && inputEstado.value != ""){

        let tarea = {
            nombre: inputNombre.value,
            descripcion: inputDescrip.value,
            categoriaId: inputCategoria.value,
            estado: inputEstado.value
        }

        // hacer peticion al API (endPoint)
        fetch("http://localhost:3000/tareas", 
            {method: "POST",
            headers: {"Content-Type":"application/json"},
            body:  JSON.stringify(tarea) 
        })
        .then(respuesta => { return respuesta.json()})
        .then(data =>{
            alert("Se ha registrado con exito!");
            limpiarDatos()
            // console.log(data);
        })

    }else{
        alert("Los campos están vacios!");
    }
    // console.log(inputCategoria, inputDescrip, inputNombre, inputEstado);

}


function cargarTareas(){

    const divTareas = document.getElementById("lista-tareas");
    let row = document.createElement("div");
    row.classList.add("row");
    divTareas.appendChild(row);

    
    fetch("http://localhost:3000/tareas")
    .then(respusta =>{
        return respusta.json();
    }).then(data =>{
        console.log(data);

        data.forEach(tarea => {
            let card = document.createElement("div");
            card.classList.add("card", "col-md-4");
            row.appendChild(card);

            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            card.appendChild(cardBody);

            let nombre = document.createElement("h4");
            nombre.innerText = tarea.nombre;
            cardBody.appendChild(nombre);

            let descripcion = document.createElement("p");
            descripcion.innerText = tarea.descripcion;
            cardBody.appendChild(descripcion);

            let estado = document.createElement("span");
            estado.innerText = tarea.estado;
            cardBody.appendChild(estado);

            let categoria = document.createElement("span");
            categoria.innerText = tarea.categoriaId;
            cardBody.appendChild(categoria);

            let opciones = document.createElement("div");
            opciones.classList.add("card-footer");
            opciones.innerHTML = `
            <button class="btn btn-primary" onclick="cargarEditar('${tarea.id}')" >Editar</button>`;
            card.appendChild(opciones);


        });
    })
}

function cargarCategorias(){

    let inputCategoria = document.getElementById("inputCategoria");

    fetch("http://localhost:3000/categorias")
        .then(respuesta => { return respuesta.json() })
        .then(data => {

            data.forEach((categoria) => {
                
                let option = document.createElement("option");
                option.setAttribute("value", `${categoria.id}`);
                option.innerText = categoria.nombre;
                inputCategoria.appendChild(option);
            });

        })
}

cargarTareas();
cargarCategorias();

function cargarEditar(id){

    fetch("http://localhost:3000/tareas/"+id)
        .then(respusta => {
            return respusta.json();
        }).then(data => {
            console.log(data);

            let inputNombre = document.getElementById("inputNombre").value = data.nombre;
            let inputDescrip = document.getElementById("inputDescrip").value = data.descripcion;
            let inputCategoria = document.getElementById("inputCategoria").value = data.categoriaId;
            let inputEstado = document.getElementById("inputEstado").value  = data.estado;

            localStorage.setItem("idTarea", `${data.id}`);

            btnEditar.style.display = "block";
            btnAgregar.style.display = "none";


        })
}

function editarTarea(){
    let id = localStorage.getItem("idTarea");

    let inputNombre = document.getElementById("inputNombre");
    let inputDescrip = document.getElementById("inputDescrip");
    let inputCategoria = document.getElementById("inputCategoria");
    let inputEstado = document.getElementById("inputEstado");


    if (inputNombre.value != "" && inputDescrip.value != "" && inputCategoria.value != "" && inputEstado.value != "") {

        let tarea = {
            nombre: inputNombre.value,
            descripcion: inputDescrip.value,
            categoriaId: inputCategoria.value,
            estado: inputEstado.value
        }
        fetch("http://localhost:3000/tareas/"+id,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tarea)
            })
            .then(respuesta => { return respuesta.json() })
            .then(data => {
                alert("Se ha actualizado con exito!");
                btnAgregar.style.display = "block";
                btnEditar.style.display = "none";
                limpiarDatos();
                location.href = "";
                // console.log(data);
            })


    }else{
        alert("los campos estan vacios!")
    }

}

function limpiarDatos(){
    // forma 1
    let formulario = document.querySelector(".formTareas");
    formulario.reset();

    // forma 2
    // let inputNombre = document.getElementById("inputNombre").value = "";
    // let inputDescrip = document.getElementById("inputDescrip").value = "";

}