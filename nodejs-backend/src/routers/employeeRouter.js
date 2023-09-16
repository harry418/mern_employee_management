const express = require('express');
const Employee = require('../model/employee');

const router = new express.Router();


router.post('/employees/', async (req,res)=>{
    const employee = new Employee({
        ...req.body
    })
    await employee.save().then((savedEmployee)=>{
        //console.log(savedEmployee);
        res.status(201).send(savedEmployee)
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

router.get('/employees/', async (req,res)=>{
    try{
        const employees =  await Employee.find();
        //console.log(employees);
        res.status(200).send(employees);
    }catch(e){
        res.status(500).send("internal server error")
    }
})

router.get('/employees/:id', async (req,res)=>{
    const _id = req.params.id;
    try{
    const employee = await Employee.findById(_id);
    if (!employee) {
        return res.status(404).send()
    }

    res.send(employee);
    } catch (e) {
        res.status(500).send()
    }
})
router.put('/employees/:id', async (req,res)=>{
    const _id = req.params.id;
    const updates = Object.keys(req.body)
    try{
    const employee = await Employee.findById(_id);
    if (!employee) {
        return res.status(404).send("employee not found")
    }
    updates.forEach((update)=>employee[update]=req.body[update]);
    await employee.save()

    res.status(200).send(employee);
    } catch (e) {
        res.status(404).send("employee not found")
    }
})

router.delete('/employees/:id', async (req, res) => {
    const _id = req.params.id;
    try {
      const employee = await Employee.findOneAndDelete({ _id }); // Pass _id as an object
      if (!employee) {
        return res.status(404).send("Employee not found");
      }
      res.status(200).send(employee);
    } catch (e) {
      res.status(500).send("Internal server error");
    }
  });

module.exports = router;