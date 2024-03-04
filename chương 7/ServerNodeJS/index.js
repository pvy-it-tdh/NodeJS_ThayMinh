const express= require('express')
const app=express()
const port=3000

app.get('/',(req,res)=>{
    res.send('Hello Phuc Vy')
})
app.get('/hi',(req,res)=>{
    res.send('Hi')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })