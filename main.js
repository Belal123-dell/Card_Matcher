const images = ["😊", "😊", "😂", "😂", "🤣", "🤣", "❤️", "❤️",
                "🎶", "🎶", "😎", "😎", "🤩", "🤩", "🤔", "🤔"];

let clickCount = 0;
const clickCountElement = document.getElementById('click-count');

function updateClickCount() {
    clickCount++;
    clickCountElement.textContent = clickCount;

    if (clickCount === 60){
        alert('Fail to finish!!');
        resetGame();
    }
}

function resetClickCount() {
    clickCount = 0;
    clickCountElement.textContent = clickCount;
}

function resetGame() {
    document.querySelector('.game').innerHTML = '';
    resetClickCount();
    initializeGame();
}

function initializeGame() {
    const shuf_images = images.sort(() => Math.random() > 0.5 ? 1 : -1);
    for (let i = 0; i < images.length; i++) {
        let box = document.createElement('div');
        box.className = 'item';
        box.innerHTML = shuf_images[i];

        box.onclick = function () {
            this.classList.add('boxOpen');
            updateClickCount();

            setTimeout(function () {
                const openBoxes = document.querySelectorAll('.boxOpen');
                if (openBoxes.length > 1) {
                    if (openBoxes[0].innerHTML === openBoxes[1].innerHTML) {
                        openBoxes[0].classList.add('boxMatch');
                        openBoxes[1].classList.add('boxMatch');

                        openBoxes[0].style.visibility = 'hidden';
                        openBoxes[1].style.visibility = 'hidden';

                        openBoxes[0].classList.remove('boxOpen');
                        openBoxes[1].classList.remove('boxOpen');

                        if (document.querySelectorAll('.boxMatch').length === images.length) {
                            alert('Win!!');
                            resetGame();
                        }
                    } else {
                        openBoxes[1].classList.remove('boxOpen');
                        openBoxes[0].classList.remove('boxOpen');
                    }
                }
            }, 500);
        }

        document.querySelector('.game').appendChild(box);
    }
}

initializeGame();
