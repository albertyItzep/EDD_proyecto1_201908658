class UserNodo{
    constructor({dpi,name,username,phone,admin}){
        this.dpi = dpi
        this.name = name
        this.username = username
        this.phone = phone
        this.admin = admin
        this.password = ""
        this.nextNode = null
    }
    addPassword(password){
        this.password = password
    }
}
class UsersList{
    constructor(){
        this.rootNode = null
        this.endNode = null
        this.size = null
    }
    insertUser(dpi,name,username,phone,admin,password){
        let passEncri = Sha256.hash(password)
        let newNode = new UserNodo({dpi,name,username,phone,admin})
        newNode.addPassword(passEncri)
        console.log(passEncri)
        this.size++
        if(this.rootNode === null){
            this.rootNode = newNode
            this.endNode = newNode
        }else{
            this.endNode.nextNode = newNode
            this.endNode = newNode
        }
    }
    getUser(userName){
        let tmp = this.rootNode;
        for (let index = 0; index < this.size; index++) {
            if (tmp.username == userName){
                return tmp
            }
            tmp = tmp.nextNode
        }
        return None
    }
    getUserId(id){
        let tmp = this.rootNode
        for (let x = 0; x < this.size; x++) {
            if (x == id) {
                return tmp
            }
            tmp = tmp.nextNode
        }
    }
    confirmUser(userName,password){
        let passEncri = Sha256.hash(password)
        let tmp = this.rootNode
        for (let x = 0; x < this.size; x++) {
            if (tmp.username === userName) {
                if (tmp.password === passEncri) {
                    return 'success'
                }
                return 'Incorrect Password'
            } 
            tmp = tmp.nextNode           
        }
        return 'Dont exist this user'
    }
    existUser(userName){
        let tmp = this.rootNode;
        for (let x = 0; x < this.size; x++) {
            if(tmp.username === userName){
                return true
            }
            tmp = tmp.nextNode
        }
        return false;
    }
    isAdmin(userName){
        let tmp = this.rootNode
        for (let x = 0; x < this.size; x++) {
            if (tmp.username === userName) {
                return tmp.admin
            }            
        }
        return false
    }
    asingAdmin(userName){
        let tmp = this.rootNode
        for (let index = 0; index < this.size; index++) {
            if (tmp.username == userName){
                tmp.admin = true
                return true
            }
            tmp = tmp.nextNode
        }
        return false;
    }
    grapList(){
        let tmp = this.rootNode
        let cadena = "";
        cadena+="digraph G {\n"
        cadena+="rankdir = LR;\n"
        cadena+="nodoRaiz[label = \"Head\"];\n"
        for (let x = 0; x < this.size; x++) {
            cadena += `us${x}[label = \" UserName: ${tmp.username}, \\n Password: ${tmp.password}\", shape=\"box\"];`;
            tmp = tmp.nextNode
        }
        tmp = this.rootNode
        for (let x = 0; x < this.size; x++) {
            if (x == 0) {
                cadena+=`nodoRaiz -> us${x};\n`; 
            }
            if (x == this.size-1) {
                break
            }else{
                cadena+=`us${x} -> us${x+1};\n`;
            }
        }
        cadena+="}"
        return cadena;
    }
    returnHTMLBTN(){
        let tmp = this.rootNode
        let cadena = ""

        for (let x = 0; x < this.size; x++) {
            cadena += `
            <div class="card" id="mensajes1" style="width: 18rem; margin: 1rem;">
                <div class="card-body">
                <h5 class="card-title">Usuario</h5>
                <p class="card-text">User Name: ${tmp.username}</p>
                <p class="card-text">Full Name: ${tmp.name}</p>
                <button class="btn btn-primary" onclick="addFriend('${tmp.username}','${tmp.dpi}')">Agregar Amigo</button>
                <button class="btn btn-danger" onclick="addBloqued('${tmp.username}','${tmp.dpi}')">Bloquear</button>
                </div>
            </div>           
            `
            tmp = tmp.nextNode
        }
        return cadena
    }
    showList(){
        let tmp = this.rootNode
        while (tmp != null){
            console.log(tmp.username+', '+tmp.admin)
            tmp = tmp.nextNode
        }
    }
}