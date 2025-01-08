import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Person1 from './assets/components/hoc/Person1'
import Person2 from './assets/components/hoc/Person2'
import { GetAPI } from './assets/components/api_services/GetAPI'
import { TodoList } from './assets/components/todolist/TodoList'
import { GetApiPagination } from './assets/components/api_services/GetApiPagination'
import { Login } from './assets/components/login/Login'

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {/* <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>
      {/* <h1>Vite + React</h1> */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        <h5>HOC (Higher Order Component) </h5>
        <Person1/>
        <Person2/>
        <h5>Data fetching through an API</h5>
        {/* <GetAPI/> */}
        <GetApiPagination/>
        <h5>To-Do-List</h5>
        <TodoList/>
        <Login/>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
