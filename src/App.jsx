import { useState, useEffect, useRef } from "react";
import { buildPrompt } from "./prompt.js";

// ═══════════════════════════════════════════════════════════════
// USER CONFIGURATION — edit this section to add/remove products
// Paste any ASDA product URL here. ID is the last number in the URL.
// ═══════════════════════════════════════════════════════════════
const ASDA_PRODUCT_URLS = [
  "https://www.asda.com/groceries/product/view/asda-natural-greek-yogurt-450g/5035968", // ASDA Natural Greek Yogurt 450g
  "https://www.asda.com/groceries/product/view/asda-smoked-haddock-fillets-220g/6246484", // ASDA Smoked Haddock Fillets 220g
  "https://www.asda.com/groceries/product/view/asda-red-onions/5737707", // ASDA Red Onions
  "https://www.asda.com/groceries/product/view/asda-grapefruit/3134686", // ASDA Grapefruit
  "https://www.asda.com/groceries/product/view/asda-garlic/9204884", // ASDA Garlic
  "https://www.asda.com/groceries/product/view/asda-kiwi-fruit/1578127", // ASDA Kiwi Fruit
  "https://www.asda.com/groceries/product/view/asda-oranges/3807826", // ASDA Oranges
  "https://www.asda.com/groceries/product/view/asda-bananas/9084493", // ASDA Bananas
  "https://www.asda.com/groceries/product/view/asda-pork-loin-steaks-800g/5658559", // ASDA Pork Loin Steaks 800g
  "https://www.asda.com/groceries/product/view/asda-mixed-nuts-200g/7359195", // ASDA Mixed Nuts 200g
  "https://www.asda.com/groceries/product/view/asda-black-beans-400g/6038347", // ASDA Black Beans 400g
  "https://www.asda.com/groceries/product/view/asda-frozen-blackberries-350g/6458210", // ASDA Frozen Blackberries 350g
  "https://www.asda.com/groceries/product/view/asda-frozen-blueberries-350g/2471287", // ASDA Frozen Blueberries 350g
  "https://www.asda.com/groceries/product/view/asda-bran-flakes-1kg/5960754", // ASDA Bran Flakes 1kg
  "https://www.asda.com/groceries/product/view/asda-bulgur-wheat-500g/5021669", // ASDA Bulgur Wheat 500g
  "https://www.asda.com/groceries/product/view/asda-cannellini-beans-400g/6038333", // ASDA Cannellini Beans 400g
  "https://www.asda.com/groceries/product/view/asda-chia-seeds-150g/5519935", // ASDA Chia Seeds 150g
  "https://www.asda.com/groceries/product/view/asda-frozen-chopped-ginger-75g/7713727", // ASDA Frozen Chopped Ginger 75g
  "https://www.asda.com/groceries/product/view/asda-chopped-tomatoes-400g/5611428", // ASDA Chopped Tomatoes 400g
  "https://www.asda.com/groceries/product/view/asda-avocados/849246", // ASDA Avocados
  "https://www.asda.com/groceries/product/view/asda-curly-kale-150g/6324249", // ASDA Curly Kale 150g
  "https://www.asda.com/groceries/product/view/asda-cherry-tomatoes-300g/9041476", // ASDA Cherry Tomatoes 300g
  "https://www.asda.com/groceries/product/view/asda-carrots-1kg/150208", // ASDA Carrots 1kg
  "https://www.asda.com/groceries/product/view/asda-dark-chocolate-200g/9112838", // ASDA Dark Chocolate 200g
  "https://www.asda.com/groceries/product/view/asda-papaya/866041", // ASDA Papaya
  "https://www.asda.com/groceries/product/view/asda-basa-fillets-240g/3657390", // ASDA Basa Fillets 240g
  "https://www.asda.com/groceries/product/view/asda-hake-fillets-240g/7597468", // ASDA Hake Fillets 240g
  "https://www.asda.com/groceries/product/view/asda-tenderheart-cabbage/800548", // ASDA Tenderheart Cabbage
  "https://www.asda.com/groceries/product/view/asda-tomato-puree-200g/2878185", // ASDA Tomato Puree 200g
  "https://www.asda.com/groceries/product/view/asda-figs-140g/4788711", // ASDA Figs 140g
  "https://www.asda.com/groceries/product/view/asda-smoked-kipper-fillets-200g/3457918", // ASDA Smoked Kipper Fillets 200g
  "https://www.asda.com/groceries/product/view/asda-salmon-side-500g/5735221", // ASDA Salmon Side 500g
  "https://www.asda.com/groceries/product/view/asda-oak-smoked-salmon-200g/995547", // ASDA Oak Smoked Salmon 200g
  "https://www.asda.com/groceries/product/view/asda-haricot-beans-400g/6038335", // ASDA Haricot Beans 400g
  "https://www.asda.com/groceries/product/view/asda-lean-turkey-mince-500g/4457673", // ASDA Lean Turkey Mince 500g
  "https://www.asda.com/groceries/product/view/asda-frozen-mango-chunks-500g/5384295", // ASDA Frozen Mango Chunks 500g
  "https://www.asda.com/groceries/product/view/asda-spinach-300g/5792183", // ASDA Spinach 300g
  "https://www.asda.com/groceries/product/view/asda-chestnut-mushrooms-250g/212514", // ASDA Chestnut Mushrooms 250g
  "https://www.asda.com/groceries/product/view/asda-peeled-plum-tomatoes-400g/1924655", // ASDA Peeled Plum Tomatoes 400g
  "https://www.asda.com/groceries/product/view/asda-pinto-beans-400g/6038327", // ASDA Pinto Beans 400g
  "https://www.asda.com/groceries/product/view/asda-organic-super-firm-tofu-200g/9172660", // ASDA Organic Super Firm Tofu 200g
  "https://www.asda.com/groceries/product/view/asda-pumpkin-seeds-150g/5057252", // ASDA Pumpkin Seeds 150g
  "https://www.asda.com/groceries/product/view/asda-frozen-raspberries-300g/7173394", // ASDA Frozen Raspberries 300g
  "https://www.asda.com/groceries/product/view/asda-red-and-white-quinoa-300g/5502702", // ASDA Red & White Quinoa 300g
  "https://www.asda.com/groceries/product/view/asda-red-cabbage-1kg/4001207", // ASDA Red Cabbage 1kg
  "https://www.asda.com/groceries/product/view/asda-royal-gala-apples/5648295", // ASDA Royal Gala Apples
  "https://www.asda.com/groceries/product/view/asda-frozen-strawberries-350g/6112880", // ASDA Frozen Strawberries 350g
  "https://www.asda.com/groceries/product/view/asda-wild-rocket-60g/5796850", // ASDA Wild Rocket 60g
  "https://www.asda.com/groceries/product/view/asda-lean-pork-mince-500g/7602009", // ASDA Lean Pork Mince 500g
  "https://www.asda.com/groceries/product/view/asda-beetroot-500g/2137785", // ASDA Beetroot 500g
  "https://www.asda.com/groceries/product/view/asda-brussels-sprouts-200g/6485995", // ASDA Brussels Sprouts 200g
  "https://www.asda.com/groceries/product/view/asda-pineapple/4827498", // ASDA Pineapple
  "https://www.asda.com/groceries/product/view/asda-lemons/6762195", // ASDA Lemons
  "https://www.asda.com/groceries/product/view/asda-broccoli/5561471", // ASDA Broccoli
  "https://www.asda.com/groceries/product/view/asda-sea-bream-fillets-180g/7599284", // ASDA Sea Bream Fillets 180g
  "https://www.asda.com/groceries/product/view/asda-chicken-breast-fillets-1kg/4778498", // ASDA Chicken Breast Fillets 1kg
  "https://www.asda.com/groceries/product/view/asda-walnuts-180g/7328819", // ASDA Walnuts 180g
  "https://www.asda.com/groceries/product/view/asda-whole-milk/165426", // ASDA Whole Milk
  "https://www.asda.com/groceries/product/view/asda-limes/9234280", // ASDA Limes
  "https://www.asda.com/groceries/product/view/baracke-tahini-500g/7456610", // Baracke Tahini 500g
  "https://www.asda.com/groceries/product/view/better-nature-original-tempeh-200g/9060340", // Better Nature Original Tempeh 200g
  "https://www.asda.com/groceries/product/view/better-nature-smoky-tempeh-220g/9067768", // Better Nature Smoky Tempeh 220g
  "https://www.asda.com/groceries/product/view/clearspring-organic-tofu-300g/6821182", // Clearspring Organic Tofu 300g
  "https://www.asda.com/groceries/product/view/asda-cavolo-nero-kale-150g/9263761", // ASDA Cavolo Nero Kale 150g
  "https://www.asda.com/groceries/product/view/fage-greek-yogurt-450g/7290724", // Fage Greek Yogurt 450g
  "https://www.asda.com/groceries/product/view/green-and-blacks-hot-cocoa-powder-125g/5719960", // Green & Blacks Hot Cocoa Powder 125g
  "https://www.asda.com/groceries/product/view/john-west-tuna-chunks-in-oil-4x125g/9108838", // John West Tuna Chunks in Oil 4x125g
  "https://www.asda.com/groceries/product/view/ktc-minced-garlic-paste-210g/7647295", // KTC Minced Garlic Paste 210g
  "https://www.asda.com/groceries/product/view/ktc-minced-ginger-paste-210g/7647297", // KTC Minced Ginger Paste 210g
  "https://www.asda.com/groceries/product/view/laila-black-chickpeas-2kg/9014434", // Laila Black Chickpeas 2kg
  "https://www.asda.com/groceries/product/view/laila-chana-dal-2kg/7141994", // Laila Chana Dal 2kg
  "https://www.asda.com/groceries/product/view/laila-chickpeas-2kg/7141990", // Laila Chickpeas 2kg
  "https://www.asda.com/groceries/product/view/laila-red-split-lentils-2kg/7141992", // Laila Red Split Lentils 2kg
  "https://www.asda.com/groceries/product/view/roasted-buckwheat-groats-400g/6453828", // Roasted Buckwheat Groats 400g
  "https://www.asda.com/groceries/product/view/mutti-finely-chopped-tomatoes-400g/6711617", // Mutti Finely Chopped Tomatoes 400g
  "https://www.asda.com/groceries/product/view/napolina-butter-beans-400g/5871305", // Napolina Butter Beans 400g
  "https://www.asda.com/groceries/product/view/rajah-turmeric-100g/20671", // Rajah Turmeric 100g
  "https://www.asda.com/groceries/product/view/ramonas-houmous-500g/9032347", // Ramona's Houmous 500g
  "https://www.asda.com/groceries/product/view/schwartz-ground-cinnamon/6180267", // Schwartz Ground Cinnamon
  "https://www.asda.com/groceries/product/view/scotts-porridge-oats-1kg/540519", // Scott's Porridge Oats 1kg
  "https://www.asda.com/groceries/product/view/asda-frozen-garlic-200g/7687373", // ASDA Frozen Garlic 200g
  "https://www.asda.com/groceries/product/view/asda-semi-skimmed-milk-2l/489747", // ASDA Semi-Skimmed Milk 2L
  "https://www.asda.com/groceries/product/view/asda-12-free-range-eggs/1058519", // ASDA 12 Free Range Eggs
  "https://www.asda.com/groceries/product/view/asda-cucumber/152446", // ASDA Cucumber
  "https://www.asda.com/groceries/product/view/asda-sesame-oil-250ml/2266181", // ASDA Sesame Oil 250ml
  "https://www.asda.com/groceries/product/view/filippo-berio-classic-olive-oil-500ml/612680", // Filippo Berio Classic Olive Oil 500ml
  "https://www.asda.com/groceries/product/view/asda-organic-extra-virgin-olive-oil-500ml/5644936", // ASDA Organic Extra Virgin Olive Oil 500ml
  "https://www.asda.com/groceries/product/view/exceptional-by-asda-extra-virgin-olive-oil-500ml/5644932", // Exceptional by ASDA Extra Virgin Olive Oil 500ml
  "https://www.asda.com/groceries/product/view/lee-kum-kee-dark-soy-sauce-500ml/7598432", // Lee Kum Kee Dark Soy Sauce 500ml
  "https://www.asda.com/groceries/product/view/lee-kum-kee-light-soy-sauce-500ml/9311250", // Lee Kum Kee Light Soy Sauce 500ml
  "https://www.asda.com/groceries/product/view/schwartz-smoked-paprika-40g/3552664", // Schwartz Smoked Paprika 40g
  "https://www.asda.com/groceries/product/view/asda-ground-cumin-41g/544313", // ASDA Ground Cumin 41g
  "https://www.asda.com/groceries/product/view/asda-garam-masala-92g/544259", // ASDA Garam Masala 92g
  "https://www.asda.com/groceries/product/view/rajah-mild-madras-curry-powder-100g/20673", // Rajah Mild Madras Curry Powder 100g
  "https://www.asda.com/groceries/product/view/amoy-reduced-fat-coconut-milk-400g/7679945", // Amoy Reduced Fat Coconut Milk 400g
  "https://www.asda.com/groceries/product/view/asda-cottage-cheese-300g/3369344", // ASDA Cottage Cheese 300g
  "https://www.asda.com/groceries/product/view/asda-sweet-peppers-3-pack/5844638", // ASDA Sweet Peppers 3-pack
  "https://www.asda.com/groceries/product/view/asda-sweet-potatoes-1kg/2076628", // ASDA Sweet Potatoes 1kg
  "https://www.asda.com/groceries/product/view/asda-courgettes-330g/6566770", // ASDA Courgettes 330g
  "https://www.asda.com/groceries/product/view/yutaka-rice-vinegar-150ml/3389020", // Yutaka Rice Vinegar 150ml
  "https://www.asda.com/groceries/product/view/yutaka-white-miso-100g/6694454", // Yutaka White Miso 100g
  "https://www.asda.com/groceries/product/view/filippo-berio-balsamic-vinegar-250ml/5496019", // Filippo Berio Balsamic Vinegar 250ml
  "https://www.asda.com/groceries/product/view/asda-organic-apple-cider-vinegar-500ml/9016417", // ASDA Organic Apple Cider Vinegar 500ml
  "https://www.asda.com/groceries/product/view/asda-white-wine-vinegar-350ml/2569207", // ASDA White Wine Vinegar 350ml
  "https://www.asda.com/groceries/product/view/asda-ground-coriander-34g/544312", // ASDA Ground Coriander 34g
  "https://www.asda.com/groceries/product/view/schwartz-crushed-chilli-flakes-29g/7940", // Schwartz Crushed Chilli Flakes 29g
  "https://www.asda.com/groceries/product/view/asda-fresh-coriander-30g/6753738", // ASDA Fresh Coriander 30g
  "https://www.asda.com/groceries/product/view/asda-flat-leaf-parsley-25g/5139836", // ASDA Flat Leaf Parsley 25g
  "https://www.asda.com/groceries/product/view/asda-fresh-basil-30g/6753736", // ASDA Fresh Basil 30g
  "https://www.asda.com/groceries/product/view/asda-fresh-mint-30g/6753734", // ASDA Fresh Mint 30g
  "https://www.asda.com/groceries/product/view/asda-chives-3g/544339", // ASDA Chives 3g
  "https://www.asda.com/groceries/product/view/asda-fresh-dill-25g/5139838", // ASDA Fresh Dill 25g
  "https://www.asda.com/groceries/product/view/asda-fresh-rosemary-20g/5148466", // ASDA Fresh Rosemary 20g
  "https://www.asda.com/groceries/product/view/asda-fresh-thyme-20g/5139830", // ASDA Fresh Thyme 20g
  "https://www.asda.com/groceries/product/view/marigold-nutritional-yeast-flakes-b12-100g/7519309", // Marigold Nutritional Yeast Flakes B12 100g
  "https://www.asda.com/groceries/product/view/the-tofoo-co-original-seitan-225g/9209312", // The Tofoo Co Original Seitan 225g

  "https://www.asda.com/groceries/product/view-all-fish/asda-rich-kiln-roasted-mackerel-fillets-215g/9183910", // Asda Rich Kiln Roasted Mackerel Fillets 215g
  "https://www.asda.com/groceries/product/mackerel-sardines/asda-mackerel-fillets-in-olive-oil-125g/5492605", // Asda Mackerel Fillets In Olive Oil 125g
  "https://www.asda.com/groceries/product/mackerel-sardines/asda-extra-special-extra-special-chipotle-chilli-red-pepper-tomato-herb-brisling-sardines-105g/7734722", // Asda Extra Special Extra Special Chipotle Chilli Red Pepper Tomato Herb Brisling Sardines 105g
  "https://www.asda.com/groceries/product/kosher-food/sea-castle-sardines-in-pure-olive-oil-125g/7456590", // Sea Castle Sardines In Pure Olive Oil 125g
  "https://www.asda.com/groceries/product/feta-halloumi-salad/asda-chosen-by-you-greek-feta-200g/1130420", // Asda Chosen By You Greek Feta 200g
  "https://www.asda.com/groceries/product/herbs/cook-by-asda-cook-oregano-12g/544332", // Cook By Asda Cook Oregano 12g
  "https://www.asda.com/groceries/product/far-eastern-cooking-ingredients-condiments/thai-dragon-sriracha-hot-chilli-sauce-455ml/7647707", // Thai Dragon Sriracha Hot Chilli Sauce 455ml
  "https://www.asda.com/groceries/product/tinned-vegetables/green-giant-original-naturally-sweet-340g/58967", // Green Giant Original Naturally Sweet 340g
  "https://www.asda.com/groceries/product/noodles/blue-dragon-wholewheat-noodles-250g/9015562", // Blue Dragon Wholewheat Noodles 250g
  "https://www.asda.com/groceries/product/celery-spring-onions/asda-fragrant-crunchy-spring-onions/1787074", // Asda Fragrant Crunchy Spring Onions
  "https://www.asda.com/groceries/product/garlic-ginger/asda-light-citrusy-lemongrass-30g/5499433", // Asda Light Citrusy Lemongrass 30g
  "https://www.asda.com/groceries/product/crackers-dipping-sauces/blue-dragon-fish-sauce-150ml/6124298", // Blue Dragon Fish Sauce 150ml
  "https://www.asda.com/groceries/product/stock/asda-chicken-stock-cubes-12-x-10g-120g-/2687967", // Asda Chicken Stock Cubes 12 X 10g 120g
  "https://www.asda.com/groceries/product/stock/asda-vegetable-stock-cubes-12-x-10g-120g-/2687969", // Asda Vegetable Stock Cubes 12 X 10g 120g
  "https://www.asda.com/groceries/product/stock/asda-beef-stock-cubes-12-x-10g-120g-/2687965", // Asda Beef Stock Cubes 12 X 10g 120g
  "https://www.asda.com/groceries/product/view-all-frozen-vegetables/asda-petits-pois-1kg/2027523", // Asda Petits Pois 1kg
  "https://www.asda.com/groceries/product/honey/rowse-organic-honey-340g/4705981", // Rowse Organic Honey 340g
  "https://www.asda.com/groceries/product/syrup-treacle/exceptional-by-asda-canadian-amber-maple-syrup-250g/6742862", // Exceptional By Asda Canadian Amber Maple Syrup 250g
  "https://www.asda.com/groceries/product/dried-fruit/asda-dates-200g/7359227", // Asda Dates 200g
  "https://www.asda.com/groceries/product/malt-vinegar/cook-by-asda-cook-mirin-150ml/9017629", // Cook By Asda Cook Mirin 150ml
  "https://www.asda.com/groceries/product/spices/cook-by-asda-cook-cayenne-chilli-pepper-40g/544324", // Cook By Asda Cook Cayenne Chilli Pepper 40g
  "https://www.asda.com/groceries/product/dried-fruit/asda-apricots-60g/9168448", // Asda Apricots 60g
  "https://www.asda.com/groceries/product/dried-fruit/asda-prunes-200g/7359225", // Asda Prunes 200g
  "https://www.asda.com/groceries/product/dried-fruit/asda-raisins-berries-cherries-250g/7353221", // Asda Raisins Berries Cherries 250g
];

