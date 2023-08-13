async function buscaEndereco(cep) {
    const msgErro = document.querySelector("#erro");
    msgErro.innerHTML = "";
    try {
        const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }
        const cidade = document.querySelector("#cidade");
        cidade.value = consultaCEPConvertida.localidade;
        const logradouro = document.querySelector("#endereco");
        logradouro.value = consultaCEPConvertida.logradouro;
        const estado = document.querySelector("#estado");
        estado.value = consultaCEPConvertida.uf;
        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    }
    catch (erro) {
        msgErro.innerHTML = `<p>CEP inválido. Tente novamente...</p>`;
        console.log(erro);
    }
}

const campoCEP = document.querySelector("#cep");

campoCEP.addEventListener('focusout', () => buscaEndereco(campoCEP.value));
