class Gallery {
    
    constructor(imgs){
        this.imgs = imgs
    }

    // parse a string to a html element
    parser(string){
        return document.createRange()
               .createContextualFragment(string)
               .querySelector('div') 
    }


    buildGallery(){
        // set gallery empty to be filled
        document.querySelector(".gallery").innerHTML = ''
        
        this.imgs.map( img => {
    
            let div = 
            `<div class='gallery-item'> \
                <img class='gallery-image' src='${img.uri}'>\
            </div>`
            div = this.parser(div)
        
            // create opciones
            let opciones = 
            `<div class='opciones'>\
                <p id='eliminar'><i class='far fa-trash-alt'></i></p>\
                <p id='ver'><i class='far fa-eye'></i></p>\
            </div>`
            opciones = this.parser(opciones)
            
            // add listeners
            opciones.querySelector('#eliminar').addEventListener('click', (e) => this.remove(e, img.id) )
            opciones.querySelector('#ver').addEventListener('click', (e) => this.vewImage(e, img.uri))
            let itemGalery = div
            itemGalery.appendChild(opciones)
            
            //append to gallery
            document.querySelector('.gallery').appendChild(itemGalery)
        })
    }

    buildSelector(){
        let select = document.querySelector("#filter")
        select.innerHTML = ''

        select.addEventListener('click', this.selectorChange.bind(this))

        let selector = this.imgs.map(img => {
            return img.idreserva
        })
    
        let keys = new Set(selector)
        keys = [...keys]
    
        if(keys.length < 1){
            select.style.display = "none"
        }
        
        let opcionAll = new Option('Todo', 'all', false, false)
        select.appendChild(opcionAll)
        
        keys.forEach(id =>{
            let values = this.imgs.find(img => img.idreserva == id)
            let opcion = new Option(values.nombrereserva, values.idreserva, false, false)
            select.appendChild(opcion)
        })
    }

    filter(filter){
        // set gallery empty to be filled
        document.querySelector(".gallery").innerHTML = ''
        
        this.imgs.map(img => {
    
            if (img.idreserva == filter){
                let div = 
                `<div class='gallery-item'> \
                    <img class='gallery-image' src='${img.uri}'>\
                </div>`
                div = this.parser(div)
        
                // create opciones
                let opciones = 
                `<div class='opciones'>\
                    <p id='eliminar'><i class='far fa-trash-alt'></i></p>\
                    <p id='ver'><i class='far fa-eye'></i></p>\
                </div>`
                opciones = this.parser(opciones)
                
                // add listeners
                opciones.querySelector('#eliminar').addEventListener('click', (e) => this.remove(e, img.id) )
                opciones.querySelector('#ver').addEventListener('click', (e) => this.vewImage(e, img.uri))
                
                let itemGalery = div
                itemGalery.appendChild(opciones)
                
                //append to gallery
                document.querySelector('.gallery').appendChild(itemGalery)
            }
        })
    }

    async remove(e, id){
        e.preventDefault()

        if (this.onbdelete == null){
            let index = this.imgs.findIndex(img => img.id == id)

            if (index != -1){
                this.imgs.splice(index, 1)
                this.buildGallery()
                this.buildSelector()
            }
            
        }


        if(this.isFunction(this.onbdelete)){
            if( await this.onbdelete(id) ){
                let index = this.imgs.findIndex(img => img.id == id)

                if (index != -1){
                    this.imgs.splice(index, 1)
                    this.buildGallery()
                    this.buildSelector()
                }
            }
        }else{
            console.error('before deleting is not a function; check that')
        }
    }

    selectorChange(e){
        e.preventDefault()
        
        let value = e.target.value
        if(value == "all"){
            this.buildGallery()
        }else{
            this.filter(value)
        }
    }

    vewImage(e, uri){
        e.preventDefault()
        document.querySelector("#modal-img").src = uri
        $('#myModal').modal('toggle')
    }
    // you have to return whether true or false
    // if true go ahead to delete image
    // if not, image is not going to be deleted
    beforeDelete(funcion){
        this.onbdelete = funcion
    }

    // check that the passed argument is a function
    isFunction(functionToCheck) {

        return functionToCheck && 
            ( {}.toString.call(functionToCheck) === '[object Function]' || 
              {}.toString.call(functionToCheck) === '[object AsyncFunction]');
    }

}
