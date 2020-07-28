const express = require('express');
const app = express();
const ItemRouter = express.Router();

const Item = require('../models/Item');

ItemRouter.route('/add').post(function (req, res) {
    const item = new Item(req.body);
    item.save()
      .then(item => {
          res.json('Item added successfully');
      })
      .catch(err => {
      res.status(400).send("Unable to save to database");
      });
  });
  

ItemRouter.route('/').get(function (req, res) {
    Item.find(function (err, items){
    if(err){
      console.log(err);
    }
    else {
      res.json(items);
    }
  });
});

ItemRouter.route('/edit/:id').get(function (req, res) {
    const id = req.params.id;
    Item.findById(id, function (err, item){
        res.json(item);
    });
});

ItemRouter.route('/update/:id').post(function (req, res) {
    Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      // do your updates here
      item.title = req.body.title;
      item.description = req.body.description;

      item.save().then(item => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

ItemRouter.route('/delete/:id').get(function (req, res) {
    Item.findByIdAndRemove({_id: req.params.id},
       function(err, item){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = ItemRouter;