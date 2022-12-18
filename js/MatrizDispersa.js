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
        this.endNode = null
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
            this.size++
            this.rootNode = node
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
    insertMont(mont){
        this.size++
        let newNodo = new NodoHeader(mont)
        if (this.rootNode == null) {
            this.rootNode = newNodo
            this.endNode = newNodo
        }else{
            this.endNode.nextNode = newNodo
            newNodo.previusNode = this.endNode
            this.endNode = newNodo
        }
    }
}

class Matrix{
    constructor(){
        this.colList = new Headers()
        this.rowList = new Headers()

    }

    insertar(mont, day, song, artist){
        
        let newCell = new NodoMatriz(mont, day, song, artist);

        let columna = this.colList.getHeader(day);
        if (columna == null) {
            columna = new NodoHeader(day);
            this.colList.setNode(columna);
            columna.acces = newCell;
        }else if(mont < columna.acces.mont){
            newCell.downNode = columna.acces;
            columna.acces.upNode = newCell;
            columna.acces = newCell;
        } else {
            let tmp = columna.acces;
            while(tmp.downNode != null){
                if (newCell.mont < tmp.downNode.mont) {
                    newCell.downNode = tmp.downNode;
                    tmp.downNode.upNode = newCell;
                    newCell.upNode = tmp;
                    tmp.downNode = newCell
                    break;
                } else if (newCell.mont === tmp.downNode.mont && newCell.day === tmp.downNode.day){
                    tmp.downNode.song = newCell.song;
                    tmp.downNode.artist = newCell.artist;
                    break
                }
                tmp = tmp.downNode
            }
            if (day == tmp.day && mont == tmp.mont) {
                console.log("igual")
                tmp.song = newCell.song;
                tmp.artist = newCell.artist;
            }else if (tmp.downNode == null) {
                tmp.downNode = newCell;
                newCell.upNode = tmp;
            }
        }

        let row = this.rowList.getHeader(mont);
        if (row == null) {
            row = new NodoHeader(mont);
            this.rowList.setNode(row);
            row.acces = newCell;
        } else if (day < row.acces.day) {
            newCell.nextNode = row.acces;
            row.acces.previusNode = newCell;
            row.acces = newCell;
        } else {
            let tmp = row.acces;
            while(tmp.nextNode != null){
                if (day < tmp.nextNode.day) {
                    newCell.nextNode = tmp.nextNode;
                    tmp.nextNode.previusNode = newCell;
                    tmp.nextNode = newCell;
                    newCell.previusNode = tmp;
                    break
                }else if(newCell.day === tmp.nextNode.day && newCell.mont === tmp.nextNode.mont){
                    break
                }
                tmp = tmp.nextNode;
            }
            if (newCell.day === tmp.day && newCell.mont === tmp.mont) {
                console.log("igual")
            }else if (tmp.nextNode == null) {
                tmp.nextNode = newCell
                newCell.previusNode = tmp;
            }
        }
    }

    grapMatrizG(){
        let cadena = "";
        cadena += "digraph G{\n node[shape=box style=filled];\n" + "subgraph cluster_p{\n";
        cadena += 'label = "Musica Programada"' + 'edge[dir = "both"];\n';

        cadena += this.renderNodes();        

        cadena += this.nodoX();
        
        cadena += this.ColbyR();

        cadena += this.nodoY();
        
        cadena += this.RowsbyR();

        cadena += this.graphRanks();

        cadena += "}}";
        return cadena.toString()

    }
    nodoX(){
        let tmp = ""
        let aux = this.colList.rootNode
        tmp += "Mt -> C"
        tmp += aux.pos;
        tmp += ";\n"

        while(aux != null){
            tmp += "C";
            tmp += aux.pos;
            tmp += "[group ="
            tmp += aux.pos;
            tmp += `, fillcolor=antiquewhite2 label ="${aux.pos}"];\n`;

            if (aux.nextNode != null) {
                tmp += "C";
                tmp += aux.pos;
                tmp += " -> C";
                tmp += aux.nextNode.pos;
                tmp += ";\n";
            }
            aux = aux.nextNode;
        }

        aux = this.colList.rootNode;
        tmp += "{ rank = same; Mt; ";

        while(aux != null){
            tmp += "C";
            tmp += aux.pos;
            tmp += ";";

            aux = aux.nextNode
        }
        tmp += "}\n";
        return tmp.toString()
    }

