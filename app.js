const express = require('express')
const app = express()
const port = 3000

const company = require("./router/company.js");
const product = require("./router/product");
const seller = require("./router/seller");

app.use("/cmp",company);
app.use("/prod",product);
app.use("/seller",seller);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))