/*
Name        : Visal Mohan
Student Id  : 301225547
Date        : 19-Feb-2023
*/
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the model
let BusinessContact = require('../models/businessContact');

module.exports.displayBusinessContactList = (req, res, next) => {
    BusinessContact.find((err, businessContactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {

            res.render('businessContact/list', {
                title: 'Business Contacts', 
            BusinessContactList: businessContactList,
            displayName: req.user ? req.user.displayName : ''});      
        }
    }).sort({contactName: 1});
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('businessContact/add', {title: 'Add Business Contact',
    displayName: req.user ? req.user.displayName : ''});      
}

module.exports.processAddPage = (req, res, next) => {
    let newBusinessContact = BusinessContact({
        "contactName": req.body.contactName,
        "contactNo": req.body.contactNo,
        "email": req.body.email,
        "address": req.body.address
    });

    BusinessContact.create(newBusinessContact, (err, BusinessContact) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/business-contact-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    BusinessContact.findById(id, (err, businessContactToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('businessContact/edit', {title: 'Edit Business Contact', businessContact: businessContactToEdit,
            displayName: req.user ? req.user.displayName : ''});      
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedBusinessContact = BusinessContact({
        "_id": id,
        "contactName": req.body.contactName,
        "contactNo": req.body.contactNo,
        "email": req.body.email,
        "address": req.body.address
    });

    BusinessContact.updateOne({_id: id}, updatedBusinessContact, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/business-contact-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    BusinessContact.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/business-contact-list');
        }
    });
}