// Derived automatically — do not edit
const PRODUCT_IDS = Object.fromEntries(
  ASDA_PRODUCT_URLS.map((url) => {
    const segs = url.trim().split("/");
    const id = segs[segs.length - 1].replace(/[^0-9]/g, ""); // last path segment = numeric ID
    const slug = segs[segs.length - 2] || ""; // second-to-last = name slug
    const name = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return [id, name];
  }).filter(([id]) => id.length > 0), // drop any malformed entries
);

const ALL_CUISINES = [
  "Korean",
  "Indian",
  "Mediterranean",
  "Vietnamese",
  "Lebanese",
  "Italian",
  "Thai",
  "Asian",
  "Plant-Based High Protein",
  "Greek",
  "American",
  "Japanese",
  "West African",
  "Persian",
];

// Pick 3 random cuisines — shuffled fresh each call
const pickCuisines = (enabled) => {
  const pool = enabled && enabled.length >= 3 ? enabled : ALL_CUISINES;
  return [...pool].sort(() => Math.random() - 0.5).slice(0, 3);
};

const DAILY_DOZEN_DEF = `Daily Dozen for this plan (10 categories, specific daily targets):
- Beans: 3 servings/day
- Berries: 1 serving/day
- Other Fruits: 3 servings/day
- Greens: 2 servings/day
- Cruciferous Vegetables: 1 serving/day
- Other Vegetables: 2 servings/day
- Flaxseed: 1 serving/day
- Nuts and Seeds: 1 serving/day
- Herbs and Spices: 1 serving/day
- Whole Grains: 3 servings/day`;

// ─── Derive shopping list from plan — exact ID lookup, no fuzzy matching ─────
// Category derived from product name substring
const categoriseProduct = (name) => {
  const l = name.toLowerCase();
  if (
    /chicken|turkey|pork|salmon|haddock|basa|hake|bream|seitan|tuna|egg(?!plant)|tempeh|tofu/.test(
      l,
    )
  )
    return "Protein";
  if (/mackerel|sardine|kipper/.test(l)) return "Tinned Fish";
  if (/yogurt|yoghurt|milk|cottage|smoked salmon|feta/.test(l))
    return "Dairy & Fridge";
  if (
    /lentil|chickpea|chana|black bean|cannellini|haricot|pinto|butter bean|edamame/.test(
      l,
    )
  )
    return "Pulses & Grains";
  if (/quinoa|bulgur|buckwheat|oat|bran flake|noodle|rice/.test(l))
    return "Pulses & Grains";
  if (
    /spinach|kale|cavolo|rocket|broccoli|cabbage|sprout|carrot|tomato|mushroom|onion/.test(
      l,
    )
  )
    return "Vegetables";
  if (
    /beetroot|avocado|cucumber|courgette|pepper|sweet potato|garlic|ginger|lemongrass|spring onion|pea|corn|sweetcorn/.test(
      l,
    )
  )
    return "Vegetables";
  if (
    /banana|apple|orange|kiwi|grapefruit|lemon|lime|pineapple|papaya|fig|blueberr|blackberr|raspberr|strawberr|mango/.test(
      l,
    )
  )
    return "Fruit";
  if (/date|apricot|prune|raisin/.test(l)) return "Dried Fruit";
  if (/nut|walnut|seed|tahini|houmous|hemp/.test(l))
    return "Nuts, Seeds & Oils";
  if (/olive oil|sesame oil/.test(l)) return "Nuts, Seeds & Oils";
  if (
    /turmeric|cumin|cinnamon|paprika|garam|curry|coriander|chilli|cayenne|oregano/.test(
      l,
    )
  )
    return "Herbs & Spices";
  if (/basil|mint|parsley|dill|rosemary|thyme|chive|yeast/.test(l))
    return "Herbs & Spices";
  if (
    /miso|sriracha|fish sauce|mirin|honey|maple|stock|soy sauce|vinegar|coconut milk|tomato|puree/.test(
      l,
    )
  )
    return "Tins & Condiments";
  if (/dark chocolate|cocoa/.test(l)) return "Treats";
  return "Other";
};

// Collect all items with IDs from the plan and build shopping list
const buildShoppingList = (plan) => {
  if (!plan) return [];

  // Collect all {id, name} pairs from every part of the plan
  // push always collects — even items with no id — so unmatched detection sees them
  const allItems = [];
  const push = (id, name) => {
    if (name) allItems.push({ id: id ? String(id) : null, name: str(name) });
  };

  for (const recipe of plan.recipes || [])
    for (const ing of recipe.ingredients || []) push(ing.id, ing.name);

  for (const sauce of plan.sauces || [])
    for (const ing of sauce.ingredients || []) push(ing.id, ing.name);

  for (const snack of plan.snacks || [])
    for (const item of snack.items || []) push(item.id, item.name);

  for (const dessert of plan.desserts || [])
    for (const item of dessert.items || []) push(item.id, item.name);

  // Genuine pantry staples — no ASDA product, no ID, never on shopping list
  // Note: oil removed — olive oil and sesame oil are real ASDA products with IDs
  const PANTRY = new Set([
    "ground flaxseed",
    "frozen edamame",
    "hemp seeds",
    "salt",
    "black pepper",
    "water",
  ]);

  const seen = new Set();
  const list = [];
  const unmatched = [];
  const pantryItems = [];

  for (const { id, name } of allItems) {
    if (!name) continue;

    // Track genuine pantry staples separately — don't silently drop
    if (PANTRY.has(name.toLowerCase())) {
      if (!pantryItems.find((p) => p.name === name)) pantryItems.push({ name });
      continue;
    }

    // Item has no ID — Haiku forgot to include it
    if (!id) {
      if (!unmatched.find((u) => u.name === name)) {
        unmatched.push({
          id: null,
          name,
          reason:
            "No product ID returned — Haiku may have omitted the id field",
        });
      }
      continue;
    }

    if (seen.has(id)) continue;

    // ID not in our product map — Haiku hallucinated it
    if (!PRODUCT_IDS[id]) {
      unmatched.push({
        id,
        name,
        reason: "Unknown product ID — Haiku may have hallucinated this",
      });
      continue;
    }

    seen.add(id);
    const canonicalName = PRODUCT_IDS[id];
    list.push({
      id,
      product: canonicalName,
      qty: "1",
      category: categoriseProduct(canonicalName),
    });
  }

  list.sort(
    (a, b) =>
      a.category.localeCompare(b.category) ||
      a.product.localeCompare(b.product),
  );
  // total = unique ingredients (matched + pantry + unmatched) — excludes duplicates
  const total = list.length + pantryItems.length + unmatched.length;
  return { list, unmatched, pantryItems, total, matched: list.length };
};

