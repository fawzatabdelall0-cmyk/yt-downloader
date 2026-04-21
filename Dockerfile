FROM node:18

RUN apt-get update && apt-get install -y \
    ffmpeg \
    python3 \
    python3-full \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

RUN python3 -m pip install --break-system-packages yt-dlp

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["node", "server.js"]
