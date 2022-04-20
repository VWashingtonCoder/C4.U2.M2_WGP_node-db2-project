// DO YOUR MAGIC
const express = require('express');
const Cars = require('./cars-model');
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
  } = require('./cars-middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Cars.getAll()
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'cars could not be retrieved'
            })
        })
    
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    Cars.create(req.body)
    .then(car => {
        res.status(201).json(car);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'car could not be added'
        });
    });
})

router.get('/:id', checkCarId, (req, res, next) => {
    res.status(200).json(req.liveCar)
})

module.exports = router;