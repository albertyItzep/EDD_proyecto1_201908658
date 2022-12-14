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