// ─── Nutrition per 100g (protein g, kcal) — UK food composition data ─────────
const NDB = {
  "chicken breast": { p: 23.5, k: 110 },
  "turkey mince": { p: 19.5, k: 104 },
  "pork loin": { p: 21.0, k: 185 },
  "pork mince": { p: 20.0, k: 135 },
  "smoked haddock": { p: 18.0, k: 89 },
  basa: { p: 18.0, k: 90 },
  hake: { p: 19.0, k: 86 },
  "sea bream": { p: 19.0, k: 95 },
  "smoked kipper": { p: 18.0, k: 193 },
  kipper: { p: 18.0, k: 193 },
  salmon: { p: 20.0, k: 208 },
  "smoked salmon": { p: 22.0, k: 172 },
  tuna: { p: 26.0, k: 200 },
  egg: { p: 13.0, k: 147 },
  "natural greek yogurt": { p: 8.5, k: 97 },
  fage: { p: 10.0, k: 97 },
  "greek yogurt": { p: 9.0, k: 97 },
  "whole milk": { p: 3.4, k: 61 },
  "semi-skimmed milk": { p: 3.5, k: 46 },
  milk: { p: 3.5, k: 50 },
  "red split lentils": { p: 9.0, k: 116 },
  lentil: { p: 9.0, k: 116 },
  "chana dal": { p: 8.5, k: 130 },
  "black chickpeas": { p: 9.0, k: 170 },
  chickpea: { p: 9.0, k: 164 },
  "black beans": { p: 8.0, k: 130 },
  cannellini: { p: 7.0, k: 103 },
  haricot: { p: 7.0, k: 95 },
  "pinto beans": { p: 8.0, k: 135 },
  "butter beans": { p: 7.0, k: 103 },
  "super firm tofu": { p: 16.0, k: 144 },
  clearspring: { p: 8.0, k: 76 },
  tofu: { p: 10.0, k: 100 },
  "original tempeh": { p: 19.0, k: 193 },
  "smoky tempeh": { p: 19.0, k: 193 },
  tempeh: { p: 19.0, k: 193 },
  "porridge oat": { p: 11.0, k: 366 },
  "bran flakes": { p: 8.5, k: 340 },
  "bulgur wheat": { p: 3.1, k: 83 },
  quinoa: { p: 4.4, k: 120 },
  buckwheat: { p: 3.4, k: 92 },
  spinach: { p: 2.9, k: 23 },
  "curly kale": { p: 4.3, k: 49 },
  "cavolo nero": { p: 4.0, k: 50 },
  kale: { p: 4.0, k: 49 },
  "wild rocket": { p: 2.6, k: 25 },
  broccoli: { p: 2.8, k: 34 },
  "red cabbage": { p: 1.4, k: 31 },
  "tenderheart cabbage": { p: 1.4, k: 26 },
  cabbage: { p: 1.4, k: 27 },
  "brussels sprouts": { p: 3.5, k: 43 },
  beetroot: { p: 1.7, k: 43 },
  carrots: { p: 0.6, k: 41 },
  "cherry tomatoes": { p: 0.7, k: 18 },
  "chopped tomatoes": { p: 1.2, k: 24 },
  "plum tomatoes": { p: 1.1, k: 23 },
  mutti: { p: 1.5, k: 27 },
  "tomato puree": { p: 4.5, k: 68 },
  mushroom: { p: 1.8, k: 22 },
  avocado: { p: 2.0, k: 160 },
  cucumber: { p: 0.6, k: 16 },
  "red onion": { p: 1.2, k: 40 },
  banana: { p: 1.1, k: 89 },
  apple: { p: 0.3, k: 52 },
  orange: { p: 0.9, k: 47 },
  kiwi: { p: 1.1, k: 61 },
  grapefruit: { p: 0.8, k: 30 },
  lemon: { p: 1.1, k: 29 },
  lime: { p: 0.7, k: 30 },
  pineapple: { p: 0.5, k: 50 },
  papaya: { p: 0.5, k: 43 },
  figs: { p: 0.8, k: 74 },
  blueberr: { p: 0.7, k: 57 },
  blackberr: { p: 0.9, k: 43 },
  raspberr: { p: 1.2, k: 52 },
  strawberr: { p: 0.7, k: 33 },
  mango: { p: 0.5, k: 60 },
  "mixed nuts": { p: 14.0, k: 610 },
  walnut: { p: 14.0, k: 654 },
  "pumpkin seeds": { p: 19.0, k: 559 },
  "chia seeds": { p: 17.0, k: 486 },
  tahini: { p: 17.0, k: 595 },
  houmous: { p: 7.0, k: 270 },
  "dark chocolate": { p: 5.0, k: 535 },
  "hot cocoa": { p: 6.0, k: 380 },
  "garlic paste": { p: 2.0, k: 40 },
  "ginger paste": { p: 1.0, k: 33 },
  garlic: { p: 6.0, k: 149 },
  turmeric: { p: 8.0, k: 354 },
  cinnamon: { p: 4.0, k: 247 },
  "sesame oil": { p: 0.0, k: 884 },
  "olive oil": { p: 0.0, k: 884 },
  "soy sauce": { p: 6.0, k: 53 },
  "coconut milk": { p: 2.3, k: 152 },
  "cottage cheese": { p: 11.0, k: 98 },
  "sweet pepper": { p: 1.0, k: 31 },
  "sweet potato": { p: 1.6, k: 86 },
  courgette: { p: 1.8, k: 17 },
  miso: { p: 12.0, k: 199 },
  "nutritional yeast": { p: 50.0, k: 325 },
  seitan: { p: 25.0, k: 143 },
  "smoked paprika": { p: 14.0, k: 282 },
  cumin: { p: 18.0, k: 375 },
  "garam masala": { p: 9.0, k: 351 },
  "curry powder": { p: 13.0, k: 325 },
  "chilli flakes": { p: 12.0, k: 282 },
  coriander: { p: 3.0, k: 23 },
  parsley: { p: 3.0, k: 36 },
  basil: { p: 3.2, k: 23 },
  mint: { p: 3.3, k: 44 },
  dill: { p: 3.5, k: 43 },
  rosemary: { p: 3.3, k: 131 },
  thyme: { p: 5.6, k: 276 },
  balsamic: { p: 0.5, k: 88 },
  "rice vinegar": { p: 0.0, k: 18 },
  "apple cider vinegar": { p: 0.0, k: 22 },
  "ground flaxseed": { p: 18.0, k: 534 },
  flaxseed: { p: 18.0, k: 534 },
  edamame: { p: 11.0, k: 122 },
  "hemp seeds": { p: 32.0, k: 553 },
  mackerel: { p: 19.0, k: 305 },
  sardine: { p: 21.0, k: 208 },
  feta: { p: 14.0, k: 264 },
  oregano: { p: 9.0, k: 265 },
  sriracha: { p: 1.0, k: 93 },
  sweetcorn: { p: 2.8, k: 86 },
  corn: { p: 2.8, k: 86 },
  noodle: { p: 5.0, k: 350 },
  "spring onion": { p: 1.8, k: 27 },
  lemongrass: { p: 1.8, k: 99 },
  "fish sauce": { p: 5.0, k: 35 },
  "stock cube": { p: 5.0, k: 260 },
  "chicken stock": { p: 5.0, k: 260 },
  "vegetable stock": { p: 2.0, k: 240 },
  "beef stock": { p: 5.0, k: 260 },
  "petit pois": { p: 6.0, k: 69 },
  peas: { p: 6.0, k: 69 },
  honey: { p: 0.3, k: 304 },
  "maple syrup": { p: 0.1, k: 260 },
  dates: { p: 2.5, k: 282 },
  mirin: { p: 0.5, k: 257 },
  cayenne: { p: 12.0, k: 318 },
  apricot: { p: 1.4, k: 241 },
  prune: { p: 2.2, k: 240 },
  raisin: { p: 3.1, k: 299 },
};

// Lookup: find best match in NDB for a product name string
const lookupNDB = (name) => {
  if (!name) return null;
  const l = name.toLowerCase();
  // Longest-key-first so "smoked salmon" beats "salmon", etc.
  const keys = Object.keys(NDB).sort((a, b) => b.length - a.length);
  for (const k of keys) if (l.includes(k)) return NDB[k];
  return null;
};

// Parse an amount string → grams (handles "500g", "2 cans", "1 tbsp", "3" etc.)
const parseGrams = (amountStr) => {
  if (amountStr == null) return null;
  if (typeof amountStr === "number") return amountStr;
  const s = String(amountStr).toLowerCase().trim();
  let m;
  if ((m = s.match(/([\d.]+)\s*kg/))) return +m[1] * 1000;
  if ((m = s.match(/(\d+\.?\d*)\s*g(?![a-z])/))) return +m[1];
  if ((m = s.match(/([\d.]+)\s*ml/))) return +m[1];
  if ((m = s.match(/([\d.]+)\s*tbsp/))) return +m[1] * 15;
  if ((m = s.match(/([\d.]+)\s*tsp/))) return +m[1] * 5;
  if (s.includes("can") || s.includes("tin")) {
    const n = parseFloat(s);
    return (isNaN(n) ? 1 : n) * 240;
  }
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
};

// Calculate protein+kcal for one recipe serving
const calcRecipeNutr = (recipe) => {
  if (!recipe?.ingredients) return { p: 0, k: 0 };
  let tp = 0,
    tk = 0;
  const sv = Math.max(Number(recipe.servings) || 4, 1);
  for (const ing of recipe.ingredients) {
    const name = str(ing.name || ing.item || ing);
    const rawG = ing.grams !== undefined ? ing.grams : ing.amount;
    let g = parseGrams(rawG);
    if (!g) continue;
    if (g > 1500) {
      g = 1500;
    }
    const ndb = getProductNDB(ing.id, name);
    if (!ndb) continue;
    tp += (g / 100) * ndb.p;
    tk += (g / 100) * ndb.k;
  }
  const pp = Math.round(tp / sv);
  const kk = Math.round(tk / sv);
  console.debug(
    `[NutrCalc] ${recipe.name} total: ${tp.toFixed(1)}g protein / ${sv} servings = ${pp}g per serving`,
  );
  return { p: pp, k: kk };
};

// Calculate protein+kcal for a list of snack/dessert items [{product,grams}]
const calcItemsNutr = (items = []) => {
  let tp = 0,
    tk = 0;
  for (const item of items) {
    const name =
      typeof item === "string" ? item : str(item.name || item.product || item);
    const id = typeof item === "object" ? item.id : null;
    const g = typeof item === "object" ? item.grams || 0 : 100;
    const ndb = getProductNDB(id, name);
    if (!g || !ndb) continue;
    tp += (g / 100) * ndb.p;
    tk += (g / 100) * ndb.k;
  }
  return { p: Math.round(tp), k: Math.round(tk) };
};

const renderItem = (item) => {
  if (!item) return "";
  if (typeof item === "string") return item;
  if (typeof item === "object") {
    const name = str(item.name || item.product || item.item || "");
    return item.grams ? `${name} (${item.grams}g)` : name;
  }
  return String(item);
};

