const btLookCandi = document.getElementById('lookCandi');
const btLookVotes = document.getElementById('lookVotes');

const nameCandidato = document.getElementById('nameCandidato');
const idCandidato = document.getElementById('IdCandidato');
const btSendCandidato = document.getElementById('sendCandidato');
const idVote = document.getElementById('idVote');
const btVotar = document.getElementById('votarCandidato');
var database = firebase.database();


//Side buttons
showCandi = () =>{
    database.ref('candidatos').on('value',function(data){
        
        var candiList = '';
        
        data.forEach(
            function(element){
                let eleCandi = element.val();
                candiList += eleCandi.name + " "+eleCandi.id + "\n";
            }
        )

        alert(candiList);

    });
}

showVotes = () =>{

    let arrayCan = [];
    let arrayVote = [];

    database.ref('candidatos').on('value',function(data){
        data.forEach(element => {
            arrayCan.push(element.val());
            //console.log(arrayCandi);
        });
    });

    database.ref('votos').on('value',function(data){
        data.forEach(element => {
            arrayVote.push(element.val());

        });
    });
    console.log(arrayCan.length);
    console.log(arrayVote.length);
    let votesReady = contarVotos(arrayCan,arrayVote);
    alert(votesReady);
    
}
//Register Candidato
sendCandi = () =>{

    let n = nameCandidato.value;
    let i = idCandidato.value;

    if(candiExist(i)){
        alert('Candidato ya registrado');

    }else{
        let objectCandi= {
            name: n,
            id: i,
        }
        //let json = JSON.stringify(objectCandi);
        database.ref('candidatos').push().set(objectCandi);
        alert('Candidato registrado exitosamente');
    }

}
sendVote = () =>{
    let d = idVote.value;

    var exists = candiExist(d);
    console.log(exists);
    if(exists){

        let objectVote= {
            id: d,
        }
        //let json = JSON.stringify(objectCandi);
        database.ref('votos').push().set(objectVote);
        alert('Voto realizado');

    }else{
       alert('El candidato no existe');
    }

}
//Vote
candiExist = (d) =>{
    var exits;
    database.ref('candidatos').on('value',function(data){

        var array = [];
        
        data.forEach(element => {
            array.push(element.val());

        });
        //console.log("Arreglo ");
        //console.log(array);

       exist = array.find(element => element.id === d);
        //console.log("Exist");
        //console.log(exist);        
    });

    if(exist !== undefined){
        //console.log('true');
        return true;
    }else{
        //console.log('false');
        return false;
    }

}

contarVotos=(arrayCandi, arrayVote)=>{

    let listVotes = ' ';
    let totalVotes = arrayVote.length;
    
        arrayCandi.forEach(candidato =>{
            nVotes = 0;    
            arrayVote.forEach(voto=>{
                if(candidato.id === voto.id){
                    nVotes++;
                }
            });
            console.log(nVotes);
            if(nVotes !== 0){
                porVotes = (nVotes/totalVotes) * 100;
                listVotes += candidato.name +" votos: "+ porVotes+"%"+"\n";
            }
        });

    return listVotes;
    
}

//Side buttons
btLookCandi.addEventListener('click',showCandi);
btLookVotes.addEventListener('click',showVotes);
//Register Candidato
btSendCandidato.addEventListener('click',sendCandi)
//Vote
btVotar.addEventListener('click', sendVote);




