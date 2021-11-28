const express = require('express')
const router = express.Router();
router.use(express.json());

const data_file = require("../companydata")

const app = express()

router.get('/', (req, res) => res.send('Welcome to Company'))

router.post('/addcomp',(req,res)=>{
    const data_user= req.body;
    data_file.push(data_user);
    res.json({data:"done"});
});

router.post('/fetch',(req,res)=>{
    res.json({data:data_file});
})

router.post('/delete/:id',(req,res)=>{
    const cid = req.params.id;
    const company = data_file.filter((company)=>company.cid===cid);

    if(company.length>0){
        var compantIndex = data_file.indexOf(company[0]);
        data_file.splice(compantIndex,1);
        res.json({data:"Company delete!"});
    }else{
        res.json({data:"Company not delete!"});
    }
});

router.post('/update/:id',(req,res)=>{
    const cid = req.params.id;
    const change_data = req.body;
    const company = data_file.filter((company)=>company.cid===cid);

    if(company.length>0){
        data_file[data_file.indexOf(company[0])].pid = change_data;
        res.json({data:"Company data change!"});
    }else{
        res.json({data:"Company data not change!"});
    }
});

router.post("/prod_name/:pname",(req,res)=>{
    const pname = req.params.pname;
    const plist = require("../productdata")
    var comp =[];
    const product = plist.filter((prd)=>(prd.title === pname));

    if(product.length>0){
        comp = data_file.filter((cmp)=>(cmp.cid === product[0].cid));
    }else{
        comp="no data found";
    }
    res.json({data:comp});
})

module.exports=router;