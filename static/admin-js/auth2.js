class Auth {

    constructor(){}

    setAuth = (properties) =>{
        let set = false
        try {
            properties = JSON.stringify(properties)
            let criptoProperties = CryptoJS.AES.encrypt(properties, "kronno")
            localStorage.setItem('Auth', criptoProperties.toString())
            set = true
        } catch (error) {
            set = false
        }

        return set
    }


    verifyAuth = () =>{
        let auth = localStorage.getItem('Auth')
        
        if (auth == null || auth == '')
            window.location.href = "/nv-login"

        try {
            let decriptoProperties = CryptoJS.AES.decrypt(auth, "kronno")
            decriptoProperties = decriptoProperties.toString(CryptoJS.enc.Utf8)
            auth = JSON.parse(decriptoProperties)
        } catch (error) {
            console.error(error)
        }

        if (auth.auth == null || auth.auth == '' || auth.auth != "nv~api~session@granted")
            window.location.href = "/nv-login"
        
        if (auth.username == null || auth.username == '')
            window.location.href = "/nv-login"

        if (auth.img == null || auth.img == '')
            window.location.href = "/nv-login"

    }


    destroyAuth = () =>{
        localStorage.clear()
        window.location.href = "/nv-login"
    }

    get properties(){
        
        let auth = localStorage.getItem('Auth')
        let decriptoProperties = CryptoJS.AES.decrypt(auth, "kronno")
        decriptoProperties = decriptoProperties.toString(CryptoJS.enc.Utf8)

        try {
            auth = JSON.parse(decriptoProperties)
            
            return {
                username: auth.username,
                avatar  : auth.img
            }
        } catch (error) {
            return {error: true}
        }
    }

}

