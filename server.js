const express = require('express');
const hbs = require('hbs')
const fs = require('fs')

var app = express();

//Partials directory
hbs.registerPartials(__dirname + '/views/partials')

//Set view engine hanndlebars
app.set('view engine','hbs')

//Log middleware
app.use((req,res,next) => {
    var now = new Date().toString();

    //Logs both the method and the url's request
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n',(err) => {
        if (err) {
            console.log('Unable to append to server.log.')
        }
    });

    //Print log to the console
    console.log(log);
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// });

//Register statics content directory
app.use(express.static(__dirname + '/public'));

//Register helper function getCurrentYear
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

//Register helper function screamIt
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

//Define root route
app.get('/',(req, res) => {
    //res.send('<h1>Hello Express!</h1>');
    // res.send({
    //     name: 'Andrew',
    //     likes: ['Biking','Cities']
    // });
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    })
});

//Define /about route
app.get('/about', (req,res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page'
    })
});

//Define /bad route
app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })

});

//Define listener port
app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

