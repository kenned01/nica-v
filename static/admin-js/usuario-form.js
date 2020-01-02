let editar = 0 
let uri = new URL(window.location.href)
let id = uri.searchParams.get("id")
$("#suser").addClass('active')

if (id != null){
  editar = 1
  getData(id).then(
      user => cambiarT(user)
  )
}


function cambiarT(usuario){
    $(".card-title").html("Editar Dato")
    $("button[type=submit]").html("Editar")
    $("#usuario").val(usuario.usuario)
    $("#password").val(usuario.password)

    document.querySelector("#usuario").setAttribute("readonly", true)
    let file = document.querySelector("input[type=file]")
    if (file.hasAttribute("required"))
        file.removeAttribute("required")
    
}

async function getData(id){
    try {
        let headers = new Headers()
        headers.append('Auth', 'nv/@pi~kronno')
        let response = await fetch(`/nv-api/usuarios/${id}`, {headers: headers})
        let status = response.status
        let json = await response.json()

        if (json.mensaje != null)
            window.location.href = "/admin-user?msj=3"
        
        return json

    } catch (error) {
        console.error(error)
    }
}

document.querySelector("form").addEventListener('submit', function(e){
    e.preventDefault()
    
    if( $("#password").val() != $("#passwordconfirm").val() ){
        toastr.warning('Contraseñas no coinciden', 'Error', {timeOut: 3000})
        return
    }

    let headers = new Headers()
    headers.append('Auth', 'nv/@pi~kronno')

    let data = new FormData()
    data.append("usuario", document.querySelector("#usuario").value)
    data.append("avatar", document.querySelector("input[type=file]").files[0])
    data.append("password", document.querySelector("#password").value)

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

async function Guardar(headers, data){

    try {
        let response = await fetch('/nv-api/usuarios', {
            method: 'POST', 
            headers: headers, 
            body: data 
          })
        let status = response.status
        let json = await response.json()
        
        if( json.mensaje != null)
            window.location.href = "/admin-user?msj=3"

        window.location.href = "/admin-user?msj=1"
    } catch (error) {
        window.location.href = "/admin-user?msj=3"
    }
  
  
}

async function Actualizar(headers, data) {
    try {  
        let response = await fetch(`/nv-api/usuarios/${id}`, {
            method: 'PUT' ,
            headers: headers, 
            body: data 
        })
        let status = response.status
        let json = await response.json()
        
        if( json.mensaje != null)
            window.location.href = "/admin-user?msj=3"

        window.location.href = "/admin-user?msj=2"
    } catch (error) {
        window.location.href = "/admin-user?msj=3"
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