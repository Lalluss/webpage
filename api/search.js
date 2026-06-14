export default async function handler(req, res) {

  const q = req.query.q;

  if (!q) {
    return res.status(400).json({
      status: false,
      error: "No query"
    });
  }

  try {

    const yt = await fetch(
      "https://ytsearch.vercel.app/api/search?q=" +
      encodeURIComponent(q)
    );

    const data = await yt.json();

    if (!data.results?.length) {
      return res.status(404).json({
        status: false,
        error: "Song not found"
      });
    }

    const video =
      data.results[0];

    const youtubeUrl =
      "https://youtu.be/" +
      video.id;

    const mp3 =
      await fetch(
        "https://youtube-downloader.mn-bots.workers.dev/mp3?url=" +
        encodeURIComponent(youtubeUrl)
      );

    const song =
      await mp3.json();

    return res.json({
      status: true,
      title: video.title,
      thumbnail: video.thumbnail,
      audio: song.url
    });

  } catch (e) {

    return res.status(500).json({
      status: false,
      error: e.toString()
    });

  }

}
