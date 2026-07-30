// ============================================================
// Scroll Parallax Effect
// ============================================================

const header = document.querySelector('header');
const img = document.querySelector('.img');
let scrollDistance = 0;
let requestId = null;

function updateHeaderClipPath() {
    const progress = Math.min(1, scrollDistance / 1100);
    const bottomPercent = 100 - (progress * 60);
    const clipPathValue = `polygon(0 0, 100% 0%, 100% ${bottomPercent}%, 0 100%)`;
    header.style.clipPath = clipPathValue;

    const scaleValue = 1 + progress;
    img.style.transform = `scale(${scaleValue})`;

    const opacityValue = 1 - progress;
    img.style.opacity = opacityValue;
}

function scrollHandler(event) {
    scrollDistance = Math.max(0, Math.min(700, scrollDistance + event.deltaY));

    if (!requestId) {
        requestId = window.requestAnimationFrame(() => {
            updateHeaderClipPath();
            requestId = null;
        });
    }
}

window.addEventListener('wheel', scrollHandler, { passive: true });

// ============================================================
// Progress Bar
// ============================================================

const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
});

// ============================================================
// Slide Carousel
// ============================================================

let chosenSlideNumber = 1;
let offset = 0;
let baroffset = 0;
let intervalID;

const drawerBtns = document.querySelectorAll(".draw-btn");
const slideSection = document.querySelector("#slide-sec");

startSlide();

drawerBtns.forEach(function(btn) {
    btn.addEventListener("click", function() {
        clearInterval(intervalID);
        startSlide();
    });
});

slideSection.addEventListener("mouseenter", function() {
    clearInterval(intervalID);
});

slideSection.addEventListener("mouseleave", function() {
    startSlide();
});

function slideTo(slideNumber) {
    drawerboxToggle(slideNumber);
    drawerbtnToggle(slideNumber);

    var previousSlideNumber = chosenSlideNumber;
    chosenSlideNumber = slideNumber;
    offset += (chosenSlideNumber - previousSlideNumber) * (-100);
    baroffset += (chosenSlideNumber - previousSlideNumber) * (-100);
    barslide(baroffset);

    var slides = document.querySelectorAll(".card");
    slides.forEach(function(slide, index) {
        if (index === slideNumber - 1) {
            slide.style.display = 'block';
            slide.style.opacity = '1';
            slide.style.transform = 'translateY(0)';
        } else {
            slide.style.display = 'none';
            slide.style.opacity = '0';
            slide.style.transform = 'translateY(30px)';
        }
    });
}

function drawerboxToggle(drawerboxNumber) {
    var prevDrawerboxNumber = chosenSlideNumber;
    var drawerboxes = document.querySelectorAll(".drawbox");
    drawerboxes[prevDrawerboxNumber - 1].classList.toggle("active");
    drawerboxes[drawerboxNumber - 1].classList.toggle("active");
}

function drawerbtnToggle(drawerBtnNumber) {
    var prevdrawerBtnNumber = chosenSlideNumber;
    var drawerBtns = document.querySelectorAll(".draw-btn");
    drawerBtns[prevdrawerBtnNumber - 1].classList.toggle("active");
    drawerBtns[drawerBtnNumber - 1].classList.toggle("active");
}

function barslide(baroffset) {
    var bar = document.querySelector("#bar");
    bar.style.transform = "translateY(" + (-baroffset) + "%)";
}

function startSlide() {
    clearInterval(intervalID);
    intervalID = setInterval(function() {
        slideTo(chosenSlideNumber % 5 + 1);
    }, 1500);
}

// Show only the first card when page loads
document.addEventListener('DOMContentLoaded', function() {
    var slides = document.querySelectorAll(".card");
    slides.forEach(function(slide, index) {
        if (index === 0) {
            slide.style.display = 'block';
            slide.style.opacity = '1';
            slide.style.transform = 'translateY(0)';
        } else {
            slide.style.display = 'none';
            slide.style.opacity = '0';
            slide.style.transform = 'translateY(30px)';
        }
    });
});

// ============================================================
// Technology - Adjust slide height responsively
// ============================================================

