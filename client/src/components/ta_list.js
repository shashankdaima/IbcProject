import React from 'react'

function ListElement({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      
      style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
    >
      <div>
        {todo.text}
        <button onClick={() => removeTodo(index)}>Delete It</button>
      </div>
    </div>
  )
}

function PublickeysProviders({ addTodo }) {
  const [value, setValue] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value) return
    addTodo(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  )
}

function TaList(props) {
  const [publickeys, setPublickeys] = React.useState([])

  const addTodo = (text) => {
    const newTodos = [...publickeys, { text }]
    props.addTa(newTodos);
    setPublickeys(newTodos)
  }

  const completeTodo = (index) => {
    const newTodos = [...publickeys]
    newTodos[index].isCompleted = true
    setPublickeys(newTodos)
  }

  const removeTodo = (index) => {
    const newTodos = [...publickeys]
    newTodos.splice(index, 1)
    setPublickeys(newTodos)
  }

  return (
    <div className="app">
      <div >
        <h3>Add Private Key of TA's here </h3>
        {publickeys.map((todo, index) => (
          <ListElement
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <PublickeysProviders addTodo={addTodo} />
      </div>
    </div>
  )
}

export default TaList
