export type Category = {
  slug: string;
  title: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  unit?: string;
  categorySlug: string;
  image: string;
  description?: string;
  available?: boolean;
};

import catFruits from "@/assets/categories/fruits.jpg";
import catVegetables from "@/assets/categories/vegetables.jpg";
import catDairy from "@/assets/categories/dairy.jpg";
import catBakery from "@/assets/categories/bakery.jpg";
import catMeat from "@/assets/categories/meat.jpg";
import catPantry from "@/assets/categories/pantry.jpg";

export const categories: Category[] = [
  { slug: "fruits", title: "Fruits", image: catFruits },
  { slug: "vegetables", title: "Vegetables", image: catVegetables },
  { slug: "dairy", title: "Dairy & Eggs", image: catDairy },
  { slug: "bakery", title: "Bakery", image: catBakery },
  { slug: "meat", title: "Meat & Poultry", image: catMeat },
  { slug: "pantry", title: "Pantry", image: catPantry },
];

import pBananas from "@/assets/products/bananas.jpg";
import pAvocado from "@/assets/products/avocado.jpg";
import pApples from "@/assets/products/apples.jpg";
import pOranges from "@/assets/products/oranges.jpg";
import pMangoes from "@/assets/products/mangoes.jpg";
import pPineapple from "@/assets/products/pineapple.jpg";
import pStrawberries from "@/assets/products/strawberries.jpg";
import pGrapes from "@/assets/products/grapes.jpg";
import pSpinach from "@/assets/products/spinach.jpg";
import pMilk from "@/assets/products/milk.jpg";
import pSourdough from "@/assets/products/sourdough.jpg";
import pEggs from "@/assets/products/eggs.jpg";
import pChicken from "@/assets/products/chicken.jpg";
import pOliveOil from "@/assets/products/olive-oil.jpg";

