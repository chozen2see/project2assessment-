//=============================
//      Dependencies
//=============================

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');

//=============================
//          Data
//=============================
const Todo = require('./models/todo');

/**********************
 * Mongoose Connection
 **********************/

const mongoose = require('mongoose');
const MONGODO_URI =
  process.env.MONGODO_URI || 'mongodb://localhost:27017/todoapp';

mongoose.connect(MONGODO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

//=============================
// Required Middleware Engine
//=============================
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

//tells express to parse data from POST request:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
//method override
app.use(methodOverride('_method'));

//=============================
//          Routers
//=============================

/****************************************************************************************
 * Presentational Routes
 * Index: shows a list of all of our resources and has linked to New, Edit, & Deelete
 * New: shows a form to creata new resource lined to create
 * Show: shows one individual resource from our list
 * EDIT: Shows a form to update a resource linked to our Update route
 ****************************************************************************************/

//====================
//       Index
//====================
app.get('/todos', (req, res) => {
  Todo.find({}, (error, foundTodos) => {
    let message = '';
    if (foundTodos === undefined || foundTodos.length === 0) {
      message = 'There are no To Dos yet!';
    }

    res.render('Index', { todos: foundTodos, message });
  });
});

/*************************************************************************
 * Functional Routes
 * Create: creates a new resource using app.post() | Post
 * Delete: deletes a resource use app.delete() | Destroy
 * Update: updates a resource | PUT
 *************************************************************************/

//====================
//    Create Route
//====================

app.post('/todos', (req, res) => {
  Todo.create(req.body, (error, createdTodo) => {
    res.redirect('/todos');
  });
});

//====================
//      Delete
//====================

app.delete('/todos/:id', (req, res) => {
  Todo.findByIdAndRemove(req.params.id, (error, removedTodo) => {
    console.log(removedTodo);
    res.redirect('/todos');
  });
});

//=============================
// Listening on Port 3000
//=============================
app.listen(port, (req, res) => {
  console.log(`Listening on port... ${port}`);
});
