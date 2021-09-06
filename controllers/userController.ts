import { NextFunction, Request, Response } from 'express';
import  mongoose  from 'mongoose';
import User from '../models/user.model';

const addUser = (_req: Request, res: Response, _next: NextFunction) => {
      let { userName, email, password, realName, creationDate, role } = _req.body;

      const user = new User({
            _id: new mongoose.Types.ObjectId(),
            userName,
            email,
            password,
            realName,
            creationDate,
            role

      });

      return user.save()
            .then(result => {
                  return res.status(201).json({
                        book: result
                  });
            }).catch(error => {
                  return res.status(500).json({
                        message: error.message,
                        error
                  });
            })
};
const getAllUsers = (_req: Request, res: Response, _next: NextFunction) => {
      User.find()
            .exec()
            .then((results) => {
                  return res.status(200).json({
                        users: results,
                        count: results.length
                  });
            }).catch((error) => {
                  return res.status(500).json({
                        message: error.message,
                        error
                  });
            })
};

export default { getAllUsers, addUser };
