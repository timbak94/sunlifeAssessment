const express = require('express');
const router = express.Router();
const dataFetchService = require('../services/dataFetchService.js')

const allSites = ['google','amazon']

/* GET all status. */
router.get('/', async function(req, res, next) {
  let data = []

  await Promise.all(allSites.map(async (site) => {
    data.push(await dataFetchService.getData(site))
  }))

  res.json(data);
});

module.exports = router;
