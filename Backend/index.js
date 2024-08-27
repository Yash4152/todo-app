const express = require("express");
const {createTodo, updateTodo} = require("./types");
const {todo} = require("./db");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.post("/todo", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    // put it in mongodb
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        msg: "Todo created"
    })
})

app.get("/todos",async function (req,res) {
    const todos = await todo.find({});

    res.json({
        todos 
    })
})

app.put("/completed" ,async function (req,res) {
    const CreatePayload = req.body;
   const  parsedPayload = createTodo.safeParse(CreatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg : "you sent wrong inputs"
        })
        return;
    }
    await todo.update({
        _id : req.body.id
    },{
        completed : true
    })

    res.json({
        msg : "Todo Completed"
    })
})

app.listen(3000);