function adjustSlideHeight() {
    var slideSec = document.getElementById('slide-sec');
    var cards = document.querySelectorAll('.card');
    
    if (!slideSec) return;
    
    var windowWidth = window.innerWidth;
    
    if (windowWidth <= 480) {
        slideSec.style.minHeight = '200px';
        slideSec.style.maxHeight = '320px';
        slideSec.style.height = 'auto';
        cards.forEach(function(card) {
            card.style.padding = '8px 10px';
        });
    } else if (windowWidth <= 800) {
        slideSec.style.minHeight = '300px';
        slideSec.style.maxHeight = '400px';
        slideSec.style.height = 'auto';
        cards.forEach(function(card) {
            card.style.padding = '12px 15px';
        });
    } else {
        slideSec.style.minHeight = '';
        slideSec.style.maxHeight = '';
        slideSec.style.height = '';
        cards.forEach(function(card) {
            card.style.padding = '';
        });
    }
}

document.addEventListener('DOMContentLoaded', adjustSlideHeight);
window.addEventListener('resize', adjustSlideHeight);

// ============================================================
// Music Player
// ============================================================

var music = document.querySelector('.music-element');
var playBtn = document.querySelector('.play');
var pauseBtn = document.querySelector('.pause');
var seekbar = document.querySelector('.seekerbar');
var currentTime = document.querySelector('.current-time');
var duration = document.querySelector('.duration');

pauseBtn.style.display = 'none';

function handlePlay() {
    music.play();
    playBtn.style.display = 'none';
    pauseBtn.style.display = 'flex';
}

function handlePause() {
    music.pause();
    pauseBtn.style.display = 'none';
    playBtn.style.display = 'flex';
}

window.addEventListener('load', function() {
    music.play().then(function() {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'flex';
    }).catch(function() {
        playBtn.style.display = 'flex';
        pauseBtn.style.display = 'none';
        document.addEventListener('click', function() {
            if (music.paused) {
                music.play();
                playBtn.style.display = 'none';
                pauseBtn.style.display = 'flex';
            }
        }, { once: true });
    });
});

music.addEventListener('ended', function() {
    playBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';
    music.currentTime = 0;
    seekbar.value = 0;
    currentTime.innerHTML = '0:00';
});

music.onloadeddata = function() {
    seekbar.max = music.duration;
    var ds = parseInt(music.duration % 60);
    var dm = parseInt((music.duration / 60) % 60);
    duration.innerHTML = dm + ':' + (ds < 10 ? '0' : '') + ds;
};

music.ontimeupdate = function() {
    seekbar.value = music.currentTime;
};

function handleSeekerBar() {
    music.currentTime = seekbar.value;
}

music.addEventListener('timeupdate', function() {
    var cs = parseInt(music.currentTime % 60);
    var cm = parseInt((music.currentTime / 60) % 60);
    currentTime.innerHTML = cm + ':' + (cs < 10 ? '0' : '') + cs;
}, false);

// ============================================================
// Volume Controls
// ============================================================

var volIcon = document.querySelector('.valume');
var volBox = document.querySelector('.valume-box');
var volRange = document.querySelector('.valume-range');
var volDown = document.querySelector('.valume-down');
var volUp = document.querySelector('.valume-up');

function handleVolume() {
    volIcon.classList.toggle('active');
    volBox.classList.toggle('active');
}

if (volDown) {
    volDown.addEventListener('click', handleVolumeDown);
}

if (volUp) {
    volUp.addEventListener('click', handleVolumeUp);
}

function handleVolumeDown() {
    var newVal = Number(volRange.value) - 20;
    if (newVal < 0) newVal = 0;
    volRange.value = newVal;
    music.volume = volRange.value / 100;
}

function handleVolumeUp() {
    var newVal = Number(volRange.value) + 20;
    if (newVal > 100) newVal = 100;
    volRange.value = newVal;
    music.volume = volRange.value / 100;
}

// ============================================================
// Music Toggle Button
// ============================================================

var musicToggle = document.querySelector('.music-toggle');
if (musicToggle) {
    musicToggle.addEventListener('click', function() {
        if (music.paused) {
            music.play().catch(function() {});
            playBtn.style.display = 'none';
            pauseBtn.style.display = 'flex';
        }
    });
}

// ============================================================
// Sidebar Hover Controls
// ============================================================

var sidebar = document.getElementById('musicSidebar');
var wrapper = document.getElementById('musicPlayerWrapper');

