const giftBox = document.getElementById("giftBox");
const message = document.getElementById("message");
const music = document.getElementById("bgMusic");

let sparkleIntervalId = null;

giftBox.addEventListener("click", () => {
    giftBox.style.display = "none";
    if (music && music.play) music.play().catch(() => {});

    // Determine counts tuned for mobile
    const isNarrow = window.innerWidth <= 480;
    const balloonCount = isNarrow ? 18 : 30;
    const sparkleInterval = isNarrow ? 300 : 150;

    // Balloons + hearts staggered
    for (let i = 0; i < balloonCount; i++) {
        setTimeout(createBalloon, i * (isNarrow ? 160 : 120));
    }

    // Sparkles (save interval id so we can clear later)
    sparkleIntervalId = setInterval(createSparkle, sparkleInterval);

    // Last big balloon and reveal message
    setTimeout(lastBalloon, isNarrow ? 5200 : 5000);
});

function createBalloon() {
    const balloon = document.createElement("div");
    balloon.className = "balloon";

    // sizes responsive to viewport (use px fallback)
    const vw = Math.max(document.documentElement.clientWidth || 320, window.innerWidth || 320);
    const isMobile = vw <= 480;
    const min = isMobile ? 40 : 50;
    const max = isMobile ? 80 : 120;
    const size = Math.round(Math.random() * (max - min) + min);
    balloon.style.setProperty('--size', `${size}px`);

    // Color gradients for balloons
    const gradients = [
        ['#ff9a9e', '#fecfef'],
        ['#a18cd1', '#fbc2eb'],
        ['#f6d365', '#fda085'],
        ['#96fbc4', '#f9f586'],
        ['#84fab0', '#8fd3f4']
    ];
    const g = gradients[Math.floor(Math.random() * gradients.length)];
    balloon.style.background = `linear-gradient(135deg, ${g[0]}, ${g[1]})`;

    // emoji or heart content; smaller balloons use emoji only
    const useHeart = Math.random() > 0.6;
    balloon.textContent = useHeart ? '💖' : '🎈';

    // random left position within viewport
    balloon.style.left = Math.random() * 90 + "vw";

    // random durations
    const duration = (Math.random() * 3 + 4).toFixed(2); // 4 - 7s
    const sway = (Math.random() * 2 + 2).toFixed(2); // 2 - 4s
    balloon.style.setProperty('--duration', `${duration}s`);
    balloon.style.setProperty('--sway-duration', `${sway}s`);

    document.body.appendChild(balloon);

    // remove after it finishes floating + small buffer
    const totalMs = Math.ceil((parseFloat(duration) + 0.8) * 1000);
    setTimeout(() => {
        if (balloon && balloon.remove) balloon.remove();
    }, totalMs);
}

function lastBalloon() {
    // create a centered, larger balloon that 'pops' then reveals message
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    const size = Math.min(Math.max(window.innerWidth * 0.25, 60), 220);
    balloon.style.setProperty('--size', `${size}px`);
    balloon.style.left = '50%';
    balloon.style.transform = 'translateX(-50%)';
    balloon.style.background = 'linear-gradient(135deg,#ffafbd,#ffc3a0)';
    balloon.textContent = '🎈';
    balloon.style.setProperty('--duration', '5s');
    balloon.style.setProperty('--sway-duration', '2.2s');
    document.body.appendChild(balloon);

    // After floating a bit, change to pop emoji, then remove and show message
    setTimeout(() => {
        balloon.textContent = '💥';
        balloon.style.transition = 'transform 0.25s ease-out, opacity 0.25s ease-out';
        balloon.style.transform += ' scale(1.35)';
        balloon.style.opacity = '0.9';
    }, 2000);

    setTimeout(() => {
        if (balloon && balloon.remove) balloon.remove();
        // stop sparkles
        if (sparkleIntervalId) clearInterval(sparkleIntervalId);
        message.style.display = 'block';
    }, 2500);
}

function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.innerHTML = "✨";
    // keep sparkles more centered vertically for mobile devices
    sparkle.style.left = Math.random() * 95 + "vw";
    sparkle.style.top = Math.random() * 85 + "vh";
    sparkle.style.fontSize = Math.round(Math.random() * 10 + 10) + 'px';
    document.body.appendChild(sparkle);

    setTimeout(() => {
        if (sparkle && sparkle.remove) sparkle.remove();
    }, 1600);
}