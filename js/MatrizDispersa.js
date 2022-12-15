class NodoMatriz{
    constructor(mont, day, song, artist){
        this.mont = mont
        this.day = day
        this.song = song
        this.artist = artist

        this.nextNode = null
        this.previusNode = null
        this.upNode = null
        this.downNode = null
    }
}

class NodoHeader{
    constructor(pos){
        this.nextNode = null
        this.previusNode = null

        this.acces = null

        this.pos=pos
    }
}

class Headers{
    constructor(){
        this.rootNode = null
        this.size = 0
    }
    isEmpty(){
        return this.rootNode == null
    }
    getHeader(pos){
        let tmp = this.rootNode
        while (tmp != null){
            if (tmp.pos == pos) return tmp;
            tmp = tmp.nextNode;
        }
        return null
    }
    setNode(node){
        if (this.isEmpty()) {
            this.rootNode = node
            this.size++
        }else if(node.pos < this.rootNode.pos){
            node.nextNode = this.rootNode
            this.rootNode.previusNode = node
            this.rootNode = node
        }else {
            let tmp = this.rootNode;
            while(tmp.nextNode != null){
                if (node.pos < tmp.nextNode.pos) {
                    node.nextNode = tmp.nextNode
                    tmp.nextNode.previusNode = node;
                    node.previusNode = tmp
                    tmp.nextNode = node
                    break
                }
                tmp = tmp.nextNode
            }
            if (tmp.nextNode == null) {
                tmp.nextNode = node
                node.previusNode = tmp
            }
        }
    }
}

class Matrix{
    constructor(){
        this.colList = new Headers()
        this.rowList = new Headers()
    }

    isert(mont, day, song, artist){
        
        let newCell = new NodoMatriz(mont, day, song, artist);

        let columna = this.colList.getHeader(day);
        if (columna == null) {
            columna = new NodoHeader(dia);
            this.colList.setNode(columna);
            columna.acces = newCell;
        }else if(mont < columna.acces.mont){
            newCell.downNode = columna.acces;
            columna.acces.upNode = newCell;
            columna.acces = newCell;
        } else {
            let tmp = columna.acces;
            while(tmp.downNode != null){
                if (mont < tmp.downNode.mont) {
                    newCell.downNode = tmp.downNode;
                    tmp.downNode.upNode = newCell;
                    newCell.upNode = tmp;
                    break;
                }
                tmp = tmp.downNode
            }
            if (tmp.downNode == null) {
                tmp.downNode = newCell;
                newCell.upNode = tmp;
            }
        }

        let row = this.rowList.getHeader(mont);
        if (row == null) {
            row = new NodoHeader(mont);
            this.rowList.setNode(row);
            row.acces = newCell;
        } else if (dia < row.acces.dia) {
            newCell.nextNode = row.acces;
            row.acces.previusNode = newCell;
            row.acces = newCell;
        } else {
            let tmp = row.acces;
            while(tmp.nextNode != null){
                if (dia < tmp.nextNode.dia) {
                    newCell.nextNode = tmp.nextNode;
                    tmp.nextNode.previusNode = newCell;
                    tmp.nextNode = newCell;
                    newCell.previusNode = tmp;
                }
                tmp = tmp.nextNode;
            }

            if (tmp.nextNode == null) {
                tmp.nextNode = newCell
                newCell.previusNode = tmp;
            }
        }
    }

    
}