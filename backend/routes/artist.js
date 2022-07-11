const router = require('express').Router();
let Artist = require('../models/artist.model');

router.route('/').get((req, res) => {
  Artist.find()
    .then(artist => res.json(artist))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const bio = req.body.bio;
  const dob = Date.parse(req.body.dob);

  const newArtist = new Artist({
    name,
    bio,
    dob,
  });

  newArtist.save()
  .then(() => res.json('Artist added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Artist.findById(req.params.id)
    .then(artist => res.json(artist))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Artist.findByIdAndDelete(req.params.id)
    .then(() => res.json('Artist deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Artist.findById(req.params.id)
    .then(artist => {
      artist.name = req.body.name;
      artist.bio = req.body.bio;
      artist.dob = Date.parse(req.body.dob);
      artist.rating = req.body.rating;
      artist.save()
        .then(() => res.json('Artist updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;