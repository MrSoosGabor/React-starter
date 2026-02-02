import { useEffect, useState } from "react";

function App() {
  const [tobbOldal, setTobbOldal] = useState([]);
  const [egyOldal, setEgyOldal] = useState([]);
  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const egyOldalData = await egyOldalAPI.getAll();
      console.log("Egy oldali adatok:", egyOldalData);
      setEgyOldal(egyOldalData);

      const tobbOldalData = await tobbOldalAPI.getAll();
      console.log("Több oldali adatok:", tobbOldalData);
      setTobbOldal(tobbOldalData);
    } catch (error) {
      console.error("Hiba az adatok betöltése során:", error);
      alert("Hiba történt az adatok betöltése során");
    }
  };

  return (
    <>

    </>
  )
}

export default App
