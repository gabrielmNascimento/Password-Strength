const passwordInput = document.getElementById('password')
const progressBar = document.getElementById('password-strength').firstElementChild
const messages = document.getElementById('messages')

function checkStrength(password)
{
    let score = 0

    let lowercase = /[a-z]/.test(password)
    let uppercase = /[A-Z]/.test(password)
    let number = /[0-9]/.test(password)
    let symbol = /[^\w\s]/.test(password)
    let length = password.length

    if(length >= 8)
    {
        score += 1
    }

    if(length >= 12)
    {
        score += 2
    }

    if(lowercase && uppercase)
    {
        score += 2
    }

    if(number || symbol)
    {
        score += 1
    }

    if(number && symbol)
    {
        score += 1
    }

    const total = Math.round((score / 7) * 100)
    progressBar.style.width = `${total}%`
    progressBar.setAttribute('aria-valuenow', total)

    messages.innerHTML = ''

    switch(true)
    {
        case(score <= 2):
            messages.innerHTML = '<li class="list-group-item text-danger">This password is weak!</li>'
            progressBar.classList.add('weak')
            break;

        case(score <= 4):
            messages.innerHTML = '<li class="list-group-item text-warning">Meh! Can be better than it!</li>'
            progressBar.classList.add('regular')
            break;

        case(score <= 10):
            messages.innerHTML = '<li class="list-group-item text-success">Excellent!! Your password is the strongest!</li>'
            progressBar.classList.add('strong')
            break;
    }
}

passwordInput.addEventListener('keyup', () => {
    const password = passwordInput.value
    checkStrength(password)
})
