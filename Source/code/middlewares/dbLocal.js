const mongoose = require("mongoose");

module.exports = function() {
    //DB config
    const db = require("../config/key").MongoLocal;
    const mongooseConfig = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 100
    };
    mongoose
        .connect(db, mongooseConfig)
        .then(console.log("Database connected"))
        .catch((err) => console.log(err));
    // mongoose.connection.once('open', () => {
    //     console.log('connect succeed');
    // }).on('erro', (err) => {
    //     console.log('The error is: ', err);
    // });
};
