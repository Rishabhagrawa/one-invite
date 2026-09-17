const noBtn = document.getElementById('noBtn');
let chosenFood = '';

function teleportButton() {
  const card = document.getElementById('card');
  const cardRect = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = cardRect.width - btnRect.width - 24;
  const maxY = cardRect.height - btnRect.height - 24;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  noBtn.style.position = 'absolute';
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

noBtn.addEventListener('mouseenter', teleportButton);
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  teleportButton();
});

function nextStep(step) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  
  const nextTarget = document.getElementById(`step-${step}`);
  if (nextTarget) {
    nextTarget.classList.add('active');
  }

  if (step === 2 && typeof confetti === 'function') {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function chooseFood(foodName) {
  chosenFood = foodName;
  nextStep(5);
}

function finish() {
  const dateVal = document.getElementById('dateInput').value || 'Soon';
  const timeVal = document.getElementById('timeInput').value || 'Evening';
  
  document.getElementById('summaryText').innerHTML = 
    `Locked in for <strong>${dateVal}</strong> at <strong>${timeVal}</strong>.<br><br>Dinner plan: <strong>${chosenFood || 'Good food'}</strong>.<br><br>See you then! ✨`;

  if (typeof confetti === 'function') {
    confetti({ particleCount: 150, spread: 90 });
  }
  nextStep('final');
}
