let isValidDate = (d) =>{
    return d instanceof Date && !isNaN(d);
  }
  
module.exports = (req, res, next) => {


    var {
      startDate,
      endDate,
      minCount,
      maxCount,
    } = req.body;
  
  
  
    if (!isValidDate(new Date(startDate))) {
      console.log('sda')
      return res.status(400).send({
        code: 1001,
        msg: "Bad Start Date",
        records: []
      })
  
    }
  
    if (!isValidDate(new Date(endDate))) {
      console.log('eda')
      
      return res.status(400).send({
        code: 1001,
        msg: "Bad End Date",
        records: []
      })
    }
    if (isNaN(maxCount)) {
      console.log('max')
  
      return res.status(400).send({
        code: 1001,
        msg: "Bad Max Count",
        records: []
      })
    }
    if (isNaN(minCount)) {
      console.log('min')
  
      return res.status(400).send({
        code: 1001,
        msg: "Bad Min Count",
        records: []
      })
    }
    if (maxCount < minCount) {
      console.log('<')
  
      return res.status(400).send({
        code: 1001,
        msg: "Bad Min/Max count",
        records: []
      })
    }
    return next();
  }