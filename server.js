const express = require('express');
const fs = require('fs');
const path = require('path')
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;

const app = express();

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming json data
app.use(express.json());

app.use('/api', apiRoutes);

app.use('/',htmlRoutes);
//make filed in folder readily available, css js etc 
app.use(express.static('public'))

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});

