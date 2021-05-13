const d = document,
apiKey = 'd51007e0';

let $shows = d.getElementById('show-query'),
$template = d.getElementById('show-template').content,
$fragment = d.createDocumentFragment();

d.addEventListener('keypress', e=>{
    if(e.target.matches('#search')){
        console.log(e.key);
        if(e.key === 'Enter'){
            console.log(e.target.value);
            dolphin(e);
        }
    }
})
let dolphin = async (e)=>{

    try {
        let query = e.target.value.toLowerCase();
        let api = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
        let getApi = await axios.get(api);
        let data = await getApi.data;
        console.log(data);
        
        if(data.response == 'False'){
            
            $shows.innerHTML = `<p>No results for: ${query}</p>`;
        }else{        
             data.Search.forEach(element => {
                console.log(element)
                $template.querySelector('.h3').textContent = element.Title;
                $template.querySelector('div').innerHTML = element.type?element.type:'No description';
                $template.querySelector('img').src = element.Poster?element.Poster: 'http://fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png';
                
                $template.querySelector('img').alt = element.Title;
                $template.querySelector('img').style.maxWidth = '100%';
               /*  $template.querySelector('a').textContent = element.Website ? 'see more...': '';
                $template.querySelector('a').target = element.Website ? '_blank': '_self';
                $template.querySelector('a').href = element.Website ? element.Website: '#'; */
                let $clone = d.importNode($template,true);
                $fragment.appendChild($clone);    
            });
            $shows.innerHTML = "";
            $shows.appendChild($fragment); 

        }
    } catch (error) {
        console.log(error)
    }
}