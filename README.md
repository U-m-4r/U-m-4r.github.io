# 🪂 Fortnite Battle Bus Portfolio

An interactive, gamified personal portfolio website built with **React + Vite**. Styled around jumping from the Fortnite Battle Bus, the website maps your scroll depth to a simulated altitude in meters (descending from **5000m** down to **0m**), uncovering dynamic gaming-themed sections along the way.

---

## 🌟 Key Features

- **Altitude Descent Physics**: Real-time mapping of scroll position to altitude (5000m to 0m) with dynamic speed tracking (km/h).
- **Live Match HUD**: Displays current descent state (*Battle Bus* → *Free Fall* → *Gliding* → *Landed*), descent progress bar, and storm warnings.
- **Custom React Bits Animations**:
  - `DecryptedText`: Cyberpunk-style glitch text animation for titles.
  - `Particles`: Reactive HTML5 Canvas particle system (stars, high-speed wind streaks, drifting clouds).
  - `ShinyText`: Moving metallic sheen mask for legendary loot headers.
  - `TiltedCard`: Mouse-tracking 3D tilt interface wrapper for loadout items and supply crates.
  - `CountUp`: Smooth numerical ticker for metrics and speed.
- **Gamified Sections**:
  - 🚌 **5000m – 4000m**: Hero Battle Bus with a "JUMP OUT" action trigger.
  - 🪂 **4000m – 2500m**: Skydiver stats panel featuring a tall cyber-skin developer avatar wearing glowing spectacles.
  - 🎒 **2500m – 1000m**: Fortnite 5-slot item loadout hotbar for tech skills (Assault Rifle, Shield Potion, Chug Splash, etc.).
  - 📦 **1000m – 200m**: Interactive supply drops showcasing portfolio projects.
  - 🏆 **200m – 0m**: Victory Royale banner and an interactive golden Loot Chest contact form.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite
- **Icons**: Lucide React
- **Graphics**: Scalable Inline Vector SVGs (zero external image lag)
- **Styling**: Vanilla CSS with HSL design variables and glassmorphism

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd portfolio-website
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open `http://localhost:5173` in your web browser to experience the Battle Bus jump!

### 3. Build for Production
```bash
npm run build
```
This outputs a production-ready bundle inside the `dist/` directory.

---

## 📜 License
MIT License