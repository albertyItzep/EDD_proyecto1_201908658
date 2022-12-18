class NodoPlaylist{
    constructor(id,name,artist){
        this.id = id
        this.name = name
        this.artist = artist
        this.nextNode = null
        this.previusNode = null
    }
}

class PlayList{
    constructor(){
        this.rootNode = null;
        this.endNode = null;
        this.size = 0;
        this.idL = 0
    }

    insertNode(name,artist){
        let newNodo = new NodoPlaylist(this.idL,name,artist);
        this.size++;
        this.idL++;
        if (this.rootNode == null) {
            this.rootNode = newNodo
            this.endNode = newNodo
        }else{
            this.endNode.nextNode = newNodo
            newNodo.previusNode = this.endNode
            this.endNode = newNodo
            this.endNode.nextNode = this.rootNode
            this.rootNode.previusNode = this.endNode
        }
    }
    showPlaylist(){
        let tmp = this.rootNode
        for (let x = 0; x < this.size; x++) {
            console.log(tmp)
            tmp = tmp.nextNode            
        }
    }
    generateGraphviz(id){
        let tmp = this.rootNode
        let cadena = ""
        cadena += `
        digraph G {
            rankdir = "LR";
        `
        for (let x = 0; x < this.size; x++) {
            cadena += `nodo${x}[label="Nombre: ${tmp.name},\\n Artista: ${tmp.artist}",shape = "box"];\n`;
            tmp = tmp.nextNode;            
        }
        tmp = this.rootNode
        for (let x = 0; x < this.size; x++) {
            if (x == this.size-1) {
                cadena += `nodo${x} -> nodo${0};\n`;
            }else{
                cadena += `nodo${x} -> nodo${x+1};\n`
            }
            tmp = tmp.nextNode
        }
        
        if (this.size > 0) {
            cadena += `nodo${0} -> nodo${this.size-1};\n`
            cadena += `Raiz -> nodo${0};\n`
        }
        tmp = this.rootNode;
        for (let x = 0; x < this.size; x++) {
            if(id == tmp.id){
                cadena += `Actual -> nodo${x};\n`
                break
            }
            tmp = tmp.nextNode
        }
        cadena += "}"
        return cadena
    }
}