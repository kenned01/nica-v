$('.select2bs4').select2({ theme: 'bootstrap4'})
$("#sfoto").addClass("active")

document.querySelector("form").addEventListener('submit', function(e){
    
    e.preventDefault()
    

    let headers = new Headers()
    headers.append('Auth', 'nv/@pi~kronno')

    let data = new FormData()
    data.append("idreserva", document.querySelector("#reserva").value)
    data.append("foto", document.querySelector("input[type=file]").files[0])

    Guardar(headers, data)
})

async function Guardar(headers, data){

    try {
        let response = await fetch('/nv-api/fotos', {
            method: 'POST', 
            headers: headers, 
            body: data 
          })
        let status = response.status
        let json = await response.json()
        
        if( json.mensaje != null)
            window.location.href = "/admin-foto?msj=3"

        window.location.href = "/admin-foto?msj=1"
    } catch (error) {
        window.location.href = "/admin-foto?msj=3"
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