// ─── Product ID → Nutrition {p: protein g/100g, k: kcal/100g} ────────────────
// Replaces fuzzy NDB name-matching for all ASDA products
// NDB/lookupNDB kept only for pantry staples (flaxseed, edamame, hemp seeds)
const PRODUCT_NDB_MAP = {
  // ── Animal Protein ──────────────────────────────────────────────────────────
  4778498: { p: 23.5, k: 110 }, // Chicken Breast Fillets 1kg
  4457673: { p: 19.5, k: 104 }, // Lean Turkey Mince 500g
  5658559: { p: 21.0, k: 185 }, // Pork Loin Steaks 800g
  7602009: { p: 20.0, k: 135 }, // Lean Pork Mince 500g
  6246484: { p: 18.0, k: 89 }, // Smoked Haddock Fillets 220g
  3657390: { p: 18.0, k: 90 }, // Basa Fillets 240g
  7597468: { p: 19.0, k: 86 }, // Hake Fillets 240g
  7599284: { p: 19.0, k: 95 }, // Sea Bream Fillets 180g
  3457918: { p: 18.0, k: 193 }, // Smoked Kipper Fillets 200g
  5735221: { p: 20.0, k: 208 }, // Salmon Side 500g
  995547: { p: 22.0, k: 172 }, // Oak Smoked Salmon 200g
  9108838: { p: 26.0, k: 200 }, // John West Tuna Chunks in Oil 4x125g
  9183910: { p: 19.0, k: 305 }, // Kiln Roasted Mackerel Fillets 215g
  5492605: { p: 19.0, k: 305 }, // Mackerel Fillets in Olive Oil 125g
  7734722: { p: 21.0, k: 208 }, // Chipotle Brisling Sardines 105g
  7456590: { p: 21.0, k: 208 }, // Sea Castle Sardines in Olive Oil 125g
  // ── Plant Protein ───────────────────────────────────────────────────────────
  9172660: { p: 16.0, k: 144 }, // Organic Super Firm Tofu 200g
  6821182: { p: 8.0, k: 76 }, // Clearspring Organic Tofu 300g
  9060340: { p: 19.0, k: 193 }, // Better Nature Original Tempeh 200g
  9067768: { p: 19.0, k: 193 }, // Better Nature Smoky Tempeh 220g
  9209312: { p: 25.0, k: 143 }, // The Tofoo Co Seitan 225g
  // ── Eggs & Dairy Protein ────────────────────────────────────────────────────
  1058519: { p: 13.0, k: 147 }, // 12 Free Range Eggs
  3369344: { p: 11.0, k: 98 }, // Cottage Cheese 300g
  1130420: { p: 14.0, k: 264 }, // Greek Feta 200g
  // ── Yogurt & Milk ───────────────────────────────────────────────────────────
  5035968: { p: 8.5, k: 97 }, // Natural Greek Yogurt 450g
  7290724: { p: 10.0, k: 97 }, // Fage Greek Yogurt 450g
  165426: { p: 3.4, k: 61 }, // Whole Milk
  489747: { p: 3.5, k: 46 }, // Semi-Skimmed Milk 2L
  7679945: { p: 2.3, k: 152 }, // Amoy Reduced Fat Coconut Milk 400g
  // ── Legumes ─────────────────────────────────────────────────────────────────
  7141992: { p: 9.0, k: 116 }, // Laila Red Split Lentils 2kg
  7141990: { p: 9.0, k: 164 }, // Laila Chickpeas 2kg
  7141994: { p: 8.5, k: 130 }, // Laila Chana Dal 2kg
  9014434: { p: 9.0, k: 170 }, // Laila Black Chickpeas 2kg
  6038347: { p: 8.0, k: 130 }, // ASDA Black Beans 400g
  6038333: { p: 7.0, k: 103 }, // ASDA Cannellini Beans 400g
  6038335: { p: 7.0, k: 95 }, // ASDA Haricot Beans 400g
  6038327: { p: 8.0, k: 135 }, // ASDA Pinto Beans 400g
  5871305: { p: 7.0, k: 103 }, // Napolina Butter Beans 400g
  6694454: { p: 12.0, k: 199 }, // Yutaka White Miso 100g
  // ── Nuts, Seeds & Nut Products ──────────────────────────────────────────────
  7359195: { p: 14.0, k: 610 }, // Mixed Nuts 200g
  7328819: { p: 14.0, k: 654 }, // Walnuts 180g
  5057252: { p: 19.0, k: 559 }, // Pumpkin Seeds 150g
  5519935: { p: 17.0, k: 486 }, // Chia Seeds 150g
  7456610: { p: 17.0, k: 595 }, // Baracke Tahini 500g
  9032347: { p: 7.0, k: 270 }, // Ramona's Houmous 500g
  7519309: { p: 50.0, k: 325 }, // Nutritional Yeast Flakes B12 100g
  // ── Whole Grains ────────────────────────────────────────────────────────────
  540519: { p: 11.0, k: 366 }, // Scott's Porridge Oats 1kg
  5021669: { p: 3.1, k: 83 }, // Bulgur Wheat 500g (cooked)
  5502702: { p: 4.4, k: 120 }, // Red & White Quinoa 300g (cooked)
  6453828: { p: 3.4, k: 92 }, // Roasted Buckwheat Groats 400g (cooked)
  5960754: { p: 8.5, k: 340 }, // Bran Flakes 1kg
  9015562: { p: 5.0, k: 350 }, // Wholewheat Noodles 250g (dry)
  // ── Greens ──────────────────────────────────────────────────────────────────
  5792183: { p: 2.9, k: 23 }, // Spinach 300g
  6324249: { p: 4.3, k: 49 }, // Curly Kale 150g
  9263761: { p: 4.0, k: 50 }, // Cavolo Nero Kale 150g
  5796850: { p: 2.6, k: 25 }, // Wild Rocket 60g
  // ── Cruciferous Veg ─────────────────────────────────────────────────────────
  5561471: { p: 2.8, k: 34 }, // Broccoli
  800548: { p: 1.4, k: 26 }, // Tenderheart Cabbage
  4001207: { p: 1.4, k: 31 }, // Red Cabbage 1kg
  6485995: { p: 3.5, k: 43 }, // Brussels Sprouts 200g
  // ── Other Vegetables ────────────────────────────────────────────────────────
  5737707: { p: 1.2, k: 40 }, // Red Onions
  9041476: { p: 0.7, k: 18 }, // Cherry Tomatoes 300g
  5611428: { p: 1.2, k: 24 }, // Chopped Tomatoes 400g
  1924655: { p: 1.1, k: 23 }, // Peeled Plum Tomatoes 400g
  6711617: { p: 1.5, k: 27 }, // Mutti Finely Chopped Tomatoes 400g
  2878185: { p: 4.5, k: 68 }, // Tomato Puree 200g
  150208: { p: 0.6, k: 41 }, // Carrots 1kg
  849246: { p: 2.0, k: 160 }, // Avocados
  152446: { p: 0.6, k: 16 }, // Cucumber
  212514: { p: 1.8, k: 22 }, // Chestnut Mushrooms 250g
  2137785: { p: 1.7, k: 43 }, // Beetroot 500g
  6566770: { p: 1.8, k: 17 }, // Courgettes 330g
  5844638: { p: 1.0, k: 31 }, // Sweet Peppers 3-pack
  2076628: { p: 1.6, k: 86 }, // Sweet Potatoes 1kg
  1787074: { p: 1.8, k: 27 }, // Spring Onions
  5499433: { p: 1.8, k: 99 }, // Lemongrass 30g
  2027523: { p: 6.0, k: 69 }, // Petits Pois 1kg
  58967: { p: 2.8, k: 86 }, // Green Giant Sweetcorn 340g
  // ── Fruit ───────────────────────────────────────────────────────────────────
  9084493: { p: 1.1, k: 89 }, // Bananas
  5648295: { p: 0.3, k: 52 }, // Royal Gala Apples
  3807826: { p: 0.9, k: 47 }, // Oranges
  1578127: { p: 1.1, k: 61 }, // Kiwi Fruit
  3134686: { p: 0.8, k: 30 }, // Grapefruit
  6762195: { p: 1.1, k: 29 }, // Lemons
  9234280: { p: 0.7, k: 30 }, // Limes
  4827498: { p: 0.5, k: 50 }, // Pineapple
  866041: { p: 0.5, k: 43 }, // Papaya
  4788711: { p: 0.8, k: 74 }, // Figs 140g
  5384295: { p: 0.5, k: 60 }, // Frozen Mango Chunks 500g
  2471287: { p: 0.7, k: 57 }, // Frozen Blueberries 350g
  6458210: { p: 0.9, k: 43 }, // Frozen Blackberries 350g
  7173394: { p: 1.2, k: 52 }, // Frozen Raspberries 300g
  6112880: { p: 0.7, k: 33 }, // Frozen Strawberries 350g
  7359227: { p: 2.5, k: 282 }, // Dates 200g
  9168448: { p: 1.4, k: 241 }, // Apricots 60g
  7359225: { p: 2.2, k: 240 }, // Prunes 200g
  7353221: { p: 3.1, k: 299 }, // Raisins 250g
  // ── Herbs & Spices (used in small amounts, minor protein/calorie contribution) ─
  9204884: { p: 6.0, k: 149 }, // Garlic
  7713727: { p: 1.0, k: 33 }, // Frozen Chopped Ginger 75g
  7647295: { p: 2.0, k: 40 }, // KTC Minced Garlic Paste 210g
  7647297: { p: 1.0, k: 33 }, // KTC Minced Ginger Paste 210g
  7687373: { p: 6.0, k: 149 }, // Frozen Garlic 200g
  20671: { p: 8.0, k: 354 }, // Rajah Turmeric 100g
  6180267: { p: 4.0, k: 247 }, // Ground Cinnamon
  3552664: { p: 14.0, k: 282 }, // Smoked Paprika 40g
  544313: { p: 18.0, k: 375 }, // Ground Cumin 41g
  544259: { p: 9.0, k: 351 }, // Garam Masala 92g
  20673: { p: 13.0, k: 325 }, // Rajah Mild Madras Curry Powder 100g
  544312: { p: 3.0, k: 23 }, // Ground Coriander 34g
  7940: { p: 12.0, k: 282 }, // Crushed Chilli Flakes 29g
  6753738: { p: 3.0, k: 23 }, // Fresh Coriander 30g
  5139836: { p: 3.0, k: 36 }, // Flat Leaf Parsley 25g
  6753736: { p: 3.2, k: 23 }, // Fresh Basil 30g
  6753734: { p: 3.3, k: 44 }, // Fresh Mint 30g
  5139838: { p: 3.5, k: 43 }, // Fresh Dill 25g
  5148466: { p: 3.3, k: 131 }, // Fresh Rosemary 20g
  5139830: { p: 5.6, k: 276 }, // Fresh Thyme 20g
  544339: { p: 3.0, k: 27 }, // Chives 3g
  544332: { p: 9.0, k: 265 }, // Oregano 12g
  544324: { p: 12.0, k: 318 }, // Cayenne Chilli Pepper 40g
  // ── Oils ────────────────────────────────────────────────────────────────────
  2266181: { p: 0.0, k: 884 }, // Sesame Oil 250ml
  612680: { p: 0.0, k: 884 }, // Filippo Berio Classic Olive Oil 500ml
  5644936: { p: 0.0, k: 884 }, // ASDA Organic Extra Virgin Olive Oil 500ml
  5644932: { p: 0.0, k: 884 }, // Exceptional EVOO 500ml
  // ── Condiments & Sauces ─────────────────────────────────────────────────────
  7598432: { p: 6.0, k: 53 }, // Lee Kum Kee Dark Soy Sauce 500ml
  9311250: { p: 6.0, k: 53 }, // Lee Kum Kee Light Soy Sauce 500ml
  3389020: { p: 0.0, k: 18 }, // Yutaka Rice Vinegar 150ml
  9016417: { p: 0.0, k: 22 }, // Organic Apple Cider Vinegar 500ml
  5496019: { p: 0.5, k: 88 }, // Filippo Berio Balsamic Vinegar 250ml
  2569207: { p: 0.0, k: 18 }, // White Wine Vinegar 350ml
  6124298: { p: 5.0, k: 35 }, // Blue Dragon Fish Sauce 150ml
  2687967: { p: 5.0, k: 260 }, // Chicken Stock Cubes 120g
  2687969: { p: 2.0, k: 240 }, // Vegetable Stock Cubes 120g
  2687965: { p: 5.0, k: 260 }, // Beef Stock Cubes 120g
  4705981: { p: 0.3, k: 304 }, // Rowse Organic Honey 340g
  6742862: { p: 0.1, k: 260 }, // Canadian Amber Maple Syrup 250g
  9017629: { p: 0.5, k: 257 }, // Cook by ASDA Mirin 150ml
  7647707: { p: 1.0, k: 93 }, // Thai Dragon Sriracha 455ml
  // ── Treats ──────────────────────────────────────────────────────────────────
  9112838: { p: 5.0, k: 535 }, // ASDA Dark Chocolate 200g
  5719960: { p: 6.0, k: 380 }, // Green & Black's Hot Cocoa Powder 125g
};

// Get nutrition for a product ID — falls back to NDB name match for pantry staples
const getProductNDB = (id, name) => {
  if (id && PRODUCT_NDB_MAP[String(id)]) return PRODUCT_NDB_MAP[String(id)];
  // Fallback: pantry staples (ground flaxseed, edamame, hemp seeds) have no ID
  if (name) return lookupNDB(name);
  return null;
};

// ─── Algolia ─────────────────────────────────────────────────────────────────
const ALGOLIA_APP = "8I6WSKCCNV";
const ALGOLIA_KEY = "03e4272048dd17f771da37b57ff8a75e";
const ALGOLIA_INDEX = "ASDA_PRODUCTS";

const extractPrice = (obj) => {
  if (!obj) return null;

  // ASDA schema: PRICES.EN.PRICE
  const price = obj?.PRICES?.EN?.PRICE;
  if (price !== undefined) {
    const n = parseFloat(price);
    if (!isNaN(n) && n > 0) return `£${n.toFixed(2)}`;
  }

  // Generic fallbacks for other schemas
  const candidates = [
    obj?.price?.amount,
    obj?.price,
    obj?.fullPrice,
    obj?.shelfPrice,
    obj?.currentPrice,
  ];
  for (const c of candidates) {
    const n = parseFloat(c);
    if (!isNaN(n) && n > 0) return `£${n.toFixed(2)}`;
  }
  return null;
};

// Safe string — handles objects the AI might return instead of plain strings
const str = (v) => {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "object")
    return v.item || v.name || v.text || v.description || JSON.stringify(v);
  return String(v);
};

// ─── Theme ───────────────────────────────────────────────────────────────────
const G = "#2A4D14",
  GA = "#3D7021",
  AM = "#C17D00";
const CR = "#FDFAF5",
  WH = "#FFFFFF",
  BD = "#E8E0D0";
const TX = "#1C1C1C",
  TX2 = "#5A5A5A";
const ff = "'DM Sans', sans-serif",
  fh = "'Playfair Display', serif";

