// Sample meditation data - replace with your actual meditations
const meditations = [
    {
        id: 1,
        date: "2025-03-01",
        description: "הר (עם שועל)",
        audioSrc: "audio/2025-03-01_processed.m4a",
        duration: "31 דקות",
        longDescription: "המדיטציה עוסקת ביצירת נוכחות מקבלת ואוהבת דרך שימוש בדימויים כמו ההר היציב. המדיטציה מזמינה לחוות עצירה פעילה, השתרשות, ולפתח חמלה עצמית וסבלנות, תוך חזרה מתמדת למקום הבטוח של הנשימה.",
        speechSegments: [[0, 107.6], [129.7, 163.6], [176.5, 200.4], [217.2, 220.1], [336.5, 372.5], [389.1, 406.8], [419.7, 463.2], [639.9, 650.6], [661.6, 707.6], [720.3, 722.3], [732.7, 734.1], [763.2, 766.3], [790.0, 799.5], [811.7, 829.8], [1097.8, 1154.0], [1179.3, 1219.5], [1676.5, 1693.5], [1717.0, 1719.0], [1777.6, 1813.7], [1825.9, 1830.6]]
    },
    /// noisy - AI gave bad quality
    // {
    //     id: 3,
    //     date: "2025-10-02",
    //     description: "Earth’s support is melting doubts",
    //     audioSrc: "audio/2025-10-02.m4a",
    //     duration: "30 דקות"
    // },
    {
        id: 2,
        date: "2025-10-04",
        description: "תחושת פליאה מעבר למורכבות",
        audioSrc: "audio/2025-10-04_processed.m4a",
        duration: "30 דקות",
        longDescription: "נושא המדיטציה הוא טיפוח תחושת פליאה, שייכות ורווחה פנימית (\"להרגיש בבית\"), תוך שחרור עדין של מאבקים ומורכבויות לטובת חזרה מתמדת למצב הפשוט והנוכח של \"פשוט להיות\".",
        speechSegments: [[22.9, 62.8], [73.7, 84.2], [105.5, 130.5], [141.5, 151.5], [162.2, 164.1], [189.8, 212.3], [225.2, 230.2], [272.2, 292.8], [420.1, 486.3], [509.2, 526.8], [739.2, 754.6], [766.6, 768.7], [1369.2, 1394.0], [1778.2, 1778.7]]
    },
    /// barking
    // {
    //     id: 2,
    //     date: "2025-10-15",
    //     description: "Connecting to the vast quiet underneath it all",
    //     audioSrc: "audio/2025-10-15.m4a",
    //     duration: "30 דקות"
    // },
    {
        id: 3,
        date: "2025-10-30",
        description: "לתת למחשבות להיות ומשפטי מֵטָה",
        audioSrc: "audio/2025-10-30_processed.m4a",
        duration: "32 דקות",
        longDescription: "המדיטציה מציעה תרגול של השתרשות והרפיה במרחב הפנימי, התמודדות רכה עם מחשבות טורדניות, חיבור לעוגן הנשימה, וטיפוח חמלה עצמית וחמלה כלפי אחרים באמצעות תרגול 'מֵטָה'.",
        speechSegments: [[32.8, 96.2], [109.1, 129.4], [157.9, 211.6], [225.0, 273.8], [370.9, 392.2], [412.0, 418.5], [437.9, 482.0], [849.2, 852.7], [956.9, 967.4], [1104.4, 1158.6], [1174.7, 1180.3], [1552.1, 1606.5], [1758.8, 1822.7], [1835.7, 1847.6], [1863.8, 1880.8], [1910.1, 1934.6], [1948.2, 1951.9]]
    },
    {
        id: 4,
        date: "2025-11-01",
        description: "תודעה של ים שקט וקבלה עצמית",
        audioSrc: "audio/2025-11-01_processed.m4a",
        duration: "32 דקות",
        longDescription: "המדיטציה מתמקדת במציאת איזון בין ערנות לנינוחות בגוף (כמו ישיבה יציבה אך רכה), תוך תשומת לב לפרטים כמו הרפיית מתח בעיניים, פה ולסת, ותרגול של התבוננות לא-שיפוטית במחשבות שבאות וחולפות. המתרגל מוזמן להתחבר לנשימה וללב מתוך חמלה וקבלה עצמית.",
        speechSegments: [[29.7, 127.8], [139.7, 156.8], [172.0, 179.5], [192.0, 214.9], [225.9, 231.8], [252.3, 257.1], [282.9, 294.4], [307.1, 330.8], [343.4, 347.8], [368.3, 379.2], [550.2, 696.1], [721.9, 723.2], [1030.2, 1055.5], [1275.8, 1314.9], [1327.2, 1350.6], [1499.1, 1567.5], [1579.5, 1586.0], [1646.6, 1691.5], [1738.3, 1768.0], [1815.9, 1842.6], [1863.5, 1879.0], [1889.5, 1922.88]]
    },
    /// speech volume is too low, unclear pronunciation in AI result
    // {
    //     id: 6,
    //     date: "2025-11-13",
    //     description: "Relaxing through Trust",
    //     audioSrc: "audio/2025-11-13.m4a",
    //     duration: "32 דקות"
    // },
    {
        id: 5,
        date: "2025-11-20",
        description: "איסוף החלקים",
        audioSrc: "audio/2025-11-20_processed.m4a",
        duration: "25 דקות",
        longDescription: "המדיטציה מתמקדת ביצירת יציבות ערה ונינוחה תוך התבוננות רכה ומאפשרת במחשבות שעולות, מבלי להיאחז בהן או לגרשן (\"לא אני, לא שלי\"). באמצעות דימויים של הר יציב, מורה סבלנית או גל קדוש של נשימה, התרגול מזמין לחזור כל פעם מחדש לעוגן הנשימה ולמקום פנימי של שלווה, קבלה עצמית ומנוחה.",
        speechSegments: [[1.9, 82.2], [100.5, 195.2], [217.5, 240.2], [251.8, 274.8], [289.1, 309.1], [321.5, 342.5], [422.2, 447.0], [462.0, 464.3], [478.8, 482.1], [492.6, 504.9], [742.0, 762.0], [773.2, 775.8], [792.2, 826.5], [1338.9, 1374.9], [1403.6, 1420.6], [1464.8, 1500.3]]
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
            <div class="date">${new Date(meditation.date).toLocaleDateString("en-GB")} · ${meditation.duration}</div>
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
    playerTitle.textContent = currentMeditation.description; // ${currentMeditation.id}`;
    playerDate.textContent = new Date(currentMeditation.date).toLocaleDateString("en-GB");
    playerDescription.textContent = currentMeditation.longDescription;
    
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
