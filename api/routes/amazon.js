const express = require('express');
const router = express.Router();
const dataFetchService = require('../services/dataFetchService.js')

/* GET amazon status. */
router.get('/', async function(req, res, next) {
  let data = await dataFetchService.getData('amazon')

  res.json(data);
});

module.exports = router;
