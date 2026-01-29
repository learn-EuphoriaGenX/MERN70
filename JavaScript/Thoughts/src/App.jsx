import React, { useState } from 'react'

function App() {
  // let a = 10;
  let [username, setUsername] = useState("")
  let [password, setPassword] = useState("")


  // onChange

  return (
    <div>
      <form class="max-w-sm mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md">
        <input className='w-full border ' type="text" placeholder="Username" required />
        <input type="password" className='w-full border ' placeholder="Password" required />
        <button type="submit" className='w-full border bg-sky-500 '>Login</button>
      </form>
      <div>

        You Entered Username: {username}
        You Entered Password: {password}
      </div>
    </div>

  )
}

export default App