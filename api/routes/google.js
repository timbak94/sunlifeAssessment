const express = require('express');
const router = express.Router();
const dataFetchService = require('../services/dataFetchService.js')

/* GET goopgle status. */
router.get('/', async function(req, res, next) {
  let data = await dataFetchService.getData('google')

  res.json(data);
});

module.exports = router;
