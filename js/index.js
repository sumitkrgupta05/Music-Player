console.log("Hello spotify");

//variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let masterSongName = document.getElementById("masterSongName");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Besabriyaan (MS Dhoni) ",
    filePath: "songs/1.mp3",
    coverPath: "cover/1.jpg",
  },
  {
    songName: "Jab Tak - MS Dhoni (Armaan Malik) ",
    filePath: "songs/2.mp3",
    coverPath: "cover/2.jpg",
  },
  {
    songName: "Teri Jhuki Nazar",
    filePath: "songs/3.mp3",
    coverPath: "cover/3.jpg",
  },
  {
    songName: "Zaalima ",
    filePath: "songs/4.mp3",
    coverPath: "cover/4.jpg",
  },
  {
    songName: "04 Phir Kabhi - MS Dhoni (Arijit Singh) ",
    filePath: "songs/5.mp3",
    coverPath: "cover/5.jpg",
  },
  {
    songName: "04 Aisa Kyun Maa - Neerja (Sunidhi Chauhan) ",
    filePath: "songs/6.mp3",
    coverPath: "cover/6.jpg",
  },
  {
    songName: "Dheere Dheere (Yo Yo Honey Singh) ",
    filePath: "songs/7.mp3",
    coverPath: "cover/7.jpg",
  },
];

songItems.forEach((element, i) => {
  // console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// audioElement.play();

//handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();

    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});

//listen to events calculation
audioElement.addEventListener("timeupdate", () => {
  //update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

//inner play button code {buggy}
Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      masterSongName.innerText = songs[songIndex].songName;
      gif.style.opacity = 1;
      masterPlay.target.classList.remove("fa-play-circle");
      masterPlay.target.classList.add("fa-pause-circle");
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex > 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
