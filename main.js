/* Elementlere ulasip obje olarak kullanma, yakalama*/
const prevButton = document.getElementById('prev')
const nextButton = document.getElementById('next')
const repeatButton = document.getElementById('repeat')
const shuffleButton = document.getElementById('shuffle')
const audio = document.getElementById('audio')
const songImage = document.getElementById('song-image')
const songName = document.getElementById('song-name')
const songArtist = document.getElementById('song-artist')
const pauseButton = document.getElementById('pause')
const playButton = document.getElementById('play')
const playListButton = document.getElementById('playlist')


const maxDuration = document.getElementById('max-duration')
const currentTimeRef = document.getElementById('current-time')

const progressBar = document.getElementById('progress-bar')
const playListContainer = document.getElementById('playlist-container')
const closeButton = document.getElementById('close-button')
const playListSongs = document.getElementById('playlist-songs')

const currentProgress = document.getElementById('current-progress')

//Sira 
let index

//Döngu
let loop = true

//Liste
const songsList = [
    {
        name: "Gelo Ew Ki Bu",
        link: "assets/gelo-ew-ki-bu.mp3",
        artist: "Aram Tigran",
        image: "assets/aram-tigran.jpeg"
    },
    {
        name: "Gitme Kal",
        link: "assets/yara-bere-icindeyim.mp3",
        artist: "Hira-i Zerdust",
        image: "assets/hirai.jpeg"
    },
    {
        name: "Aramam",
        link: "assets/aramam.mp3",
        artist: "Ibrahim Tatlises",
        image: "assets/ibrahim-tatlises.jpeg"
    },
    {
        name: "Ax Eman",
        link: "assets/ax-eman.mp3",
        artist: "Rewsan Celiker",
        image: "assets/rewsan-celiker.jpeg"
    },
    {
        name: "Dinle",
        link: "assets/dinle.mp3",
        artist: "Mahsun Kirmizigul",
        image: "assets/mahsun.jpeg"
    }
]

//Şarki Atama  4
const setSong = (arrayIndex) => {
    console.log(arrayIndex)
    let { name, link, artist, image } = songsList[arrayIndex]
    audio.src = link
    songName.innerHTML = name
    songArtist.innerHTML = artist
    songImage.src = image

    //Sureyi Ayarla
    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration)
    }

    playListContainer.classList.add('hide')
    playAudio()
}

//Zamani İstenilen Formatta Duzenleme 145
const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60) // 3,25
    minute = minute < 10 ? "0" + minute : minute
    let second = Math.floor(timeInput % 60) // 25
    second = second < 10 ? "0" + second : second
    return `${minute}:${second}`
}


//Şarkiyi Çal
const playAudio = () => {
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
}

//Şarkiyi Durdur
const pauseAudio = () => {
    audio.pause()
    pauseButton.classList.add('hide')
    playButton.classList.remove('hide')
}

//Sonraki Şarkiya Git
const nextSong = () => {
    if (loop) {
        if (index == (songsList.length - 1)) {
            index = 0
        } else {
            index += 1 // index = index + 1
        }
    } else {
        //Rastgele Sira Olustur
        let randIndex = Math.floor(Math.random() * songsList.length)
        index = randIndex
    }
    setSong(index)
    playAudio()
}

//Önceki Şarkiya Gecme
const previousSong = () => {
    pauseAudio()
    if (index > 0) {
        index -= 1 // index = index - 1
    } else {
        index = songsList.length - 1
    }
    setSong(index)
    playAudio()
}



//Play Butona Tiklanildiginda
playButton.addEventListener('click', playAudio)

//Durdur Butonuna Tiklanildiginda
pauseButton.addEventListener('click', pauseAudio)

//Sonraki Şarkiya Gec Butonu Tiklanildiginda
nextButton.addEventListener('click', nextSong)

//Önceki Şarkiya Gec Butonu Tiklanildiginda
prevButton.addEventListener('click', previousSong)

//Karistirma Butonuna Tiklanildiginda
shuffleButton.addEventListener('click', () => {
    if (shuffleButton.classList.contains('active')) {
        shuffleButton.classList.remove('active')
        loop = true
    } else {
        shuffleButton.classList.add("active")
        loop = false
    }
})

//Tekrar Et Butonuna Tiklanildiginda
repeatButton.addEventListener('click', () => {
    if (repeatButton.classList.contains('active')) {
        repeatButton.classList.remove('active')
        loop = false
    } else {
        repeatButton.classList.add("active")
        loop = true
    }
})

//Progress Bar a Tiklanildiginda (gri alan)
progressBar.addEventListener('click', (event) => {

    //Baslangiç / Sol
    let coordStart = progressBar.getBoundingClientRect().left

    console.log("coordStart: " + coordStart)

    //Bitiş
    let coordEnd = event.clientX
    console.log("coordEnd: " + coordEnd)

    console.log("progressBar.offsetWidth: " + progressBar.offsetWidth)

    let progress = (coordEnd - coordStart) / progressBar.offsetWidth
    console.log("progress: " + progress)
    currentProgress.style.width = progress * 100 + "%"

    //Zamani Güncelle
    audio.currentTime = progress * audio.duration // 300

    //Oynat
    audio.play()
    pauseButton.classList.remove('hide')
    playButton.classList.add('hide')
})

//Liste Acma Butonuna Tiklanildiginda
playListButton.addEventListener('click', () => {
    playListContainer.classList.remove('hide')
})

//Oynatma Listesini Kapatma Tiklanildiginda
closeButton.addEventListener('click', () => {
    playListContainer.classList.add('hide')
})

//Ekran Yüklenince
setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime)
    currentProgress.style.width = (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%"
}, 1000);


//Zaman Güncellendiginde 
audio.addEventListener('timeupdate', () => {
    currentTimeRef.innerText = timeFormatter(audio.currentTime)
})

//Sonraki Şarkiya Gec
audio.onended = () => {
    nextSong()
}

//Oynatma listesini Olusturma

const initializePlaylist = () => {
    for (let i in songsList) {
        playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
            <div class="playlist-image-container">
                <img src="${songsList[i].image}" />
            </div>
            <div class="playlist-song-details">
                <span id="playlist-song-name">
                    ${songsList[i].name}
                </span>
                <span id="playlist-song-artist-album">
                    ${songsList[i].artist}
                </span>
            </div>
        </li>
        `
    }
}

//Ekran Yüklenildiginde
window.onload = () => {
    index = 0
    setSong(index)
    pauseAudio()
    initializePlaylist()
}