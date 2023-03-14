//export como padrão = quando eu chamar o arquivo ela vai retornar como padrão - exportei a função campo
export default function ehUmCPF(campo) {
    //está criando um campo para CPF - q vai ter ponto ou barra = 12 digitos (no script - if)
    const cpf = campo.value.replace(/\.|-/g, "");
    if (validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
        campo.setCustomValidity('Esse cpf não é válido')
    }
}

//valida numeros repetidos
function validaNumerosRepetidos(cpf) {
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ]

    //ele vai passar por td  a lista, c n achar esse padrão ele vai retornar falso
    return numerosRepetidos.includes(cpf)
}

//valida cpf - 1° e 2° digito :
function validaPrimeiroDigito(cpf) {
    let soma = 0;
    let multiplicador = 10;

    //laços de repetição - 0 vai se repetir até virar 9
    for (let tamanho = 0; tamanho < 9; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    //9 digitos
    return soma != cpf[9];
}

function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;

    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--
    }

    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    return soma != cpf[10];
}