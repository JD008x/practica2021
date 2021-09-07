import { NextFunction, Request, Response } from 'express';
import  mongoose  from 'mongoose';
import Location from '../models/location.model';

const addLocation = (_req: Request, res: Response, _next: NextFunction) => {
      let { nume, adresa, nrTelefon } = _req.body;

      const location = new Location({
            _idLocation: new mongoose.Types.ObjectId(),
            nume,
            adresa,
            nrTelefon
      });

      return location.save()
            .then(result => {
                  return res.status(201).json({
                        location: result
                  });
            }).catch(error => {
                  return res.status(500).json({
                        message: error.message,
                        error
                  });
            })
};
const getAllLocations = (_req: Request, res: Response, _next: NextFunction) => {
    console.log("Salut");
      Location.find()
            .exec()
            .then((results) => {
                  return res.status(200).json({
                        location: results,
                        count: results.length
                  });
            }).catch((error) => {
                  return res.status(500).json({
                        message: error.message,
                        error
                  });
            })
};

export default { getAllLocations, addLocation };
