// loging and Authentication

document.getElementById('submitbtn').addEventListener('click', () => {
    const userName = document.getElementById('username').value;
    const passWord = document.getElementById('password').value;
    if (userName == 'admin' && passWord == 'admin123') {
        alert('login Successful')
        window.location.assign('/main.html')
    } else {
        alert('login Failed')
        return
    }
})
