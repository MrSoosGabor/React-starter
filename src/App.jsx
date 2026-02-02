import { useEffect, useState } from "react";
import Form from "./components/Form";
import Grid from "./components/Grid";
import { tobbOldalAPI, egyOldalAPI } from "./services/api";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import Home from "./components/Home";

function App() {
  const [tobbOldal, setTobbOldal] = useState([]);
  const [egyOldal, setEgyOldal] = useState([]);
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const egyOldalData = await egyOldalAPI.getAll();
      //console.log("Egy oldali adatok:", egyOldalData);
      setEgyOldal(egyOldalData);

      const tobbOldalData = await tobbOldalAPI.getAll();
      //console.log("Több oldali adatok:", tobbOldalData);
      setTobbOldal(tobbOldalData);
    } catch (error) {
      console.error("Hiba az adatok betöltése során:", error);
      alert("Hiba történt az adatok betöltése során");
    }
  };

  const handleSubmit = async (obj) => {
    try {
      const data = await tobbOldalAPI.create(obj);
      console.log(data);
      alert("Sikeres adatfelvétel");
      
      // Újra betöltjük a tobbOldal listáját
      const tobbOldalData = await tobbOldalAPI.getAll();
      setTobbOldal(tobbOldalData);
    } catch (error) {
      console.error("Hiba az adatfelvétel során:", error);
      alert("Hiba történt az adatfelvétel során: " + error.message);
    }
  }

  const handleUpdate = async (id, updateData) => {
    try {
      console.log("Módosítási kérés adatai:", updateData);
      const data = await tobbOldalAPI.update(id, updateData);
      console.log(data);
      alert("Sikeresen módosítva");
      
      // Frissítjük a listát
      const tobbOldalData = await tobbOldalAPI.getAll();
      console.log("Több oldali adatok:", tobbOldalData);
      setTobbOldal(tobbOldalData);
    } catch (error) {
      console.error("Hiba a módosítás során:", error);
      alert("Hiba történt a módosítás során: " + error.message);
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Biztosan törli ezt?")) {
      try {
        await tobbOldalAPI.delete(id);
        alert("Sikeresen törölve");
        
        // Frissítjük a listát
        const tobbOldalData = await tobbOldalAPI.getAll();
        console.log("Több oldali adatok:", tobbOldalData);
        setTobbOldal(tobbOldalData);
      } catch (error) {
        console.error("Hiba a törlés során:", error);
        alert("Hiba történt a törlés során: " + error.message);
      }
    }
  }
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lista" element={<Grid 
            tobbOldal={tobbOldal} 
            egyOldal={egyOldal} 
            onDelete={handleDelete} 
            onUpdate={handleUpdate}
          />} />
          <Route path="/felvitel" element={<Form 
            egyOldal={egyOldal} 
            onSubmit={handleSubmit}
          />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
