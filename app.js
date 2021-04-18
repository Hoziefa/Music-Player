const elements = {
    musicContainer: document.getElementById("music-container"),
    playBtn: document.getElementById("play"),
    prevBtn: document.getElementById("prev"),
    nextBtn: document.getElementById("next"),

    audio: document.getElementById("audio"),
    progress: document.getElementById("progress"),
    progressContainer: document.getElementById("progress-container"),
    title: document.getElementById("title"),
    cover: document.getElementById("cover"),
};

const songsTitle = ["hey", "summer", "ukulele"];

let currentSong = 2;

const loadSong = song => {
    const { title, audio, cover } = elements;

    [title.textContent, audio.src, cover.src] = [song, `music/${song}.mp3`, `images/${song}.jpg`];
};

const playSong = _ => {
    const { playBtn, audio, musicContainer } = elements;

    if (audio.paused) {
        audio.play();
        playBtn.querySelector("i").classList.add("fa-pause");
        playBtn.querySelector("i").classList.remove("fa-play");
        musicContainer.classList.add("play");
    } else {
        audio.pause();
        playBtn.querySelector("i").classList.add("fa-play");
        playBtn.querySelector("i").classList.remove("fa-pause");
        musicContainer.classList.remove("play");
    }
};

const playPrevNextSong = direction => {
    if (direction === "prev") currentSong === 0 ? (currentSong = songsTitle.length - 1) : --currentSong;
    else if (direction === "next") currentSong === songsTitle.length - 1 ? (currentSong = 0) : ++currentSong;

    loadSong(songsTitle[currentSong]);

    playSong();
};

loadSong(songsTitle[currentSong]);

elements.musicContainer.addEventListener("click", ({ target, offsetX: x }) => {
    const { playBtn, prevBtn, nextBtn, progress, progressContainer, audio } = elements;

    target.matches(`#${playBtn.id}, #${playBtn.id} *`) && playSong();

    target.matches(`#${prevBtn.id}, #${prevBtn.id} *`) && playPrevNextSong("prev");

    target.matches(`#${nextBtn.id}, #${nextBtn.id} *`) && playPrevNextSong("next");

    if (target.matches(`#${progressContainer.id}, #${progress.id}`)) {
        audio.currentTime = (x / progressContainer.offsetWidth) * audio.duration;
    }
});

elements.audio.addEventListener("timeupdate", ({ currentTarget: { currentTime, duration, ended } }) => {
    elements.progress.style.width = `${(currentTime / duration) * 100}%`;

    ended && playPrevNextSong("next");
});
