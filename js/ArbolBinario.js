class NodeABB{
    constructor(id,name,topic,guests,duration){
        this.id = id
        this.name = name
        this.topic = topic
        this.guests = guests
        this.duration = duration
        this.left = null
        this.rigth = null
    }
}

class ABB{
    constructor(){
        this.rooNode = null;
        this.idOrder = 0
    }

    insert(name,topic,guests,duration){
        this.idOrder++
        this.rooNode = this.add(name,topic,guests,duration,this.rooNode);
    }
    add(name,topic,guests,duration,Nodo){
        if (Nodo == null) {
            return new NodeABB(this.idOrder,name,topic,guests,duration)
        }else{
            if (name > Nodo.name) {
                Nodo.rigth = this.add(name,topic,guests,duration,Nodo.rigth);
            }else{
                Nodo.left = this.add(name,topic,guests,duration,Nodo.left);
            }
        }
        return Nodo;
    }
    inorden(){
        this.inOrden(this.rooNode)
    }
    inOrden(Nodo){
        if (Nodo != null) {
            this.inOrden(Nodo.left);
            console.log(Nodo);
            this.inOrden(Nodo.rigth);
        }
    }
    generateHTMl(){
        let cadena = ""
        cadena += this.HTML(this.rooNode)
        console.log(cadena)
        return cadena
    }
    HTML(Nodo){
        if (Nodo == null) return "";
        let cadena = ""
        cadena += this.HTML(Nodo.left);
        cadena += this.HTML(Nodo.rigth);

        cadena += `
        <div class="card" id="mensajes1" style="width: 18rem; margin: 1rem;">
            <div class="card-body">
                <h5 class="card-title">Podcast</h5>
                <p class="card-text">Nombre: ${Nodo.name}</p>
                <p class="card-text">Tema: ${Nodo.topic}</p>
                <p class="card-text">Invitados: ${Nodo.guests}</p>
                <p class="card-text">Duracion: ${Nodo.duration}</p>
            </div>
        </div> 
        `
        return cadena
    }
    graphTree(){
        let cadena = "digraph G { \n rankdir=TB;\n node [shape = record, style=filled];\n"
        cadena+= this.exploreGraph(this.rooNode,0,0);
        cadena+= "}"
        return cadena;
    }
    exploreGraph(Nodo,header,number){
        if (Nodo == null) return "";
        number++
        let cadena = ""
        cadena += this.exploreGraph(Nodo.left,number,number);
        cadena += this.exploreGraph(Nodo.rigth,number,number);

        let izquieda = ""
        let derecha = ""
        if(Nodo.left != null){
            izquieda = "<C0>|";
        }
        if (Nodo.rigth != null) {
            derecha = "|<C1>"
        }
        cadena += `Nodo_${Nodo.id}[label = "${izquieda} Podcast: ${Nodo.name},\n Duration: ${Nodo.duration} ${derecha}"];\n`

        if (Nodo.left != null) {
            cadena += `Nodo_${Nodo.id}:C0 -> Nodo_${Nodo.left.id};\n`          
        }
        if (Nodo.rigth != null) {
            cadena += `Nodo_${Nodo.id}:C1 -> Nodo_${Nodo.rigth.id};\n`
        }
        return cadena;
    }
}

/*https://dave965.github.io/EDD_Proyecto1_202113378/*/