

const btnAgregar = document.getElementById("btnAgregar");

const btnEditar = document.getElementById("btnEditar");
btnEditar.style.display = "none";

btnAgregar.addEventListener("click", crearCategoria);
btnEditar.addEventListener("click", editarCategoria);

window.addEventListener("DOMContentLoaded", cargarCategorias);

function crearCategoria(){
    let inputNombre = document.getElementById("nombre");
    let inputDescript = document.getElementById("descrip");


    if(inputNombre.value != "" && inputDescript.value != ""){

        let categoria = {
            nombre: inputNombre.value,
            descripcion: inputDescript.value
        }

        fetch("http://localhost:3000/categorias", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoria)
        })
        .then(respuesta =>{
             return respuesta.json();
        }).then(data=>{
            alert("Se ha registrado con exito!");
            limpiarDatos();
        })

    }else{
        alert("Los campos están vacios!")

    }
}


function cargarCategorias(){
    const tbody = document.getElementById("tbody");

    fetch("http://localhost:3000/categorias")
    .then( respuesta =>{ return respuesta.json()})
    .then(data =>{

        data.forEach((categoria, idx) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${1+idx++}</td>
                <td>${categoria.id}</td>
                <td>${categoria.nombre}</td>
                <td>${categoria.descripcion}</td>
                <td><button class="btn btn-primary" onclick="cargarEditar('${categoria.id}')">Editar</button>
            <button class="btn btn-danger" onclick="eliminarCategoria('${categoria.id}')">Eliminar</button></td>
            `
            tbody.appendChild(row);
        });

    }) 

}

function cargarEditar(id){
    
    fetch("http://localhost:3000/categorias/"+id)
        .then(respuesta => { return respuesta.json() })
        .then(data => {

            btnAgregar.style.display = "none";
            btnEditar.style.display = "block";
            let inputNombre = document.getElementById("nombre").value = data.nombre;
            let inputDescript = document.getElementById("descrip").value = data.descripcion;
            localStorage.setItem("idCategoria", data.id);

        })

}


function editarCategoria(){

    let id = localStorage.getItem("idCategoria");
    let inputNombre = document.getElementById("nombre");
    let inputDescript = document.getElementById("descrip");


    if (inputNombre.value != "" && inputDescript.value != "") {

        let categoria = {
            nombre: inputNombre.value,
            descripcion: inputDescript.value
        }

        fetch("http://localhost:3000/categorias/"+id, {
            method: "PATCH",//PUT o PATCH
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(categoria)
        })
        .then(respuesta =>{
            return respuesta.json();
        }).then(data =>{
            alert("Se ha actualizado con exito!");
            btnEditar.style.display = "none";
            btnAgregar.style.display = "block";
            localStorage.removeItem("idCategoria");
            limpiarDatos();
            location.href = "";
        })


    }else{
        alert("Los campos están vacios!");
    }
}


function eliminarCategoria(id){

    if(confirm("Seguro que quieres eliminar este elemento:" + id +" ?")){
       
        fetch("http://localhost:3000/categorias/"+id, {method: "DELETE"})
        .then(respuesta =>{
            return respuesta.json();
        })
        .then(data =>{
            alert("Se ha eliminado con exito!");
            location.href = "";
        })

    }else{
        console.log("No lo  vamos a eliminar");

    }
}


function limpiarDatos() {
    // forma 1
    let formulario = document.querySelector(".formCategorias");
    formulario.reset();

}
