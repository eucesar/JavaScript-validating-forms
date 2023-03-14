import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-idade.js";
//tds os elementos que são obrigatorios
const camposDoFormulario = document.querySelectorAll('[required]')
const formulario = document.querySelector('[data-formulario]');

//quando eu prencher td e enviar o formualrio
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "rg": e.target.elements["rg"].value,
        "cpf": e.target.elements["cpf"].value,
        "aniversario": e.target.elements["aniversario"].value,
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));

    window.location.href = "./abrir-conta-form-2.html";
    //vai direto pra 2°
})

//para cada campo da lista (definiu 'campo') - quando eu escrever e selecionar outro campo para escrever'blur' = vai verificar algum outro campo
camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    //quando aparecer erros = false
    campo.addEventListener("invalid", evento => evento.preventDefault())
})

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

//const para mensagens que pode ser q de erro :
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um email válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo) {
    //let para trabalhar com erros
    let mensagem = "";
    campo.setCustomValidity('');
    //esse if que eu defino quantos digitos tem q ter, e o nome q vou definir
    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);
    }
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo);
    }

    //acessando os each para cada erro
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })

    //se o campo tiver vazio, vai aparacer msg de erro, se n, n vai aconetcer nd, vai ler a linahd e baixo
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}