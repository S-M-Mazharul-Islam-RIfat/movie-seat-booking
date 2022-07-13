const theater = document.getElementById("theater");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");


populateUI();
let ticketPrice = movieSelect.value;

// get data of booked seats from local storage  and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    console.log(selectedSeats);
    if (selectedSeats !== null && selectedSeats.length >= 1) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// update total seats count
function updateSelectedSeatsCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = (selectedSeatsCount * ticketPrice);
}

// book seats
function bookSeats() {
    theater.addEventListener("click", event => {
        if (event.target.classList.contains("seat") && !event.target.classList.contains("occupied")) {
            event.target.classList.toggle("selected");
            updateSelectedSeatsCount();
        }
    })
}

// save selceted moive index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

// select movie
function selectMovie() {
    movieSelect.addEventListener("change", event => {
        ticketPrice = event.target.value;
        setMovieData(event.target.selectedIndex, event.target.value);
        updateSelectedSeatsCount();
    })
}


// Initial total booked seats
updateSelectedSeatsCount();
selectMovie();
bookSeats();
