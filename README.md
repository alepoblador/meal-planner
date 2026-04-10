# Weekly Meal Planner

An AI-powered weekly meal planner built with React + Vite. Generates batch-cook recipes, a 4-day meal plan, shopping list with live ASDA prices, and a Sunday prep sequence — all optimised for Dr Greger's Daily Dozen and a 100g/day protein target.

## Features

- 🥗 4-day meal plan — 4 lunches, 4 dinners, 2 snacks, 2 desserts
- 👨‍🍳 3 batch-cook recipes with Sunday prep sequence and shared prep steps
- 🫙 2 food-processor sauces
- 🛒 Shopping list with live ASDA prices (fetched from Algolia)
- 📊 Calculated nutrition (protein + calories) from a hardcoded food composition table
- 📅 Daily Dozen progress bars per day and averaged across the week
- 14 cuisine styles including Korean, Indian, Mediterranean, Thai, Japanese, West African, Persian, Greek, American

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/alepoblador/meal-planner.git
cd meal-planner
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your keys:

```
VITE_ANTHROPIC_KEY=sk-ant-your-key-here
VITE_ALGOLIA_APP=8I6WSKCCNV
VITE_ALGOLIA_KEY=03e4272048dd17f771da37b57ff8a75e
VITE_ALGOLIA_INDEX=ASDA_PRODUCTS
```

**Getting your Anthropic API key:**
1. Go to [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys)
2. Create a new key
3. Paste it as `VITE_ANTHROPIC_KEY` in your `.env`

The Algolia keys are ASDA's own public read-only search credentials — safe to use as-is.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### 4. Usage

1. **Fetch Prices** — pulls live prices for all products from ASDA via Algolia. Cached locally, only needs refreshing when products change.
2. **Generate My Plan** — calls Claude Haiku to generate recipes, meal plan, sauces, and Sunday prep sequence. Cached locally so you only regenerate when you want a fresh rotation.

## Adding new products

Open `src/App.jsx` and find the `ASDA_PRODUCT_URLS` array near the top of the file (clearly marked). Paste any ASDA product URL as a new line — the product ID and name are derived automatically.

```js
const ASDA_PRODUCT_URLS = [
  "https://www.asda.com/groceries/product/.../1234567",
  // paste new URLs here
];
```

If the new product has an unusual nutritional profile not covered by the fuzzy matcher, add an entry to the `NDB` object (protein g and kcal per 100g). The browser console will log `[NutrCalc] no NDB match for "..."` if a match is missing.

## Editing the prompt

The `buildPrompt` function in `src/App.jsx` contains all the nutrition rules, Daily Dozen requirements, and cuisine instructions. Edit it directly — the structure is clearly commented.

## Tech stack

- React 18 + Vite
- Claude Haiku (`claude-haiku-4-5-20251001`) for meal plan generation
- Algolia for live ASDA product prices
- `window.storage` (Claude artifact API) shimmed with `localStorage` for local dev
- No other dependencies

## Cost

Approximately $0.01 per generation using Claude Haiku.
