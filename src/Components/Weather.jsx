import React from 'react'
import { useState } from 'react'

const API_KEY = '238621863b0a71bd3e960d9fc8bd61a0'

const Weather = () => {
  const [input, setInput] = useState('')
  const [data, setData] = useState({})
  const [error, setError] = useState(null)

  const fetchData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error('City not found')
      }
      const data = await response.json()
      setData(data)
      
      setError(null)
    } catch (error) {
      setError('City not found')
      setData({})
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input !== '') {
      fetchData(input)
      setInput('')
    }
  }

  const iconUrl = data.weather
    ? `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    : ''
  return (
    <>
      <section className="flex justify-center items-center min-h-screen  p-4">
        <div className="bg-[#ffffff] p-8 w-full max-w-md rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4 text-[#333]">
            Weather Check
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="city-name"
                className="text-lg font-semibold text-[#333] mb-2">
                City Name
              </label>
              <input
                type="text"
                id="city-name"
                value={input}
                placeholder="Enter city name"
                onChange={(e) => setInput(e.target.value)}
                className="p-3 border border-[#ddd] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Submit
            </button>
          </form>

          {error && <p className="text-red-800 mt-5">{error}</p>}
          {data.main && (
            <div className="mt-5">
              <h3>{data.name}</h3>
              <p>Temperature: {Math.round(data.main.temp - 273.15)}°C</p>
              <p>Weather: {data.weather[0].description}</p>
              {iconUrl && (
                <img
                  src={iconUrl}
                  alt={data.weather[0].description}
                  className="mx-auto"
                />
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Weather
