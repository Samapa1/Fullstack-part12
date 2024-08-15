const express = require('express');
const router = express.Router();
const redis = require('../redis')
const { getAsync } = require('../redis/index')
const { setAsync } = require('../redis/index')

const configs = require('../util/config')

let visits = 0

const initializeCounter = async () => { 
let todoCounter = await getAsync("added_todos")
console.log(todoCounter)
if (todoCounter === null) {
  await setAsync("added_todos", 0)
}
}

initializeCounter()

// Get the number of created todos
router.get('/statistics', async (_, res) => {
  const added = await getAsync("added_todos")
  // const added2 = added.then(result => {return result.data})
  // console.log(added2)
  console.log(added)
  // res.send(json({added_todos: added }))
  // res.json({added_todos: added })
  res.send({added_todos: added })
});

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

module.exports = router;
