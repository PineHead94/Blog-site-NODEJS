const loginBtn = document.querySelector('.login-submit-btn')
const user = document.querySelector('#username')
const pass = document.querySelector('#password')
const errorName = document.querySelector('.error.username')
const errorPassword = document.querySelector('.error.password')

loginBtn.addEventListener('click', (e) => {
    e.preventDefault()
    errorName.textContent = ''
    errorPassword.textContent = ''
    
    const username = user.value
    const password = pass.value
    const f = JSON.stringify({username,password})
    console.log(f)
    fetch('/login', {
        method: "POST",
        body: JSON.stringify({ username,password }),
        headers: { 'Content-type': 'application/json' }
    }).then((result) => result.json())
    .then((res) => {
        console.log(res)
        if(res.redirect){
            window.location.href = res.redirect
        } else {
            errorName.textContent = res.errors.username
            errorPassword.textContent = res.errors.password
        }
    })
})