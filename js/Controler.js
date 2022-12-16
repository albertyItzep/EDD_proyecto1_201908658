//every contente with respect of structs

class Controler{
    constructor(){
        this.users = new UsersList();
        this.users.insertUser('2654568452521','Oscar Armin','EDD','+502 (123) 123-4567',true,'123');
        this.artists = new ArtistsList();
        this.matrix = new Matrix();
        this.friends = new FriendStack();
        this.bloqueds = new BloquedQueue()
    }
}

let manager = new Controler()

function login(){
    let userName = document.getElementById("userName").value;
    let pass = document.getElementById("pass").value;
    let admino = document.getElementById("adminV").checked;
    
    let validation = manager.users.confirmUser(userName,pass);
    if (validation === 'success') {
        if (admino) {
            if(manager.users.isAdmin(userName)){
                document.getElementById("loginDiv").style.display="none";
                document.getElementById("adminDashboard").style.display = "block"
            }else{
                alert('this user is normal');
            }
        }
    }else{
        alert(validation);
    }
}
function cargaUsuarios(){
    let cargaU = document.getElementById("CusersFile").files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(cargaU);
    fileReader.onload = ()=>{
        let content = JSON.parse(fileReader.result);
        content.forEach((value,index) => {
            manager.users.insertUser(value.dpi,value.name,value.username,value.phone,value.admin,value.password);
        });
        alert("Usuarios cargados Exitosamente");
    }
    //lectura de archivos
}
function cargaArtistas(){
    let cargaA = document.getElementById("CartistFiles");
    const fileReader = new FileReader();
    fileReader.readAsText(cargaA.files[0]);
    fileReader.onload = ()=>{
        let content = JSON.parse(fileReader.result);
        content.forEach(element => {
            manager.artists.addArtist(element.name,element.age,element.country);
        });
        alert("Artistas cargados Exitosamente");
    }
}
function cargaSongs(){
    let cargaS = document.getElementById("CsongsFile");
    const fileReader = new FileReader();
    fileReader.readAsText(cargaS.files[0]);
    fileReader.onload = ()=>{
        let content = JSON.parse(fileReader.result);
        content.forEach(element => {
            manager.artists.insertSong(element.artist,element.name,element.duration,element.gender)
        });
        alert("Canciones cargadas Exitosamente");
    }
}
function cargaMusicaProgramada(){
    let cargaP = document.getElementById("CProgramedFile");
    const fileReader = new FileReader();
    fileReader.readAsText(cargaP.files[0])
    fileReader.onload = ()=>{
        let content = JSON.parse(fileReader.result);
        content.forEach( element =>{
            manager.matrix.insertar(element.month,element.day,element.song,element.artist);
        })
        alert("Musica Programada Cargada Exitosamente");
    }
}
function showMatrixG(){
    document.getElementById("insUsG").style.display = "none"
    document.getElementById("insUsCarrousel").style.display = "none"
    document.getElementById("verArtistasAdmin").style.display="none"
    document.getElementById("verArtistasAdmin").style.display ="block"
    //console.log(manager.matrix.grapMatrizG())
    d3.select('#AinsArtist').graphviz()
    .width(1000)
    .height(1000)
    .renderDot(manager.matrix.grapMatrizG());
}
function showUsersG(){
    tableUsers();
    document.getElementById("insUsG").style.display = "block"
    document.getElementById("insUsCarrousel").style.display = "block"
    d3.select('#insUsG').graphviz()
    .width(700)
    .height(250)
    .renderDot(manager.users.grapList())
}
function showArtistG(){
    document.getElementById("insUsG").style.display = "none"
    document.getElementById("insUsCarrousel").style.display = "none"
    document.getElementById("verArtistasAdmin").style.display="block"
    console.log(manager.artists.graphArtist());
    d3.select('#AinsArtist').graphviz()
    .width(700)
    .height(250)
    .renderDot(manager.artists.graphArtist())
}
function salirAdmin(){
    document.getElementById('adminDashboard').style.display = 'none'
    document.getElementById('loginDiv').style.display = 'block'
}
function tableUsers(){
    let table = document.getElementById("table1");
    table.innerHTML=''
    for (let x = 0; x < manager.users.size; x++) {
        let tmp = manager.users.getUserId(x);
        let row = table.insertRow();
        row.setAttribute('id',x)
        row.innerHTML = `
            <th>${x}</th>
            <th>${tmp.name}</th>
            <th>${tmp.dpi}</th>
            <th>${tmp.username}</th>
            <th>${tmp.phone}</th>
            <th>${tmp.password}</th>
            <th>${tmp.admin}</th>
            <th></th>
        `
        const assAd = document.createElement('button');
        assAd.classList.add('btn','btn-primary','mb-1');
        assAd.innerHTML = "Admin"
        assAd.onclick = (e)=>{
            const idI = row.getAttribute('id');
            let tmp2 = manager.users.getUserId(idI);
            manager.users.asingAdmin(tmp2.username);
            showUsersG();
        }
        row.children[7].appendChild(assAd)
    }
}
function minimizeLogin(){ 
    let div = document.getElementById('loginDiv');
    div.style.display="none";
    let registerDiv = document.getElementById("registerDiv");
    registerDiv.style.display = "block";
}

function newRegister() {
    let userName = document.getElementById("userNameR").value;
    let fullName = document.getElementById("fullName").value;
    let dpi = document.getElementById("dpi").value;
    let phone = document.getElementById("phone").value;
    let password = document.getElementById("passR").value;

    if(manager.users.existUser(userName)){
        alert('This user already exist');
    }else{
        manager.users.insertUser(dpi,fullName,userName,phone,false,password);
        manager.users.showList()
        alert('Success');
    }
}