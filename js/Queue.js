class QueueNode{
    constructor(dpi,username){
        this.dpi = dpi
        this.username = username
        this.nextNode = null
        this.previusNode = null
    }
}
class BloquedQueue{
    constructor(){
        this.rootNode = null
        this.endNode = null
        this.size = 0
    }
    addBloqued(dpi,userName){
        let newNode = new QueueNode(dpi,userName)
        this.size++
        if (this.rootNode === null) {
            this.rootNode = newNode
            this.endNode = newNode
        }else{
            this.rootNode.previusNode = newNode
            newNode.nextNode = this.rootNode
            this.rootNode = newNode
        }
    }
    deleteBloqued(){
        if (this.size === 1) {
            this.rootNode = null
            this.endNode = null
            this.size--
        } else {
            this.endNode = this.endNode.previusNode
            this.endNode.nextNode.previusNode = null
            this.endNode.nextNode = null
            this.size--
        }
    }
    showQueue(){
        let tmp = this.rootNode
        for (let x = 0; x < this.size; x++) {
            console.log(tmp)
            tmp = tmp.nextNode
        }
    }
    generateHTML(){
        let cadena = ""
        let tmp = this.rootNode
        for (let x = 0; x < this.size; x++) {
            cadena += `
            <div class="card" id="mensajes1" style="width: 18rem; margin: 1rem;">
                <div class="card-body">
                    <h5 class="card-title">Amigo</h5>
                    <p class="card-text">User Name: ${tmp.username}</p>
                    <p class="card-text">Dpi: ${tmp.dpi}</p>
                </div>
            </div> 
            `
            tmp = tmp.nextNode     
        }
        return cadena
    }
    generateGraph(){
        let cadena = ""
        cadena += `
        digraph G {
            rankdir ="LR";
            subgraph cluster_0 {
                style=filled;
                color=lightgrey;
        `
        let tmp = this.rootNode;
        for (let x= 0; x< this.size; x++) {
            cadena +=`nodo_${x}[label = "User Name: ${tmp.username},\\n Dpi: ${tmp.dpi}", shape = "box"];\n`
            tmp = tmp.nextNode
        }
        for (let x= 0; x< this.size; x++) {
            if (x == this.size-1) {
                break
            }
            cadena += `nodo_${x} -> nodo_${x+1};\n`
        }
        cadena += "}\n"
        if (this.size > 0) {
            cadena += `In -> nodo_${0};\n`;
            cadena += `nodo_${this.size-1} -> Out;\n`;
        }
        cadena+= "}";
        return cadena
    }
}
/*
stack = new BloquedQueue()
stack.addBloqued('2997635280101','Albertt');
stack.addBloqued('2997635280101','Samuel');
stack.addBloqued('2997635280101','Patricia');
stack.addBloqued('2997635280101','Patricia');
stack.addBloqued('2997635280101','Mynor');
stack.deleteBloqued();
stack.showQueue()

*/