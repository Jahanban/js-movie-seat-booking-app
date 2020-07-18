const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = parseInt(movieSelect.value);

//save selected movie index and price

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


//update total and count for tickets
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // in order to save selection to local storage we will copy selected seats in an array and map through that array and return a new array indexes

    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat)
    });

    // now saving in local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    // this will put our selected seats in a nodelist which is like an array

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from local storage and populate UI

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }

}

// Movie select event

movieSelect.addEventListener('change', e => {
    ticketPrice = parseInt(e.target.value);
    //saving selected movie index in local storage and the price
    setMovieData(e.target.selectedIndex, e.target.value);

    updateSelectedCount();
})

// Clicking on a seat to change it selected

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
    }

    updateSelectedCount();
})

// Inital count and total set

updateSelectedCount();