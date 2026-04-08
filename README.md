# 📅 Interactive Calendar Component

A polished, interactive calendar component built with **React + Vite + Tailwind CSS**. Created as a frontend engineering challenge to demonstrate component architecture, responsive design, and state management.

## 🚀 Live Demo

🔗 **[View Live Demo](https://interactive-calendar-tuf.vercel.app/)** *(Add your Vercel link after deployment)*

## 📹 Video Demo

🔗 **[Watch Demo Video](https://drive.google.com/file/d/1heQ8Gh5syaRbh4Wx9h4Hp7J4n6gkUv0y/view?usp=drive_link)** *(Add your Loom/YouTube link)*

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🖼️ **Wall Calendar Aesthetic** | Physical calendar look with hero image carousel |
| 📅 **Date Range Selection** | Click start date → click end date with visual feedback |
| 📝 **Integrated Notes Section** | Add, save, and delete notes associated with date ranges |
| 💾 **Local Storage Persistence** | Notes are saved automatically in your browser |
| 📱 **Fully Responsive** | Desktop side-by-side, mobile stacked layout |
| 🎨 **Image Carousel** | 4 landscape images with navigation arrows |
| ⭐ **Today Highlight** | Current date is visually highlighted |
| 📆 **Month Navigation** | Previous/next month navigation |

---

## 🛠️ Tech Stack Choices

| Technology | Why I Chose It |
|------------|----------------|
| **React 18** | Component-based architecture, easy state management with hooks |
| **Vite 5** | Faster dev server and build times compared to Create React App |
| **Tailwind CSS 3** | Utility-first CSS for rapid UI development without leaving HTML |
| **date-fns** | Lightweight date manipulation (better than Moment.js) |
| **lucide-react** | Clean, customizable icons as React components |

---

## 📁 Project Structure
interactive-calendar/
├── src/
│ ├── components/
│ │ ├── Calendar.jsx # Main calendar container with state
│ │ ├── CalendarGrid.jsx # Date grid with selection logic
│ │ ├── HeroImage.jsx # Image carousel component
│ │ └── NotesSection.jsx # Notes with localStorage
│ ├── App.jsx # Root component
│ ├── main.jsx # Entry point
│ └── index.css # Global styles + Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md



---

## 🏃‍♂️ How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/pratik0310/interactive-calendar_TUF.git

# 2. Navigate to project folder
cd interactive-calendar_TUF

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev

# 5. Open your browser and visit:
#    http://localhost:5173

Build for Production
npm run build
