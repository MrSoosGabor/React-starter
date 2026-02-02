import { useEffect, useState } from "react";
import TobbOldalForm from "./components/TobbOldalForm";
import TobbOldalGrid from "./components/TobbOldalGrid";
import { tobb_oldalAPI, egy_oldalAPI } from "./services/api";
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
      const egyOldalData = await egy_oldalAPI.getAll();
      //console.log("Egy oldali adatok:", egyOldalData);
      setEgyOldal(egyOldalData);

      const tobbOldalData = await tobb_oldalAPI.getAll();
      //console.log("Több oldali adatok:", tobbOldalData);
      setTobbOldal(tobbOldalData);
    } catch (error) {
      console.error("Hiba az adatok betöltése során:", error);
      alert("Hiba történt az adatok betöltése során");
    }
  };

  const handleSubmit = async (obj) => {
    try {
      const data = await tobb_oldalAPI.create(obj);
      console.log(data);
      alert("Sikeres adatfelvétel");
      
      // Újra betöltjük a telefonok listáját
      const tobbOldalData = await tobb_oldalAPI.getAll();
      setTobbOldal(tobbOldalData);
    } catch (error) {
      console.error("Hiba az adatfelvétel során:", error);
      alert("Hiba történt az adatfelvétel során: " + error.message);
    }
  }

  const handleUpdate = async (id, updateData) => {
    try {
      console.log("Módosítási kérés adatai:", updateData);
      const data = await tobb_oldalAPI.update(id, updateData);
      console.log(data);
      alert("Telefon sikeresen módosítva");
      
      // Frissítjük a listát
      const tobbOldalData = await tobb_oldalAPI.getAll();
      console.log("Telefonok:", tobbOldalData);
      setTobbOldal(tobbOldalData);
    } catch (error) {
      console.error("Hiba a módosítás során:", error);
      alert("Hiba történt a módosítás során: " + error.message);
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Biztosan törli ezt a telefont?")) {
      try {
        await tobb_oldalAPI.delete(id);
        alert("Telefon sikeresen törölve");
        
        // Frissítjük a listát
        const tobbOldalData = await tobb_oldalAPI.getAll();
        console.log("Telefonok:", tobbOldalData);
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
          <Route path="/lista" element={<TobbOldalGrid 
            tobbOldal={tobbOldal} 
            egyOldal={egyOldal} 
            onDelete={handleDelete} 
            onUpdate={handleUpdate}
          />} />
          <Route path="/felvitel" element={<TobbOldalForm 
            egyOldal={egyOldal} 
            onSubmit={handleSubmit}
          />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
