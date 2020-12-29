const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row.seat:not(.occupied)')
// const rows = document.querySelectorAll('.row')

// let row = 7, col = 17

// function createSeats(i) {
//     let frag = document.createDocumentFragment(), temp = document.createElement('div')
//     for (let j = 0; j < col; j++) {
//         code = '<div class="seat" id="' + i + '_' + j + '"></div>'
//         temp.innerHTML = code 
//         frag.appendChild(temp.firstChild)
//     }
//     return frag
// }

// function createRows() {

// }

container.addEventListener('click', function(e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
    }
})
