const API_BASE_URL = 'https://api.rawg.io/api';
const CHAVE_API = 'e0369175c5284f89a1a7a4eb5158d33e';

document.body.onload = () => {
    carregarDestaques();
    carregarPlataformas();
}

const carregarDestaques = () => {
    fetch(API_BASE_URL + '/games?page_size=3&key=' + CHAVE_API, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            data.results.forEach((item, key) => {
                let generos = item.genres.map(g => g.name).join("; ");
                let plataformas = item.parent_platforms.map(p => p.platform.name).join("; ");
                let itemBanner = `
                <div class="carousel-item ${key === 0 ? 'active' : ''}">
                    <a href="detalhes.html?id=${item.id}">
                        <div class="row">
                            <div class="col-12 col-md-6 col-sm-12">
                                <img class="d-block w-100 h-100" src="${item.background_image}">
                                </img>
                            </div>
                            <div class="col-12 col-md-6 col-sm-12 descricao-jogo">
                                <h2>${item.name}</h2>
                                <span><b>Lançamento: </b> ${item.released}</span>
                                <span><b>Plataformas: </b> ${plataformas}</span>
                                <span><b>Gênero: </b> ${generos}</span>
                                <span><b>Avaliação: </b> <span class="avaliacao">${item.rating}</span></span>
                            </div>
                        </div>
                    </a>
                </div>`;
                $('.carousel-inner').append(itemBanner);
            })
            $('#preloader').hide('slow');
        });
}

const carregarPlataformas = () => {
    fetch(API_BASE_URL + '/platforms/lists/parents?page_size=3&key=' + CHAVE_API, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            data.results.forEach((item) => {
                var itens = '';
                item.platforms.forEach(row => {
                    itens += `<li>${row.name}</li>`;
                })
                let plataforma = `
                <div class="col-12 col-sm-6 col-md-4 col-lg-4">
                    <img src=${item.platforms[0].image_background}>
                    <span><strong>${item.name}</strong></span>
                    <ul>
                        ${itens}
                    </ul>
                </div>`
                $("#div_plataformas").append(plataforma);
            })
        });
}