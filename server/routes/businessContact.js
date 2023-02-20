let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

let passport = require('passport');

// connect to our User Model
let BusinessContact = require('../models/businessContact');

let businessContactController = require('../controllers/businessContact');

// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}


/* GET Route for the Contact List page - READ Operation */
router.get('/', businessContactController.displayBusinessContactList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', businessContactController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', businessContactController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', businessContactController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', businessContactController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', businessContactController.performDelete);

module.exports = router;