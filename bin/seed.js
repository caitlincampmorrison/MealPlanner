const { db, Recipe} = require("../server/db/");

const recipe_name = ['Chicken Rice', 'Tofu Rice', 'Pizza', 'Pasta']
const ingredients = [
  'chicken/rice/soy sauce',
  'tofu/rice/soy sauce',
  'pizza dough/sauce /cheese',
  'sauce/pasta/cheese'
]
const instructions = [
  'GFG/GFGF/ERER',
  'GFGF/GFGF/ERER',
  'GFGF/GFGF/ERER',
  'GFGF/GFGF/ERER',
  'GFGF/GFGF/ERER',
]
const time = [20, 30, 30, 10]
const servings = [2, 4, 2, 2]
const cuisine = ['asian', 'asian', 'italian', 'italian']
const picture = ['https://i.postimg.cc/25Fk9svw/eaters-collective-12e-HC6-Fx-Pyg-unsplash.jpg','https://i.postimg.cc/25Fk9svw/eaters-collective-12e-HC6-Fx-Pyg-unsplash.jpg','https://i.postimg.cc/25Fk9svw/eaters-collective-12e-HC6-Fx-Pyg-unsplash.jpg','https://i.postimg.cc/25Fk9svw/eaters-collective-12e-HC6-Fx-Pyg-unsplash.jpg']
const link =['www.r.com', 'ww.r.com', 'ww.r.com', 'www.r.com']
const rating = [2, 4, 5, 3]

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