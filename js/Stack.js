class StackNode{
    constructor(dpi,username){
        this.dpi = dpi
        this.username = username
        this.nextNode = null
        this.previusNode = null
    }
}

class FriendStack{
    constructor(){
        this.endNode = null
        this.rooNode = null
        this.size = 0
    }
    addFriend(dpi,username){
        let newNode = new StackNode(dpi,username)
        this.size++
        if (this.rooNode === null) {
            this.rooNode = newNode
            this.endNode = newNode
        } else {
            this.rooNode.previusNode = newNode
            newNode.nextNode = this.rooNode
            this.rooNode = newNode
        }
    }
    deletFriend(){        
        if (this.size==1) {
            this.rooNode = null
            this.endNode = null
            this.size--
        } else {
            this.rooNode = this.rooNode.nextNode
            this.rooNode.previusNode.nextNode = null
            this.rooNode.previusNode = null
            this.size--
        }
    }
    generateHTMl(){
        let tmp = this.rooNode
        let cadena = ""
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
            tmp = tmp.nextNode;
        }
        return cadena
    }
    generateGrapvizStack(){
        let cadena = ""
        cadena += `
        digraph G {

            subgraph cluster_0 {
                style=filled;
                color=lightgrey;
        `
        let tmp = this.rooNode;
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
            cadena += `nodo_${0} -> Out;\n`;
        }
        cadena+= "}";
        return cadena
    }
    showStack(){
        console.log(this.size)
        let tmp = this.rooNode
        for (let x = 0; x < this.size; x++) {
            console.log(tmp)
            tmp = tmp.nextNode            
        }
    }
}


/*
stack = new FriendStack()
stack.addFriend('2997635280101','Albertt');
stack.addFriend('2997635280101','Samuel');
stack.addFriend('2997635280101','Patricia');
stack.addFriend('2997635280101','Patricia');
stack.addFriend('2997635280101','Mynor');
stack.showStack()
stack.deletFriend();
stack.showStack()
*/
