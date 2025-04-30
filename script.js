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
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpMessage = document.getElementById('rsvp-message');

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        const name = document.getElementById('name').value;
        const guests = document.getElementById('guests').value;

        if (name && guests) {
            // Send data to Google Apps Script
            fetch('https://script.google.com/macros/s/AKfycbztFMn2Iia74xeNk-MRmwtfkn4UDewlU624IEKPhjDSd0ApESs55-yFNODPo_g4PUxM/exec', {
                method: 'POST',
                mode: 'no-cors', // Required for Google Apps Script from static sites
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `name=${encodeURIComponent(name)}&guests=${encodeURIComponent(guests)}`
            })
            .then(() => {
                // Show success message
                rsvpMessage.classList.remove('hidden');
                document.getElementById('name').value = '';
                document.getElementById('guests').value = '';
                setTimeout(() => {
                    rsvpMessage.classList.add('hidden');
                }, 3000);
            })
            .catch(error => {
                console.error('Error submitting RSVP:', error);
                rsvpMessage.textContent = 'Error submitting RSVP. Please try again.';
                rsvpMessage.classList.remove('hidden');
                setTimeout(() => {
                    rsvpMessage.classList.add('hidden');
                }, 3000);
            });
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