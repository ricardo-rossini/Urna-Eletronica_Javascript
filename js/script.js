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
//******************************************************** */

function comecaEtapa() {
    let etapa = etapas[etapaAtual];
    let numHTML = '';
    numero = '';

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
        for(let i in candidato.fotos) {
            fotosHTML = `<div class="image"><img src="${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
        }
        fotos.innerHTML = fotosHTML;
    }else{
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
    alert("branco");
}

function corrige() {
    comecaEtapa();
}

function confirma() {
    alert("confirma");
}

comecaEtapa();