if (sidebar && wrapper) {
    sidebar.addEventListener('mouseenter', function() {
        wrapper.classList.add('show');
    });

    sidebar.addEventListener('mouseleave', function(e) {
        var relatedTarget = e.relatedTarget;
        if (!sidebar.contains(relatedTarget)) {
            wrapper.classList.remove('show');
        }
    });
}

var musicToggleBtn = document.getElementById('musicToggle');
if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        wrapper.classList.toggle('show');
    });
}

document.addEventListener('click', function(e) {
    if (sidebar && !sidebar.contains(e.target)) {
        wrapper.classList.remove('show');
    }
});

// ============================================================
// Cards - Scroll Reveal
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    var cards = document.querySelectorAll('.team-card, .card2,.history');

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(function() {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    });

    for (var i = 0; i < cards.length; i++) {
        observer.observe(cards[i]);
    }
});

// ============================================================
// Track Data - 10 Classic F1 Circuits
// ============================================================

const trackData = {
    'spa': {
        flag: '🇧🇪',
        name: 'Spa-Francorchamps',
        location: 'Stavelot, Belgium',
        length: '7.004 km',
        corners: '19',
        record: '1:41.252',
        type: 'Permanent',
        desc: 'The world\'s best circuit. Set in the Ardennes forest with the famous Eau Rouge-Raidillon high-speed corner sequence. Unpredictable weather makes every race a classic.'
    },
    'monaco': {
        flag: '🇲🇨',
        name: 'Circuit de Monaco',
        location: 'Monte Carlo, Monaco',
        length: '3.337 km',
        corners: '19',
        record: '1:10.166',
        type: 'Street',
        desc: 'The crown jewel of F1. The narrowest and slowest circuit on the calendar. Qualifying is everything, as overtaking is nearly impossible.'
    },
    'silverstone': {
        flag: '🇬🇧',
        name: 'Silverstone Circuit',
        location: 'Silverstone, England',
        length: '5.891 km',
        corners: '18',
        record: '1:27.097',
        type: 'Permanent',
        desc: 'The birthplace of F1. Built on a former WWII airfield, it hosted the first World Championship race in 1950.'
    },
    'suzuka': {
        flag: '🇯🇵',
        name: 'Suzuka Circuit',
        location: 'Suzuka, Japan',
        length: '5.807 km',
        corners: '18',
        record: '1:27.064',
        type: 'Permanent',
        desc: 'The only figure-8 layout on the F1 calendar. Home to the famous 130R corner and Spoon Curve. One of the most demanding circuits for drivers and engineers.'
    },
    'monza': {
        flag: '🇮🇹',
        name: 'Monza Circuit',
        location: 'Monza, Italy',
        length: '5.793 km',
        corners: '11',
        record: '1:18.887',
        type: 'Permanent',
        desc: 'The "Temple of Speed". Over 75% of the lap is at full throttle. Ferrari\'s home race, where the Tifosi create an unforgettable atmosphere.'
    },
    'interlagos': {
        flag: '🇧🇷',
        name: 'Interlagos Circuit',
        location: 'São Paulo, Brazil',
        length: '4.309 km',
        corners: '15',
        record: '1:10.540',
        type: 'Permanent',
        desc: 'A counter-clockwise circuit with a bumpy surface that tests suspension and driver endurance. Known for its passionate fans and dramatic championship deciders.'
    },
    'hungaroring': {
        flag: '🇭🇺',
        name: 'Hungaroring',
        location: 'Mogyoród, Hungary',
        length: '4.381 km',
        corners: '14',
        record: '1:16.627',
        type: 'Permanent',
        desc: 'The "Monaco without walls". A twisty, narrow circuit where overtaking is difficult. Held the first F1 race behind the Iron Curtain in 1986.'
    },
    'montreal': {
        flag: '🇨🇦',
        name: 'Circuit Gilles Villeneuve',
        location: 'Montreal, Canada',
        length: '4.361 km',
        corners: '14',
        record: '1:13.078',
        type: 'Semi-Street',
        desc: 'Named after the legendary Ferrari driver. Features the famous "Wall of Champions" where many world champions have crashed.'
    },
    'redbullring': {
        flag: '🇦🇹',
        name: 'Red Bull Ring',
        location: 'Spielberg, Austria',
        length: '4.318 km',
        corners: '10',
        record: '1:05.619',
        type: 'Permanent',
        desc: 'Set in the beautiful Austrian Alps. A short, fast circuit with only 10 corners. The Remus curve is one of the toughest and best overtaking spots on the calendar.'
    },
    'singapore': {
        flag: '🇸🇬',
        name: 'Marina Bay Street Circuit',
        location: 'Singapore, Singapore',
        length: '5.063 km',
        corners: '23',
        record: '1:30.984',
        type: 'Night Street',
        desc: 'The first night race in F1 history. A 23-corner street circuit with the stunning Singapore skyline as a backdrop. Extreme heat and humidity make it one of the toughest races of the year.'
    }
};

