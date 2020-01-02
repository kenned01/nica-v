$('.select2bs4').select2({ theme: 'bootstrap4'})
$("#scontact").addClass("active")

let editar = 0 
let uri = new URL(window.location.href)
let id = uri.searchParams.get("id")


if (id != null){
    editar = 1
    getData(id).then(
        contact => cambiarT(contact)
    )
}


function cambiarT(contact){
    $(".card-title").html("Editar Dato")
    $("button[type=submit]").html("Editar")
    $("#correo").val(contact.correo)
    $("#direccion").val(contact.direccion)
    $("#numero").val(contact.numero)
    $("#reserva").val(contact.idreserva)
    $("#reserva").trigger('change')
}

async function getData(id){
    try {
        let headers = new Headers()
        headers.append('Auth', 'nv/@pi~kronno')
        let response = await fetch(`/nv-api/contactos/${id}`, {headers: headers})
        let status = response.status
        let json = await response.json()

        if (json.mensaje == "contacto no encontrado")
            window.location.href = "/admin-contacto?msj=3"

        return json
    } catch (error) {
        console.error(error)
    }
}

document.querySelector("form").addEventListener('submit', function(e){
    e.preventDefault()
    let headers = new Headers()
    headers.append('Auth', 'nv/@pi~kronno')
    headers.append('Content-Type', 'application/json')
    headers.append('Accept','application/json')

    let data = {
        correo    : $("#correo").val(),
        direccion : $("#direccion").val(),
        numero    : $("#numero").val(),
        idreserva : $("#reserva").val()
    }

    switch (editar) {
        case 0:
            Guardar(headers, data)
            break;
        case 1:
            Actualizar(headers, data)
            default:
        break;
    }
})

async function Guardar(headers, contact){
    try {
        contact = JSON.stringify(contact)
        let response = await fetch('/nv-api/contactos', {
            method: 'POST',
            headers: headers, 
            body: contact
        })
        let status = response.status
        let json = await response.json()
        

        if (json.mensaje == null)
            window.location.href = "/admin-contacto?msj=1"
        else
            window.location.href = "/admin-contacto?msj=3"
    } catch (error) {
        window.location.href = "/admin-contacto?msj=3"
    }
}

async function Actualizar(headers, contact) {
    
    try {
        contact = JSON.stringify(contact)

        let response = await fetch(`/nv-api/contactos/${id}`, {
            method: 'PUT',
            headers: headers,
            body: contact
        })

        let status = response.status
        let json = await response.json()

        if (json.mensaje == "contacto actualizado")
            window.location.href = "/admin-contacto?msj=2"
        else
            window.location.href = "/admin-contacto?msj=3"

    } catch (error) {
        window.location.href = "/admin-contacto?msj=3"
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