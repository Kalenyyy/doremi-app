# 📱 HP Music Controller (Do – Fa – Do)

A simple web-based musical controller using smartphone motion sensors.
This project uses device movement (accelerometer) to trigger musical notes in real-time.

---

## 🎯 Features

* 📳 Detects phone movement using accelerometer
* 🎵 Plays musical notes (Do – Fa – Do)
* ⚡ Real-time interaction
* 🌐 Runs directly in browser (no app install)

---

## 🛠️ Tech Stack

* React (Vite)
* Tone.js (audio synthesis)
* DeviceMotion API (sensor)

---

## 🚀 How to Run (Local Development)

### 1. Clone repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run project

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## 📱 How to Use (IMPORTANT)

⚠️ This project works **ONLY on mobile devices** (smartphones)

### Steps:

1. Open the website on your **phone browser**
2. Click **"Start Sensor"**
3. Allow motion permission (if prompted)
4. Move your phone:

| Movement       | Note      |
| -------------- | --------- |
| 📱 Tilt up     | DO (low)  |
| 📱 Tilt down   | FA        |
| 📱 Hold middle | DO (high) |

---

## 🌐 Deployment (Netlify)

### 1. Build project

```bash
npm run build
```

### 2. Upload to Netlify

* Go to https://app.netlify.com
* Drag & drop the `dist` folder

### 3. Open on your phone

* Use the generated Netlify link
* Click **Start Sensor**
* Allow permission

---

## ⚠️ Important Notes

* ❌ Will NOT work on laptop (no accelerometer)
* ✔️ Must use HTTPS (Netlify already supports this)
* ✔️ Requires user interaction (button click) to enable sound
* ⚠️ Sensor sensitivity may vary between devices

---

## 🧠 How It Works

1. DeviceMotion API reads phone movement (Y-axis)
2. Movement is mapped to musical notes:

   * High → C4 (Do low)
   * Low → F4 (Fa)
   * Neutral → C5 (Do high)
3. Tone.js generates sound in real-time

---

## 🎓 Project Purpose

This project demonstrates:

* Sensor-based interaction
* Real-time audio generation
* Web-based creative interface

---

## 👨‍💻 Author

* Your Name

---

## 💡 Future Improvements

* More musical notes
* Better UI (visual feedback)
* Gesture smoothing
* Multi-axis control
