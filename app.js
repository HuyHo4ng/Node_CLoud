// Import express
const express = require('express');
const app = express();
const port = 3000;

// Mock data
const mockData = require('./MOCK_DATA.json');

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/img', express.static(__dirname + '/public/img'));

// Set view engine
app.set('views', './views');
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
    res.render('index', { swords: mockData });
});

// Product detail route
app.get('/product/:name', (req, res) => {
    const sword = mockData.find(item => item.sword_name === req.params.name);
    if (sword) {
        res.render('productDetail', { sword });
    } else {
        res.status(404).send('Product not found');
    }
});

// Listen on port
app.listen(port, () => console.info(`Listening on port ${port}`));
