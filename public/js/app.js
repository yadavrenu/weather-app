console.log('loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const errorMsg = document.querySelector('.error');
const success = document.querySelector('.success');

weatherForm.addEventListener('submit', (event) => {
    errorMsg.textContent = '';
    success.textContent = 'loading...';
    event.preventDefault();
    const location = search.value;
    fetch('http://localhost:3000/weather?address='+location)
    .then(response => {
        response.json().then( ({data, error}) => {
            if(error) {
                errorMsg.textContent = error;
                return console.log(error);
            }
            success.textContent = data;
            console.log(data);
        });
    });
})