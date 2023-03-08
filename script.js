
var search_submit = document.querySelector('.d-flex')
search_submit.addEventListener('submit', (e) => {
    e.preventDefault()
    var display = document.getElementById('Display')
    display.innerHTML = ""
    var search = document.querySelector('[placeholder="Search"]')
    var search_value = search.value
    api(search_value)
})



async function api(data) {
    v = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${data}`)
    try {
        out = await v
        prom = out.json()
        res = await prom
        net = res[0]

        var display = document.getElementById('Display')
        var image_ele = document.createElement('div')
        for (let i of net.meanings)
            //Here insert the html code to display
            image_ele.innerHTML = `
         <div class="card text-center" id="main">
        <div class="card-body">
          <h5 class="card-title">${net.word} <sub>${net.phonetic}</sub></h5>
          <p class="card-text"><i>${net.meanings[0].definitions[0].definition}<i> 
          | <i>${net.meanings[0].definitions[1].definition}<i> 
          | <i>${net.meanings[0].definitions[2].definition}<i> 
          | <i>${net.meanings[0].definitions[3].definition}<i>
          | <i>${net.meanings[0].definitions[4].definition}<i>
          | <i>${net.meanings[0].definitions[5].definition}<i>
          </p>
          <p class="card-text"><i><small>Example: ${net.meanings[0].definitions[0].example}</small><i></p>

          <a href="${net.sourceUrls[0]}" class="btn btn-outline-dark">For reference</a>
        </div>
        <div class="card-footer text-muted">
        <audio controls autoplay>
        <source src="${net.phonetics[0].audio}" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio><br>
        </div>
      </div><br><br>

        `
        display.appendChild(image_ele);

    } catch {
        console.log("error");

        // ERROR Display
        var source = document.getElementById('Display')
        var create_dis = document.createElement('div')
        create_dis.setAttribute("class", "Error");
        create_dis.innerHTML = ` 
        <div id="scroll-container">
      <div id="scroll-text">SORRY :( ${net.word} not found in the Dictionary API, Search any another word! <div>
    </div>`
        
    source.append(create_dis)

    }

}