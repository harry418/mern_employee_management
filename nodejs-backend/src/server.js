const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Employee = require('./model/employee');
const employeeRouter = require('./routers/employeeRouter')
require('./db/mongoose')

const app = express();
app.use(cors());
app.use(express.json());


const port = process.env.PORT || 8080;
app.use(morgan('tiny'));
app.use('/api/v1',employeeRouter)

app.listen(port,()=>{
    console.log(`server started on port: ${port}`);
})