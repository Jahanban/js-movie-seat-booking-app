const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = parseInt(movieSelect.value);

//update total and count for tickets
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // this will put our selected seats in a nodelist which is like an array

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;



}

// Movie select event

movieSelect.addEventListener('change', e => {
    ticketPrice = parseInt(e.target.value);
    updateSelectedCount();
})

// Clicking on a seat to change it selected

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }

    updateSelectedCount();
})

