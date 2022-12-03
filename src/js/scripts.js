let seuVoto = document.querySelector('.primeira-subdivisao span');
let nomeJogador = document.querySelector('.segunda-subdivisao span');
let descricao = document.querySelector('.quarta-subdivisao');
let recado = document.querySelector('.segunda-divisao');
let imgJogador = document.querySelector('.primeira-divisao-direita');
let espacoNumeros = document.querySelector('.terceira-subdivisao');

let escolhaAtual = 0;
let numeroPreenchido ='';
let votoBranco = false;
let votos = [];


function comecar(){
    let escolha = listaJogadores[escolhaAtual];
    let numeroHTML = '';
    numeroPreenchido = ''; 
    votoBranco = false;  
    
    for(let i=0;i<escolha.quantidadeNumeros;i++){
        if(i === 0){
            numeroHTML += '<div class="numero pisca"></div>';
        }else{
            numeroHTML += '<div class="numero "></div>';
        }
    }

    seuVoto.style.display = 'none'; 
    //nomeJogador.innerHTML = listaJogadores.titulo;
    descricao.innerHTML = '';
    recado.style.display = 'none';
    imgJogador.innerHTML = '';
    espacoNumeros.innerHTML = numeroHTML;
}

function atualizaVoto(){
    let escolha = listaJogadores[escolhaAtual];
    let jogadorVotado = escolha.jogadores.filter((item)=>{
        if(item.numero === numeroPreenchido){
            return true;
        }else{
            return false;
        }
    });
    if(jogadorVotado.length > 0){
        jogadorVotado = jogadorVotado[0];
        seuVoto.style.display = 'block'; 
        recado.style.display = 'block';
        descricao.innerHTML = `Nome: ${jogadorVotado.nome}<br/>Seleção: ${jogadorVotado.selecao}`;
        
        let fotosJogador = '';
        for(let i in jogadorVotado.foto){
            fotosJogador += `<div class="img-jogador"><img src="/src/img/${jogadorVotado.foto[i].url}" alt=""></div>`
        }  
        imgJogador.innerHTML = fotosJogador;
    }else{
        seuVoto.style.display = 'block';
        recado.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-Grande pisca">VOTO NULO</div>'; 
    }   

}

function clicou(numeroEscolhido){
    let espacoNumeroPisca = document.querySelector('.numero.pisca');
    if(espacoNumeroPisca !== null){
        espacoNumeroPisca.innerHTML = numeroEscolhido;
        numeroPreenchido = `${numeroPreenchido}${numeroEscolhido}`;
    
        espacoNumeroPisca.classList.remove('pisca');
        if(espacoNumeroPisca.nextElementSibling !== null){
            espacoNumeroPisca.nextElementSibling.classList.add('pisca'); 
        }else{
            atualizaVoto();
        }
    }
}

function branco(){
    if(numeroPreenchido === ''){
        votoBranco = true;
        seuVoto.style.display = 'block';
        recado.style.display = 'block';
        espacoNumeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso-Grande pisca">VOTO EM BRANCO</div>';
    }else{
        alert('Para votar em BRANCO deixe os campos vazios apertando em CORRIGE!');
    }
}

function corrige(){
    comecar();
}

function confirma(){
    let escolha = listaJogadores[escolhaAtual];

    if(votoBranco === true){
        votos.push({
            escolha: listaJogadores[escolhaAtual].titulo,
            voto: 'branco'
        });
    }else if(numeroPreenchido.length === escolha.quantidadeNumeros){
        votos.push({
            escolha: listaJogadores[escolhaAtual].titulo,
            voto: numeroPreenchido
        });
    }
    document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>';
    console.log(votos);
}

comecar();