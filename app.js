window.searchSong = async () => {

  const btn =
    document.querySelector(".search-btn");

  const q =
    document.getElementById(
      "searchInput"
    ).value;

  if (!q) return;

  btn.innerText = "⏳ Searching...";
  btn.disabled = true;

  try {

    const r = await fetch(
      "/api/search?q=" +
      encodeURIComponent(q)
    );

    const data =
    await r.json();

    if (!data.status) {
      alert("Song not found");

      btn.innerText =
      "🔍 Search Song";

      btn.disabled = false;

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

    player.onloadeddata = () => {

      btn.innerText =
      "🔍 Search Song";

      btn.disabled = false;

    };

    player.play();

  } catch (e) {

    alert(e);

    btn.innerText =
    "🔍 Search Song";

    btn.disabled = false;

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

  try {

    const snap =
      await getDocs(
        collection(db, "songs")
      );

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
          onclick="playFeatured('${song.Title}', this)"
          class="play-btn"
        >
          ▶ Play
        </button>

      </div>
      `;

    });

  } catch(err) {

    console.error(err);

    container.innerHTML =
      "<p>Failed to load songs</p>";

  }

}
window.playFeatured =
async function(title, btn) {

  btn.innerText =
  "⏳ Loading...";

  btn.disabled = true;

  try {

    const r =
      await fetch(
        "/api/search?q=" +
        encodeURIComponent(title)
      );

    const data =
      await r.json();

    if (!data.status) {

      btn.innerText =
      "▶ Play";

      btn.disabled = false;

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

    player.onloadeddata = () => {

      btn.innerText =
      "⏸ Playing";

      btn.disabled = false;

    };

    player.onended = () => {

      btn.innerText =
      "▶ Play";

    };

    player.play();

  } catch(err) {

    console.error(err);

    btn.innerText =
    "▶ Play";

    btn.disabled = false;

    alert("Failed to play song");

  }

};
loadFeaturedSongs();
