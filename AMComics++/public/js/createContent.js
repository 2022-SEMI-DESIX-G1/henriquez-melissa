const url = 'http://localhost:3000/api';

// Consumo de nuestra api
fetch(url)
    .then(res => res.json())
    .then(data => {

        // Create Comics
        for (let i = 0; i < data.length; i++) {

            let article = document.createElement('article');
            article.className = 'simpleCart_shelfItem';
            article.innerHTML = `

    
        <header>
            <div class="title">
                <h2 class="item_name align-center">${data[i].name}</h2>
                <p class="align-center">Año de publicación: ${data[i].year}</p>
            </div>
            <div class="meta">
                <p>Autor:</p>
                <h3>${data[i].author}</h3>
            </div>
        </header>
        
        <a href="single.html" class="image featured"><img class="item-image" width="200" height="350" src="${data[i].image}" alt="comic"/></a>
        <p>${data[i].description}</p>
        
        <footer>
            <ul class="actions">
            <li><a class="button large icon solid fa-tag item_price" onclick="info()">US$ ${data[i].price}.00</a></li>
            <li style="list-style-type: none"><a href="javascript:;" class="button large item_add" onclick="cart()">Añadir al carrito</a></li>
            </ul>
        </footer>
        <hr>
        
        `;

            const createComic = document.body.appendChild(article);
            document.getElementById('main').appendChild(createComic);

        }

        // Create Mini Posts
        for (let i = 0; i < data.length; i++) {

            let minipost = document.createElement('article');
            minipost.className = 'mini-post';
            minipost.innerHTML = `

        <header>
            <h3>${data[i].author}</h3>
            <p align="justify" class="published">${data[i].infoauthor}</p>
            <a href="#" class="author"><img src="images/author.png" alt="author" title="author"/></a>
        </header>
        
        `;

            const createAuthor = document.body.appendChild(minipost);
            document.querySelector('.mini-posts').appendChild(createAuthor);

        }

    });