// ============================================================
// Popup Logic
// ============================================================

const popup = document.getElementById('popup');
const closeBtn = document.getElementById('popupClose');

if (popup && closeBtn) {
    document.querySelectorAll('.card2').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const data = trackData[this.dataset.track];
            if (!data) {
                console.warn('No data found for:', this.dataset.track);
                return;
            }

            document.getElementById('popupFlag').textContent = data.flag;
            document.getElementById('popupName').textContent = data.name;
            document.getElementById('popupLocation').textContent = data.location;
            document.getElementById('popupLength').textContent = data.length;
            document.getElementById('popupCorners').textContent = data.corners;
            document.getElementById('popupRecord').textContent = data.record;
            document.getElementById('popupType').textContent = data.type;
            document.getElementById('popupDesc').textContent = data.desc;

            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', function() {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    });

    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================================
// Page Navigation - SPA (Single Page Application)
// ============================================================

const allPages = document.querySelectorAll('.page');
const navBtns = document.querySelectorAll('.top ul li button');

allPages.forEach(function(p, i) {
    p.style.display = i === 0 ? 'block' : 'none';
});

navBtns.forEach(function(btn, index) {
    btn.addEventListener('click', function() {
        navBtns.forEach(function(b) {
            b.classList.remove('active');
        });
        this.classList.add('active');

        allPages.forEach(function(p, i) {
            p.style.display = i === index ? 'block' : 'none';
        });

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ============================================================
// Games Page - Sub Navigation (Games / Feedback)
// ============================================================

const gamePage = document.getElementById('gamePage');
const feedbackPage = document.getElementById('feedbackPage');
const p1btn = document.getElementById('p1btn');
const p2btn = document.getElementById('p2btn');

if (gamePage && feedbackPage && p1btn && p2btn) {
    gamePage.style.display = 'block';
    feedbackPage.style.display = 'none';

    p1btn.addEventListener('click', function() {
        gamePage.style.display = 'block';
        feedbackPage.style.display = 'none';
    });

    p2btn.addEventListener('click', function() {
        gamePage.style.display = 'none';
        feedbackPage.style.display = 'block';
    });
}

// ============================================================
// Car Game - Move with buttons and keyboard
// ============================================================

const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");
const resetBtn = document.querySelector("#resetBtn");
const ball = document.querySelector("#gamephoto");

var ballX = 0;
var ballY = 0;
var rotationAngle = 0;
var timerInterval = null;

// space limited
const MIN_X = 0;
const MAX_X = 440;
const MIN_Y = 0;
const MAX_Y = 350;

// reset 
function ResetPos() {
    ballX = 0;
    ballY = 0;
    rotationAngle = 0;
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
    ball.innerText = ballX + "," + ballY;
    ball.style.transform = 'rotate(0deg)';
    // Reset score and timer when game resets
    score = 0;
    timing = 30;
    if (scoreBox) scoreBox.innerHTML = "⭐ Score: 0";
    if (timerBox) timerBox.innerHTML = "⏱️ Time: 30";
    generateStars();
    // Reset timer interval
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    startTimer();
}

// turning by the direction
function rotateImageByDirection(direction) {
    switch(direction) {
        case 'up':
            rotationAngle = 0;
            break;
        case 'down':
            rotationAngle = 180;
            break;
        case 'left':
            rotationAngle = -90;
            break;
        case 'right':
            rotationAngle = 90;
            break;
        default:
            return;
    }
    ball.style.transform = `rotate(${rotationAngle}deg)`;
    ball.style.transition = 'transform 0.2s ease';
}

// Generate stars in the game area
function generateStars() {
    // Remove old stars
    document.querySelectorAll('.star').forEach(function(s) { s.remove(); });
    
    var gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    
    for (var i = 0; i < 8; i++) {
        var star = document.createElement('div');
        star.className = 'star';
        star.textContent = '⭐';
        var x = Math.random() * 390 + 25;
        var y = Math.random() * 300 + 25;
        star.dataset.x = x;
        star.dataset.y = y;
        star.style.left = x + 'px';
        star.style.top = y + 'px';
        gameArea.appendChild(star);
    }
}

// Check if car collected any stars
function checkCollect() {
    var stars = document.querySelectorAll('.star');
    stars.forEach(function(star) {
        var sx = parseFloat(star.dataset.x);
        var sy = parseFloat(star.dataset.y);
        var dx = ballX - sx;
        var dy = ballY - sy;
        if (dx * dx + dy * dy < 600) {
            star.remove();
            F1Catch(); // Add score
        }
    });
}

function MovePos(leftInc, topInc) {
    ballX = Math.min(MAX_X, Math.max(MIN_X, ballX + leftInc));
    ballY = Math.min(MAX_Y, Math.max(MIN_Y, ballY + topInc));
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
    ball.innerText = ballX + "," + ballY;
    
    if (leftInc > 0) rotateImageByDirection('right');
    else if (leftInc < 0) rotateImageByDirection('left');
    else if (topInc < 0) rotateImageByDirection('up');
    else if (topInc > 0) rotateImageByDirection('down');
    
    checkCollect();
}

function MoveLeft() {
    ballX = Math.min(MAX_X, Math.max(MIN_X, ballX - 10));
    ball.style.left = ballX + "px";
    ball.style.top = ballY + "px";
    ball.innerText = ballX + "," + ballY;
    rotateImageByDirection('left');
    checkCollect();
}

leftBtn.addEventListener("click", MoveLeft);
rightBtn.addEventListener("click", function() {
    MovePos(10, 0);
});
upBtn.addEventListener("click", function() {
    MovePos(0, -10);
});
downBtn.addEventListener("click", function() {
    MovePos(0, 10);
});
resetBtn.addEventListener("click", ResetPos);

// Keyboard controls with R key reset
document.addEventListener('keydown', function(kbEvt) {
    if (kbEvt.code === "ArrowRight") {
        MovePos(10, 0);
        kbEvt.preventDefault();
    }
    if (kbEvt.code === "ArrowLeft") {
        MoveLeft();
        kbEvt.preventDefault();
    }
    if (kbEvt.code === "ArrowDown") {
        MovePos(0, 10);
        kbEvt.preventDefault();
    }
    if (kbEvt.code === "ArrowUp") {
        MovePos(0, -10);
        kbEvt.preventDefault();
    }
    if (kbEvt.code === "KeyR") {
        ResetPos();
        kbEvt.preventDefault();
    }
});

// ============================================================
// Score System
// ============================================================

const scoreBox = document.getElementById("scoreBox");
var score = 0;

function F1Catch() {
    score++;
    if (scoreBox) scoreBox.innerHTML = "Score: " + score;
}

// ============================================================
// Timer System
// ============================================================

const timerBox = document.getElementById("timerBox");
var timing = 30;

function F1Timer() {
    timing--;
    if (timerBox) timerBox.innerHTML = "Time: " + timing;
    if (timing <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

// Start timer countdown
function startTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    timerInterval = setInterval(function() {
        if (timing > 0) {
            F1Timer();
        }
    }, 1000);
}

// Generate stars when page loads
generateStars();
startTimer();


document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('userName').value.trim();
    const feedback = document.getElementById('userFeedback').value.trim();
    const msg = document.getElementById('formFeedback');

    if (name && feedback) {
        msg.textContent = '✅ Thanks ' + name + '! Feedback received.';
        msg.style.color = '#4caf50';
        this.reset();
    } else {
        msg.textContent = '⚠️ Please fill in all fields.';
        msg.style.color = '#e10600';
    }
});

// ============================================================
// Sprite Button Controls
// ============================================================

document.querySelectorAll('.spritebtn').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var icon = this.querySelector('.resetbtnsprite, .fullscrbtnsprite');
        
        if (icon) {
            if (icon.classList.contains('resetbtnsprite')) {
                // Reset game without refresh
                ResetPos();
                console.log('🔄 Game reset via sprite button');
            } else if (icon.classList.contains('fullscrbtnsprite')) {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                }
            }
        }
    });
});
