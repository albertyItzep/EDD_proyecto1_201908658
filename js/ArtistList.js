class ArtistNode{
    constructor(name,age,country){
        this.name = name
        this.age = age
        this.country = country
        this.songsList = new SongsList()
        this.nextNode = null
        this.previusNode = null
    }
}

class ArtistsList{
    constructor(){
        this.rootNode = null
        this.endNode = null
        this.size = 0
    }

    addArtist(name,age,country){
        let newNode = new ArtistNode(name,age,country)
        this.size++
        if(this.rootNode === null){
            this.rootNode = newNode
            this.endNode = newNode
        }else{
            this.endNode.nextNode = newNode
            newNode.previusNode = this.endNode
            this.endNode = newNode
        }
    }
    insertSong(artist,name,duration,gender){
        if (this.size>0) {
            let tmp = this.rootNode
            for (let index = 0; index < this.size; index++) {
                if(tmp.name === artist){
                    tmp.songsList.addSong(artist,name,duration,gender);
                    return
                }
                tmp = tmp.nextNode
            }
            return
        }
        return
    }
    graphArtist(){
        let tmp = this.rootNode
        let cadena = "";
        cadena+="digraph G {\n"
        cadena+="rankdir = LR;\n"
        cadena+="nodoRaiz[label = \"Head\"];\n"
        for (let x = 0; x < this.size; x++) {
            cadena+=`A${x}[label=\"Name: ${tmp.name},\\n Country: ${tmp.country}\" shape = "box", style=filled];\n`
            if (tmp.songsList.size>0) {
                cadena+= tmp.songsList.getSongsDot(x);
                cadena+=`A${x} -> N${x}_0;\n`
            }
            tmp = tmp.nextNode
        }
        for (let x = 0; x < this.size; x++) {
            if (x == this.size-1) {
                cadena+=`\n`
                break
            }
            cadena+=`A${x} -> A${x+1};\n`
        }
        if (this.size>0) {
            cadena+=`nodoRaiz -> A0;\n`
        }
        cadena+="}"
        return cadena
    }
    bubbleSort(){
        console.log('entro')
        let tmp = this.rootNode
        for (let x = 0; x < this.size; x++) {
            for (let i = 0; i < this.size; i++) {
                if (tmp != null && tmp.nextNode != null) {
                    if(tmp.name > tmp.nextNode.name){
                        let newNodo = new ArtistNode(tmp.name,tmp.age,tmp.country)
                        newNodo.songsList = tmp.songsList
                        let tmp2 = tmp.nextNode
                        tmp.name = tmp2.name
                        tmp.age = tmp2.name
                        tmp.country = tmp2.country
                        tmp.songsList = tmp2.songsList

                        tmp2.name = newNodo.name
                        tmp2.age = newNodo.age
                        tmp2.country = newNodo.country
                        tmp2.songsList = newNodo.songsList
                    }
                }else{
                    break;
                }
                tmp = tmp.nextNode
            }
        }
    }
    generarHTLMSongs(){
        let cadena = ""
        let tmp = this.rootNode;
        for (let x = 0; x < this.size; x++) {
            cadena += tmp.songsList.generarHTMLSongs();
            tmp = tmp.nextNode           
        }
        return cadena;
    }
    showList(){
        let tmp = this.rootNode
        for (let index = 0; index < this.size; index++) {
            console.log(tmp)
            tmp = tmp.nextNode 
        }
    }
}

/*
let list = new ArtistsList()
list.addArtist('Bon Jovi',25,'england')
list.addArtist('Xam Wilfred',25,'england')
list.addArtist('Ban Wilfred',25,'england')
list.addArtist('David Wilfred',25,'england')
list.addArtist('Cam Wilfred',25,'england')
list.addArtist('Albertt Itzep',25,'england')

list.insertSong('Bon Jovi','i am brok my heart',2.30,'rock');
list.insertSong('Xam Wilfred','i am brok my heart',2.30,'rock');
list.insertSong('Ban Wilfred','i am brok my heart',2.30,'rock');
list.insertSong('Bon Jovi','i am brok my heart',2.30,'rock');
list.insertSong('David Wilfred','i am brok my heart',2.30,'rock');
list.insertSong('Bon Jovi','i am brok my heart',2.30,'rock');
list.insertSong('Cam Wilfred','i am brok my heart',2.30,'rock');
list.insertSong('Albertt Itzep','i am brok my heart',2.30,'rock');

list.showList()
*/