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