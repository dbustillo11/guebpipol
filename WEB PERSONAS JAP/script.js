document.addEventListener("DOMContentLoaded", function () {
    // Elementos HTML
    const modoBtn = document.getElementById("modoBtn");
    const buscador = document.getElementById("buscador");
    const buscarBtn = document.getElementById("buscarBtn"); // Nuevo botón de búsqueda
    const listaPersonas = document.getElementById("listaPersonas");

    // Verificar el modo actual almacenado en localStorage
    const modoActual = localStorage.getItem("modo");

    // Función para cambiar el modo
    function cambiarModo() {
        if (document.body.classList.contains("modo-dia")) {
            document.body.classList.remove("modo-dia");
            document.body.classList.add("modo-noche");
            localStorage.setItem("modo", "noche");
        } else {
            document.body.classList.remove("modo-noche");
            document.body.classList.add("modo-dia");
            localStorage.setItem("modo", "dia");
        }
    }

    // Función para filtrar la lista de personas por nombre
    function filtrarPersonas() {
        const filtro = buscador.value.toLowerCase();
        const personas = listaPersonas.querySelectorAll("li");

        personas.forEach((persona) => {
            const nombre = persona.querySelector(".nombre").textContent.toLowerCase();
            if (nombre.includes(filtro) || filtro === "") { // Mostrar todo si el filtro está vacío
                persona.style.display = "block";
            } else {
                persona.style.display = "none";
            }
        });
    }

    // Escuchar el clic en el botón "Modo Día/Noche" y cambiar el modo
    modoBtn.addEventListener("click", cambiarModo);

    // Escuchar el evento de entrada en el campo de búsqueda y filtrar personas
    buscador.addEventListener("input", filtrarPersonas);

    // Escuchar el clic en el botón de búsqueda
    buscarBtn.addEventListener("click", function () {
        filtrarPersonas(); // Iniciar el filtrado al hacer clic en el botón de búsqueda
    });

    // Cargar personas desde el servidor JSON (reemplaza la URL con la tuya)
    async function cargarPersonas() {
        try {
            const response = await fetch("https://my-json-server.typicode.com/dbustillo11/guebpipol");
            if (!response.ok) {
                throw new Error("Error al cargar los datos.");
            }
            const data = await response.json();
            listaPersonas.innerHTML = ""; // Limpiar la lista
            data.forEach((persona) => {
                // Crear elementos de lista para cada persona
                const li = document.createElement("li");
                li.innerHTML = `
                    <span class="nombre">${persona.name}</span>
                    <span class="pais">${persona.country}</span>
                    <span class="region">${persona.region}</span>
                `;
                listaPersonas.appendChild(li);
            });
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // Inicializar la página
    if (modoActual === "noche") {
        document.body.classList.add("modo-noche");
    } else {
        document.body.classList.add("modo-dia");
    }

    cargarPersonas(); // Cargar personas al cargar la página
});
