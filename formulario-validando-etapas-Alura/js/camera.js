//constante de iniciar interação
const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
const botaoEnviarFoto = document.querySelector("[data-enviar]")

let imagemURL = '';

//quando eu clico inicia o video
botaoIniciarCamera.addEventListener('click', async function () {
    const iniciarVideo = await navigator.mediaDevices
        .getUserMedia({ video: true, audio: false });

    //desativo o botão da camera dps de bater a foto
    botaoIniciarCamera.style.display = "none";
    //ativo o campo da camera = block/ativado
    campoCamera.style.display = "block";

    //defino o objeto como iniciar video
    video.srcObject = iniciarVideo;
});

//botão dps que aoareceu a camera eu tiro a foto
botaoTirarFoto.addEventListener('click', function () {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    //transformo a img em url
    imagemURL = canvas.toDataURL('image/jpeg');

    campoCamera.style.display = "none";
    mensagem.style.display = "block";
});

//receber dados da foto
botaoEnviarFoto.addEventListener('click', () => {
    const receberDadosExistentes = localStorage.getItem("cadastro");
    const converteRetorno = JSON.parse(receberDadosExistentes);

    //tarsnfroma a img em url
    converteRetorno.imagem = imagemURL;

    //salva td em .json
    localStorage.setItem('cadastro', JSON.stringify(converteRetorno))

    //aparece por ultimo o form3
    window.location.href = '../pages/abrir-conta-form-3.html';
})
