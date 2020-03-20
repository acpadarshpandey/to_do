  const fs= require ('fs')
const express=require('express')

const app=express()
app.get('/',function(req,resp){
    fs.readFile("src/html/index.html",function(err,data){
        resp.send(data.toString())
       
    })
});
app.get('/api/todos',function(req,resp){
    fs.readFile("src/todos.json",function(err,data){
        resp.send(data.toString())

    });
    

});
app.get('/api/todos/add',function(req,resp){
    console.log(req.query);
    if(typeof(req.query.todoname) != undefined && req.query.todoname !=""){
        var todoName= req.query.todoname;
        console.log("There is valid new todo data");
        console.log(todoName)
         fs.readFile("src/todos.json",function(err,todosData){
             var todoListData=JSON.parse(todosData);
             console.log(todoListData);
             todoListData.data.push({"title":todoName, "checked": false});
             fs.writeFile("src/todos.json",JSON.stringify(todoListData),function(err,data){
                resp.send(" save  new todo data"+todoName)

             })

         });
      
    } else{
        resp.send("No valid todo data")
    }
    //resp.send(req.query)
});
app.listen(3000,function(){
    console.log("server started")
});