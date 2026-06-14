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
