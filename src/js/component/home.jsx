import { useEffect, useState } from "react";
import React from "react";

const Home = () => {
	const [input, setImput] = useState("")
	const [elements, setElements] = useState([])
	const [datos, setDatos] = useState([])

	function cambioDeImput(e){
		setImput(e.target.value)
		console.log(e.target.value)

};

function getInformation() {
    console.log("get infoooooo");
    fetch("https://playground.4geeks.com/apis/fake/todos/user/joseRegueiro")
        .then((response) => response.json())
        .then((data) => {
            setDatos(data);
            setElements(data.map(item => item.label)); // Actualizar elements con las etiquetas
        })
        .catch(error => console.error("Error fetching data:", error));
}

useEffect(() => {
    console.log("Ya se cargó el componente");
    getInformation();
},[]);

function deleteElementById(index) {
    const updatedElements = [...elements];
    updatedElements.splice(index, 1);
    setElements(updatedElements);
    updateToDoArray(updatedElements);
}
  
  function cambiarElement(){
	  if(input !== "" ){
		  setElements(elements.concat(input))}
		  setImput("")
		  elements.forEach((element, index) => {
			  if (element === input) {
				  deleteElementById(index);
			  }
		  });
  };



  function addToDoArray() {
    const allTasks = elements.map(label => ({ done: false, label }));
    fetch("https://playground.4geeks.com/apis/fake/todos/user/joseRegueiro", {
        method: "PUT",
        body: JSON.stringify(allTasks),
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorBody => {
                console.log("Respuesta del servidor (error):", errorBody);
                throw new Error(`HTTP error! Status: ${response.status}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log("Solicitud exitosa:", data);
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
    });
}

function cambiarElement() {
    if (input !== "") {
        const newElements = [input, ...elements];
        setElements(newElements);
        setImput("");

        updateToDoArray(newElements);
    }
}

function updateToDoArray(newElements) {
    fetch("https://playground.4geeks.com/apis/fake/todos/user/joseRegueiro", {
        method: "PUT",
        body: JSON.stringify(newElements.map(label => ({ done: false, label }))),
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorBody => {
                console.log("Respuesta del servidor (error):", errorBody);
                throw new Error(`HTTP error! Status: ${response.status}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log("Solicitud exitosa:", data);
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
    });

    useEffect((createUser) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([])
        };
        fetch('https://playground.4geeks.com/apis/fake/todos/user/joseRegueiro', requestOptions)
            .then(response => response.json())
            .then(data => setPostId(data.id));
    }, []);


	
}

function deleteAllExceptFirst() {
	if (elements.length > 1) {
		const updatedElements = [elements[0]];
		setElements(updatedElements);
		updateToDoArray(updatedElements);
	}  else {
		setElements(["Tarea por defecto"]);
        updateToDoArray(["Tarea por defecto"]);
	}
}

 function createUser(){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([])
        };
        fetch('https://playground.4geeks.com/apis/fake/todos/user/joseRegueiro', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }






  
  return (
	  <>
	  	{/* { datos.map( (item)=> <p key={item.id}>{item.label}</p> ) } */}
	  	  <h1 className="display-1 toDos mb-5 ">ToDos</h1>
          <div className="container position-relative">
          <button title="Te cree este botón para que no tuvieras que usar Postman, abrazo" onClick={createUser} className="createBoton mt-5 mb-3 position-absolute bottom-0 start-50 translate-middle-x">Crear usuario</button>	
          </div>
		  <div className="contenedor">
		  <div className="input-group mb-3">
			<label></label>
			
			<input 
 		 	className="elInput" 
  			placeholder="What needs to be done?" 
  			onKeyDown={(e) => { 
    			if (e.keyCode === 13) {
     				cambiarElement(e);
      				addToDoArray(e);
   	 		}
  			}} 
  			value={input} 
  			type="text" 
  			onChange={(e) => {
    				cambioDeImput(e);
    				addToDoArray(e);
 			 }}/>
		  </div>
		  {elements.map((item, index) => (
    		<div className="position-relative contenedorDo" key={index}>
        	<p className="does ms-0 border-top" id={`task-${index}`}>
            {item}
        	</p>
        	<button
            className="position-absolute top-50 end-0 translate-middle-y me-2 deleteBoton"
            onClick={() => deleteElementById(index)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
        	</button>
    		</div>
			))}
		  <p className="border-top border-bottom footer">{elements.length} items left</p>
		  </div>
		  <p className="border footer1">{elements.length} items left</p>
		  <p className="border footer2">{elements.length} items left</p>
		  <div className="position-relative">
		  <button className="deleteBoton2 position-absolute top-50 start-50 translate-middle mt-5" onClick={deleteAllExceptFirst}>Eliminar todas la tareas</button>
		  </div>
	  </>
  );
};

export default Home;
