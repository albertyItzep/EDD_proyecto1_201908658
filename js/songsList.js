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
    getSongsDot(n){
        let tmp = this.rootNode;
        let cadena = "";
        for (let x = 0; x < this.size; x++) {
            cadena+=`N${n}_${x}[label=\"Name: ${tmp.name},\\n Artist: ${tmp.artist}\",shape = "box"];\n`;
            tmp = tmp.nextNode
        }
        for (let x = 0; x < this.size; x++) {
            if (x == this.size-1) {
                cadena+=`\n`
                break
            }
            cadena+=`N${n}_${x} -> N${n}_${x+1};\n`
        }
        return cadena;
    }
    generarHTMLSongs(){
        let cadena = ""
        let tmp = this.rootNode
        for (let x = 0; x < this.size; x++) {
            cadena+= `
            <div class="col" id="${tmp.name}|">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">Nombre: ${tmp.name}</h5>
                        <p class="card-text">Artista: ${tmp.artist}</p>
                        <p class="card-text">Duracion: ${tmp.duration}, Gneros: ${tmp.gender}</p>
                        <div style="display:flex;justify-content: center;" class="mt-2 mb-2">
                            <button class="btn btn-success" onclick="AgregarPlaylistHome('${tmp.name}','${tmp.artist}')">Add PlayList</button>
                        </div>
                    </div>
                </div>
            </div>`
            tmp = tmp.nextNode
        }
        return cadena;
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
