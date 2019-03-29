const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log , (err) => {
        if(err){
            console.log(err);
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('changeIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        greet: 'Welcome Gowtham',
        pageTitle: 'Home Page'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Invalid Request'
    })
})

app.listen(3000, ()=> {
    console.log('Server is running');
});