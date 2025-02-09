const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const Leaders=require('../models/leaders');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());
//promotions
leaderRouter.route('/')
    .get((req, res, next) => {
        Leaders.find({})
        .then((leaders)=>
        {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leaders);
        },(err)=>next(err))
        .catch((err)=>next(err));
})
 .post((req, res, next) => {
        Leaders.create(req.body)
        .then((leaders)=>
        {
            console.log('dish created',leaders);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leaders);
            },(err)=>next(err))
                .catch((err)=>next(err));
        })
        .put((req, res, next) => {
            res.statusCode = 403;
            res.end('PUT operation not supported on /leaders');
        })

        .delete((req, res, next) => {
            Leaders.remove({})
            .then((resp)=>
            {
            res.statusCode=200;
                        res.setHeader('content-type','application/json');
                        res.json(resp);
                 },(err)=>next(err))
                    .catch((err)=>next(err));
           
        });

leaderRouter.route('/:leaderId')
    .get((req, res, next) => {
        Leaders.findById(req.params.leaderId)
        .then((leaders)=>
            {   
                res.statusCode=200;
                res.setHeader('content-type','application/json');
                res.json(leaders);
         },(err)=>next(err))
            .catch((err)=>next(err));
   
            })
   .post((req, res, next) => {
        res.end('POST operation not supported on /leaders/' + req.params.leaderId);
    })
    .put((req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, { new: true })
        .then((leaders) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(leaders);
        }, (err) => next(err))
        .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    })

module.exports = leaderRouter;