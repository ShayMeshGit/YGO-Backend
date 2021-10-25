const Card = require('../models/Card');


const resolvers = {
    cards: async (params, context) => {
        try {
            console.log(`Reasolving all cards...`);
            const cards = await Card.find();
            console.log(`Successfully fetched all cards!`);
            return cards;
        } catch (err) {
            console.log(`Faild fetching all cards with err: ${err}`);
        }
    },
    card: async ({ id }, context) => {
        try {
            console.log(`Resolving card with id: ${id}`);
            const card = await Card.findById(id);
            console.log(`Successfully fetched card with id: ${id}!`)
            return card;
        } catch(err) {
            console.log(`Faild fetching card with err: ${err}`);
        }
    },
    changeStatus: async ({id}, context) => {
        try {
            console.log(`Resolving card with id: ${id}`);
            const card = await Card.findById(id);
            console.log(`Successfully fetched card with id: ${id}!`);
            const changeStatus = !card.sold;
            card.sold = changeStatus;
            console.log(`Change status to {sold: ${changeStatus}} and saving to db...`);
            const newCard = await card.save();
            console.log(`Successfully saved card with id : ${id} to db!`);
            return newCard;
        } catch(err) {
            console.log(`Faild fetching card with err: ${err}`);
        }
    }
}


module.exports = resolvers;