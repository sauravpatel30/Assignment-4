const express = require('express')
const router = express.Router();
router.use(express.json());

const data_file = require("../productdata")

const app = express()

router.get('/', (req, res) => res.send('Welcome to Product'))

router.post('/addprod',(req,res)=>{
    const data_user= req.body;
    data_file.push(data_user);
    res.json({data:"done"});
});

router.post('/fetch',(req,res)=>{
    res.json({data:data_file});
});

router.post('/delete/:id',(req,res)=>{
    const pid = req.params.id;
    const product_data = data_file.filter((product_data)=>product_data.pid===pid);

    if(product_data.length>0){
        var compantIndex = data_file.indexOf(product_data[0]);
        data_file.splice(compantIndex,1);
        res.json({data:"Product delete!"});
    }else{
        res.json({data:"Product not delete!"});
    }
});

router.post('/update/:id',(req,res)=>{
    const pid = req.params.id;
    const change_data = req.body;
    const product_data = data_file.filter((product_data)=>product_data.pid===pid);

    if(product_data.length>0){
        data_file[data_file.indexOf(product_data[0])].pid = change_data;
        res.json({data:"Product data change!"});
    }else{
        res.json({data:"Product data not change!"});
    }
});

module.exports=router;