const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");

const app = express();
app.use(express.json());

app.post("/download", (req, res) => {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  const filename = `audio_${Date.now()}.mp3`;

  const command = `yt-dlp --cookies youtube.com_cookies.txt --js-runtimes node -x --audio-format mp3 -o "${filename}" "${url}"`;

  exec(command, (error) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.download(filename, () => {
      fs.unlinkSync(filename);
    });
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
