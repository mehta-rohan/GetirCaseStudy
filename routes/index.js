var express = require('express');
var router = express.Router();

/* GET records */


router.get('/*', (req, res, next) => {
  return res.status(200).send({
    code: 0,
    msg: "Not available",
  });
});
router.post('/', (req, res, next) => {
  // console.log("here");


  //get db instance
  let db = req.app.get('db');

  var {
    startDate,
    endDate,
    minCount,
    maxCount,
  } = req.body;



  //converting date in mongo db suitable manner
  var todayStart = new Date(startDate);
  todayStart.setHours(0, 0, 0, 0);

  var todayEnd = new Date(endDate);
  todayEnd.setHours(23, 59, 59, 999);

  var createdAt = {
    "createdAt": {
      $gte: todayStart,
      $lte: todayEnd
    }
  };

  // create pipeline for aggrigate function
  var pipeLine = [{
      $match: createdAt
    },
    {
      $project: {
        _id: 0,
        totalCount: {
          $sum: "$counts"
        },
        createdAt:1,
        key: 1,
        // value: 1,
        // counts: 1
      }
    }, {
      $match: {
        totalCount: {
          $lte: maxCount,
          $gte: minCount
        }
      }
    }
  ]

  // fetching records
  db.collection('records')
    .aggregate(pipeLine)
    .toArray(function (err, items) {
      // console.log(err);
      // console.log(items.length);
      if (err) {
        return res.status(500).send({
          code: 0,
          msg: "Something went wrong",
          records: []
        })
      }
      return res.status(200).send({
        code: 0,
        msg: "success",
        records: items
      })
      // return next();

    })
});



module.exports = router;