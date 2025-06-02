document.addEventListener("DOMContentLoaded", function() {
    const currentCardEl = document.getElementById("current-card");
    const nextCardEl = document.getElementById("next-card");
    const messageEl = document.getElementById("message");
    const scoreEl = document.getElementById("score");
    const higherBtn = document.getElementById("higher-btn");
    const lowerBtn = document.getElementById("lower-btn");

    let currentCard = generateRandomCard();
    let nextCard;
    let score = 0;

    currentCardEl.textContent = currentCard;

    higherBtn.addEventListener("click", function() {
        checkGuess("higher");
    });

    lowerBtn.addEventListener("click", function() {
        checkGuess("lower");
    });

    function generateRandomCard() {
        return Math.floor(Math.random() * 13) + 1; // Random getal tussen 1 en 13
    }

    function checkGuess(guess) {
        nextCard = generateRandomCard();
        nextCardEl.textContent = nextCard;
        nextCardEl.classList.remove("hidden");

        if ((guess === "higher" && nextCard > currentCard) || (guess === "lower" && nextCard < currentCard)) {
            messageEl.textContent = "Je hebt gelijk!";
            messageEl.style.color = "green";
            score++;
        } else {
            messageEl.textContent = "Helaas, verkeerd geraden!";
            messageEl.style.color = "red";
        }

        scoreEl.textContent = "Punten: " + score;
        messageEl.classList.add("show");

        // Verplaats de volgende kaart naar de huidige kaart
        setTimeout(() => {
            currentCard = nextCard;
            currentCardEl.textContent = currentCard;

            // Verberg de volgende kaart na de update
            nextCardEl.classList.add("hidden");
            messageEl.classList.remove("show");
            messageEl.textContent = "";
        }, 1500);
    }
});
