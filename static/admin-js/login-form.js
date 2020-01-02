var Session = new Auth()

async function login(){
  let users = await getUsers()
  let user = document.querySelector("#user").value
  let password = document.querySelector("#password").value
  let set = false

  if (users.error == null){
    
    users.forEach(userApi =>{
      
      if (userApi.usuario == user && userApi.password == password){
        set = Session.setAuth({
          auth     : "nv~api~session@granted",
          username : userApi.usuario,
          img      : userApi.avatar
        })
      }

    })

    if (set){
      window.location.href = "/admin-user"
    }else{
      toastr.error('usuario o contraseña incorrectos','Error', {timeOut: 3000})
    }
    
  }else{
    console.log(set)
  }

}

async function getUsers(){
  
  try{
    let response = await fetch('/nv-api/usuarios', {headers: {"Auth": "nv/@pi~kronno"}})
    response = await response.json()

    if (response.mensaje != null){
      response.error = true
      return response
    }
    
    let users = new Array()
    users = response
    return users
  }catch(error){
    console.error(error)
    return {error: true}
  }
}

document.querySelector("#form").addEventListener('submit', function(e){
  e.preventDefault()
  login()
})

