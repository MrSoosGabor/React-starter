import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
  const [adatok, setAdatok] = useState([])
  console.log(adatok);

  useEffect(() => {
    fetchData();
    fetchDataById(1);
  }, []);

  const fetchData = async () => {
    const res = await fetch('http://localhost:3000/api/data')
    const data = await res.json()
    console.log(data);
    setAdatok(data)
  };

  const addData = async () => {
    const newData = {
      "user": "XY",
      "email": "xy@example.com",
    }

    const res = await fetch('http://localhost:3000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData)
    })
    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message || 'Hiba a felvitel során')
    }
    console.log('Sikeres felvitel:', data);
  }

  const fetchDataById = async (userId) => {
    const res = await fetch(`http://localhost:3000/api/data/${userId}`)
    const data = await res.json()
    console.log(data);
  }

  return (
    <>
      <BrowserRouter>
        <h1>Ez minden oldalon meg fog jelenni.</h1>
        <button onClick={addData}>
          Add Data
        </button>
        <Routes>
          <Route path='/' element={<Home data={adatok} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
