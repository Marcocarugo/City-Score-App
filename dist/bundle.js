(() => {
  document.getElementById("container"),
    document.getElementById("search-container");
  let e = document.getElementById("search-button"),
    n = document.getElementById("search-bar");
  e.addEventListener("click", () => {
    const e = n.value.toLowerCase().replace(" ", "-"),
      t = `https://api.teleport.org/api/urban_areas/slug:${e}/scores/`;
    "" === e
      ? (n.classList.add("error"), (n.value = "Inserisci un valore!"))
      : fetch(t)
          .then((e) => e.json())
          .then((e) => {
            const n = e.categories,
              t = document.getElementById("category-list");
            (t.innerHTML = ""),
              n.forEach((e) => {
                const n = Math.round(e.score_out_of_10);
                t.innerHTML += `\n 
                <li class="category-list-item">\n 
                <span class="category-name">${e.name}</span>
                \n <span class="category-score">${n}/10</span>\n <div class="bar-container">\n
                <div class="bar" style="background-color:${e.color}; width:${10 * n}%"></div>\n  
                </div>\n 
                </li>`;
              });
            const a = e.summary,
              s = document.createElement("div");
            (s.className = "sommario"),
              (s.textContent = "Summary"),
              t.appendChild(s);
            const r = document.createElement("div");
            (r.className = "resume"), (r.innerHTML = a), t.appendChild(r);
          })
          .catch((e) => console.error(e));
  }),
    n.addEventListener("focus", () => {
      n.classList.remove("error"),
        "Inserisci un valore!" === n.value && (n.value = "");
    });
})();
