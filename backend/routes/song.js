const router = require('express').Router();
let Song = require('../models/song.model');

router.route('/').get((req, res) => {
  Song.find()
    .then(song => res.json(song))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const artist = req.body.artist;
  const dor = Date.parse(req.body.dor);

  const newSong = new Song({
    name,
    dor,
    artist,
    image,
  });

  newSong.save()
  .then(() => res.json('Song added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Song.findById(req.params.id)
    .then(song => res.json(song))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Song.findByIdAndDelete(req.params.id)
    .then(() => res.json('Artist deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Song.findById(req.params.id)
    .then(song => {
      song.name = req.body.name;
      song.image = req.body.image;
      song.artist = req.body.artist;
      song.dor = Date.parse(req.body.dor);

      song.save()
        .then(() => res.json('Song updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;