// ─── Product ID → Daily Dozen categories (derived from slug, deterministic) ──
// Replaces Haiku's self-reported dailyDozenItems entirely
const PRODUCT_DD_MAP = {
  // Beans
  6038347: ["Beans"], // Black Beans
  6038333: ["Beans"], // Cannellini Beans
  6038335: ["Beans"], // Haricot Beans
  6038327: ["Beans"], // Pinto Beans
  5871305: ["Beans"], // Butter Beans
  9014434: ["Beans"], // Black Chickpeas
  7141990: ["Beans"], // Chickpeas
  7141994: ["Beans"], // Chana Dal
  7141992: ["Beans"], // Red Split Lentils
  9172660: ["Beans"], // Super Firm Tofu
  6821182: ["Beans"], // Clearspring Tofu
  9060340: ["Beans"], // Original Tempeh
  9067768: ["Beans"], // Smoky Tempeh
  9209312: ["Beans"], // Seitan
  9032347: ["Beans", "Nuts and Seeds"], // Houmous (chickpeas + sesame)
  7456610: ["Nuts and Seeds"], // Tahini
  6694454: ["Beans", "Herbs and Spices"], // Miso
  // Berries
  6458210: ["Berries"], // Frozen Blackberries
  2471287: ["Berries"], // Frozen Blueberries
  7173394: ["Berries"], // Frozen Raspberries
  6112880: ["Berries"], // Frozen Strawberries
  // Other Fruits
  9084493: ["Other Fruits"], // Bananas
  5648295: ["Other Fruits"], // Royal Gala Apples
  3807826: ["Other Fruits"], // Oranges
  1578127: ["Other Fruits"], // Kiwi Fruit
  3134686: ["Other Fruits"], // Grapefruit
  6762195: ["Other Fruits"], // Lemons
  9234280: ["Other Fruits"], // Limes
  4827498: ["Other Fruits"], // Pineapple
  866041: ["Other Fruits"], // Papaya
  4788711: ["Other Fruits"], // Figs
  5384295: ["Other Fruits"], // Frozen Mango
  7359227: ["Other Fruits"], // Dates
  9168448: ["Other Fruits"], // Apricots
  7359225: ["Other Fruits"], // Prunes
  7353221: ["Other Fruits"], // Raisins
  // Greens
  5792183: ["Greens"], // Spinach
  6324249: ["Greens", "Cruciferous Vegetables"], // Curly Kale
  9263761: ["Greens", "Cruciferous Vegetables"], // Cavolo Nero
  5796850: ["Greens"], // Wild Rocket
  6753738: ["Greens", "Herbs and Spices"], // Fresh Coriander
  5139836: ["Greens", "Herbs and Spices"], // Flat Leaf Parsley
  6753736: ["Herbs and Spices"], // Fresh Basil
  6753734: ["Herbs and Spices"], // Fresh Mint
  5139838: ["Herbs and Spices"], // Fresh Dill
  5148466: ["Herbs and Spices"], // Fresh Rosemary
  5139830: ["Herbs and Spices"], // Fresh Thyme
  544339: ["Herbs and Spices"], // Chives
  // Cruciferous Vegetables
  5561471: ["Cruciferous Vegetables", "Other Vegetables"], // Broccoli
  4001207: ["Cruciferous Vegetables", "Other Vegetables"], // Red Cabbage
  800548: ["Cruciferous Vegetables", "Other Vegetables"], // Tenderheart Cabbage
  6485995: ["Cruciferous Vegetables", "Other Vegetables"], // Brussels Sprouts
  // Other Vegetables
  5737707: ["Other Vegetables"], // Red Onions
  9041476: ["Other Vegetables"], // Cherry Tomatoes
  150208: ["Other Vegetables"], // Carrots
  849246: ["Other Vegetables"], // Avocados
  152446: ["Other Vegetables"], // Cucumber
  212514: ["Other Vegetables"], // Chestnut Mushrooms
  2137785: ["Other Vegetables"], // Beetroot
  6566770: ["Other Vegetables"], // Courgettes
  5844638: ["Other Vegetables"], // Sweet Peppers
  2076628: ["Other Vegetables"], // Sweet Potatoes
  1787074: ["Other Vegetables", "Herbs and Spices"], // Spring Onions
  5499433: ["Herbs and Spices", "Other Vegetables"], // Lemongrass
  2027523: ["Other Vegetables"], // Petit Pois
  58967: ["Other Vegetables"], // Sweetcorn
  1924655: ["Other Vegetables"], // Peeled Plum Tomatoes
  5611428: ["Other Vegetables"], // Chopped Tomatoes
  6711617: ["Other Vegetables"], // Mutti Tomatoes
  9204884: ["Herbs and Spices"], // Garlic
  7713727: ["Herbs and Spices"], // Frozen Chopped Ginger
  7687373: ["Herbs and Spices"], // Frozen Garlic
  7647295: ["Herbs and Spices"], // Garlic Paste
  7647297: ["Herbs and Spices"], // Ginger Paste
  // Nuts and Seeds
  7359195: ["Nuts and Seeds"], // Mixed Nuts
  7328819: ["Nuts and Seeds"], // Walnuts
  5057252: ["Nuts and Seeds"], // Pumpkin Seeds
  5519935: ["Nuts and Seeds"], // Chia Seeds
  7519309: ["Nuts and Seeds", "Herbs and Spices"], // Nutritional Yeast
  // Herbs and Spices
  20671: ["Herbs and Spices"], // Rajah Turmeric
  6180267: ["Herbs and Spices"], // Ground Cinnamon
  3552664: ["Herbs and Spices"], // Smoked Paprika
  544313: ["Herbs and Spices"], // Ground Cumin
  544259: ["Herbs and Spices"], // Garam Masala
  20673: ["Herbs and Spices"], // Curry Powder
  544312: ["Herbs and Spices"], // Ground Coriander
  7940: ["Herbs and Spices"], // Chilli Flakes
  544332: ["Herbs and Spices"], // Oregano
  544324: ["Herbs and Spices"], // Cayenne
  6694454: ["Herbs and Spices"], // Miso (also Beans above)
  // Whole Grains
  540519: ["Whole Grains"], // Porridge Oats
  5021669: ["Whole Grains"], // Bulgur Wheat
  5502702: ["Whole Grains"], // Quinoa
  6453828: ["Whole Grains"], // Buckwheat Groats
  5960754: ["Whole Grains"], // Bran Flakes
  9015562: ["Whole Grains"], // Wholewheat Noodles
};

// Get DD categories for a product ID
const getProductDD = (id) => PRODUCT_DD_MAP[String(id)] || [];

// Calculate Daily Dozen counts for a day from actual ingredient IDs
const calcDayDDFromIds = (recipes, snacks, desserts, mealDay) => {
  const counts = {};
  const add = (cats) => {
    for (const cat of cats || []) {
      counts[cat] = (counts[cat] || 0) + 1;
    }
  };

  // Lunch recipe ingredients
  const lunch = recipes.find((r) => r.id === mealDay.lunch?.recipeId);
  for (const ing of lunch?.ingredients || []) add(getProductDD(ing.id));

  // Dinner recipe ingredients
  const dinner = recipes.find((r) => r.id === mealDay.dinner?.recipeId);
  for (const ing of dinner?.ingredients || []) add(getProductDD(ing.id));

  // Snack items
  const snack = snacks.find((s) => s.id === mealDay.snackId);
  for (const item of snack?.items || []) add(getProductDD(item.id));

  // Dessert items
  const dessert = desserts.find((d) => d.id === mealDay.dessertId);
  for (const item of dessert?.items || []) add(getProductDD(item.id));

  // Pantry staples: ground flaxseed counts as Flaxseed if present in any ingredient name
  const allNames = [
    ...(lunch?.ingredients || []),
    ...(dinner?.ingredients || []),
    ...(snack?.items || []),
    ...(dessert?.items || []),
  ].map((i) => (i.name || "").toLowerCase());
  if (allNames.some((n) => n.includes("flax")))
    counts["Flaxseed"] = (counts["Flaxseed"] || 0) + 1;

  return counts;
};

// Average DD counts across all days
const avgDayDDFromIds = (plan) => {
  if (!plan?.mealPlan?.length) return {};
  const totals = {};
  for (const day of plan.mealPlan) {
    const counts = calcDayDDFromIds(
      plan.recipes || [],
      plan.snacks || [],
      plan.desserts || [],
      day,
    );
    for (const [cat, n] of Object.entries(counts))
      totals[cat] = (totals[cat] || 0) + n;
  }
  const avg = {};
  for (const [cat, total] of Object.entries(totals))
    avg[cat] = Math.round((total / plan.mealPlan.length) * 10) / 10;
  return avg;
};

const PROTEIN_TARGET = 100; // g/day (lunch+dinner+snacks+desserts only, no breakfast)
const CALORIE_TARGET = 1500; // kcal/day

const DD_TARGETS = {
  Beans: 3,
  Berries: 1,
  "Other Fruits": 3,
  Greens: 2,
  "Cruciferous Vegetables": 1,
  "Other Vegetables": 2,
  Flaxseed: 1,
  "Nuts and Seeds": 1,
  "Herbs and Spices": 1,
  "Whole Grains": 3,
};

