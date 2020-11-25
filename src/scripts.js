const endpoint = 'http://18.231.42.102:3000/api/produtos/'

function getAllprodutos() {
    const app = document.getElementById('root');
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    
    app.appendChild(container);
    
    var request = new XMLHttpRequest();
    request.open('GET', endpoint, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(this.response);

            data.forEach((produto) => {
                const card = document.createElement('div');
                card.setAttribute('class', 'card');
            
                const p = document.createElement('p');
                p.textContent = 'Descrição: ' +  produto.descricao;
            
                container.appendChild(card);
                card.appendChild(p);
            })
        } else {
            console.log("Erro ao buscar os produtos");
        }
    }
    
    request.send();
}

function retrieveSingleProduct() {
    const _id = document.getElementById("productId").value;
    if (_id == "") {
        return;
    }
    
    const app = document.getElementById('root');
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    
    app.appendChild(container);
    
    var request = new XMLHttpRequest();
    request.open('GET', endpoint + _id, true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var produto = JSON.parse(this.response);
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const p = document.createElement('p');
            p.textContent = 'Descrição: ' +  produto.descricao;
        
            container.appendChild(card);
            card.appendChild(p);

        } else {
            console.log("Erro ao buscar o produto: " + _id);
        }
    }
    
    request.send();

}

function insertProduct() {
    const description = document.getElementById("productDescription").value;
    if (description == "") {
        return;
    }
    
    const data = JSON.stringify({
        descricao: description
    })

    console.log(data);

    fetch(endpoint, {
        method: 'POST',
        headers: { },
        body: data
    })
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.log(err)
    })

}

function updateProduct() {
    const description = document.getElementById("productDescription").value;
    const _id = document.getElementById("productId").value;

    if (description == "" || _id == "") {
        return;
    }
    
    const data = JSON.stringify({
        descricao: description
    })

    fetch(endpoint + _id, {
        method: 'PUT',
        headers: { },
        body: data
    })
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.log(err)
    })

}

function removeProduct() {
    const _id = document.getElementById("productId").value;

    if (_id == "") {
        return;
    }

    console.log(endpoint + _id);
    
    fetch(endpoint + _id, {
        method: 'DELETE',
        headers: { }
    })
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.log(err)
    })

}