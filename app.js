// Sample meditation data - replace with your actual meditations
const meditations = [
    {
        id: 1,
        date: "October 4, 2025",
        description: "Sense of wonder beyond complexity",
        audioSrc: "audio/2025-10-04.m4a",
        duration: "30 min"
    },
    {
        id: 2,
        date: "October 15, 2025",
        description: "Connecting to the vast quiet underneath it all",
        audioSrc: "audio/2025-10-15.m4a",
        duration: "30 min"
    },
    {
        id: 3,
        date: "October 2, 2025",
        description: "Earth’s support is melting doubts",
        audioSrc: "audio/2025-10-02.m4a",
        duration: "30 min"
    },
    {
        id: 4,
        date: "March 1, 2025",
        description: "הר (עם שועל)",
        audioSrc: "audio/2025-03-01.m4a",
        duration: "32 min"
    },
    {
        id: 5,
        date: "November 20, 2025",
        description: "Gathering the parts",
        audioSrc: "audio/2025-11-20.m4a",
        duration: "31 min"
    },
    {
        id: 6,
        date: "November 13, 2025",
        description: "Relaxing through Trust",
        audioSrc: "audio/2025-11-13.m4a",
        duration: "32 min"
    },
    {
        id: 7,
        date: "November 1, 2025",
        description: "A mind of quiet sea and self acceptance",
        audioSrc: "audio/2025-11-01.m4a",
        duration: "33 min"
    },
    {
        id: 8,
        date: "October 30, 2025",
        description: "Letting thoughts be and Metta sentences",
        audioSrc: "audio/2025-10-30.m4a",
        duration: "25 min"
    },
];

// DOM Elements
const meditationList = document.getElementById('meditation-list');
const playerPage = document.getElementById('player-page');
const meditationsGrid = document.querySelector('.meditations-grid');
const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause-button');
const seekBar = document.getElementById('seek-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const playerTitle = document.getElementById('player-title');
const playerDate = document.getElementById('player-date');
const playerDescription = document.getElementById('player-description');

let currentMeditation = null;
let isSeeking = false;

// Initialize the app
function init() {
    renderMeditationCards();
    setupAudioEventListeners();
}

// Render meditation cards on the main page
function renderMeditationCards() {
    meditationsGrid.innerHTML = meditations.toSorted((a, b) => new Date(b.date) - new Date(a.date)).map(meditation => `
        <div class="meditation-card" onclick="openPlayer(${meditation.id})">
            <div class="date">${meditation.date} · ${meditation.duration}</div>
            <div class="description">${meditation.description}</div>
        </div>
    `).join('');
}

// Open the player page for a specific meditation
function openPlayer(meditationId) {
    currentMeditation = meditations.find(m => m.id === meditationId);
    
    if (!currentMeditation) return;
    
    // Update player UI
    playerTitle.textContent = `Meditation`; // ${currentMeditation.id}`;
    playerDate.textContent = currentMeditation.date;
    playerDescription.textContent = currentMeditation.description;
    
    // Set audio source
    audioPlayer.src = currentMeditation.audioSrc;
    
    // Reset player state
    resetPlayerUI();
    
    // Switch pages
    meditationList.classList.remove('active');
    playerPage.classList.add('active');
}

// Show the main page
function showMainPage() {
    // Pause audio when going back
    audioPlayer.pause();
    updatePlayPauseButton();
    
    playerPage.classList.remove('active');
    meditationList.classList.add('active');
}

// Reset player UI
function resetPlayerUI() {
    seekBar.value = 0;
    currentTimeDisplay.textContent = '0:00';
    durationDisplay.textContent = '0:00';
    updatePlayPauseButton();
}

// Setup audio event listeners
function setupAudioEventListeners() {
    // Update duration when metadata is loaded
    audioPlayer.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(audioPlayer.duration);
        seekBar.max = audioPlayer.duration;
    });

    // Also listen for durationchange in case duration updates later (for some formats)
    audioPlayer.addEventListener('durationchange', () => {
        if (audioPlayer.duration && isFinite(audioPlayer.duration)) {
            durationDisplay.textContent = formatTime(audioPlayer.duration);
            seekBar.max = audioPlayer.duration;
        }
    });
    
    // Update current time and seek bar as audio plays
    audioPlayer.addEventListener('timeupdate', () => {
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        if (!isSeeking) {
            seekBar.value = audioPlayer.currentTime;
        }
    });
    
    // Handle audio ending
    audioPlayer.addEventListener('ended', () => {
        updatePlayPauseButton();
    });
    
    // Handle seek bar interaction
    seekBar.addEventListener('mousedown', () => {
        isSeeking = true;
    });

    seekBar.addEventListener('touchstart', () => {
        isSeeking = true;
    });

    seekBar.addEventListener('input', () => {
        currentTimeDisplay.textContent = formatTime(seekBar.value);
    });

    seekBar.addEventListener('change', () => {
        audioPlayer.currentTime = parseFloat(seekBar.value);
        isSeeking = false;
    });

    seekBar.addEventListener('mouseup', () => {
        isSeeking = false;
    });

    seekBar.addEventListener('touchend', () => {
        isSeeking = false;
    });
}

// Toggle play/pause
function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
    updatePlayPauseButton();
}

// Update play/pause button icon
function updatePlayPauseButton() {
    playPauseButton.textContent = audioPlayer.paused ? '▶' : '⏸';
}

// Seek forward 15 seconds
function seekForward() {
    const duration = audioPlayer.duration;
    if (duration && isFinite(duration)) {
        audioPlayer.currentTime = Math.min(audioPlayer.currentTime + 15, duration);
    }
}

// Seek backward 15 seconds
function seekBackward() {
    audioPlayer.currentTime = Math.max(audioPlayer.currentTime - 15, 0);
}

// Format time in MM:SS
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Initialize on page load
init();
