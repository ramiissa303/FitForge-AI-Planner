# FitForge AI Planner

A fully client-side, AI-powered fitness web application that generates personalised workout and nutrition plans based on a 12-step user assessment — with zero backend, zero frameworks, and zero dependencies.

---

## Project Description

FitForge takes a user through a 12-question assessment covering goals, body measurements, training experience, equipment, injuries, diet type, and lifestyle factors. It then produces a complete, tailored fitness blueprint including:

- Daily calorie and macronutrient targets (Mifflin-St Jeor + activity multipliers)
- A weekly workout schedule adapted to the user's training days and session duration
- A diet-specific meal plan (Standard / Vegetarian / Vegan)
- A BMI analysis and personalised health recommendations
- An achievement roadmap with milestone dates

The entire application is a single HTML page — no build tools, no bundler, no runtime dependencies.

---

## Features

- **12-Step Assessment** — covers goals, body stats, activity level, training environment, injuries, diet, and lifestyle
- **Science-Based Calorie Engine** — Mifflin-St Jeor BMR with Harris-Benedict activity multipliers and goal-specific adjustments
- **Protein-Anchored Macro Allocation** — goal-driven protein targets (1.6–2.2 g/kg) with remaining calories split between carbs and fats
- **Injury-Aware Workout Builder** — automatically excludes flagged exercises based on declared injuries (knee, back, shoulder)
- **Workout Split Generator** — Full Body / Upper-Lower / Push-Pull-Legs splits based on available training days (1–7)
- **Diet-Adapted Meal Plans** — 18 goal × diet combinations (6 goals × 3 diet types)
- **Exercise Library** — 25 exercises with YouTube video tutorials, coaching cues, and muscle-group filtering
- **Nutrition Library** — 15 common foods with macronutrient breakdown bars
- **BMI Calculator** — standalone tool with animated gauge and category descriptions
- **Progress Roadmap** — milestone timeline with dates calculated from the current date
- **Readiness Score** — composite score based on sleep, stress, and hydration inputs
- **Responsive Design** — fully functional from 320 px to 4 K displays
- **Accessible** — semantic HTML5, ARIA roles, keyboard navigation, and screen-reader support throughout
- **Print-Ready** — dedicated print stylesheet hides navigation and isolates the results report

---

## Technologies Used

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic, ARIA-compliant) |
| Styling | CSS3 — custom properties, Grid, Flexbox, animations |
| Logic | Vanilla JavaScript (ES2020, no frameworks) |
| Fonts | Google Fonts — Space Grotesk + Inter |
| Images | Unsplash CDN (no local assets required) |
| Videos | YouTube embed (exercise tutorials) |

---

## Folder Structure

```
fitforge-gym/
├── index.html              # Single-page application entry point
├── assets/
│   ├── css/
│   │   └── styles.css      # Complete design system (~940 lines)
│   └── js/
│       └── app.js          # All application logic (~1 450 lines)
├── .gitignore
├── LICENSE
└── README.md
```

---

## Installation

No installation required. This is a static HTML project with no build step.

```bash
git clone https://github.com/ramiissa303/fitforge-gym.git
cd fitforge-gym
```

---

## How to Run

**Option 1 — Open directly in a browser**

```
Double-click index.html
```

**Option 2 — Serve locally (recommended for iframe embeds)**

```bash
# Python 3
python -m http.server 8080

# Node.js (npx)
npx serve .
```

Then visit `http://localhost:8080` in your browser.

---

## Screenshots

> _Add screenshots here after recording the live demo._

| Hero Section | 12-Step Planner | Results Dashboard |
|---|---|---|
| ![Hero](screenshots/hero.png) | ![Planner](screenshots/planner.png) | ![Results](screenshots/results.png) |

| Exercise Library | BMI Calculator | Nutrition Library |
|---|---|---|
| ![Exercises](screenshots/exercises.png) | ![BMI](screenshots/bmi.png) | ![Nutrition](screenshots/nutrition.png) |

---

## Live Demo

**[https://fitforge-planner.netlify.app](https://fitforge-planner.netlify.app)**

Hosted on Netlify — no build step, instant deploy.

---

## GitHub Repository

```
https://github.com/ramiissa303/fitforge-gym
```

---

## Future Improvements

- [ ] **Local storage persistence** — save and resume the user's plan across sessions
- [ ] **Dark mode** — toggle with `prefers-color-scheme` detection
- [ ] **Progressive Web App (PWA)** — service worker + manifest for offline use and home-screen install
- [ ] **PDF export** — generate a shareable PDF of the results report
- [ ] **Progress tracker** — weekly weigh-in logging with a chart
- [ ] **More exercises** — expand the library to 100+ with full `mistakes` coaching notes
- [ ] **Supplement recommendations** — goal-aware supplement stack suggestions
- [ ] **Multi-language support** — i18n for Arabic, French, and Spanish

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**Rami Issa**
- GitHub: [@ramiissa303](https://github.com/ramiissa303)
- Email: ramiissa303@gmail.com

---

_Built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies._
