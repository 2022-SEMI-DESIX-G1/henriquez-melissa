const get_data = async () => {
    let data = await fetch("http://localhost:3000/api");
    let json = await data.json();
    return json;
};

window.addEventListener("load", () => {
    const articles = get_data().then(async (data) => {
        const search = new JsSearch.Search("id");
        search.addIndex("name");
        search.addDocuments(data);

        document.querySelector("input[type='search']").addEventListener("input", (event) => {
            let value = event.target.value;
            let results = search.search(value);

            let html = "";
            results.forEach((res) => {
                let div = `
      <div class='postSearch'>
        <h2 class='titleSearch'>${res.name} | ${res.author} ${res.year}</h2>
        <p class='description' style="margin-right: 1em ; margin-left: 1em;">${res.description}</p>
      </div>
      `;
                html += div;
            });
            document.querySelector("#resultsSearch").innerHTML = html;
        });
    });
});