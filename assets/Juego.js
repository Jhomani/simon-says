class Juego{
    constructor(){
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.secuencia()
        setTimeout(() =>this.siguienteNivel.call(this), 500)
    }

    inicializar(){
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1;
        this.colores = {
            celeste,
            violeta,
            naranja,
            verde,
        }
    }
    
    toggleBtnEmpezar(){
        if(button.classList.contains('esconder')){
            button.classList.remove(`esconder`)
        } else{
            button.classList.add(`esconder`)
        }
    }
    
    secuencia(){
        this.aleatorio = new Array(ULTIMO_NIVEL).fill(0).map(()=>Math.floor(Math.random() * 4))
        console.log(this.aleatorio)
    }

    siguienteNivel(){
        this.subnivel = 0;
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    numeroAColor(numero){
        switch(numero){
            case 0: 
                return 'celeste'
            case 1:
                return 'violeta'
            case 2:
                return 'naranja'
            case 3:
                return 'verde'
        }
    }

    colorANumero(color){
        switch(color){
            case 'celeste': 
                return 0
            case 'violeta':
                return 1
            case 'naranja':
                return 2
            case 'verde':
                return 3
        }
    }

    iluminarSecuencia(){
        for(let i=0; i<this.nivel; i++){
            const color = this.numeroAColor(this.aleatorio[i])
            setTimeout(()=>this.iluminarColores(color), 800*i)
        }
    }

    iluminarColores(color){
        this.colores[color].classList.add('light')
        this.apagarColor(color)
    }

    apagarColor(color){
        setTimeout(()=>{
            this.colores[color].classList.remove('light')
        }, 350)
        
    }

    agregarEventosClick(){
        this.colores.celeste.addEventListener('click',this.elegirColor)
        this.colores.violeta.addEventListener('click',this.elegirColor)
        this.colores.naranja.addEventListener('click',this.elegirColor)
        this.colores.verde.addEventListener('click',this.elegirColor)
    }

    eliminarEventosClick(){
        this.colores.celeste.removeEventListener('click',this.elegirColor)
        this.colores.violeta.removeEventListener('click',this.elegirColor)
        this.colores.naranja.removeEventListener('click',this.elegirColor)
        this.colores.verde.removeEventListener('click',this.elegirColor)
    }

    elegirColor(ev){
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.colorANumero(nombreColor)
        this.iluminarColores(nombreColor)

        if(numeroColor === this.aleatorio[this.subnivel]){
            this.subnivel++
            if(this.subnivel===this.nivel){
                this.nivel++
                this.eliminarEventosClick()
                if(this.nivel === (ULTIMO_NIVEL + 1)){
                    this.ganoElJuego();
                } else(
                    setTimeout(this.siguienteNivel.bind(this),1000)
                )
            }
        } else{
            this.perdioElJuego();
        }
    }

    ganoElJuego(){
        swal('Junaka M F', 'Felicitaciones, ganaste el juego :) ', 'success')
            .then(()=>this.inicializar())
    }

    perdioElJuego(){
        swal('Junaka M F', 'Ups! perdiste, no te rindas vuelve a intentarlo', 'error')
            .then(()=>{
                this.eliminarEventosClick()
                this.inicializar()
            })
    }
}