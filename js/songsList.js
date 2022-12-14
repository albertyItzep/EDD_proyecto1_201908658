class SongNode{
    constructor(artist,name,duration,gender){
        this.artist = artist
        this.name = name
        this.duration = duration
        this.gender = gender
        this.nextNode = null
        this.previusNode = null
    }
}
class SongsList{
    constructor(){
        this.rootNode = null
        this.endNode = null
        this.size = 0
    }
    addSong(artist,name,duration,gender){
        let newNode = new SongNode(artist,name,duration,gender)
        this.size++
        if (this.rootNode === null){
            this.rootNode = newNode
            this.endNode = newNode
        }else{
            this.endNode.nextNode = newNode
            newNode.previusNode = this.endNode
            this.endNode = newNode
        }
    }
    showList(){
        let tmp = this.rootNode
        for (let index = 0; index < this.size; index++) {
            console.log(tmp.name+', '+tmp.artist)
            tmp = tmp.nextNode
        }
    }
}

/*
list = new SongsList()
list.addSong('Bon Jovi','its my life',3.5,['rock'])
list.addSong('Queen','i want to back free',3.5,['rock'])
list.addSong('Bon Jovi','its my life',3.5,['rock'])
list.addSong('Bon Jovi','its my life',3.5,['rock'])
list.addSong('Bon Jovi','its my life',3.5,['rock'])

list.showList()
*/
