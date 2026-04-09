# CMLABS Frontend Fulltime Test

A meal discovery web application built with Next.js, consuming TheMealDB API.

## 🚀 Tech Stack

- **Framework**: Next.js 16.2.2 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: JavaScript
- **Deployment**: Vercel

## ✨ Features

- Browse food categories on Home page
- Browse all ingredients with search functionality
- Browse meals by ingredient with search functionality
- Browse local culinary by area/cuisine
- View detailed meal information including instructions, recipes, and tutorial video
- Fully responsive on desktop, tablet, and mobile
- Atomic component architecture (Atoms, Molecules, Organisms)

## 📁 Project Structure

src/
├── app/
│   ├── page.js                         # Home page
│   ├── layout.js                       # Root layout
│   ├── foods/
│   │   └── page.js                     # Foods page
│   ├── ingredients/
│   │   ├── page.js                     # Ingredients page
│   │   └── [ingredient]/
│   │       └── page.js                 # Ingredient detail page
│   ├── local-culinary/
│   │   ├── page.js                     # Local Culinary page
│   │   └── [area]/
│   │       └── page.js                 # Area detail page
│   └── meals/
│       └── [id]/
│           └── page.js                 # Meal detail page
├── components/
│   ├── atoms/
│   │   ├── IngredientCard.js
│   │   ├── MealCard.js
│   │   └── SearchBar.js
│   ├── molecules/
│   │   ├── IngredientList.js
│   │   └── MealList.js
│   └── organisms/
│       └── Navbar.js
└── lib/
└── api.js                          # API functions

## 🛠️ Getting Started

### Prerequisites

Make sure you have the following installed:
- Node.js >= 20.9
- npm >= 10

### Installation

1. Clone the repository

```bash
git clone https://github.com/dannirachman/cmlabs-frontend-fulltime-test.git
```

2. Navigate to project directory

```bash
cd cmlabs-frontend-fulltime-test
```

3. Install dependencies

```bash
npm install
```

4. Run the development server

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📦 Build for Production

```bash
npm run build
npm run start
```

## 🌐 API Reference

This project uses [TheMealDB API](https://www.themealdb.com/api.php):

| Endpoint | Description |

| `/list.php?i=list` | List all ingredients |
| `/filter.php?i={ingredient}` | Filter meals by ingredient |
| `/lookup.php?i={id}` | Get meal detail by ID |
| `/categories.php` | List all categories |
| `/list.php?a=list` | List all areas/cuisines |
| `/filter.php?a={area}` | Filter meals by area |

## 📱 Pages

| Page | Route | Description |

| Home | `/` | Food categories overview |
| Foods | `/foods` | Browse all food categories |
| Ingredients | `/ingredients` | Browse all ingredients |
| Ingredient Detail | `/ingredients/[ingredient]` | Meals by ingredient |
| Local Culinary | `/local-culinary` | Browse by cuisine area |
| Area Detail | `/local-culinary/[area]` | Meals by area |
| Meal Detail | `/meals/[id]` | Full meal information |

## 🚀 Live Demo

[https://cmlabs-frontend-fulltime-test-eight.vercel.app/]

## Test Participant

**Danni Adhyatma Rachman**
