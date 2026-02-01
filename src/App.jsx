import { useEffect, useState } from "react";
import TelefonForm from "./components/TelefonForm";
import TelefonGrid from "./components/TelefonGrid";
import { tobb_oldalAPI, egy_oldalAPI } from "./services/api";

function App() {
  const [gyartok, setGyartok] = useState([]);
  const [mobilok, setMobilok] = useState([]);
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const gyartokData = await egy_oldalAPI.getAll();
      console.log("Gyártók:", gyartokData);
      setGyartok(gyartokData);

      const mobilokData = await tobb_oldalAPI.getAll();
      console.log("Telefonok:", mobilokData);
      setMobilok(mobilokData);
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
      const mobilokData = await tobb_oldalAPI.getAll();
      setMobilok(mobilokData);
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
      const mobilokData = await tobb_oldalAPI.getAll();
      console.log("Telefonok:", mobilokData);
      setMobilok(mobilokData);
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
        const mobilokData = await tobb_oldalAPI.getAll();
        console.log("Telefonok:", mobilokData);
        setMobilok(mobilokData);
      } catch (error) {
        console.error("Hiba a törlés során:", error);
        alert("Hiba történt a törlés során: " + error.message);
      }
    }
  }
  
  return (
    <>
      <TelefonForm gyartok={gyartok} onSubmit={handleSubmit} />
      <TelefonGrid 
        mobilok={mobilok} 
        gyartok={gyartok} 
        onDelete={handleDelete} 
        onUpdate={handleUpdate}
      />
    </>
  )
}

export default App
