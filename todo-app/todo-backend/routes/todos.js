const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const redis = require('../redis')
const { getAsync } = require('../redis/index')
const { setAsync } = require('../redis/index')



let added_todos = 0

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

// Get the number of created todos
// router.get('/statistics', async (_, res) => {
//   const added = await getAsync(added_todos)
//   res.json({added_todos: added })
// });

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })
  let todos = await getAsync("added_todos")
  console.log(todos)
  await setAsync("added_todos", ++todos)
  let updated = await getAsync("added_todos")
  console.log(updated)

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  const todo1 = await req.todo
  res.send(todo1)
  // res.sendStatus(405); // Implement this
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const todoid = await req.todo
  const updated = await Todo.findByIdAndUpdate(todoid, req.body)
  // res.sendStatus(200);
  res.send(updated)
  // res.sendStatus(405); // Implement this
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
