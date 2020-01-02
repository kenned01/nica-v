let editar = 0 
let uri = new URL(window.location.href)
let id = uri.searchParams.get("id")
$("#sdept").addClass("active")
if (id != null){
    editar = 1

    getData(id).then(
        dept => cambiarT(dept)
    )
}


function cambiarT(dept){
    $(".card-title").html("Editar Dato")
    $("button[type=submit]").html("Editar")
    $("#nombre").val(dept.nombre)
    $("#pais").val(dept.pais)
}

async function getData(id){
    try {
        let headers = new Headers()
        headers.append('Auth', 'nv/@pi~kronno')
        let response = await fetch(`/nv-api/departamentos/${id}`, {headers: headers})
        let status = response.status
        let json = await response.json()

        if (json.mensaje != null)
            window.location.href = "/admin-dept?msj=3"
         
        return json
    } catch (error) {
        console.error(error)
    }
}

document.querySelector("form").addEventListener('submit', function(e){
    e.preventDefault()

    let headers = new Headers()
    headers.append('Auth', 'nv/@pi~kronno')
    headers.append('Accept','application/json')
    headers.append('Content-Type', 'application/json')

    let data = {
        nombre : $("#nombre").val(),
        pais   : $("#pais").val()
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

async function Guardar(headers, dept){

    dept = JSON.stringify(dept)
    try {
        let response = await fetch('/nv-api/departamentos', {
            method: 'POST',
            headers: headers,
            body: dept 
        })
        let status = response.status
        let json = await response.json()

        window.location.href = "/admin-dept?msj=1"
    } catch (error) {
        window.location.href = "/admin-dept?msj=3"
    }
    

}

async function Actualizar(headers, dept) {
    dept = JSON.stringify(dept)
    try {
        let response = await fetch(`/nv-api/departamentos/${id}`, {
            method: 'PUT',
            headers: headers,
            body: dept 
        })
        let status = response.status
        let json = await response.json()

        if (response.mensaje == "no se pudo hacer la transaccion")
            window.location.href = "/admin-dept?msj=3"
        
        window.location.href = "/admin-dept?msj=2"
    } catch (error) {
        window.location.href = "/admin-dept?msj=3"
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