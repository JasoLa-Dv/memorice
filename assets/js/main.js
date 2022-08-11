const todasLasTarjetas = [
    'bear',
    'bird',
    'cat',
    'chicken',
    'chipmunk',
    'cow',
    'dog',
    'dragon',
    'fish',
    'fox',
    'horse',
    'lion',
    'monkey',
    'owl',
    'panda',
    'pig',
    'rabbit',
    'rooster',
    'snake',
    'unicorn'
]

//Event lister para botón "Comenzar"

let botonComenzar = document.getElementById('comenzar')
botonComenzar.addEventListener('click', comezarJuego)

// Variables para elementos html
let selectDificultad = document.getElementById('dificultad')
let botonReiniciar = document.getElementById('reiniciar')
let contenedor = document.getElementById('contenedor')
let parrafoIntentos = document.getElementById('jugadas')

// Variables globales
let figuras = []
let intentos = 0
let idPrimeraTarjeta = null
let cantidadDeTarjetas = 0
let tarjetasCorrectas = 0

//  Función que retorna la dificultad seleccionada por el jugador
function obtenerDificultad (){
    return document.getElementById('dificultad').value
}

// Retorna el array de tarjetas a utilizar dependiendo de la dificuldad
function obtenerTarjetasPorDificultad(dificultad){
    let tarjetasElegidas
    switch (dificultad) {
        case 'facil':
            tarjetasElegidas = todasLasTarjetas.slice(0, 7)
            break;
        case 'medio':
                tarjetasElegidas = todasLasTarjetas.slice(0, 15)
                break;    
        default:
            tarjetasElegidas = todasLasTarjetas
    }

    tarjetasElegidas = [...tarjetasElegidas, ...tarjetasElegidas].sort(()=>Math.random()-0.5)
    cantidadDeTarjetas = tarjetasElegidas.length
    return tarjetasElegidas
}

// Ocultar el select y botón reiniciar (se ejecuta cuando se hace click en Comenzar Partida)
function ocultarDificultad(){
    selectDificultad.style.display = 'none'
    botonComenzar.style.display = 'none'
    botonReiniciar.style.display = 'block'
    parrafoIntentos.style.display = 'block'
    botonReiniciar.addEventListener('click', reiniciarJuego)
}


function reiniciarJuego(){
    selectDificultad.style.display = 'block'
    botonComenzar.style.display = 'block'
    botonReiniciar.style.display = 'none'
    parrafoIntentos.style.display = 'none'
    document.getElementById('intentos').innerText = 0
    contenedor.innerHTML = ''
    figuras = []
    intentos = 0
    idPrimeraTarjeta = null
    cantidadDeTarjetas = 0
    tarjetasCorrectas = 0

}

// Función que agrega al DOM un div por cada tarjeta
function dibujarTarjetas(){
contenedor.innerHTML = ''

figuras.forEach((tarjetas, index)=>{
    contenedor.innerHTML +=`
    <div class="card" id="${index}">
    <img
    src="./assets/images/${tarjeta}.png"
    width="70"
    />
    </div>`

})

setTimeout(()=>{
    agregarListenerYOcultar()
}, 3000)

}

// Función ejecutada al hacer click en botón "Comenzar Juego"
function comenzarJuego(){
    const dificultad = obtenerDificultad()
    figuras = obtenerTarjetasPorDificultad(dificultad)
    dibujarTarjetas()
    ocultarDificultad()

}

// Función que maneja la lógica de verificación de pares al voltear tarjetas
function girarTarjeta(id){
    //1. Se muestra la imagen de la tarjeta
    let imagen = Array.from(document.getElementById(id).children)[0]
    imagen.src = `./assets/images/${figuras[id]}.png`

    //2. Se verifica si la tarjeta volteada correponde a la primera o a la segunda del par
    if(idPrimeraTarjeta===null){
        idPrimeraTarjeta = id
    }else{
        let tarjeta1 = document.getElementById(idPrimeraTarjeta)
        let tarjeta2 = document.getElementById(id)

        if(figuras[idPrimeraTarjeta] === figuras[id]){
            tarjetasCorrectas += 2
            tarjeta1.style.boxShadow = '4px 4px 3px green'
            tarjeta2.style.boxShadow = '4px 4px 3px green'
        }else{
            tarjeta1.style.boxShadow = '4px 4px 3px red'
            tarjeta2.style.boxShadow = '4px 4px 3px red'
            let imagen1 = Array.from(tarjeta1.children)[0]
            let imagen2 = Array.from(tarjeta1.children)[0]

            setTimeout(()=>{
                imagen1.src = './assets/images/question.png'
                imagen2.src = './assets/images/question.png'
                tarjeta1.style.boxShadow = '4px 4px 3px (0, 0, 0, 0.4)'
                tarjeta2.style.boxShadow = '4px 4px 3px (0, 0, 0, 0.4)'
            }, 1000)
        }

        intentos+=1
        document.getElementById('intentos').innerText = intentos
        idPrimeraTarjeta = null

    // 3. Verificación si el juego continua o termina
    if(cantidadDeTarjetas===tarjetasCorrectas){
        let mensaje = document.getElementById('mesaje')
        mensaje.style.display = 'flex'
        
        //mensaje.classList.add('mensaje')
        mensaje.innerHTML=`
        <div>
        <h1>Felicitaciones!!</h1>
        <p>Has ganado la partida con ${intentos} intentos de un total de ${figuras.length / 2}</p>
        <button id="cerrar">Volver a jugar</button>
        </div>`

        document.getElementById('cerrar').addEventListener('click', ()=>{
            mensaje.style.display = 'none'
        })

        reiniciarJuego()

        }
    }

}