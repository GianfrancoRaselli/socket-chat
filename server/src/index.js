const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const { authenticate } = require('./middlewares/auth');

//initializations
const app = express();
require('dotenv').config();

//middlewares
app.use(morgan('dev'));
app.use(cors());

//routes
app.use('/graphql', authenticate, graphqlHTTP({
    schema,
    graphiql: true
}));

//socket
require('./socket');

//starting the server
app.listen(process.env.PORT, () => {
    console.log('Server on port: ' + process.env.PORT);

    //connect to db
    mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('DB Connected'))
        .catch(err => console.log(err));
});