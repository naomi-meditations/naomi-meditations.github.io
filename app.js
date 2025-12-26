// Sample meditation data - replace with your actual meditations
const meditations = [
    {
        id: 1,
        date: "04/10/2025",
        description: "Sense of wonder beyond complexity",
        audioSrc: "audio/2025-10-04.m4a",
        duration: "30 דקות"
    },
    {
        id: 2,
        date: "15/10/2025",
        description: "Connecting to the vast quiet underneath it all",
        audioSrc: "audio/2025-10-15.m4a",
        duration: "30 דקות"
    },
    {
        id: 3,
        date: "02/10/2025",
        description: "Earth’s support is melting doubts",
        audioSrc: "audio/2025-10-02.m4a",
        duration: "30 דקות"
    },
    {
        id: 4,
        date: "01/03/2025",
        description: "הר (עם שועל)",
        audioSrc: "audio/2025-03-01_processed.m4a",
        duration: "32 דקות",
        speechSegments: [[0, 107.6], [129.7, 163.6], [176.5, 200.4], [217.2, 220.1], [336.5, 372.5], [389.1, 406.8], [419.7, 463.2], [639.9, 650.6], [661.6, 707.6], [720.3, 722.3], [732.7, 734.1], [763.2, 766.3], [790.0, 799.5], [811.7, 829.8], [1097.8, 1154.0], [1179.3, 1219.5], [1676.5, 1693.5], [1717.0, 1719.0], [1777.6, 1813.7], [1825.9, 1830.6]]
    },
    {
        id: 5,
        date: "20/11/2025",
        description: "Gathering the parts",
        audioSrc: "audio/2025-11-20.m4a",
        duration: "31 דקות"
    },
    {
        id: 6,
        date: "13/11/2025",
        description: "Relaxing through Trust",
        audioSrc: "audio/2025-11-13.m4a",
        duration: "32 דקות"
    },
    {
        id: 7,
        date: "01/11/2025",
        description: "A mind of quiet sea and self acceptance",
        audioSrc: "audio/2025-11-01.m4a",
        duration: "33 דקות"
    },
    {
        id: 8,
        date: "30/10/2025",
        description: "Letting thoughts be and Metta sentences",
        audioSrc: "audio/2025-10-30.m4a",
        duration: "33 דקות"
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
const speechSegmentsContainer = document.getElementById('speech-segments');

let currentMeditation = null;
let isSeeking = false;

// Initialize the app
function init() {
    renderMeditationCards();
    setupAudioEventListeners();
    handleRouting();
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', handleRouting);
}

// Handle URL routing
function handleRouting() {
    const hash = window.location.hash.slice(1); // Remove the '#'
    if (hash) {
        const meditationId = parseInt(hash, 10);
        if (meditationId && meditations.find(m => m.id === meditationId)) {
            openPlayer(meditationId, false); // Don't push state, we're responding to URL
        }
    } else {
        showMainPage(false);
    }
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
function openPlayer(meditationId, updateUrl = true) {
    currentMeditation = meditations.find(m => m.id === meditationId);
    
    if (!currentMeditation) return;
    
    // Update URL
    if (updateUrl) {
        history.pushState({ meditationId }, '', `#${meditationId}`);
    }
    
    // Update player UI
    playerTitle.textContent = "מדיטציה"; // ${currentMeditation.id}`;
    playerDate.textContent = currentMeditation.date;
    playerDescription.textContent = currentMeditation.description;
    
    // Set audio source
    audioPlayer.src = currentMeditation.audioSrc;
    
    // Reset player state
    resetPlayerUI();
    
    // Render speech segments after duration is known
    audioPlayer.addEventListener('loadedmetadata', renderSpeechSegments, { once: true });
    
    // Switch pages
    meditationList.classList.remove('active');
    playerPage.classList.add('active');
}

// Show the main page
function showMainPage(updateUrl = true) {
    // Pause audio when going back
    audioPlayer.pause();
    updatePlayPauseButton();
    
    // Update URL
    if (updateUrl) {
        history.pushState({}, '', window.location.pathname);
    }
    
    playerPage.classList.remove('active');
    meditationList.classList.add('active');
}

// Reset player UI
function resetPlayerUI() {
    seekBar.value = 0;
    currentTimeDisplay.textContent = '0:00';
    durationDisplay.textContent = '0:00';
    updatePlayPauseButton();
    speechSegmentsContainer.innerHTML = '';
}

// Render speech segments on the seek bar
function renderSpeechSegments() {
    speechSegmentsContainer.innerHTML = '';
    
    if (!currentMeditation || !currentMeditation.speechSegments) return;
    
    const duration = audioPlayer.duration;
    if (!duration || !isFinite(duration)) return;
    
    currentMeditation.speechSegments.forEach(([start, end]) => {
        const segment = document.createElement('div');
        segment.className = 'speech-segment';
        const leftPercent = (start / duration) * 100;
        const widthPercent = ((end - start) / duration) * 100;
        segment.style.left = `${leftPercent}%`;
        segment.style.width = `${widthPercent}%`;
        speechSegmentsContainer.appendChild(segment);
    });
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
        if (!isSeeking) {
            currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
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
    const icon = playPauseButton.querySelector('.play-icon');
    if (audioPlayer.paused) {
        icon.classList.remove('paused');
    } else {
        icon.classList.add('paused');
    }
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

// Share modal functions
const shareModal = document.getElementById('share-modal');
const shareUrlInput = document.getElementById('share-url');
const copyConfirmation = document.getElementById('copy-confirmation');

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function openShareModal() {
    const url = window.location.href;
    const title = currentMeditation ? `מדיטציה - ${currentMeditation.description}` : 'מדיטציה';
    
    // Use native share on mobile if available
    if (isMobileDevice() && navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch((error) => {
            // Only fall back to modal if it's not a user cancel
            if (error.name !== 'AbortError') {
                showShareModal(url);
            }
        });
    } else {
        // Desktop - show modal with copy
        showShareModal(url);
    }
}

function showShareModal(url) {
    shareUrlInput.value = url;
    copyConfirmation.textContent = '';
    shareModal.classList.add('active');
    
    // Auto-copy to clipboard
    copyShareUrl();
}

function closeShareModal(event) {
    if (!event || event.target === shareModal) {
        shareModal.classList.remove('active');
    }
}

function copyShareUrl() {
    navigator.clipboard.writeText(shareUrlInput.value).then(() => {
        copyConfirmation.textContent = 'הקישור הועתק!';
    }).catch(() => {
        shareUrlInput.select();
        copyConfirmation.textContent = 'סמן והעתק את הקישור';
    });
}

// Initialize on page load
init();
