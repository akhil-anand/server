const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const data = [{
    name:'akhil',
    occupation:'Developer'
}]

const expensesSchema = {
    price: Number,
    category: String,
    dateOfPurchase: String,
    month: String,
    year: String

  };

  const Expense = mongoose.model("Expense", expensesSchema);

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

router.post('/addExpense', async (req, res) => {
    const expense = new Expense({
        price: req.body.price,
        category: req.body.category,
        dateOfPurchase: moment(new Date()).format('DD-MM-YYYY'),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    });
    try{
        await expense.save();
        res.send(expense)
    } catch (error){
        res.status(500).send(error)
    }
})

router.get('/getExpense', async (req, res) => {
    const expense = await Expense.find({});
    try{
        res.send(expense)
    } catch (error) {
        res.status(500).send(error)
    }
})

router.get('/getMonthlyExpense', async (req, res) => {
    const expense = await Expense.find({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
    })
    try{
        res.send(expense)
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;