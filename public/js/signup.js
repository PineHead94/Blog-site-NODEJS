const user = document.querySelector('#username')
const pass = document.querySelector('#password')
const signupBtn = document.querySelector('.signup')
const usernameError = document.querySelector('.error.username')
const passwordError = document.querySelector('.error.password')

signupBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const username = user.value
    const password = pass.value
    fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({ username,password }),
        headers: { 'Content-type': 'application/json' }
    }).then((res) => res.json())
    .then((data)=>{
        if(data.redirect){
            window.location.href = data.redirect
        } else {
            usernameError.textContent = data.error.username
            passwordError.textContent = data.error.password
        }
    })
})
