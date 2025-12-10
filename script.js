const songs = [
    { title: "Defaulter", artist: "R Nait & Gurlez Akhtar", src: "songs/Defaulter_song.mp3" },
    { title: "Kamlee", artist: "SARRB", src: "songs/Kamlee_song.mp3" },
    { title: "sad ganna", artist: "BALI", src: "songs/sad_ganna.mp3" },
    { title: "talwiinder", artist: "Talwiinder", src: "songs/talwiinder_song.mp3" },
    { title: "Courtside Qawali", artist: "Sur Sagar", src: "songs/Courtside_Qawali.mp3" },
    
];

let currentSong = 0;
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volume = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');

// Load playlist
songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${song.title} - (${song.artist})`;
    li.addEventListener('click', () => {
        currentSong = index;
        loadSong(songs[currentSong]);
        playSong();
    });
    playlistEl.appendChild(li);
});

// Load song
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    updatePlaylistActive();
}

// Play & Pause
function playSong() {
    audio.play();
    playBtn.innerHTML = "⏸️";
}
function pauseSong() {
    audio.pause();
    playBtn.innerHTML = "▶️";
}

// Previous & Next
function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(songs[currentSong]);
    playSong();
}
function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(songs[currentSong]);
    playSong();
}

// Update progress bar
audio.addEventListener('timeupdate', () => {
    progress.value = audio.currentTime;
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

// Seek
progress.addEventListener('input', () => {
    audio.currentTime = progress.value;
});

// Volume
volume.addEventListener('input', () => {
    audio.volume = volume.value;
});

// Format time
function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Playlist active highlight
function updatePlaylistActive() {
    Array.from(playlistEl.children).forEach((li, idx) => {
        li.classList.toggle('active', idx === currentSong);
    });
}

// Event listeners
playBtn.addEventListener('click', () => audio.paused ? playSong() : pauseSong());
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong); // Autoplay next
loadSong(songs[currentSong]);

