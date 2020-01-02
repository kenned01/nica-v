$('.select2bs4').select2({ theme: 'bootstrap4'})
$("#sactivity").addClass("active")

let editar = 0 
let uri = new URL(window.location.href)
let id = uri.searchParams.get("id")

 if (id != null) {
  editar = 1
  getData(id).
  then(actividad => cambiarT(actividad))
}


function cambiarT(actividad){
  $(".card-title").html("Editar Dato")
  $("button[type=submit]").html("Editar")
  $("#actividad").val(actividad.actividad)
  $("#icono").val(actividad.icon)
  $("#reserva").val(actividad.idreserva)
  $('#reserva').trigger('change')
}

async function getData(id){
  try {

    let headers = new Headers()
    headers.append('Auth', 'nv/@pi~kronno')

    let response = await fetch(`/nv-api/actividades/${id}`, {headers: headers})
    response = await response.json()

    if (response.mensaje == "actividad no encontrada")
      window.location.href = "/admin-actividad?msj=3"
    
    return response
  } catch (error) {
    window.location.href = "/admin-actividad?msj=3"
  }

}

document.querySelector("form").addEventListener('submit', function(e){
  e.preventDefault()

  let data = {
    actividad: $("#actividad").val(),
    icon: $("#icono").val(),
    idreserva: $("#reserva").val()
  }

  let headers = new Headers()
  headers.append('Auth', 'nv/@pi~kronno')
  headers.append('Content-Type', 'application/json')
  headers.append('Accept','application/json')

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

async function Guardar(headers, data){
  data =  JSON.stringify(data)
  try {
    let response = await fetch('/nv-api/actividades', {
      method: 'POST' ,
      headers: headers,
      body: data
    })

    let json = await response.json()

    if (json.mensaje != null)
      window.location.href = "/admin-actividad?msj=3"
    else
      window.location.href = "/admin-contacto?msj=1"

  } catch (error) {
    window.location.href = "/admin-actividad?msj=3"
  }
  
}

async function Actualizar(headers, data) {

  data = JSON.stringify(data)
  try {
    let response = await fetch(`/nv-api/actividades/${id}`, {
        method: 'PUT',
        headers: headers,
        body: data
    })

    response = await response.json()

    if (response.mensaje == "no se pudo hacer la transaccion")
      window.location.href = "/admin-actividad?msj=3"
    
    window.location.href = "/admin-actividad?msj=2"
  } catch (error) {
    console.log(error)
    window.location.href = "/admin-actividad?msj=3"
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