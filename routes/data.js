const express = require('express');
const router = express.Router();

const data = [{
    name:'akhil',
    occupation:'Developer'
}]

router.get('/getData', (req, res)=>{
    // res.send('Welcome to my web server')
    res.json({ok: true, data})
})

router.post('/addData', (req, res)=>{
    const { name, occupation } = req.body;
    if(name && occupation){
        data.push({ name, occupation});
        res.json({ok:true, data})
    }
})

module.exports = router;