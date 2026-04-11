export const buildPrompt = (
  cuisines,
  productIds,
  dailyDozenDef,
) => `Nutrition meal planner. Use ONLY products from this list (format: id|name):
${Object.entries(productIds)
  .map(([id, name]) => `${id}|${name}`)
  .join("\n")}

${dailyDozenDef}

PANTRY STAPLES — always available, never on the shopping list:
Ground flaxseed (use 10g/person/day for Flaxseed Daily Dozen serving), frozen edamame (11g protein/100g), hemp seeds (32g protein/100g), salt, black pepper.

NUTRITION TARGETS (breakfast excluded — this plan covers lunch, dinner, snacks, desserts only):
- Daily protein: 100g total
- Daily calories: 1500 kcal (±50)

PROTEIN RULES (enforced strictly):
- Each of the 3 recipes MUST deliver 30-35g protein per serving INCLUDING the whole grain side
- MANDATORY: every recipe must include a primary animal or high-protein source at these quantities:
    chicken breast: 500-600g for 4 servings (29-35g protein contribution)
    salmon or fish: 500-600g for 4 servings (25-30g)
    turkey mince: 500-600g for 4 servings (28-33g)
    eggs: 8 eggs for 4 servings (26g) — only if combined with tempeh or tuna
    tempeh: 400-500g for 4 servings (19-24g) — must be combined with legumes or eggs
    seitan: 400-500g for 4 servings (25-31g)
- FORBIDDEN: recipes where legumes are the only protein source. Chickpea curry alone = ~9g/serving. REJECT THIS.
- MANDATORY Daily Dozen in every main recipe: each recipe MUST contain all three of:
    1. A bean/legume (chickpeas, lentils, black beans, cannellini, etc.) — counts as Beans serving
    2. A dark leafy green (spinach, kale, cavolo nero, rocket, broccoli) — counts as Greens serving
    3. At least one of: broccoli, cabbage, brussels sprouts, kale (Cruciferous) OR carrot, mushroom, beetroot, courgette, sweet potato, pepper, onion (Other Vegetables)
- Include the whole grain (quinoa, bulgur, oats, buckwheat) IN the recipe ingredients list at 60-80g dry per serving (240-320g total for 4). This is served alongside and must be in the calculation.
- Snacks: use Greek yogurt (150-200g = 13-17g protein) + seeds/nuts for at least 15g protein per snack
- Desserts: keep under 200 kcal, can include dark chocolate + fruit

CALORIE RULES (strictly enforced — verify each value before returning JSON):
- Each recipe serving (including grain side): 450-500 kcal
- Snack: 250-300 kcal
- Dessert: 150-200 kcal
- Daily total (lunch + dinner + snack + dessert): ~1400-1500 kcal
- A 472 kcal snack alone exceeds the snack limit — if this happens, reduce portion sizes and replan

BATCH COOKING RULES:
- The 3 recipes must use different cooking methods to allow parallel Sunday preparation
- Preferred methods: one Air Fryer, one Instant Pot, one Stove — vary to enable parallel cooking
- Protein-method preferences (not hard constraints):
    Air Fryer → chicken breast, tempeh, tofu, seitan, fish fillets
    Instant Pot → turkey mince, chicken in sauce, legume+chicken combinations
    Stove → salmon, pan-seared fish, eggs, stir-fry style
- A food processor is available for bulk chopping/blending — consolidate all chopping of onions, garlic, peppers, herbs across all three recipes into a single food processor step at the start
- Generate a top-level batchCookPlan with: total active minutes, shared prep steps (food processor first), and a time-sequenced step list covering all three recipes and the two sauces, finishing within 90 minutes
- Remove sharedPrep from individual recipes — it belongs only in batchCookPlan

OTHER RULES:
- Maximise Daily Dozen servings above
- 3 batch-cook recipes rotating across 4 lunches + 4 dinners
- Each recipe has ONE fixed serve suggestion (same every time)
- Only 2 snacks (s1,s2,s1,s2) and 2 desserts (d1,d2,d1,d2), no-cook
- 2 food-processor sauces using pantry/herb/spice items
- Max 25min active cook, max 8 ingredients, max 6 steps (≤20 words each)
- The 3 recipes MUST each use a DIFFERENT cuisine — assign exactly one of these: ${cuisines.join(", ")}
- ALL ingredient amounts in grams for a 4-serving batch. Format: number+g only, max 800g per ingredient. Snack/dessert items need numeric grams per person. Weights: 1 egg=60g, 1 banana=120g, 1 avocado=160g, 1 can beans=240g drained

Return ONLY valid JSON, no markdown, nothing outside the JSON object:
{"batchCookPlan":{"totalActiveMinutes":0,"sharedPrepSteps":["Food processor: blitz onions and garlic for all recipes — 3 min"],"sequence":[{"time":"0:00","action":""},{"time":"0:15","action":""}]},"recipes":[{"id":"r1","name":"","cuisine":"","emoji":"","servings":4,"activeMinutes":0,"totalMinutes":0,"equipment":"","serve":"","ingredients":[{"id":"","name":"","amount":""}],"steps":[{"n":1,"text":""}]}],"sauces":[{"id":"sc1","name":"","emoji":"","description":"","ingredients":[{"id":"","name":""}],"steps":["string"],"stores":""}],"snacks":[{"id":"s1","name":"","items":[{"id":"","name":"","grams":0}],}],"desserts":[{"id":"d1","name":"","items":[{"id":"","name":"","grams":0}]}],"mealPlan":[{"day":1,"lunch":{"recipeId":"r1"},"dinner":{"recipeId":"r2"},"snackId":"s1","dessertId":"d1"}],"summary":{"note":""}}`;
