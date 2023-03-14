export default function ehMaiorDeIdade(campo) {
    const dataNascimento = new Date(campo.value);
    if (!validaIdade(dataNascimento)) {
        campo.setCustomValidity('O usuário não é maior de idade');
    }
}

//se a data atual da péssoa é maior de 18
function validaIdade(data) {
    const dataAtual = new Date();
    //data maior de 18
    const dataMais18 = new Date(data.getUTCFullYear() + 18, data.getUTCMonth(), data.getUTCDate());

    return dataAtual >= dataMais18;
}