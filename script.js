document.addEventListener('DOMContentLoaded', () => {
    const loading = document.getElementById('loading');
    const envelopeAnimation = document.querySelector('.envelope-animation');
    const mainContent = document.getElementById('main-content');

    // Envelope opening animation
    setTimeout(() => {
        envelopeAnimation.classList.add('open');
    }, 500);

    // Hide loading and show content
    setTimeout(() => {
        loading.style.display = 'none';
        mainContent.classList.remove('hidden');
    }, 4000);

    // RSVP form handling
    const rsvpButton = document.getElementById('rsvp-submit');
    const rsvpMessage = document.getElementById('rsvp-message');

    rsvpButton.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const guests = document.getElementById('guests').value;

        if (name && guests) {
            rsvpMessage.classList.remove('hidden');
            document.getElementById('name').value = '';
            document.getElementById('guests').value = '';
            setTimeout(() => {
                rsvpMessage.classList.add('hidden');
            }, 3000);
        }
    });

    // Countdown Timer
    const weddingDate = new Date('November 16, 2025 19:00:00').getTime();
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;

        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById('countdown').innerHTML = 'The Big Day Has Arrived!';
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#FFDAB9', '#FFFFF0', '#A8B5A2']
            });
        }
    }, 1000);
});