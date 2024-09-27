var addCardButtons = document.querySelectorAll('.add-card');

for (var i = 0; i < addCardButtons.length; i++) {
    addCardButtons[i].addEventListener('click', function() {
        var column = this.parentElement.id;
        var input = this.previousElementSibling;
        var cardText = input.value;

        if (cardText) {
            addCard(column, cardText);
            input.value = '';
        }
    });
}

function addCard(column, text) {
    var cardContainer = document.querySelector('#' + column + ' .card-container');
    var card = document.createElement('div');
    card.className = 'card';
    card.textContent = text;

    card.draggable = true;
    card.addEventListener('dragstart', dragStart);
    card.addEventListener('dragend', dragEnd);

    cardContainer.appendChild(card);
}

var cardContainers = document.querySelectorAll('.card-container');

for (var j = 0; j < cardContainers.length; j++) {
    cardContainers[j].addEventListener('dragover', dragOver);
    cardContainers[j].addEventListener('drop', drop);
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
    event.target.classList.add('dragging');
}

function dragEnd(event) {
    event.target.classList.remove('dragging');
}

function dragOver(event) {
    event.preventDefault();
    var draggingCard = document.querySelector('.dragging');
    var cards = Array.from(this.children).filter(function(card) {
        return card !== draggingCard;
    });
    var afterElement = cards.find(function(card) {
        return event.clientY < card.getBoundingClientRect().top + card.offsetHeight / 2;
    });
    this.insertBefore(draggingCard, afterElement);
}

function drop(event) {
    event.preventDefault();
}


