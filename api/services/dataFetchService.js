const axios = require("axios");

async function getData(site) {
    try{
        let start = new Date()
        let res = await axios.get(`http://${site}.com`)
        let duration = new Date() - start
        return {
            url: `http://${site}.com`,
            status: res.status,
            duration,
            date: start
        }
    } 
    catch(err) {
        console.log(`Error in data fetch call to ${site}:`)
        console.log(err)
    }
}

module.exports = {getData}
