let tiempo=1800
let total=1800
let intervalo
let tiempoFinal=null
let enMarcha=false

let sesiones=0

let progress=document.getElementById("progress")

let radio=100
let circunferencia=2*Math.PI*radio

progress.style.strokeDasharray=circunferencia

let coloresModo={

estudio:["#2EC4B6","#43E97B"],

tarea:["#4FACFE","#2EC4B6"],

examen:["#43E97B","#38BDF8"],

prueba:["#FFB703","#FB8500"]

}

function cambiarTiempo(){

let selector=document.getElementById("tiempoSelector")
let caja=document.getElementById("tiempoPersonalizadoBox")

if(selector.value=="personalizado"){

caja.style.display="block"

}else{

caja.style.display="none"

tiempo=parseInt(selector.value)

total=tiempo

actualizarTiempo()

}

}

function actualizarCirculo(){

let offset=circunferencia-(tiempo/total)*circunferencia

progress.style.strokeDashoffset=offset

}

function actualizarTiempo(){

let minutos=Math.floor(tiempo/60)
let segundos=tiempo%60

document.getElementById("time").textContent=

String(minutos).padStart(2,"0")+":"+String(segundos).padStart(2,"0")

actualizarCirculo()

}

function mostrarNotificacion(){

if(Notification.permission==="granted"){

let noti=new Notification("✨ SmartPausa",{

body:"Tu sesión ha terminado. Haz clic aquí para comenzar tu pausa inteligente.",

icon:"logo.png",

requireInteraction:true

})

noti.onclick=function(){

window.focus()

}

}

}

function iniciar(){

if(enMarcha) return

enMarcha=true

tiempoFinal=Date.now()+tiempo*1000

intervalo=setInterval(()=>{

let restante=Math.ceil((tiempoFinal-Date.now())/1000)

tiempo=Math.max(0,restante)

actualizarTiempo()

if(tiempo<=0){

clearInterval(intervalo)

enMarcha=false

mostrarNotificacion()

document.querySelector(".container").style.display="none"

document.getElementById("pausa").style.display="block"

sesiones++

document.getElementById("sesiones").textContent=sesiones

if(document.getElementById("sonidoCheck").checked){

document.getElementById("sonido").play()

}

}

},250)

}

function pausar(){

clearInterval(intervalo)

enMarcha=false

}

function reiniciar(){

clearInterval(intervalo)

enMarcha=false

tiempo=total

actualizarTiempo()

}

function volver(){

document.getElementById("pausa").style.display="none"

document.querySelector(".container").style.display="block"

tiempo=total

actualizarTiempo()

document.getElementById("detalleEjercicio").innerHTML=""

}

function mostrarEjercicio(tipo){

let texto=""

if(tipo=="cuello"){

texto=`

<h3>Estiramiento de cuello</h3><p><b>Indicaciones:</b> Inclina la cabeza lentamente hacia cada lado durante 10 segundos.</p><p><b>Beneficios:</b> Reduce tensión muscular y mejora la postura.</p>`

}

if(tipo=="hombros"){

texto=`

<h3>Movimiento de hombros</h3><p><b>Indicaciones:</b> Gira los hombros hacia adelante y hacia atrás durante 20 segundos.</p><p><b>Beneficios:</b> Mejora la circulación y relaja los músculos.</p>`

}

if(tipo=="respiracion"){

texto=`

<h3>Respiración profunda</h3><p><b>Indicaciones:</b> Inhala profundo por la nariz y exhala lentamente.</p><p><b>Beneficios:</b> Reduce el estrés y mejora la concentración.</p>`

}

if(tipo=="visual"){

texto=`

<h3>Descanso visual</h3><p><b>Indicaciones:</b> Parpadea lentamente durante 20 segundos y luego cierra los ojos durante 10 segundos para relajarlos.</p><p><b>Beneficios:</b> Reduce la fatiga ocular causada por las pantallas.</p>`

}

if(tipo=="manos"){

texto=`

<h3>Estiramiento de manos</h3><p><b>Indicaciones:</b> Abre y cierra las manos lentamente durante 20 segundos.</p><p><b>Beneficios:</b> Mejora la circulación y reduce la rigidez.</p>`

}

if(tipo=="espalda"){

texto=`

<h3>Estiramiento de espalda</h3><p><b>Indicaciones:</b> Inclínate suavemente hacia adelante durante 10 segundos.</p><p><b>Beneficios:</b> Reduce la tensión lumbar y mejora la postura.</p>`

}

document.getElementById("detalleEjercicio").innerHTML=texto

}

let frasesEstudio=[

"Cada minuto de estudio fortalece tu futuro",

"Estudiar hoy facilita tu mañana",

"La disciplina crea el éxito"

]

let frasesTarea=[

"Terminar tus tareas te acerca a tus metas",

"Cada tarea completada es un logro",

"Organizarte mejora tu aprendizaje"

]

let frasesExamen=[

"La preparación trae confianza",

"Respira, concéntrate y da lo mejor",

"Tu esfuerzo dará resultados"

]

let frasesPrueba=[

"Modo demostración activado",

"Probando SmartPausa",

"Cada prueba mejora el proyecto"

]

function cambiarFrase(){

let modo=document.getElementById("modo").value

document.getElementById("modoTexto").textContent=

modo=="estudio" ? "Tiempo de estudio" :

modo=="tarea" ? "Tiempo de tarea" :

modo=="examen" ? "Tiempo de examen" :

"Modo prueba"

let lista

if(modo=="estudio") lista=frasesEstudio

if(modo=="tarea") lista=frasesTarea

if(modo=="examen") lista=frasesExamen

if(modo=="prueba") lista=frasesPrueba

document.getElementById("frase").textContent=

lista[Math.floor(Math.random()*lista.length)]

let colores=coloresModo[modo]

let botones=document.querySelectorAll(".botones button")

botones.forEach(b=>{

b.style.background="linear-gradient(135deg,${colores[0]},${colores[1]})"

})

progress.style.stroke=colores[0]

}

document.getElementById("modo").addEventListener("change",cambiarFrase)

document.getElementById("tiempoPersonalizado").addEventListener("change",()=>{

let minutos=parseInt(document.getElementById("tiempoPersonalizado").value)

if(isNaN(minutos)) return

if(minutos<1) minutos=1

if(minutos>90) minutos=90

tiempo=minutos*60

total=tiempo

actualizarTiempo()

})

cambiarFrase()

actualizarTiempo()

if("Notification" in window){

Notification.requestPermission()

}