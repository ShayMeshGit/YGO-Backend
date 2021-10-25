require("dotenv").config();
const { generateJson } = require("./util/txttojson");
const path = require("path");
const fs = require("fs");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const mongoose = require("mongoose");
const cors = require("cors");
const Card = require("./models/Card");
const helmet = require("helmet");
const compression = require("compression");

const PORT = process.env.PORT || 4002;

const app = express();

//app.use(helmet());
app.use(compression());

app.use(
  cors({
    origin: "*",
    methods: "POST",
  })
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:27017/ygo?authSource=admin`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) {
      console.log(`Faild connecting to db server with err: ${err}`);
      return;
    }
    const filePath = path.join(`${__dirname}`, "data", "yogioh.json");
    let json = {};
    if (!fs.existsSync(filePath)) {
      generateJson()
        .then((returnedJson) => {
          json = { ...returnedJson };
          const { cards } = json;
          cards.forEach((card) => {
            const newCard = new Card(card);
            return newCard.save();
          });
        })
        .then((result) => {
          console.log("Saved succesfully to db.");
          fs.writeFile(filePath, JSON.stringify(json), "utf8", (err) => {
            if (err) {
              console.log(err);
            }
            console.log(`Created txttojson.json file in ${filePath}.`);
          });
        })
        .catch((err) => {
          console.log("Failed saving and creating file, ", err);
        });
    }
  }
);

app.listen(PORT, (err) => {
  console.log(`listening on port ${PORT}...`);
});
