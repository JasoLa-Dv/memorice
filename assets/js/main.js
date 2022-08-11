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
let cantidadesDeTarjetas = 0
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
    cantidadesDeTarjetas = tarjetasElegidas.length
    return tarjetasElegidas
}