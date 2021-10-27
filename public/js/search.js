const search = document.querySelector('.input-search')
search.addEventListener('keypress',(e) => {
    const searchQuery = e.target.value
    if(e.key == 'Enter'){
        fetch('/search', {
            method: 'POST',
            body: JSON.stringify({ searchQuery }),
            headers: { 'Content-type': 'application/json' }
        }).then((result) => result.json())
        .then((res) => {
            console.log(res)
        })
        .catch(err => console.log(err))
    }
})
