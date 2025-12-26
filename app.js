// Sample meditation data - replace with your actual meditations
const meditations = [
    {
        id: 1,
        date: "December 20, 2024",
        description: "A gentle morning meditation to start your day with clarity and peace.",
        audioSrc: "audio/meditation1.mp3"
    },
    {
        id: 2,
        date: "December 15, 2024",
        description: "Deep relaxation for releasing tension and finding inner calm.",
        audioSrc: "audio/meditation2.mp3"
    },
    {
        id: 3,
        date: "December 10, 2024",
        description: "Gratitude practice to cultivate appreciation and joy.",
        audioSrc: "audio/meditation3.mp3"
    },
    {
        id: 4,
        date: "December 5, 2024",
        description: "Evening wind-down meditation for restful sleep.",
        audioSrc: "audio/meditation4.mp3"
    }
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

// Initialize the app
function init() {
    renderMeditationCards();
    setupAudioEventListeners();
}

// Render meditation cards on the main page
function renderMeditationCards() {
    meditationsGrid.innerHTML = meditations.map(meditation => `
        <div class="meditation-card" onclick="openPlayer(${meditation.id})">
            <div class="date">${meditation.date}</div>
            <div class="description">${meditation.description}</div>
        </div>
    `).join('');
}

// Open the player page for a specific meditation
function openPlayer(meditationId) {
    currentMeditation = meditations.find(m => m.id === meditationId);
    
    if (!currentMeditation) return;
    
    // Update player UI
    playerTitle.textContent = `Meditation ${currentMeditation.id}`;
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
    
    // Update current time and seek bar as audio plays
    audioPlayer.addEventListener('timeupdate', () => {
        currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
        seekBar.value = audioPlayer.currentTime;
    });
    
    // Handle audio ending
    audioPlayer.addEventListener('ended', () => {
        updatePlayPauseButton();
    });
    
    // Handle seek bar input
    seekBar.addEventListener('input', () => {
        audioPlayer.currentTime = seekBar.value;
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
    audioPlayer.currentTime = Math.min(audioPlayer.currentTime + 15, audioPlayer.duration || 0);
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
