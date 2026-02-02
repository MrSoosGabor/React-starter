import { useState } from 'react';

export default function TobbOldalForm({ egyOldal, onSubmit }) {
  console.log(egyOldal);
  
  const [formData, setFormData] = useState({
    nev: '',
    url: '',
    leiras: '',
    kategoria: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <div className="d-flex justify-content-center pt-5">
      <div style={{ width: "100%", maxWidth: "500px", padding: "30px" }}>
        <h2 className="text-center mb-4 text-white" style={{ backgroundColor: "#667eea", padding: "20px", borderRadius: "10px 10px 0 0" }}>Felvitel</h2>
        
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-bottom shadow">
          <div className="mb-3">
            <label htmlFor="nev" className="form-label fw-bold">Név</label>
            <input
              type="text"
              className="form-control"
              id="nev"
              name="nev"
              value={formData.nev}
              onChange={handleChange}
              placeholder="Adja meg a nevet"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="url" className="form-label fw-bold">URL</label>
            <input
              type="url"
              className="form-control"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://pelda.hu"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="kategoria" className="form-label fw-bold">Kategória</label>
            <select
              className="form-select"
              id="kategoria"
              name="kategoria"
              value={formData.kategoria}
              onChange={handleChange}
              required
            >
              <option value="">Válasszon kategóriát...</option>
              {egyOldal && egyOldal.map((kat, index) => (
                <option key={kat.id || index} value={kat.id}>
                  {kat.nev}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="leiras" className="form-label fw-bold">Leírás</label>
            <textarea
              className="form-control"
              id="leiras"
              name="leiras"
              value={formData.leiras}
              onChange={handleChange}
              rows="4"
              placeholder="Adja meg a leírást..."
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-lg" style={{ backgroundColor: "#667eea", border: "none" }}>
              Hozzáadás
            </button>
          </div>
        </form>
        
      </div>
    </div>
  );
}
