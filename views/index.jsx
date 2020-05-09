const React = require('react');

class Index extends React.Component {
  render() {
    const { todos, message } = this.props;

    return (
      <html>
        <head>
          <link rel='stylesheet' href='/css/app.css' />
          <title>Unit 2 Assessment</title>
        </head>
        <body>
          <div className='wrapper'>
            <h1>To Do List</h1>
            {message !== '' ? <h3>{message}</h3> : ''}
            <ul>
              {todos.map((todo, index) => {
                return (
                  <li>
                    {todo.todo} - {todo.done === false ? 'Not Done' : ''}
                    <form
                      action={`/todos/${todo.id}?_method=DELETE`}
                      method='POST'
                    >
                      <input type='submit' value='DELETE' />
                    </form>
                  </li>
                );
              })}
            </ul>
            <hr />
            <form action='/todos' method='POST'>
              <input type='text' name='todo' id='todo' />
              <input type='hidden' name='done' value='false' />
              <input type='submit' value='ADD TO DO' />
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Index;
