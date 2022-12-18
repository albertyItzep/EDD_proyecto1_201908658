//every contente with respect of structs

class Controler{
    constructor(){
        this.users = new UsersList();
        this.users.insertUser('2654568452521','Oscar Armin','EDD','+502 (123) 123-4567',true,'123');
        this.artists = new ArtistsList();
        this.matrix = new Matrix();
        this.friends = new FriendStack();
        this.binaryTree = new ABB()
        this.bloqueds = new BloquedQueue();
        this.playList = new PlayList();
        this.userActual = null
        this.actualPlaylist = null
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
                manager.userActual = manager.users.getUser(userName);
            }else{
                document.getElementById("userNormalDashboard").style.display = "block"
                document.getElementById("loginDiv").style.display="none";
                manager.userActual = manager.users.getUser(userName);
            }
        }else{
            document.getElementById("userNormalDashboard").style.display = "block"
            document.getElementById("loginDiv").style.display="none";
            manager.userActual = manager.users.getUser(userName);
        }
    }else{
        alert(validation);
    }
}
//carga de datos a plataformas
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
function cargaPodcastAdmin(){
    let cargaPod = document.getElementById("CPodcastFile");
    const fileReader = new FileReader();
    fileReader.readAsText(cargaPod.files[0]);
    fileReader.onload = ()=>{
        let content = JSON.parse(fileReader.result);
        content.forEach(element =>{
            manager.binaryTree.insert(element.name,element.topic,element.guests,element.duration)
        })
        alert("Podcast Cargados Correctamente");
    }
}

