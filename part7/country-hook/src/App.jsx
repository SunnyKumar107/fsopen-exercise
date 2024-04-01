import React, { useState, useEffect } from 'react'
import { useField, useCountry } from './hooks'
import Country from './components/Country'

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        {/* <input {...nameInput} /> */}
        <input
          type={nameInput.type}
          value={nameInput.value}
          onChange={nameInput.onChange}
        />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
