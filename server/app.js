const arrayList = require('./data.js');
const express = require('express');
const path = require('path');
const cors = require('cors');

let app = express();

app.use(cors());

app.get('/search', (req, res) => {
    const productCodeProvider = req.query.productCodeProvider || '';
    const resData = arrayList.filter((item, index) => {
        return item.productCodeProvider.indexOf(productCodeProvider) != -1;
    });
    res.send(resData);
    res.end();
});

app.listen(6645, () => {
    console.log('6645启动成功！');     
});