//mostrar graficas en Administrador
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
    document.getElementById("verArtistasAdmin").style.display="none"
    document.getElementById("PodcastVerAdmin").style.display="none"
    d3.select('#insUsG').graphviz()
    .width(700)
    .height(250)
    .renderDot(manager.users.grapList())
}
function showArtistG(){
    document.getElementById("insUsG").style.display = "none"
    document.getElementById("insUsCarrousel").style.display = "none"
    document.getElementById("verArtistasAdmin").style.display="block"
    document.getElementById("PodcastVerAdmin").style.display="none"
    console.log(manager.artists.graphArtist());
    d3.select('#AinsArtist').graphviz()
    .width(700)
    .height(250)
    .renderDot(manager.artists.graphArtist())
}
function showPodcastG(){
    document.getElementById("insUsG").style.display = "none"
    document.getElementById("insUsCarrousel").style.display = "none"
    document.getElementById("verArtistasAdmin").style.display="none"
    document.getElementById("PodcastVerAdmin").style.display="block"
    d3.select('#PodcastG').graphviz()
    .width(700)
    .height(500)
    .renderDot(manager.binaryTree.graphTree());    
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

// -------------------------------------------------------------- Funciones Usuario Normal --------------------------------------------------------------

function showMatrizNormal(){
    document.getElementById("homeMusicalNormal").style.display ="none";
    document.getElementById("musicMatrixNormal").style.display ="block";
    let divMatriz = document.getElementById("recuadroMatriz");
    divMatriz.innerHTML = manager.matrix.generarHTML();
    alert("Mostrando")
}

function agregarMatrizSong(){
    let nameSong = document.getElementById("nameSongPublic").value;
    let artistSong = document.getElementById("artistSongPublic").value;
    let dateSong = document.getElementById("dateSong").value;
    dateSong = dateSong.split("-");
    if (dateSong[1] == 1) {
        dateSong[1] = "January"
    } else if (dateSong[1] == 2) {
        dateSong[1] = "February"
    } else if (dateSong[1] == 3) {
        dateSong[1] = "March"
    } else if (dateSong[1] == 4) {
        dateSong[1] = "April"
    } else if (dateSong[1] == 5) {
        dateSong[1] = "May"
    } else if (dateSong[1] == 6) {
        dateSong[1] = "June"
    } else if (dateSong[1] == 7) {
        dateSong[1] = "July"
    } else if (dateSong[1] == 8) {
        dateSong[1] = "August"
    } else if (dateSong[1] == 9) {
        dateSong[1] = "September"
    } else if (dateSong[1] == 10) {
        dateSong[1] = "October"
    } else if (dateSong[1] == 11) {
        dateSong[1] = "November"
    } else if (dateSong[1] == 12) {
        dateSong[1] = "December"
    }
    manager.matrix.insertar(dateSong[1],dateSong[2],nameSong,artistSong);
    showMatrizNormal()
}
function agregarNewSongInmediat(){
    let nameSongInmediat = document.getElementById("nameSongInmediat").value;
    let durationSongInmediat = document.getElementById("durationSongInmediat").value;
    let generosSongInmediat = document.getElementById("generosSongInmediat").value;
    generosSongInmediat = generosSongInmediat.split(",");
    let ageSongInmediat = document.getElementById("ageSongInmediat").value;
    let countrySongInmediat = document.getElementById("countrySongInmediat").value;

    manager.artists.addArtist(manager.userActual.username,ageSongInmediat,countrySongInmediat);
    manager.artists.insertSong(manager.userActual.username,nameSongInmediat,durationSongInmediat,generosSongInmediat);
    alert("Cancion publicada Correctamente")
}

function generarHTMLSongsHome(){
    document.getElementById("homeMusicalNormal").style.display ="block";
    document.getElementById("musicMatrixNormal").style.display ="none";
    let inSongsA = document.getElementById("musicHomeNormal");
    inSongsA.innerHTML = manager.artists.generarHTLMSongs();
}
function AgregarPlaylistHome(name,artist){
    manager.playList.insertNode(name,artist);
    alert("Cancion Agregada a playlist Correctamete");
    manager.playList.showPlaylist();
}

function cargaInicialPlaylist(){
    document.getElementById("homeMusicalNormal").style.display ="none";
    document.getElementById("musicMatrixNormal").style.display ="none";
    document.getElementById("playlistView").style.display = "block";
    let pInicial = manager.playList.rootNode;
    manager.actualPlaylist = pInicial;
    console.log(manager.actualPlaylist)
    let divInserP = document.getElementById("InsertPlaySong");
    divInserP.innerHTML=`
    <p class="card-text">Nombre: ${pInicial.name}</p>
    <p class="card-text">Artista: ${pInicial.artist}</p>
    `
    graphPlayList(manager.actualPlaylist.id)
}
function btnRigthPlay(){
    if (manager.actualPlaylist == null) return
    if (manager.actualPlaylist.nextNode != null) {
        manager.actualPlaylist = manager.actualPlaylist.nextNode;
        let divInserP = document.getElementById("InsertPlaySong");
        divInserP.innerHTML=`
        <p class="card-text">Nombre: ${manager.actualPlaylist.name}</p>
        <p class="card-text">Artista: ${manager.actualPlaylist.artist}</p>
    `
    } else {
        let divInserP = document.getElementById("InsertPlaySong");
        divInserP.innerHTML=`
        Sin mas musica por reproducir
        `   
    }
    graphPlayList(manager.actualPlaylist.id)
}
function btnLeftPlay(){
    if (manager.actualPlaylist == null) return
    if (manager.actualPlaylist.previusNode != null) {
        manager.actualPlaylist = manager.actualPlaylist.previusNode;
        let divInserP = document.getElementById("InsertPlaySong");
        divInserP.innerHTML=`
        <p class="card-text">Nombre: ${manager.actualPlaylist.name}</p>
        <p class="card-text">Artista: ${manager.actualPlaylist.artist}</p>
    `
    } else {
        let divInserP = document.getElementById("InsertPlaySong");
        divInserP.innerHTML=`
        Sin mas musica por reproducir
        `   
    }
    graphPlayList(manager.actualPlaylist.id)
}
function graphPlayList(id){
    d3.select('#divGrapPlaylist').graphviz()
    .width(700)
    .height(500)
    .renderDot(manager.playList.generateGraphviz(id)); 
}