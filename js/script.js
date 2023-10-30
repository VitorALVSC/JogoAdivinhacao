const Modal = document.querySelector('.modal-palpite')

const Palpite = document.querySelector('#palpite')
const Enviar = document.querySelector('#enviar')
const AbandonarPartida = document.querySelector('#abandonar')
const JogarNovamente = document.querySelector('#jogarNovamente')
const TentarNovamente = document.querySelector('#tentarNovamente')

const Sortear = document.querySelector('#sortear')
const Dificuldade = document.querySelector('#dificuldade')
const Iniciar = document.querySelector('#iniciar')

const ModalAlerta = document.querySelector('.modal-alerta')
const ModalAlertaDois = document.querySelector('.modal-alerta-dois')
const ModalResultadoVitoria = document.querySelector('.modal-resultado-vitoria')
const ModalResultadoDerrota = document.querySelector('.modal-resultado-derrota')

const NumEscolhido = document.querySelector('#numEscolhido')
const DifEscolhida = document.querySelector('#difEscolhida')
const QuantTentativas = document.querySelector('#quantTentativas')
const NumSorteadoModalVitoria = document.querySelector('.num-sorteado-modal-vitoria')
const NumSorteadoModalDerrota = document.querySelector('.num-sorteado-modal-derrota')

var DificuldadeTentativas = 0
var NumSorteado = 0

var teste

const Facil = 10
const Medio = 5
const Dificil = 3

const DifInvalida = document.querySelector('#difInvalida')
const PalpiteInvalido = document.querySelector('#palpInvalido')

var Tentativas = 1

//Executa as funcões para verificar se é possível iniciar o jogo
Iniciar.addEventListener('click', () => {

    //Verifica o preenchimento dos campos obrigatórios para iniciar o jogo
    if (Sortear.value === "" || Dificuldade.value === "") {
        ModalAlerta.innerHTML = `
        <p><strong>Para iniciar o jogo é necessário preencher todos os campos!</strong></p>
        `
        ModalAlerta.setAttribute('style', 'display:block')
    } else if (Dificuldade.value <= 0 || Dificuldade.value >= 4) {
        ModalAlerta.innerHTML = `<p><strong>Dificuldade inválida, tente novamente!</strong></p>
        `
        ModalAlerta.setAttribute('style', 'display:block')
    } else {

        //Valida a quantidade de tentativas conforme a dificuldade que o usuário informou
        if (Dificuldade.value == 1) {
            DificuldadeTentativas = Facil
        } else if (Dificuldade.value == 2) {
            DificuldadeTentativas = Medio
        } else if (Dificuldade.value == 3) {
            DificuldadeTentativas = Dificil
        }

        //Realiza a abertura do modal e mostra as informações para iniciar o jogo
        Modal.setAttribute('style', 'display:block')
        Sortear.disabled = true
        Dificuldade.disabled = true
        Iniciar.disabled = true
        ModalAlerta.setAttribute('style', 'display:none')
        NumSorteado = parseInt(Math.random() * Sortear.value +1)
        NumEscolhido.innerHTML = 
        `<p>O número máximo escolhido foi: <strong>${Sortear.value}</strong></p>` 
        DifEscolhida.innerHTML = 
        `<p>A Dificuldade escolhida foi: <strong>${Dificuldade.value}</strong></p>`
        QuantTentativas.innerHTML = 
        `Você tem <strong> ${DificuldadeTentativas}</strong> tentativas!`
    }
})

function enviarPalpite() {

    /*const url = `http://localhost:8080/jogo`
    fetch(url,
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            palpite: Palpite.value
        })
    })
    .then(function (res) {console.log(res)})
    .catch(function (res) {console.log(res)})*/

    //Realiza a validação do palpite informado
    if (Palpite.value === "") {
        ModalAlertaDois.innerHTML = 
        `<p><strong>Palpite inválido, tente novamente!</strong></p>
        <p>Numero de tentativas: <strong>${Tentativas}</strong></p>`
        ModalAlertaDois.setAttribute('style', 'display:block')
    } else {
        ModalAlertaDois.setAttribute('style', 'display:none')
    }

    PalpiteInformado = parseInt(document.querySelector('#palpite').value)

    if (PalpiteInformado < NumSorteado) {
        ModalAlertaDois.innerHTML = `
        <p>O palpite informado é <strong>menor que o número sorteado, tente novamente!</strong></p>
        <p>Numero de tentativas: <strong>${Tentativas}</strong></p>`
        ModalAlertaDois.setAttribute('style', 'display:block')
    } else if (PalpiteInformado > NumSorteado) {
        ModalAlertaDois.innerHTML = `
        <p>O palpite informado é <strong>maior que o número sorteado, tente novamente!</strong></p>
        <p>Numero de tentativas: <strong>${Tentativas}</strong></p>`
        ModalAlertaDois.setAttribute('style', 'display:block')
    } else if (PalpiteInformado === NumSorteado) {
        ModalResultadoVitoria.setAttribute('style', 'display:block')
        NumSorteadoModalVitoria.innerHTML = NumSorteado
    }

    if (Tentativas === DificuldadeTentativas && PalpiteInformado === NumSorteado) {
        ModalResultadoVitoria.setAttribute('style', 'display:block')
        NumSorteadoModalVitoria.innerHTML = NumSorteado
    } else if (Tentativas === DificuldadeTentativas) {
        ModalResultadoDerrota.setAttribute('style', 'display:block')
        NumSorteadoModalDerrota.innerHTML = NumSorteado
        Palpite.disabled = true
        Enviar.disabled = true
        AbandonarPartida.disabled = true
    }

    Tentativas ++
}

//Realiza a limpeza do campo palpite
function limpaCampo() {
    Palpite.value = ""
}

//Realiza o carregamento da página para ser iniciado um novo jogo caso não queira continuar com o jogo atual
AbandonarPartida.addEventListener('click', () => {
    window.location.reload(true);
})

//Envia o palpite e realiza a limpeza do campo palpite
Enviar.addEventListener('click', () => {
    enviarPalpite()
    limpaCampo()
})

//Realiza o carregamento da página para que possa ser iniciado um novo jogo
JogarNovamente.addEventListener('click', () => {
    window.location.reload(true);
})

//Realiza o carregamento da página para que possa ser iniciado um novo jogo
TentarNovamente.addEventListener('click', () => {
    window.location.reload(true);
})