export const products: Product[] = [
  // Fruits
  { id: "p1", name: "Bananas (Ripe)", price: 2000, unit: "/kg", categorySlug: "fruits", image: pBananas, description: "Sweet, ripe bananas perfect for snacking and smoothies." },
  { id: "p2", name: "Avocado (Hass)", price: 1500, unit: "each", categorySlug: "fruits", image: pAvocado, description: "Creamy Hass avocado, great for salads and toast." },
  { id: "p9", name: "Apples (Mixed)", price: 3000, unit: "/kg", categorySlug: "fruits", image: pApples, description: "Fresh crisp apples, red and green varieties." },
  { id: "p10", name: "Oranges (Sweet)", price: 2500, unit: "/kg", categorySlug: "fruits", image: pOranges, description: "Juicy sweet oranges, perfect for fresh juice." },
  { id: "p11", name: "Mangoes (Tropical)", price: 4000, unit: "/kg", categorySlug: "fruits", image: pMangoes, description: "Sweet tropical mangoes, rich in vitamins." },
  { id: "p12", name: "Pineapple (Fresh)", price: 5000, unit: "each", categorySlug: "fruits", image: pPineapple, description: "Fresh golden pineapple, sweet and tangy." },
  { id: "p13", name: "Strawberries (Premium)", price: 6000, unit: "/kg", categorySlug: "fruits", image: pStrawberries, description: "Premium fresh strawberries, perfect for desserts." },
  { id: "p14", name: "Grapes (Seedless)", price: 5500, unit: "/kg", categorySlug: "fruits", image: pGrapes, description: "Sweet seedless grapes, purple and green varieties." },
  { id: "p15", name: "Kiwi (Fresh)", price: 7000, unit: "/kg", categorySlug: "fruits", image: pApples, description: "Tangy and sweet kiwi fruits, packed with vitamin C." },
  { id: "p16", name: "Pears (Juicy)", price: 3500, unit: "/kg", categorySlug: "fruits", image: pApples, description: "Sweet and juicy pears, perfect for eating fresh." },
  { id: "p17", name: "Watermelon (Large)", price: 3000, unit: "each", categorySlug: "fruits", image: pPineapple, description: "Large, sweet watermelon, refreshing and hydrating." },
  { id: "p18", name: "Blueberries (Organic)", price: 8000, unit: "/kg", categorySlug: "fruits", image: pStrawberries, description: "Organic blueberries, antioxidant-rich and delicious." },
  { id: "p19", name: "Lemons (Fresh)", price: 2000, unit: "/kg", categorySlug: "fruits", image: pOranges, description: "Fresh lemons, perfect for cooking and drinks." },
  { id: "p20", name: "Cherries (Sweet)", price: 9000, unit: "/kg", categorySlug: "fruits", image: pStrawberries, description: "Sweet and juicy cherries, great for snacking." },

  // Vegetables
  { id: "p3", name: "Spinach Bunch", price: 1000, unit: "bunch", categorySlug: "vegetables", image: pSpinach, description: "Fresh spinach, rich in iron and vitamins." },
  { id: "p21", name: "Tomatoes (Vine)", price: 2500, unit: "/kg", categorySlug: "vegetables", image: pSpinach, description: "Vine-ripened tomatoes, juicy and flavorful." },
  { id: "p22", name: "Carrots (Organic)", price: 2000, unit: "/kg", categorySlug: "vegetables", image: pSpinach, description: "Organic carrots, crunchy and sweet." },
  { id: "p23", name: "Broccoli (Fresh)", price: 3500, unit: "/kg", categorySlug: "vegetables", image: pSpinach, description: "Fresh broccoli florets, nutrient-dense." },
  { id: "p24", name: "Bell Peppers (Mixed)", price: 4000, unit: "/kg", categorySlug: "vegetables", image: pSpinach, description: "Colorful bell peppers, sweet and crunchy." },
  { id: "p25", name: "Cucumbers (English)", price: 1500, unit: "/kg", categorySlug: "vegetables", image: pSpinach, description: "English cucumbers, seedless and crisp." },
  { id: "p26", name: "Lettuce (Romaine)", price: 1200, unit: "head", categorySlug: "vegetables", image: pSpinach, description: "Crisp romaine lettuce, perfect for salads." },
  { id: "p27", name: "Zucchini (Green)", price: 3000, unit: "/kg", categorySlug: "vegetables", image: pSpinach, description: "Fresh green zucchini, versatile in cooking." },
  { id: "p28", name: "Eggplant (Purple)", price: 3500, unit: "/kg", categorySlug: "vegetables", image: pSpinach, description: "Purple eggplant, great for grilling and roasting." },
  { id: "p29", name: "Potatoes (Russet)", price: 2000, unit: "/kg", categorySlug: "vegetables", image: pSpinach, description: "Russet potatoes, ideal for baking and mashing." },
  { id: "p30", name: "Onions (Yellow)", price: 1500, unit: "/kg", categorySlug: "vegetables", image: pSpinach, description: "Yellow onions, essential for cooking." },
  { id: "p31", name: "Garlic (Fresh)", price: 4000, unit: "/kg", categorySlug: "vegetables", image: pSpinach, description: "Fresh garlic bulbs, aromatic and flavorful." },

  // Dairy & Eggs
  { id: "p4", name: "Milk (1L)", price: 1000, unit: "1L", categorySlug: "dairy", image: pMilk, description: "Fresh whole milk from local farms." },
  { id: "p6", name: "Free-range Eggs (12)", price: 2500, unit: "tray", categorySlug: "dairy", image: pEggs, description: "Dozen free-range eggs, rich and flavorful." },
  { id: "p32", name: "Cheddar Cheese (Block)", price: 6000, unit: "500g", categorySlug: "dairy", image: pMilk, description: "Sharp cheddar cheese, perfect for sandwiches." },
  { id: "p33", name: "Greek Yogurt (Plain)", price: 3000, unit: "500g", categorySlug: "dairy", image: pMilk, description: "Thick Greek yogurt, high in protein." },
  { id: "p34", name: "Butter (Unsalted)", price: 4000, unit: "250g", categorySlug: "dairy", image: pMilk, description: "Unsalted butter, creamy and fresh." },
  { id: "p35", name: "Cream Cheese", price: 3500, unit: "200g", categorySlug: "dairy", image: pMilk, description: "Smooth cream cheese, great for spreads." },
  { id: "p36", name: "Sour Cream", price: 2500, unit: "250g", categorySlug: "dairy", image: pMilk, description: "Tangy sour cream, perfect for dips." },
  { id: "p37", name: "Parmesan Cheese", price: 7000, unit: "200g", categorySlug: "dairy", image: pMilk, description: "Grated parmesan, nutty and flavorful." },

  // Bakery
  { id: "p5", name: "Sourdough Bread", price: 3000, unit: "loaf", categorySlug: "bakery", image: pSourdough, description: "Artisanal sourdough with a crisp crust and tender crumb." },
  { id: "p38", name: "Whole Wheat Bread", price: 2500, unit: "loaf", categorySlug: "bakery", image: pSourdough, description: "Healthy whole wheat bread, nutritious and tasty." },
  { id: "p39", name: "Croissants (Butter)", price: 4000, unit: "pack of 4", categorySlug: "bakery", image: pSourdough, description: "Flaky butter croissants, perfect for breakfast." },
  { id: "p40", name: "Bagels (Assorted)", price: 4500, unit: "pack of 6", categorySlug: "bakery", image: pSourdough, description: "Assorted bagels, chewy and delicious." },
  { id: "p41", name: "Chocolate Chip Cookies", price: 5000, unit: "pack of 12", categorySlug: "bakery", image: pSourdough, description: "Homemade chocolate chip cookies, soft and chewy." },
  { id: "p42", name: "Blueberry Muffins", price: 5500, unit: "pack of 6", categorySlug: "bakery", image: pSourdough, description: "Moist blueberry muffins, bursting with flavor." },
  { id: "p43", name: "Baguette (French)", price: 2000, unit: "loaf", categorySlug: "bakery", image: pSourdough, description: "Traditional French baguette, crusty and light." },
  { id: "p44", name: "Cinnamon Rolls", price: 4500, unit: "pack of 4", categorySlug: "bakery", image: pSourdough, description: "Sweet cinnamon rolls with cream cheese frosting." },

  // Meat & Poultry
  { id: "p7", name: "Chicken Breast", price: 4500, unit: "/kg", categorySlug: "meat", image: pChicken, description: "Lean chicken breast, skinless & boneless." },
  { id: "p45", name: "Ground Beef (80/20)", price: 5500, unit: "/kg", categorySlug: "meat", image: pChicken, description: "Ground beef, perfect for burgers and meatballs." },
  { id: "p46", name: "Salmon Fillets", price: 12000, unit: "/kg", categorySlug: "meat", image: pChicken, description: "Fresh salmon fillets, rich in omega-3." },
  { id: "p47", name: "Pork Chops", price: 6000, unit: "/kg", categorySlug: "meat", image: pChicken, description: "Juicy pork chops, tender and flavorful." },
  { id: "p48", name: "Turkey Breast", price: 7000, unit: "/kg", categorySlug: "meat", image: pChicken, description: "Lean turkey breast, great for roasting." },
  { id: "p49", name: "Lamb Chops", price: 13000, unit: "/kg", categorySlug: "meat", image: pChicken, description: "Tender lamb chops, full of flavor." },
  { id: "p50", name: "Bacon (Thick Cut)", price: 8000, unit: "/kg", categorySlug: "meat", image: pChicken, description: "Thick cut bacon, crispy and delicious." },
  { id: "p51", name: "Sausages (Italian)", price: 5000, unit: "/kg", categorySlug: "meat", image: pChicken, description: "Italian sausages, seasoned and juicy." },

  // Pantry
  { id: "p8", name: "Olive Oil (500ml)", price: 6000, unit: "bottle", categorySlug: "pantry", image: pOliveOil, description: "Extra virgin olive oil, cold-pressed." },
  { id: "p52", name: "Basmati Rice (1kg)", price: 3000, unit: "bag", categorySlug: "pantry", image: pOliveOil, description: "Long grain basmati rice, fluffy and aromatic." },
  { id: "p53", name: "Pasta (Spaghetti)", price: 2000, unit: "500g", categorySlug: "pantry", image: pOliveOil, description: "Classic spaghetti pasta, al dente perfection." },
  { id: "p54", name: "Black Beans (Canned)", price: 1500, unit: "can", categorySlug: "pantry", image: pOliveOil, description: "Canned black beans, ready to use." },
  { id: "p55", name: "Tomato Sauce", price: 2500, unit: "jar", categorySlug: "pantry", image: pOliveOil, description: "Rich tomato sauce, perfect for pasta." },
  { id: "p56", name: "Honey (Raw)", price: 6500, unit: "500g", categorySlug: "pantry", image: pOliveOil, description: "Raw honey, natural and sweet." },
  { id: "p57", name: "Soy Sauce", price: 3000, unit: "bottle", categorySlug: "pantry", image: pOliveOil, description: "Traditional soy sauce, savory and versatile." },
  { id: "p58", name: "Coconut Milk", price: 3500, unit: "can", categorySlug: "pantry", image: pOliveOil, description: "Creamy coconut milk, for curries and desserts." },
  { id: "p59", name: "Quinoa (Organic)", price: 7000, unit: "500g", categorySlug: "pantry", image: pOliveOil, description: "Organic quinoa, protein-rich and nutritious." },
  { id: "p60", name: "Vanilla Extract", price: 5000, unit: "bottle", categorySlug: "pantry", image: pOliveOil, description: "Pure vanilla extract, essential for baking." },

];
