window.searchSong = async () => {

  const q =
  document.getElementById(
    "searchInput"
  ).value;

  if (!q) return;

  try {

    const r = await fetch(
      "/api/search?q=" +
      encodeURIComponent(q)
    );

    const data =
    await r.json();

    if (!data.status) {
      alert("Song not found");
      return;
    }

    const player =
    document.getElementById(
      "audioPlayer"
    );

    player.src =
    data.audio;

    document.getElementById(
      "nowPlaying"
    ).innerText =
    data.title;

    player.play();

  } catch (e) {

    alert(e);

  }

}
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDip2Zru0WGeukKNdaiWPfTdEKGBUgs82E",
  authDomain: "mucify-febc7.firebaseapp.com",
  projectId: "mucify-febc7",
  storageBucket: "mucify-febc7.firebasestorage.app",
  messagingSenderId: "341994626475",
  appId: "1:341994626475:web:6c8050a226f9852d5646ee"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadFeaturedSongs() {

  const container =
    document.getElementById("featuredSongs");

  container.innerHTML =
    "<p>Loading songs...</p>";

  const snap =
    await getDocs(collection(db, "songs"));

  container.innerHTML = "";

  snap.forEach((doc) => {

  const song = doc.data();

  container.innerHTML += `
    <div class="song-card">
      <img
        src="${song.thumbnail}"
        class="song-thumb"
      >

      <div class="song-info">
        <h3>${song.Title}</h3>
        <p>${song.Artist || "Unknown Artist"}</p>
      </div>

      <button
        onclick="playFeatured('${song.Title}')"
        class="play-btn"
      >
        ▶ Play
      </button>
    </div>
  `;
});
}

window.playFeatured = function(audio, title) {

  const player =
    document.getElementById("audioPlayer");

  player.src = audio;

  document.getElementById(
    "nowPlaying"
  ).innerText = title;

  player.play();
};

loadFeaturedSongs();