    nodoY(){
        let tmp = "";
        
        let aux = this.rowList.rootNode;
        tmp += "Mt -> F";
        tmp += aux.pos;
        tmp += ";\n";

        while (aux != null) {
            tmp += "F";
            tmp += aux.pos;

            tmp += `[group=1, fillcolor=antiquewhite2 label="${aux.pos}"];\n`;

            if (aux.nextNode != null) {
                tmp += "F";
                tmp += aux.pos;
                tmp += " -> F";
                tmp += aux.nextNode.pos;
                tmp += ";\n";
            }
            aux = aux.nextNode;
        }
        return tmp.toString();
    }

    renderNodes(){
        let tmp = ""
        let auxc = this.colList.rootNode;
        while(auxc != null){
            let aux = auxc.acces;
            while (aux != null) {
                tmp += "X";
                tmp += aux.mont;
                tmp += "Y";
                tmp += aux.day;
                tmp += '[label="';
                tmp += aux.song+",\\n " +aux.artist+'",';
                tmp += 'group=';
                tmp += aux.day;
                tmp += "];\n";

                aux = aux.downNode;
            }
            auxc = auxc.nextNode
        }
        console.log(this.colList.rootNode);
        return tmp.toString()
    }
    ColbyR(){
        let tmp = "";
        let tmp2 = "";
        let auxc = this.colList.rootNode;

        while (auxc != null) {
            if (auxc.acces != null) {
                tmp += "C";
                tmp += auxc.pos;
                tmp += " -> ";
                tmp += "X";
                tmp += auxc.acces.mont;
                tmp += "Y";
                tmp += auxc.acces.day;
                tmp += ";\n";
            }
            let aux = auxc.acces;
            while (aux.downNode != null) {
                if (aux.downNode != null) {
                    tmp2 += "X";
                    tmp2 += aux.mont;
                    tmp2 += "Y";
                    tmp2 += aux.day;
                    tmp2 += " -> ";
                    tmp2 += "X";
                    tmp2 += aux.downNode.mont;
                    tmp2 += "Y";
                    tmp2 += aux.downNode.day;
                    tmp2 += ";\n";
                }
                aux = aux.downNode
            }
            auxc = auxc.nextNode
        }
        tmp += tmp2
        return tmp.toString();
    }
    RowsbyR(){
        let tmp = "";
        let tmp2 = "";

        let auxr = this.rowList.rootNode
        while (auxr != null) {
            if (auxr.acces != null) {
                tmp += "F";
                tmp += auxr.pos;
                tmp += " -> ";
                tmp += "X";
                tmp += auxr.acces.mont;
                tmp += "Y";
                tmp += auxr.acces.day;
                tmp += ";\n";
            }
            let aux = auxr.acces;
            while (aux != null) {
                if (aux.nextNode != null) {
                    tmp2 += "X";
                    tmp2 += aux.mont;
                    tmp2 += "Y";
                    tmp2 += aux.day;
                    tmp2 += " -> ";
                    tmp2 += "X";
                    tmp2 += aux.nextNode.mont;
                    tmp2 += "Y";
                    tmp2 += aux.nextNode.day;
                    tmp2 += ";\n";
                }
                aux = aux.nextNode
            }
            auxr = auxr.nextNode;
        }
        tmp +=tmp2
        return tmp.toString();
    }
    recorr(){
        let tmp = this.rowList.rootNode.acces
        while(tmp != null){
            console.log(tmp)
            tmp = tmp.nextNode
        }
    }
    graphRanks(){
        let tmp = ""
        let auxr = this.rowList.rootNode
        while (auxr != null) {
            tmp += "{ rank = same; F";
            tmp += auxr.pos;
            tmp += ";";

            let aux = auxr.acces;
            while(aux != null){
                tmp += "X";
                tmp += aux.mont;
                tmp += "Y";
                tmp += aux.day;
                tmp += ";";

                aux = aux.nextNode;
            }
            tmp += "}\n";

            auxr = auxr.nextNode;
        }
        return tmp.toString();
    }

    generarHTML(){
        let cadena = ""
        let tmp = this.rowList.rootNode;
        while(tmp != null){
            let tmp2 = tmp.acces;
            while (tmp2 != null) {
                cadena +=`
                    <div class="col">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title">Nombre: ${tmp2.song}</h5>
                                <p class="card-text">Artist: ${tmp2.artist}</p>
                                <p class="card-text">Dia: ${tmp2.day}, Mes: ${tmp2.mont}</p>
                            </div>
                            
                        </div>
                    </div>\n`
                tmp2 = tmp2.nextNode;
            }
            tmp = tmp.nextNode;
        }
        return cadena;
    }
}