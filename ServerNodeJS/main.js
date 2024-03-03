// module có sẵn tạo server nodejs
const http =require('http')
const PORT=4000

const server=http.createServer((req,res)=>{
    res.end('Helloword')
})

server.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })