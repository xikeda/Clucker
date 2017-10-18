//Main Router File via /clucker

var express = require('express');
var router = express.Router();
// Bring in Knexfile
const knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  knex('cluck')
    .select()
      .then(clucks => {
        res.render('all', {clucks: clucks});
      });
});

// New Cluck Form
router.get('/new', function(req, res, next) {
  res.render('new');
});

// Respond and Render Logic
function respondAndRenderCluck(id, res, viewName){
  if(typeof id != 'undefined'){
    knex('cluck')
      .select()
      .where('id', id)
      .first()
      .then(cluck => {
        console.log('cluck', cluck);
        res.render(viewName, cluck);
      });
  }else{
    res.status(500);
    res.render('error', {
      message: 'Invalid id'
    });
  }
}

// New Cluck View
router.get('/:id', function(req, res, next) {
  const id = req.params.id;
  respondAndRenderCluck(id, res, 'single');
});

// Edit Cluck Form
router.get('/:id/edit', function(req, res, next) {
  const id = req.params.id;
  respondAndRenderCluck(id, res, 'edit');
});

// New Cluck Form
router.get('/new', function(req, res, next) {
  res.render('new');
});
// Validation
function validPost(cluck){
  // Check if empty, under 140 char and has username
  return typeof cluck.content;
}

// Validated Insert Update Redirect function
function validateCluckInsertUpdateRedirect(req,res,callback) {
  console.log(req.body);
  if(validPost(req.body)){
    // New Post object
    const cluck = {
      username: req.body.username,
      content: req.body.content,
      image_path: req.body.image_path,
      created_at: new Date()
    };

    callback(cluck);
  }else{
    // display error
    res.status(500);
    res.render('error', {
      message: 'Invalid Cluck'
    });
  }
}

// Post Request
router.post('/', function(req, res, next) {
  validateCluckInsertUpdateRedirect(req, res, (cluck) => {
    cluck.created_at = new Date();
    knex('cluck')
    .insert(cluck, 'id')
    .then(ids => {
      const id = ids[0];
      res.redirect(`/clucker/${id}`);
    });
  });
});

// Put Request
router.put('/:id', function(req, res, next) {
  validateCluckInsertUpdateRedirect(req, res, (cluck) => {
    knex('cluck')
    .where('id', req.params.id)
    .update(cluck, 'id')
    .then(() => {
      res.redirect(`/clucker/${req.params.id}`);
    });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  if(typeof id != 'undefined'){
    knex('cluck')
      .where('id', id)
      .del()
      .then(() => {
        res.redirect('/clucker');
      });
  }else{
    res.status(500);
    res.render('error', {
      message: 'Invalid id'
    });
  }
});

module.exports = router;
