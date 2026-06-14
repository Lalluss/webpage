import yts from "yt-search";

export default async function handler(req,res){

const q = req.query.q;

const result =
await yts(q);

if(!result.videos.length){

return res.json({
status:false
});

}

const video =
result.videos[0];

const api =
await fetch(
"https://youtube-downloader.mn-bots.workers.dev/mp3?url=" +
encodeURIComponent(video.url)
);

const song =
await api.json();

res.json({
status:true,
title:video.title,
thumbnail:video.thumbnail,
audio:song.url
});

}
