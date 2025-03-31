
const dotenv = require("dotenv"); 
dotenv.config(); 
const express = require("express");
const app = express();
const mongoose = require("mongoose"); 
const methodOverride = require("method-override"); 
const morgan = require("morgan"); 
const path = require("path");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); // new
app.use(morgan("dev")); //new
app.use(express.static(path.join(__dirname, "public")));

const {Memory, Result} = require("./models/memory.js"); // needed to destruct the object back into two

function shuffle(array) {
    let shuffledArray = [];
    while(array.length > 0) {
        let randomIndex = Math.floor(Math.random() * array.length);
        let card = array.splice(randomIndex, 1) [0]; //takes just one at index and leave[0]
        shuffledArray.push(card);
    }
    return shuffledArray;
}
app.get('/difficulty', async (req,res) => {
    res.render('memory/difficulty.ejs')
});
app.get('/scores', async (req,res) => {
    res.render('memory/scores-index.ejs')
});
app.get('/scores/:difficulty', async (req,res) => {
    const scoreCards = await Result.find({difficulty: req.params.difficulty});
    const difficulty = req.params.difficulty
    console.log(scoreCards)
    res.render('memory/show.ejs', {score: scoreCards, difficulty: difficulty})
});
app.get('/add/:emojiID', async (req,res) => {
    const findEmoji = await Memory.findById(req.params.emojiID)
    res.render('memory/delete.ejs', {emoji: findEmoji})
})
app.get('/', async (req,res) => {
    res.render('index.ejs');
})
app.get('/add', async (req,res) => {
    const emojis = await Memory.find();
    res.render('memory/add-memory.ejs', {emojis: emojis})
})

app.get('/easy', async (req, res) => {
        const cards = await Memory.find({category: 'Shapes'});
        const shuffledCards = shuffle(cards);
        const threeCards = shuffledCards.slice(0, 3); //only makes it 4
        const sixCards = shuffledCards.slice(0, 6);
        let card3Values = [];
        let card6Values = []
        for (let i = 0; i < threeCards .length; i++) {
            card3Values.push(threeCards[i].value);
        }
        for (let i = 0; i < sixCards.length; i++) {
            card6Values.push(sixCards[i].value);
        }
        const sixShuffled = shuffle(card6Values)
        console.log(card3Values);
        console.log(sixShuffled);
        res.render('memory/easy.ejs', {card: card3Values, cardTest: sixShuffled});
});
app.get('/medium', async (req,res) => {
    const cards = await Memory.find({category: {$in: ['People', 'Objects']}});//$in selects all documents in the Memory collection where the value of the category field is either People or Objects.
    const shuffledCards = shuffle(cards);
    const fiveCards = shuffledCards.slice(0, 5);
    const tenCards = shuffledCards.slice(0, 10)
    const card5Values = []
    const card10Values = []
    for (i = 0; i < fiveCards.length; i++) {
        card5Values.push(fiveCards[i].value);
    }
    for (i = 0; i < tenCards.length; i++) {
        card10Values.push(tenCards[i].value);
    }
    const tenShuffled = shuffle(card10Values);
    res.render('memory/medium.ejs', {card: card5Values, cardTest: tenShuffled})
})
app.get('/hard', async (req,res) => {
    const cards = await Memory.find();
    const shuffledCards = shuffle(cards);
    const fiveCards = shuffledCards.slice(0, 5);
    const tenCards = shuffledCards.slice(0, 10)
    const tenShuffled = shuffle(tenCards);
    let card5Values = []
    let card10Values = []
    for (let i = 0; i < fiveCards.length; i++) {
        card5Values.push(fiveCards[i].value)
    }
    for (let i = 0; i < tenShuffled.length; i++) {
        card10Values.push(tenShuffled[i].value)
    }
    console.log(card5Values)
    res.render('memory/hard.ejs', {card: card5Values, cardTest: card10Values})
})
app.post('/cards', async (req,res) => {
    await Memory.create(req.body);
    res.redirect('/add')
})
app.post('/save-score', async (req,res) => {
    await Result.create(req.body);
    res.redirect(`/${req.body.difficulty.toLowerCase()}`)
})
app.delete('/add/:emojiId', async (req,res) => {
    await Memory.findByIdAndDelete(req.params.emojiId);
    res.redirect('/add')
})



app.listen(3003, () => {
  console.log('Listening on port 3003');
});
