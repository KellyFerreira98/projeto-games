const API_BASE_URL = 'https://api.rawg.io/api';
const CHAVE_API = 'e0369175c5284f89a1a7a4eb5158d33e';

document.body.onload = () => {
    const search = window.location.search;
    let id = search.split("=");
    id = id[1];
    carregarInformacaoJogo(id);
}

const carregarInformacaoJogo = (id) => {
    fetch(API_BASE_URL + `/games/${id}?&key=${CHAVE_API}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => response.json())
        .then((data) => {
            let generos = data.genres.map(g => g.name).join("; ");
            let desenolvedora = data.developers.map(g => g.name).join("; ");
            let plataformas = data.parent_platforms.map(p => p.platform.name).join("; ");
            let conteudo = `
            <div class="row">
                <div class="col-12">
                    <img class="d-block w-100 h-100" src="${data.background_image}">
                    </img>
                </div>
                <div class="col-12 descricao-jogo mt-3">
                    <span><b>Descrição</b> ${data.description}</span>
                    <span><b>Lançamento: </b> ${data.released}</span>
                    <span><b>Plataformas: </b> ${plataformas}</span>
                    <span><b>Gênero: </b> ${generos}</span>
                    <span><b>Desenvolvedora: </b> ${desenolvedora}</span>
                    <span><b>Site: </b> <a href="${data.website}" target="_blank">${data.website}</a></span>
                    <span><b>Avaliação: </b> <span class="avaliacao">${data.rating}</span></span>
                </div>
            </div>`;
            $("#titulo").html(data.name)
            $('#conteudo').html(conteudo);
            $('#preloader').hide('slow');
        });
}