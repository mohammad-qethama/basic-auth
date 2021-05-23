'use strict';

module.exports =  (req, res) => {
  console.log('i am in 404 ')

  res.status(404).json({
    error: 404,
    route: req.path,
    message: 'Not Found',
  });
};
