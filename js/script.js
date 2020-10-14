//******************************************************** */
// controle de UI 
let num = document.querySelector('.info-voto');
let cargo = document.querySelector('.info-2 span');
let aviso = document.querySelector('.scr-2');
let fotos = document.querySelector('.foto');
let votoInfo = document.querySelector('.info-1 span');
let descricao = document.querySelector('.info-dados');
// controle de ambientes
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];
//******************************************************** */

function comecaEtapa() {
    let etapa = etapas[etapaAtual];
    let numHTML = '';
    numero = '';
    votoBranco = false;

    for(let i = 0; i < etapa.numeros; i++){
        if (i === 0) {
            numHTML += '<div class="numero pisca"></div>'
        }
        else{
            numHTML += '<div class="numero"></div>'
        }
    }

    votoInfo.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    fotos.innerHTML = '';
    num.innerHTML = numHTML;
}

function atualizaUI() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        }
        else{
            return false;
        }
    });

    if(candidato.length > 0) {
        candidato = candidato[0];

        votoInfo.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`;
        aviso.style.display = 'block';

        let fotosHTML = '';
        for(let i = 0; i < candidato.fotos.length; i++) {
            if(i === 0) {
                fotosHTML += `<div class="image"><img src="${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
            else{
                fotosHTML += `<div class="image small"><img src="${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
        }
        fotos.innerHTML = fotosHTML;
    }
    else{
        votoInfo.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
    }
    
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        }
        else{
            atualizaUI();
        }
    }
}

function branco() {
    numero = '';
    votoBranco = true;
    votoInfo.style.display = 'block';
    aviso.style.display = 'block';
    num.innerHTML = '';
    fotos.innerHTML = '';
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
}

function corrige() {
    comecaEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    
    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push(
            {
                etapa: etapas[etapaAtual].titulo,
                voto: 'branco'
            }
        );
    }
    else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push(
            {
                etapa: etapas[etapaAtual].titulo,
                voto: numero
            }
        );
    }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
            comecaEtapa();
        }
        else{
            document.querySelector('.tela').innerHTML = '<div class="aviso-gigante">FIM</div>';
            console.log(votos);
        }
    }
}

comecaEtapa();
