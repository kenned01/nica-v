$('.select2bs4').select2({ theme: 'bootstrap4'})
$("#sreserva").addClass("active")


let editar = 0 
let uri = new URL(window.location.href)
let id = uri.searchParams.get("id")


if (id != null){
  editar = 1
  getData(id).then(
    reserva => cambiarT(reserva)
  )
}


function cambiarT(reserva){
  $(".card-title").html("Editar Dato")
  $("button[type=submit]").html("Editar")

  $("#nombre").val(reserva.nombre)
  $("#coordenadas").val(reserva.coordenadas)
  $("#departamento").val(reserva.idDept)
  $("#departamento").trigger('change')
  $("#descripccion").val(reserva.descripccion)
  $("#sipnosis").val(reserva.sipnosis)

  let file = document.querySelector("input[type=file]")
    if (file.hasAttribute("required"))
        file.removeAttribute("required")

}

async function getData(id){
  try {
    let headers = new Headers()
    headers.append('Auth', 'nv/@pi~kronno')
    let response = await fetch(`/nv-api/reservas/${id}`, {headers: headers})
    let status = response.status
    let json = await response.json()

    if (json.mensaje != null)
      window.location.href = "/admin-reserva?msj=3"

    return json

  } catch (error) {
    console.error(error)
  }

}

document.querySelector("form").addEventListener('submit', function(e){
  e.preventDefault()
  let headers = new Headers()
  headers.append('Auth', 'nv/@pi~kronno')

  let data = new FormData()
  data.append("imagenFondo", document.querySelector("input[type=file]").files[0])
  data.append('nombre', document.querySelector("#nombre").value )
  data.append('idDept', document.querySelector("#departamento").value)
  data.append('descripccion', document.querySelector("#descripccion").value)
  data.append('coordenadas', document.querySelector("#coordenadas").value)
  data.append('sipnosis', document.querySelector("#sipnosis").value)

  switch (editar) {
    case 0:
      Guardar(headers, data)
      break;

    case 1:
      Actualizar(headers, data)
      break;

    default:
      break;
  }
})

async function Guardar(headers, reserva){

  try {
    let response = await fetch('/nv-api/reservas', {
      method: 'POST' ,
      headers: headers, 
      body: reserva
    })

    let status = response.status
    let json = await response.json()

    if (json.mensaje != null){
      window.location.href = "/admin-reserva?msj=3"
    }else{
      window.location.href = "/admin-reserva?msj=1"
    }


  } catch (error) {
    console.log(error)
  }
}

async function Actualizar(headers, reserva) {

  try {
    let response = await fetch(`/nv-api/reservas/${id}`, {
      method: 'PUT' ,
      headers: headers, 
      body: reserva
    })
    let status = response.status
    let json = await response.json()

    if (json.mensaje != "reserva actualizada"){
      window.location.href = "/admin-reserva?msj=2"
    }else{
      window.location.href = "/admin-reserva?msj=3"
    }
  } catch (error) {
    console.log(error)
  }
}

document.querySelector("#logout").addEventListener( 'click' ,function(e){
  e.preventDefault()
  Session.destroyAuth()
})

function setImg(){

  let user = Session.properties

  document.querySelector("#username").innerHTML = user.username
  
  if(user.avatar.substring(0,5) == "https"){
    document.querySelector("#userImg").src = user.avatar
  }else{
    document.querySelector("#userImg").src = `/multimedia/${user.avatar}`
  }

}
setImg()