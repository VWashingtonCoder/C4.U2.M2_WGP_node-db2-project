const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = (req, res, next) => {
  const id = req.params.id

  Cars.getById(id)
    .then(car => {
      if(!car){
        res.status(404).json({
          message: `car with id ${id} is not found`
        });
        return;
      } else {
        req.liveCar = car;
        next();
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: `car at ${id} could not be retrieved`
      })
    })
}

const checkCarPayload = (req, res, next) => {
  let fieldName = ''
  const { vin, make, model, mileage } = req.body

  if(!vin || vin === undefined){
    fieldName = 'vin';
  } else if(!make || make === undefined){
    fieldName = 'make';
  } else if(!model || model === undefined){
    fieldName = 'model';
  } else if(!mileage || mileage === undefined){
    fieldName = 'mileage'
  }


  if(fieldName !== ''){
    res.status(400).json({ message: `${fieldName} is missing` });
    return;
  } else{
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  const isValidVin = vinValidator.validate(req.body.vin);

  if(isValidVin === false){
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
    return;
  } else {
    next();
  }
}

const checkVinNumberUnique = (req, res, next) => {
  const givenVin = req.body.vin;

  Cars.getAll()
      .then(cars => {
        cars.forEach(car => {
          if(car.vin === givenVin){
            res.status(400).json({
              message: `vin ${givenVin} already exists`
            })
            return;
          }
        })
        next();
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(`vin ${givenVin} could not be verified`)
      })
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}