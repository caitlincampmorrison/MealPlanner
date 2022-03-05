const { db, Recipe} = require("../server/db/");

const recipe_name = ['Quiche', 'Hashbrown Casserole', 'Stuffed Bell Peppers', 'Sausage and Peppers', 'Pulled Pork', 'Kalbi Short Ribs', 'Chicken Adobo', 'Poppy Seed Chicken', 'Eggplant Parmesan', 'Peach Cobbler']
const ingredients = [
  '3 eggs/mayonnaise/flour/milk/breakfast sausage/shredded cheese/pie crust',
  'hashbrowns/cream of mushroom soup/shredded cheddar cheese/sour cream/onion/butter',
  'rice/ground beef/rotel/bell peppers/marinara/shredded cheddar cheese',
  'Italian sausage/onion/garlic/mini sweet peppers/potatoes/marinara/rolls',
  'pork butt/buns/fried onions/sliced pickles/chicken stock/paprika/brown sugar/ground mustard/cumin/BBQ sauce/apple cider vinegar/Worcestershire/hot sauce/liquid smoke',
  'short ribs/soy sauce/dark brown sugar/rice wine/pear/onion/garlic/ginger',
  'chicken thighs and wings/rice/soy sauce/water/apple cider vinegar/bay leaves/garlic/ginger',
  'chicken breasts/sour cream/cream of mushroom soup/Ritz crackers/poppy seeds/butter',
  'eggplant/mozzarella/shredded parmesan/marinara',
  'canned peaches/flour/sugar/baking powder/milk/butter/cinnamon'
 
]
const instructions = [
  'Pre-heat oven to 350/Brown sausage in pan/Beat together 3 eggs/Mix ingredient together and pour in pie crust/Top with cheese/Bake for 40-45 minutes/Enjoy!',
  'Pre-heat oven to 350/Mix together ingredients and spread evenly in baking dish/Bake for 45 minutes/Enjoy!',
  'Pre-heat oven to 375/Prepare rice/Brown ground beef/Mix rotel cheese rice and beef/Stuff peppers with mixture/Bake for 20-30 minutes/Top with hot marinara/Enjoy!',
  'Pre-heat oven to 450/Cut potatoes into cubes/Cut peppers into strips/Place potatoes peppers and sausage in baking dish/cover and bake for 30 minutes/Uncover and bake an additional 15 minutes at 350/Serve on a roll and top with hot marinara/Enjoy!',
  'Combine onion powder garlic powder paprika brown sugar ground mustard salt pepper and cumin/Cut pork into 4 inch cubes and coat with spice mix/Brown pork cubes over high heat/Deglaze pan with chicken stock/Combine pork stock BBQ sauce apple cider vinegar Worcestershire hot sauce and liquid smoke to one pot/Pressure cook on high for 50 minutes/Serve on a bun with fried onions and pickles/Enjoy!',
  'Combine all ingredients and allow to marinate overnight/Grill short ribs to desired doneness/Reduce remaining sauce and use to top the short ribs/Enjoy!',
  'Prepare rice/Combine all other ingredients and cook in large wok or pan/Stir occasionally until chicken reaches internal temperature of 145/Serve with rice/Enjoy!',
  'Pre-heat oven to 350/Cube and cook chicken/Place cooked chicken in a baking dish/Mix together cream of mushroom soup and sour cream and spread over top of chicken/Crush Ritz crackers and combine with poppy seeds and butter and top the dish/Bake for 30 minutes/Enjoy!',
  'Pre-heat oven to 450/Slice eggplant into 1 inch disks/Bake for 12 to 15 minutes/Reduce oven to 350 and allow eggplant to cool/Layer eggplant marinara and the cheeses in a baking dish/Bake for 20 minutes/Enjoy!',
  'Pre-heat oven to 350/Combine flour sugar baking powder milk and butter and pour into baking pan/Mix peaches with sugar and cinnamon and use to top batter/Bake for 45-60 minutes/Serve with vanilla ice cream/Enjoy!'
 
]
const time = [50, 55, 40, 55, 80, 20, 40, 45, 40, 60]
const servings = [4, 8, 4, 6, 8, 6, 6, 6, 6, 8]
const cuisine = ['breakfast', 'breakfast', 'italian', 'italian', 'BBQ', 'korean', 'filipino', 'american', 'italian', 'dessert']
const picture = ['https://i.postimg.cc/8C3VLHNW/quiche.jpg', 'https://i.postimg.cc/gJCmbK7d/hashbrown-casserole-17-754.jpg', 'https://i.postimg.cc/zX18d0WF/stuffed-bellies.jpg', 'https://i.postimg.cc/QN7jkRBM/snassy-peps.jpg','https://i.postimg.cc/SxSq4RgX/Best-Pulled-Pork.jpg', 'https://i.postimg.cc/Sxg4x4Pg/kalbi.jpg', 'https://i.postimg.cc/Ls0mNSBJ/adobo.jpg', 'https://i.postimg.cc/RVQ92KL5/poppy-seed-chicken-inside-a.jpg', 'https://i.postimg.cc/XvXbZhS4/Eggplant-Parm-Feat-Image.jpg', 'https://i.postimg.cc/PJ1hXwGD/peach-cobbler-recipe-7.jpg']
const link =['https://www.melissassouthernstylekitchen.com/easy-sausage-quiche/','https://www.shugarysweets.com/cheesy-hashbrown-casserole/','https://www.foodnetwork.com/recipes/ree-drummond/stuffed-bell-peppers-3325315', 'https://www.foodnetwork.com/recipes/giada-de-laurentiis/sausage-peppers-and-onions-recipe-1916837','https://tastesbetterfromscratch.com/pulled-pork/','https://www.foodnetwork.com/recipes/kalbi-korean-barbequed-beef-short-ribs-recipe-1953236','https://www.recipetineats.com/filipino-chicken-adobo-flavour-kapow/','https://www.the-girl-who-ate-everything.com/poppy-seed-chicken/','https://www.foodnetwork.com/recipes/alexandra-guarnaschelli/eggplant-parmigiana-recipe-2012703', 'https://joyfoodsunshine.com/peach-cobbler/']
const rating = [4, 5, 3, 4, 5, 5, 5, 3, 4, 5]

const seed = async () => {
    try {
      await db.sync({ force: true });
      const [Chicken, Tofu, Pizza, Pasta] = await Promise.all(
        recipe_name.map((name, idx) => 
           Recipe.create({ name, 
            ingredients: ingredients[idx],
            instructions: instructions[idx],
            time: time[idx], 
            servings: servings[idx], 
            cuisine: cuisine[idx],
            link: link[idx],
            picture: picture[idx],
            rating: rating[idx]
          }),
        )
      )
      db.close();
      console.log(`Seeding successful!`);   
    } catch (err) {
      db.close();
      console.log(` Error seeding: ${err.message} ${err.stack}`);
    }
  };
  
  seed();
  //module.exports = seed