export default function MealPlanner() {
  const [prices, setPrices] = useState({});
  const [priceStatus, setPriceStatus] = useState("idle");
  const [priceDebug, setPriceDebug] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("plan");
  const [owned, setOwned] = useState(new Set());
  const [userPantry, setUserPantry] = useState(new Set()); // persistent pantry items
  const hasMounted = useRef(false);
  const [enabledCuisines, setEnabledCuisines] = useState(new Set(ALL_CUISINES));
  const [includedItems, setIncludedItems] = useState(new Set()); // populated after generation
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const style = document.createElement("style");
    style.textContent = `@keyframes spin{to{transform:rotate(360deg)}}`;
    document.head.appendChild(style);
    return () => {
      try {
        document.head.removeChild(link);
      } catch (e) {}
      try {
        document.head.removeChild(style);
      } catch (e) {}
    };
  }, []);

  // Load cached data on mount
  useEffect(() => {
    (async () => {
      try {
        const cs = await window.storage.get("asda_settings");
        if (cs) {
          const s = JSON.parse(cs.value);
          if (s.enabledCuisines) setEnabledCuisines(new Set(s.enabledCuisines));
          if (s.userPantry) setUserPantry(new Set(s.userPantry));
        }
      } catch (e) {}
      try {
        const cp = await window.storage.get("asda_prices");
        if (cp) {
          setPrices(JSON.parse(cp.value));
          setPriceStatus("done");
        }
      } catch (e) {}
      try {
        const cl = await window.storage.get("asda_plan");
        if (cl) {
          const p = JSON.parse(cl.value);
          const shopRes = buildShoppingList(p);
          const cachedIds = new Set([
            ...(p.recipes || []).map((r) => r.id),
            ...(p.snacks || []).map((s) => s.id),
            ...(p.desserts || []).map((d) => d.id),
          ]);
          setIncludedItems(cachedIds);
          p.shoppingList = shopRes.list;
          p.unmatchedIngredients = shopRes.unmatched;
          p.pantryIngredients = shopRes.pantryItems;
          p.ingredientMatchStats = {
            matched: shopRes.matched,
            total: shopRes.total,
            pantry: shopRes.pantryItems.length,
          };
          setPlan(p);
        }
      } catch (e) {}
    })();
  }, []);

  // Persist settings when enabledCuisines or userPantry changes
  // useRef guard prevents overwriting saved data on initial mount before restore completes
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    window.storage
      .set(
        "asda_settings",
        JSON.stringify({
          enabledCuisines: [...enabledCuisines],
          userPantry: [...userPantry],
        }),
      )
      .catch(() => {});
  }, [enabledCuisines, userPantry]);

  // ── Fetch prices — 3 strategies with step-by-step diagnostics ───────────────
  const fetchPrices = async () => {
    setPriceStatus("loading");
    const ids = Object.keys(PRODUCT_IDS);
    const firstId = ids[0];
    let testObj = null;
    let log = [];

    // Strategy 1: query-param auth (avoids custom-header CORS preflight)
    try {
      log.push("S1: query-param auth...");
      setPriceDebug(log.join(" "));
      const r = await fetch(
        `https://${ALGOLIA_APP}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX}/${firstId}` +
          `?x-algolia-api-key=${ALGOLIA_KEY}&x-algolia-application-id=${ALGOLIA_APP}`,
      );
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      testObj = await r.json();
      log.push("OK");
    } catch (e1) {
      log.push(`FAIL(${e1.message})`);

      // Strategy 2: header-based auth
      try {
        log.push(" S2: header auth...");
        setPriceDebug(log.join(""));
        const r = await fetch(
          `https://${ALGOLIA_APP}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX}/${firstId}`,
          {
            headers: {
              "X-Algolia-API-Key": ALGOLIA_KEY,
              "X-Algolia-Application-Id": ALGOLIA_APP,
            },
          },
        );
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        testObj = await r.json();
        log.push("OK");
      } catch (e2) {
        log.push(`FAIL(${e2.message})`);

        // Strategy 3: POST search endpoint
        try {
          log.push(" S3: search POST...");
          setPriceDebug(log.join(""));
          const r = await fetch(
            `https://${ALGOLIA_APP}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX}/query`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Algolia-API-Key": ALGOLIA_KEY,
                "X-Algolia-Application-Id": ALGOLIA_APP,
              },
              body: JSON.stringify({ query: "yogurt", hitsPerPage: 1 }),
            },
          );
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          const data = await r.json();
          testObj = data.hits?.[0] || null;
          if (!testObj) throw new Error("0 hits");
          log.push("OK");
        } catch (e3) {
          log.push(`FAIL(${e3.message})`);
          setPriceStatus("error");
          setPriceDebug(log.join("") + " — sandbox likely blocks algolia.net");
          return;
        }
      }
    }

    // Connected — check price field
    const samplePrice = extractPrice(testObj);
    if (!samplePrice) {
      setPriceStatus("unsupported");
      setPriceDebug(
        "Connected but no price field found. Keys: " +
          Object.keys(testObj).join(", "),
      );
      return;
    }

    // Fetch all products in parallel (query-param auth — no preflight)
    log.push(` Fetching all ${ids.length}...`);
    setPriceDebug(log.join(""));
    const settled = await Promise.allSettled(
      ids.map((id) =>
        fetch(
          `https://${ALGOLIA_APP}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX}/${id}` +
            `?x-algolia-api-key=${ALGOLIA_KEY}&x-algolia-application-id=${ALGOLIA_APP}`,
        ).then((r) => r.json()),
      ),
    );

    const priceMap = {};
    let found = 0;
    settled.forEach((result, idx) => {
      if (result.status !== "fulfilled") return;
      const name = PRODUCT_IDS[ids[idx]];
      const p = extractPrice(result.value);
      if (p && name) {
        priceMap[name] = p;
        found++;
      }
    });

    await window.storage.set("asda_prices", JSON.stringify(priceMap));
    setPrices(priceMap);
    setPriceStatus(found > 0 ? "done" : "unsupported");
    setPriceDebug(`${found}/${ids.length} prices loaded`);
  };

  // ── Generate plan (Haiku — swap model here for cost control) ────────────────
  const generatePlan = async () => {
    setLoading(true);
    setError(null);
    // Always clear cached plan before regenerating
    try {
      await window.storage.delete("asda_plan");
    } catch (e) {}
    const cuisines = pickCuisines([...enabledCuisines]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 6000,
          messages: [{ role: "user", content: buildPrompt(cuisines, PRODUCT_IDS, DAILY_DOZEN_DEF) }],
        }),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(`HTTP ${res.status}: ${t}`);
      }
      const data = await res.json();
      if (data.error)
        throw new Error(data.error.message || JSON.stringify(data.error));
      const raw = (data.content || []).map((b) => b.text || "").join("");
      if (!raw) throw new Error("Empty API response");
      let clean = raw
        .replace(/^```json\s*/i, "")
        .replace(/\s*```\s*$/i, "")
        .trim();
      if (!clean.startsWith("{")) {
        const m = clean.match(/\{[\s\S]*\}/);
        if (!m) throw new Error("No JSON found");
        clean = m[0];
      }
      const parsed = JSON.parse(clean);
      // Derive shopping list from ingredients — no AI token cost
      const shopResult = buildShoppingList(parsed);
      parsed.shoppingList = shopResult.list;
      parsed.unmatchedIngredients = shopResult.unmatched;
      parsed.pantryIngredients = shopResult.pantryItems;
      parsed.ingredientMatchStats = {
        matched: shopResult.matched,
        total: shopResult.total,
        pantry: shopResult.pantryItems.length,
      };
      await window.storage.set("asda_plan", JSON.stringify(parsed));
      const allIds = new Set([
        ...(parsed.recipes || []).map((r) => r.id),
        ...(parsed.snacks || []).map((s) => s.id),
        ...(parsed.desserts || []).map((d) => d.id),
      ]);
      setIncludedItems(allIds);
      setPlan(parsed);
      setOwned(new Set());
      setActiveTab("plan");
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleOwned = (product) =>
    setOwned((prev) => {
      const n = new Set(prev);
      n.has(product) ? n.delete(product) : n.add(product);
      return n;
    });
  const togglePantry = (product) =>
    setUserPantry((prev) => {
      const n = new Set(prev);
      n.has(product) ? n.delete(product) : n.add(product);
      return n;
    });

  const toggleIncluded = (id) =>
    setIncludedItems((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const getRecipe = (id) => (plan?.recipes || []).find((r) => r.id === id);
  const getSnack = (id) => (plan?.snacks || []).find((s) => s.id === id);
  const getDessert = (id) => (plan?.desserts || []).find((d) => d.id === id);

  const shopTotal = () =>
    buildFilteredShoppingList()
      .filter((i) => !owned.has(i.product) && !userPantry.has(i.id))
      .reduce((s, i) => {
        const p = parseFloat(
          (prices[i.product] || "0").replace(/[^0-9.]/g, ""),
        );
        return s + (isNaN(p) ? 0 : p);
      }, 0)
      .toFixed(2);

  const pantryTotal = () =>
    buildFilteredShoppingList()
      .filter((i) => userPantry.has(i.id))
      .reduce((s, i) => {
        const p = parseFloat(
          (prices[i.product] || "0").replace(/[^0-9.]/g, ""),
        );
        return s + (isNaN(p) ? 0 : p);
      }, 0)
      .toFixed(2);

  const buildFilteredShoppingList = () => {
    if (!plan) return [];
    // Filter plan to only included items, then rebuild shopping list
    const filteredPlan = {
      ...plan,
      recipes: (plan.recipes || []).filter((r) => includedItems.has(r.id)),
      snacks: (plan.snacks || []).filter((s) => includedItems.has(s.id)),
      desserts: (plan.desserts || []).filter((d) => includedItems.has(d.id)),
    };
    return buildShoppingList(filteredPlan).list;
  };

  const groupedShop = () =>
    buildFilteredShoppingList().reduce((acc, item) => {
      const cat = item.category || "Other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {});

  const pricesFound = Object.keys(prices).length;

  // ── Sub-components ──────────────────────────────────────────────────────────
  const Chip = ({ label, bg = "#EEF5E7", col = G, extra = "" }) => (
    <span
      style={{
        background: bg,
        color: col,
        borderRadius: 20,
        padding: "4px 12px",
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {label}
    </span>
  );

  const SectionLabel = ({ children }) => (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: TX2,
        marginBottom: 10,
      }}
    >
      {children}
    </div>
  );

  const Divider = () => <div style={{ borderBottom: "1px solid #F3EDE3" }} />;

  const PriceBadge = () => {
    const map = {
      idle: {
        bg: "#F0F7E8",
        col: G,
        text: `${Object.keys(PRODUCT_IDS).length} products ready — fetch live prices from ASDA`,
      },
      loading: {
        bg: "#FFF8E8",
        col: "#7A5500",
        text: "Fetching prices from ASDA via Algolia…",
      },
      done: {
        bg: "#EEF5E7",
        col: G,
        text: `✓ ${pricesFound} prices loaded  ·  ${priceDebug}`,
      },
      error: {
        bg: "#FFF0F0",
        col: "#990000",
        text: `Price fetch failed: ${priceDebug}`,
      },
      unsupported: { bg: "#FFF8E8", col: "#7A5500", text: priceDebug },
    };
    const c = map[priceStatus] || map.idle;
    return (
      <div
        style={{
          background: c.bg,
          color: c.col,
          borderRadius: 8,
          padding: "9px 14px",
          fontSize: 12,
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span>{c.text}</span>
        {priceStatus !== "loading" && (
          <button
            onClick={fetchPrices}
            style={{
              background: G,
              color: WH,
              border: "none",
              borderRadius: 6,
              padding: "4px 12px",
              fontSize: 11,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: ff,
            }}
          >
            {priceStatus === "done" ? "↻ Refresh" : "Fetch Prices"}
          </button>
        )}
      </div>
    );
  };

  // Daily Dozen progress bars

  // Map recipe dailyDozenItems → Daily Dozen category counts per serving
  // Each item in dailyDozenItems counts as 1 serving of that category
  const calcDayDD = (lunch, dinner, snack, dessert) => {
    const counts = {};
    const add = (items) => {
      for (const item of items || []) {
        counts[item] = (counts[item] || 0) + 1;
      }
    };
    add(lunch?.dailyDozenItems);
    add(dinner?.dailyDozenItems);
    add(snack?.dailyDozenItems);
    add(dessert?.dailyDozenItems);
    return counts;
  };

  const avgDayDD = (mealPlan, getRecipeFn, getSnackFn, getDessertFn) => {
    if (!mealPlan?.length) return {};
    // Sum across all days then divide
    const totals = {};
    for (const day of mealPlan) {
      const counts = calcDayDD(
        getRecipeFn(day.lunch?.recipeId),
        getRecipeFn(day.dinner?.recipeId),
        getSnackFn(day.snackId),
        getDessertFn(day.dessertId),
      );
      for (const [cat, n] of Object.entries(counts)) {
        totals[cat] = (totals[cat] || 0) + n;
      }
    }
    const avg = {};
    for (const [cat, total] of Object.entries(totals)) {
      avg[cat] = Math.round((total / mealPlan.length) * 10) / 10;
    }
    return avg;
  };

  const DDProgress = ({ counts }) => {
    if (!counts) return null;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "8px 16px",
          marginTop: 12,
        }}
      >
        {Object.entries(DD_TARGETS).map(([cat, target]) => {
          const got = counts[cat] || 0;
          const pct = Math.min(100, Math.round((got / target) * 100));
          const met = got >= target;
          return (
            <div key={cat}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  marginBottom: 3,
                }}
              >
                <span style={{ opacity: 0.85 }}>{cat}</span>
                <span style={{ fontWeight: 700, color: met ? "#A8D878" : AM }}>
                  {got}/{target}
                </span>
              </div>
              <div
                style={{
                  height: 4,
                  borderRadius: 2,
                  background: "rgba(255,255,255,0.2)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: pct + "%",
                    borderRadius: 2,
                    background: met ? "#A8D878" : AM,
                    transition: "width 0.3s",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      style={{ fontFamily: ff, background: CR, minHeight: "100vh", color: TX }}
    >
      {/* Header */}
      <div
        style={{
          background: G,
          color: WH,
          padding: "28px 32px 24px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{ fontFamily: fh, fontSize: 26, fontWeight: 700, margin: 0 }}
          >
            Weekly Meal Planner
          </h1>
          <p
            style={{
              fontSize: 13,
              opacity: 0.75,
              marginTop: 4,
              marginBottom: 8,
            }}
          >
            Daily Dozen · 130g Protein · Your ASDA Favourites
          </p>
          {["4 Lunches", "4 Dinners", "2 Snacks", "2 Desserts", "2 Sauces"].map(
            (t) => (
              <span
                key={t}
                style={{
                  display: "inline-block",
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: 20,
                  padding: "3px 10px",
                  fontSize: 11,
                  marginRight: 6,
                }}
              >
                {t}
              </span>
            ),
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={() => setSettingsOpen((o) => !o)}
              style={{
                background: "rgba(255,255,255,0.15)",
                color: WH,
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: 8,
                padding: "10px 16px",
                fontFamily: ff,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ⚙ Settings {settingsOpen ? "▲" : "▼"}
            </button>
            <button
              onClick={generatePlan}
              disabled={loading}
              style={{
                background: AM,
                color: WH,
                border: "none",
                borderRadius: 8,
                padding: "12px 22px",
                fontFamily: ff,
                fontSize: 15,
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading
                ? "⏳ Generating…"
                : plan
                  ? "↻ Regenerate"
                  : "✦ Generate My Plan"}
            </button>
          </div>
          {settingsOpen && (
            <div
              style={{
                background: "rgba(0,0,0,0.25)",
                borderRadius: 10,
                padding: "16px 20px",
                minWidth: 320,
                maxWidth: 480,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  opacity: 0.7,
                  marginBottom: 10,
                }}
              >
                Cuisines — pick at least 3 (picks 3 randomly per generation)
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  marginBottom: 2,
                }}
              >
                {ALL_CUISINES.map((c) => {
                  const checked = enabledCuisines.has(c);
                  const wouldGoBelow3 = checked && enabledCuisines.size <= 3;
                  return (
                    <label
                      key={c}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        cursor: wouldGoBelow3 ? "not-allowed" : "pointer",
                        opacity: wouldGoBelow3 ? 0.45 : 1,
                        background: "rgba(255,255,255,0.12)",
                        borderRadius: 20,
                        padding: "4px 10px",
                        fontSize: 12,
                        userSelect: "none",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={wouldGoBelow3}
                        onChange={() => {
                          setEnabledCuisines((prev) => {
                            const n = new Set(prev);
                            n.has(c) ? n.delete(c) : n.add(c);
                            return n;
                          });
                        }}
                        style={{ accentColor: AM, width: 12, height: 12 }}
                      />
                      {c}
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{ padding: "24px 24px 64px", maxWidth: 900, margin: "0 auto" }}
      >
        <PriceBadge />

        {error && (
          <div
            style={{
              background: "#FFF0F0",
              border: "1px solid #FFAAAA",
              borderRadius: 8,
              padding: "14px 18px",
              color: "#990000",
              fontSize: 13,
              marginBottom: 20,
              wordBreak: "break-word",
            }}
          >
            <strong>Error:</strong> {error}
          </div>
        )}

        {loading && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div
              style={{
                width: 40,
                height: 40,
                border: `3px solid ${BD}`,
                borderTopColor: G,
                borderRadius: "50%",
                margin: "0 auto 16px",
                animation: "spin 0.8s linear infinite",
              }}
            />
            <p style={{ color: TX2, fontSize: 14 }}>
              Building your personalised plan…
            </p>
          </div>
        )}

        {!loading && !plan && !error && (
          <div style={{ textAlign: "center", padding: "64px 24px" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🥗</div>
            <h2
              style={{
                fontFamily: fh,
                fontSize: 24,
                fontWeight: 700,
                color: G,
                marginBottom: 8,
              }}
            >
              Your plan awaits
            </h2>
            <p
              style={{
                color: TX2,
                fontSize: 14,
                lineHeight: 1.6,
                maxWidth: 440,
                margin: "0 auto 28px",
              }}
            >
              Fetch prices first (live from ASDA), then Generate. Cuisines
              randomise each time. Plans are cached so you only regenerate when
              you want a new rotation.
            </p>
          </div>
        )}

        {!loading && plan && (
          <>
            {/* Summary card */}
            <div
              style={{
                background: G,
                color: WH,
                borderRadius: 12,
                padding: "20px 24px",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontFamily: fh,
                  fontSize: 18,
                  fontWeight: 700,
                  marginBottom: 12,
                }}
              >
                Daily Nutrition Summary
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                {(() => {
                  const days = plan.mealPlan || [];
                  const avgP = Math.round(
                    days.reduce((s, d) => {
                      const l = getRecipe(d.lunch?.recipeId),
                        di = getRecipe(d.dinner?.recipeId),
                        sn = getSnack(d.snackId),
                        de = getDessert(d.dessertId);
                      return (
                        s +
                        calcRecipeNutr(l).p +
                        calcRecipeNutr(di).p +
                        calcItemsNutr(sn?.items).p +
                        calcItemsNutr(de?.items).p
                      );
                    }, 0) / Math.max(days.length, 1),
                  );
                  const avgK = Math.round(
                    days.reduce((s, d) => {
                      const l = getRecipe(d.lunch?.recipeId),
                        di = getRecipe(d.dinner?.recipeId),
                        sn = getSnack(d.snackId),
                        de = getDessert(d.dessertId);
                      return (
                        s +
                        calcRecipeNutr(l).k +
                        calcRecipeNutr(di).k +
                        calcItemsNutr(sn?.items).k +
                        calcItemsNutr(de?.items).k
                      );
                    }, 0) / Math.max(days.length, 1),
                  );
                  const pPct = Math.min(
                    100,
                    Math.round((avgP / PROTEIN_TARGET) * 100),
                  );
                  const kPct = Math.min(
                    100,
                    Math.round((avgK / CALORIE_TARGET) * 100),
                  );
                  const pOk = Math.abs(avgP - PROTEIN_TARGET) <= 10;
                  const kOk = Math.abs(avgK - CALORIE_TARGET) <= 100;
                  return (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 12,
                      }}
                    >
                      {[
                        {
                          label: "Avg Daily Protein",
                          val: avgP + "g",
                          target: PROTEIN_TARGET + "g target",
                          pct: pPct,
                          ok: pOk,
                        },
                        {
                          label: "Avg Daily Calories",
                          val: avgK + " kcal",
                          target: CALORIE_TARGET + " kcal target",
                          pct: kPct,
                          ok: kOk,
                        },
                      ].map(({ label, val, target, pct, ok }) => (
                        <div
                          key={label}
                          style={{
                            background: "rgba(255,255,255,0.12)",
                            borderRadius: 8,
                            padding: "12px 14px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 11,
                              opacity: 0.75,
                              marginBottom: 4,
                            }}
                          >
                            {label}
                          </div>
                          <div
                            style={{
                              fontSize: 22,
                              fontWeight: 700,
                              fontFamily: fh,
                              color: ok ? "#A8D878" : AM,
                            }}
                          >
                            {val}
                          </div>
                          <div
                            style={{
                              fontSize: 11,
                              opacity: 0.7,
                              marginBottom: 6,
                            }}
                          >
                            {target}
                          </div>
                          <div
                            style={{
                              height: 4,
                              borderRadius: 2,
                              background: "rgba(255,255,255,0.2)",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: pct + "%",
                                borderRadius: 2,
                                background: ok ? "#A8D878" : AM,
                                transition: "width 0.4s",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
              <DDProgress counts={avgDayDDFromIds(plan)} />
              {plan.summary?.note && (
                <p
                  style={{
                    fontSize: 13,
                    opacity: 0.8,
                    marginTop: 12,
                    marginBottom: 0,
                  }}
                >
                  {plan.summary.note}
                </p>
              )}
            </div>

            {/* Tabs */}
            <div
              style={{
                display: "flex",
                borderBottom: `2px solid ${BD}`,
                marginBottom: 24,
                overflowX: "auto",
              }}
            >
              {[
                ["plan", "📅 Meal Plan"],
                ["recipes", "👨‍🍳 Recipes"],
                ["sauces", "🫙 Sauces"],
                ["shopping", "🛒 Shopping"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  style={{
                    padding: "10px 18px",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontFamily: ff,
                    fontSize: 14,
                    fontWeight: activeTab === id ? 700 : 500,
                    color: activeTab === id ? G : TX2,
                    borderBottom:
                      activeTab === id
                        ? `2px solid ${G}`
                        : "2px solid transparent",
                    marginBottom: -2,
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ── Meal Plan ── */}
            {activeTab === "plan" && (
              <div>
                {(plan.mealPlan || []).map((day) => {
                  const lunch = getRecipe(day.lunch?.recipeId),
                    dinner = getRecipe(day.dinner?.recipeId);
                  const snack = getSnack(day.snackId),
                    dessert = getDessert(day.dessertId);
                  return (
                    <div
                      key={day.day}
                      style={{
                        background: WH,
                        border: `1px solid ${BD}`,
                        borderRadius: 12,
                        marginBottom: 16,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          background: G,
                          color: WH,
                          padding: "10px 18px",
                        }}
                      >
                        <span
                          style={{
                            fontFamily: fh,
                            fontSize: 18,
                            fontWeight: 700,
                          }}
                        >
                          Day {day.day}
                        </span>
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                        }}
                      >
                        {[
                          ["🥗 Lunch", lunch],
                          ["🍽 Dinner", dinner],
                        ].map(([label, rec], ci) => (
                          <div
                            key={label}
                            style={{
                              padding: "14px 18px",
                              borderBottom: `1px solid ${BD}`,
                              borderRight:
                                ci === 0 ? `1px solid ${BD}` : "none",
                            }}
                          >
                            <div
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                color: TX2,
                                marginBottom: 4,
                              }}
                            >
                              {label}
                            </div>
                            {rec ? (
                              <>
                                <div
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 600,
                                    marginBottom: 3,
                                  }}
                                >
                                  {rec.emoji} {rec.name}
                                </div>
                                <div
                                  style={{
                                    fontSize: 12,
                                    color: TX2,
                                    fontStyle: "italic",
                                  }}
                                >
                                  {rec.serve}
                                </div>
                                <div
                                  style={{
                                    fontSize: 11,
                                    color: GA,
                                    fontWeight: 600,
                                    marginTop: 4,
                                  }}
                                >
                                  {calcRecipeNutr(rec).p}g protein ·{" "}
                                  {calcRecipeNutr(rec).k} kcal
                                </div>
                              </>
                            ) : (
                              <div style={{ fontSize: 13, color: TX2 }}>—</div>
                            )}
                          </div>
                        ))}
                        {[
                          ["🍎 Snack", snack],
                          ["🍫 Dessert", dessert],
                        ].map(([label, meal], ci) => (
                          <div
                            key={label}
                            style={{
                              padding: "14px 18px",
                              borderRight:
                                ci === 0 ? `1px solid ${BD}` : "none",
                            }}
                          >
                            <div
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                color: TX2,
                                marginBottom: 4,
                              }}
                            >
                              {label}
                            </div>
                            <div
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                marginBottom: 3,
                              }}
                            >
                              {meal?.name || "—"}
                            </div>
                            <div
                              style={{
                                fontSize: 12,
                                color: TX2,
                                fontStyle: "italic",
                              }}
                            >
                              {(meal?.items || []).map(renderItem).join(", ")}
                            </div>
                            <div
                              style={{
                                fontSize: 11,
                                color: GA,
                                fontWeight: 600,
                                marginTop: 4,
                              }}
                            >
                              {calcItemsNutr(meal?.items || []).p}g protein ·{" "}
                              {calcItemsNutr(meal?.items || []).k} kcal
                            </div>
                          </div>
                        ))}
                      </div>
                      {/* Per-day Daily Dozen */}
                      {(() => {
                        const counts = calcDayDDFromIds(
                          plan.recipes || [],
                          plan.snacks || [],
                          plan.desserts || [],
                          day,
                        );
                        const cats = Object.keys(counts);
                        if (!cats.length) return null;
                        return (
                          <div
                            style={{
                              padding: "10px 18px",
                              borderTop: `1px solid ${BD}`,
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 6,
                            }}
                          >
                            <span
                              style={{
                                fontSize: 10,
                                fontWeight: 700,
                                textTransform: "uppercase",
                                letterSpacing: "0.08em",
                                color: TX2,
                                marginRight: 4,
                                alignSelf: "center",
                              }}
                            >
                              Daily Dozen
                            </span>
                            {Object.entries(DD_TARGETS).map(([cat, target]) => {
                              const got = counts[cat] || 0;
                              const met = got >= target;
                              return (
                                <span
                                  key={cat}
                                  style={{
                                    fontSize: 11,
                                    padding: "2px 8px",
                                    borderRadius: 20,
                                    background: met ? "#EEF5E7" : "#F5F0E8",
                                    color: met ? G : "#A07840",
                                    fontWeight: met ? 600 : 400,
                                  }}
                                >
                                  {met ? "✓ " : ""}
                                  {cat.split(" ")[0]} {got}/{target}
                                </span>
                              );
                            })}
                          </div>
                        );
                      })()}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── Batch Cook Plan ── */}
            {activeTab === "recipes" && plan.batchCookPlan && (
              <div
                style={{
                  background: G,
                  color: WH,
                  borderRadius: 12,
                  marginBottom: 24,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "16px 20px",
                    borderBottom: "1px solid rgba(255,255,255,0.15)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ fontFamily: fh, fontSize: 18, fontWeight: 700 }}
                  >
                    🗓 Sunday Prep Plan
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.8 }}>
                    ⏱ {plan.batchCookPlan.totalActiveMinutes} min total active
                  </div>
                </div>
                {(plan.batchCookPlan.sharedPrepSteps || []).length > 0 && (
                  <div
                    style={{
                      padding: "12px 20px",
                      borderBottom: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        opacity: 0.7,
                        marginBottom: 8,
                      }}
                    >
                      🔪 Shared Prep — do these first
                    </div>
                    {plan.batchCookPlan.sharedPrepSteps.map((step, i) => (
                      <div
                        key={i}
                        style={{ fontSize: 13, padding: "4px 0", opacity: 0.9 }}
                      >
                        {str(step)}
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ padding: "12px 20px" }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      opacity: 0.7,
                      marginBottom: 8,
                    }}
                  >
                    ⏱ Cook Sequence
                  </div>
                  {(plan.batchCookPlan.sequence || []).map((step, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        gap: 12,
                        padding: "7px 0",
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: fh,
                          fontWeight: 700,
                          fontSize: 13,
                          minWidth: 40,
                          opacity: 0.85,
                        }}
                      >
                        {step.time}
                      </span>
                      <span
                        style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.4 }}
                      >
                        {str(step.action)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Recipes ── */}
            {activeTab === "recipes" &&
              (plan.recipes || []).map((recipe) => (
                <div
                  key={recipe.id}
                  style={{
                    background: WH,
                    border: `1px solid ${BD}`,
                    borderRadius: 12,
                    marginBottom: 20,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      padding: "18px 20px 14px",
                      background: GA,
                      color: WH,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 32 }}>{recipe.emoji}</div>
                      <div
                        style={{
                          fontFamily: fh,
                          fontSize: 20,
                          fontWeight: 700,
                          margin: "4px 0 2px",
                        }}
                      >
                        {recipe.name}
                      </div>
                      <div style={{ fontSize: 12, opacity: 0.8 }}>
                        {recipe.cuisine}
                      </div>
                    </div>
                    <div
                      style={{ textAlign: "right", fontSize: 12, opacity: 0.9 }}
                    >
                      <div
                        style={{
                          fontSize: 20,
                          fontFamily: fh,
                          fontWeight: 700,
                        }}
                      >
                        {calcRecipeNutr(recipe).p}g
                      </div>
                      <div>protein / serving</div>
                      <div
                        style={{
                          fontSize: 16,
                          fontFamily: fh,
                          fontWeight: 700,
                          marginTop: 6,
                        }}
                      >
                        {calcRecipeNutr(recipe).k}
                      </div>
                      <div>kcal / serving</div>
                      <div style={{ marginTop: 4, fontSize: 11 }}>
                        {recipe.servings} servings
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      flexWrap: "wrap",
                      padding: "12px 20px",
                      borderBottom: `1px solid ${BD}`,
                    }}
                  >
                    {[
                      `⏱ ${recipe.activeMinutes}min active`,
                      `🕐 ${recipe.totalMinutes}min total`,
                      `🔧 ${recipe.equipment}`,
                    ].map((m) => (
                      <span
                        key={m}
                        style={{
                          background: "#EEF5E7",
                          color: G,
                          borderRadius: 20,
                          padding: "4px 12px",
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {m}
                      </span>
                    ))}
                    {(() => {
                      const allCats = new Set(
                        (recipe.ingredients || []).flatMap((i) =>
                          getProductDD(i.id),
                        ),
                      );
                      return [...allCats].map((d) => (
                        <span
                          key={d}
                          style={{
                            background: "#FFF8E8",
                            color: "#7A5500",
                            borderRadius: 20,
                            padding: "4px 12px",
                            fontSize: 12,
                            fontWeight: 600,
                          }}
                        >
                          ✓ {d}
                        </span>
                      ));
                    })()}
                  </div>
                  {recipe.serve && (
                    <div
                      style={{
                        padding: "10px 20px",
                        background: "#F5FAF0",
                        borderBottom: `1px solid ${BD}`,
                        fontSize: 13,
                        color: GA,
                      }}
                    >
                      <strong>Always serve as:</strong> {recipe.serve}
                    </div>
                  )}
                  <div style={{ padding: "16px 20px" }}>
                    <div style={{ marginBottom: 16 }}>
                      <SectionLabel>Ingredients</SectionLabel>
                      {(recipe.ingredients || []).map((ing, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "6px 0",
                            borderBottom: "1px solid #F3EDE3",
                            fontSize: 13,
                          }}
                        >
                          <span>{str(ing.name || ing.item || ing)}</span>
                          <span
                            style={{
                              color: GA,
                              fontWeight: 600,
                              fontSize: 12,
                              marginLeft: 12,
                            }}
                          >
                            {str(ing.amount || "")}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginBottom: 16 }}>
                      <SectionLabel>Method</SectionLabel>
                      {(recipe.steps || []).map((step, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            gap: 12,
                            padding: "8px 0",
                            borderBottom: "1px solid #F3EDE3",
                            fontSize: 13,
                          }}
                        >
                          <span
                            style={{
                              width: 22,
                              height: 22,
                              minWidth: 22,
                              borderRadius: "50%",
                              background: G,
                              color: WH,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 11,
                              fontWeight: 700,
                            }}
                          >
                            {step.n || i + 1}
                          </span>
                          <span style={{ lineHeight: 1.5 }}>
                            {str(step.text || step)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

            {/* ── Sauces ── */}
            {activeTab === "sauces" && (
              <div>
                <p style={{ color: TX2, fontSize: 13, marginBottom: 20 }}>
                  Two weekly sauces — food processor, prep once, use all week.
                </p>
                {(plan.sauces || []).map((sauce) => (
                  <div
                    key={sauce.id}
                    style={{
                      background: WH,
                      border: `1px solid ${BD}`,
                      borderRadius: 12,
                      marginBottom: 20,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "16px 20px",
                        background: "#7A5500",
                        color: WH,
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                      }}
                    >
                      <span style={{ fontSize: 30 }}>{sauce.emoji}</span>
                      <div>
                        <div
                          style={{
                            fontFamily: fh,
                            fontSize: 18,
                            fontWeight: 700,
                          }}
                        >
                          {sauce.name}
                        </div>
                        <div
                          style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}
                        >
                          {sauce.description}
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: "16px 20px" }}>
                      <div style={{ marginBottom: 14 }}>
                        <SectionLabel>Ingredients</SectionLabel>
                        <div
                          style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
                        >
                          {(sauce.ingredients || []).map((ing, i) => (
                            <span
                              key={i}
                              style={{
                                background: "#F5FAF0",
                                color: G,
                                borderRadius: 6,
                                padding: "4px 10px",
                                fontSize: 12,
                                border: `1px solid ${BD}`,
                              }}
                            >
                              {str(ing.name || ing)}{ing.amount ? ` — ${ing.amount}` : ""}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div style={{ marginBottom: 14 }}>
                        <SectionLabel>Method</SectionLabel>
                        {(sauce.steps || []).map((step, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              gap: 12,
                              padding: "6px 0",
                              borderBottom: "1px solid #F3EDE3",
                              fontSize: 13,
                            }}
                          >
                            <span
                              style={{
                                width: 20,
                                height: 20,
                                minWidth: 20,
                                borderRadius: "50%",
                                background: "#7A5500",
                                color: WH,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 10,
                                fontWeight: 700,
                              }}
                            >
                              {i + 1}
                            </span>
                            <span style={{ lineHeight: 1.5 }}>{str(step)}</span>
                          </div>
                        ))}
                      </div>
                      {sauce.stores && (
                        <div
                          style={{
                            background: "#FFF8E8",
                            border: "1px solid #F0D080",
                            borderRadius: 8,
                            padding: "8px 12px",
                            fontSize: 12,
                            color: "#7A5500",
                          }}
                        >
                          🫙 {sauce.stores}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Shopping List ── */}
            {activeTab === "shopping" && (
              <div>
                <div
                  style={{
                    background: G,
                    color: WH,
                    borderRadius: 12,
                    padding: "16px 20px",
                    marginBottom: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 12,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 12, opacity: 0.75 }}>
                      Estimated total
                    </div>
                    <div
                      style={{ fontFamily: fh, fontSize: 28, fontWeight: 700 }}
                    >
                      {pricesFound > 0 ? `£${shopTotal()}` : "—"}
                    </div>
                    {pricesFound === 0 && (
                      <div style={{ fontSize: 11, opacity: 0.7 }}>
                        Fetch prices to see total
                      </div>
                    )}
                  </div>
                  <div
                    style={{ fontSize: 12, opacity: 0.75, textAlign: "right" }}
                  >
                    <div>
                      {
                        buildFilteredShoppingList().filter(
                          (i) => !owned.has(i.product) && !userPantry.has(i.id),
                        ).length
                      }{" "}
                      items to buy
                    </div>
                    {owned.size > 0 && (
                      <div style={{ marginTop: 4, color: "#A8D878" }}>
                        ✓ {owned.size} already at home
                      </div>
                    )}
                    {userPantry.size > 0 && (
                      <div style={{ marginTop: 4, color: "#A8D878" }}>
                        🫙 {userPantry.size} in pantry (£{pantryTotal()}{" "}
                        excluded)
                      </div>
                    )}
                  </div>
                </div>
                <p style={{ color: TX2, fontSize: 13, marginBottom: 20 }}>
                  Tick items you already have — deducted from total.
                </p>

                {/* Match stats */}
                {plan.ingredientMatchStats && (
                  <div
                    style={{
                      fontSize: 12,
                      color: TX2,
                      marginBottom: 12,
                      padding: "6px 10px",
                      background: "#F5FAF0",
                      borderRadius: 6,
                      border: `1px solid ${BD}`,
                      display: "flex",
                      gap: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <span>
                      ✓ <strong>{plan.ingredientMatchStats.matched}</strong> of{" "}
                      <strong>{plan.ingredientMatchStats.total}</strong> matched
                      to ASDA products
                    </span>
                    {plan.ingredientMatchStats.pantry > 0 && (
                      <span>
                        🧂 <strong>{plan.ingredientMatchStats.pantry}</strong>{" "}
                        pantry
                      </span>
                    )}
                    {(plan.unmatchedIngredients || []).length > 0 && (
                      <span style={{ color: "#A05000" }}>
                        ⚠ <strong>{plan.unmatchedIngredients.length}</strong>{" "}
                        unmatched
                      </span>
                    )}
                  </div>
                )}

                {/* Unmatched ingredients warning */}
                {(plan.unmatchedIngredients || []).length > 0 && (
                  <div
                    style={{
                      background: "#FFF8F0",
                      border: "1px solid #F0C080",
                      borderRadius: 8,
                      padding: "12px 16px",
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 13,
                        color: "#A05000",
                        marginBottom: 8,
                      }}
                    >
                      ⚠ {plan.unmatchedIngredients.length} ingredient
                      {plan.unmatchedIngredients.length > 1 ? "s" : ""} could
                      not be matched — check these manually
                    </div>
                    {plan.unmatchedIngredients.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: 12,
                          padding: "5px 0",
                          borderBottom: "1px solid #F5DFB0",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 8,
                        }}
                      >
                        <span style={{ fontWeight: 600, color: "#7A3800" }}>
                          {item.name || "(no name)"}
                        </span>
                        <span
                          style={{
                            color: "#A05000",
                            fontSize: 11,
                            textAlign: "right",
                            flexShrink: 0,
                          }}
                        >
                          {item.reason}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {/* Include/exclude recipes, snacks, desserts */}
                {plan && (
                  <div
                    style={{
                      background: WH,
                      border: `1px solid ${BD}`,
                      borderRadius: 8,
                      padding: "12px 16px",
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: TX2,
                        marginBottom: 10,
                      }}
                    >
                      Include in shopping list
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      {[
                        ...(plan.recipes || []).map((r) => ({
                          id: r.id,
                          label: `🍳 ${r.name}`,
                          sub: "Recipe",
                        })),
                        ...(plan.snacks || []).map((s) => ({
                          id: s.id,
                          label: `🍎 ${s.name}`,
                          sub: "Snack",
                        })),
                        ...(plan.desserts || []).map((d) => ({
                          id: d.id,
                          label: `🍫 ${d.name}`,
                          sub: "Dessert",
                        })),
                      ].map(({ id, label, sub }) => {
                        const checked = includedItems.has(id);
                        return (
                          <label
                            key={id}
                            onClick={() => toggleIncluded(id)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              cursor: "pointer",
                              padding: "5px 4px",
                              borderRadius: 6,
                              background: checked ? "#F5FAF0" : "transparent",
                            }}
                          >
                            <div
                              style={{
                                width: 18,
                                height: 18,
                                minWidth: 18,
                                borderRadius: 4,
                                border: `2px solid ${checked ? G : BD}`,
                                background: checked ? G : WH,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                transition: "all 0.15s",
                              }}
                            >
                              {checked && (
                                <span style={{ color: WH, fontSize: 11 }}>
                                  ✓
                                </span>
                              )}
                            </div>
                            <span
                              style={{
                                fontSize: 13,
                                fontWeight: checked ? 600 : 400,
                                color: checked ? TX : TX2,
                              }}
                            >
                              {label}
                            </span>
                            <span
                              style={{
                                fontSize: 11,
                                color: TX2,
                                marginLeft: "auto",
                              }}
                            >
                              {sub}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Pantry items */}
                {(plan.pantryIngredients || []).length > 0 && (
                  <div
                    style={{
                      background: "#F5F5F5",
                      border: `1px solid ${BD}`,
                      borderRadius: 8,
                      padding: "10px 16px",
                      marginBottom: 20,
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: 12,
                        color: TX2,
                        marginBottom: 6,
                      }}
                    >
                      🧂 Pantry items — not on shopping list, you should already
                      have these
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {plan.pantryIngredients.map((item, i) => (
                        <span
                          key={i}
                          style={{
                            background: WH,
                            border: `1px solid ${BD}`,
                            borderRadius: 20,
                            padding: "3px 10px",
                            fontSize: 12,
                            color: TX2,
                          }}
                        >
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {Object.entries(groupedShop()).map(([cat, items]) => (
                  <div key={cat} style={{ marginBottom: 24 }}>
                    <div
                      style={{
                        fontFamily: fh,
                        fontSize: 16,
                        fontWeight: 700,
                        color: G,
                        borderBottom: `2px solid ${G}`,
                        paddingBottom: 6,
                        marginBottom: 12,
                      }}
                    >
                      {cat}
                    </div>
                    {items.map((item, i) => {
                      const have = owned.has(item.product);
                      const isPantry = userPantry.has(item.id);
                      const price = prices[item.product];
                      const rowBg = isPantry
                        ? "#F0EDE8"
                        : have
                          ? "#F5FAF0"
                          : "transparent";
                      const rowOp = have || isPantry ? 0.5 : 1;
                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "10px 8px",
                            borderBottom: "1px solid #F3EDE3",
                            fontSize: 13,
                            borderRadius: 6,
                            background: rowBg,
                            opacity: rowOp,
                            transition: "all 0.15s",
                          }}
                        >
                          <div
                            onClick={() => toggleOwned(item.product)}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 10,
                              minWidth: 0,
                              flex: 1,
                              cursor: "pointer",
                            }}
                          >
                            <div
                              style={{
                                width: 18,
                                height: 18,
                                minWidth: 18,
                                borderRadius: 4,
                                border: `2px solid ${have ? G : BD}`,
                                background: have ? G : WH,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                                transition: "all 0.15s",
                              }}
                            >
                              {have && (
                                <span style={{ color: WH, fontSize: 11 }}>
                                  ✓
                                </span>
                              )}
                            </div>
                            <span
                              style={{
                                textDecoration: have
                                  ? "line-through"
                                  : isPantry
                                    ? "line-through"
                                    : "none",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {item.product}
                            </span>
                            <span
                              style={{
                                color: TX2,
                                fontSize: 11,
                                flexShrink: 0,
                              }}
                            >
                              {item.qty}
                            </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                              flexShrink: 0,
                              marginLeft: 8,
                            }}
                          >
                            <span
                              style={{
                                color: price
                                  ? have || isPantry
                                    ? TX2
                                    : GA
                                  : TX2,
                                fontWeight: price ? 600 : 400,
                                fontSize: 13,
                              }}
                            >
                              {price ||
                                (pricesFound > 0 ? "—" : "fetch prices")}
                            </span>
                            <button
                              onClick={() => togglePantry(item.id)}
                              title={
                                isPantry
                                  ? "Remove from pantry"
                                  : "Mark as pantry item (always in stock)"
                              }
                              style={{
                                background: isPantry
                                  ? "#C8A96E"
                                  : "rgba(0,0,0,0.06)",
                                border: "none",
                                borderRadius: 6,
                                padding: "3px 7px",
                                cursor: "pointer",
                                fontSize: 13,
                                lineHeight: 1,
                                transition: "background 0.15s",
                              }}
                            >
                              🫙
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
