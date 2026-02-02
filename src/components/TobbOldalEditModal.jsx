import { useState } from "react";

export default function TobbOldalEditModal({ isOpen, telefon, egyOldal, onClose, onSave }) {
  const [editingTelefon, setEditingTelefon] = useState(null);

  // Frissítjük az editingTelefon state-et, amikor a telefon prop megváltozik
  if (telefon && (!editingTelefon || editingTelefon._id !== telefon._id)) {
    setEditingTelefon({ ...telefon });
  }

  const handleUpdate = async () => {
    if (!editingTelefon._id || !editingTelefon.nev || !editingTelefon.ar) {
      alert("Kérjük, töltse ki az összes mezőt");
      return;
    }

    const gyartIdValue = typeof editingTelefon.gyartId === 'object' 
      ? editingTelefon.gyartId._id 
      : editingTelefon.gyartId;

    if (!gyartIdValue) {
      alert("Kérjük, válasszon egy gyártót");
      return;
    }

    const updateData = {
      nev: editingTelefon.nev,
      ar: editingTelefon.ar,
      gyartId: gyartIdValue
    };

    await onSave(editingTelefon._id, updateData);
    handleClose();
  };

  const handleClose = () => {
    setEditingTelefon(null);
    onClose();
  };

  if (!isOpen || !editingTelefon) {
    return null;
  }

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Telefon módosítása</h5>
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <div className="mb-3">
                <label className="form-label">ID:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={editingTelefon._id}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Telefon Neve:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={editingTelefon.nev}
                  onChange={(e) => setEditingTelefon({...editingTelefon, nev: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Ár (Ft):</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={editingTelefon.ar}
                  onChange={(e) => setEditingTelefon({...editingTelefon, ar: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Gyártó:</label>
                <select 
                  className="form-select"
                  value={editingTelefon.gyartId._id || editingTelefon.gyartId}
                  onChange={(e) => {
                    const selectedGyarto = egyOldal.find(g => g._id === e.target.value);
                    setEditingTelefon({...editingTelefon, gyartId: selectedGyarto || e.target.value});
                  }}
                >
                  <option value="">-- Válasszon gyártót --</option>
                  {egyOldal.map((gyarto) => (
                    <option key={gyarto._id} value={gyarto._id}>{gyarto.nev}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={handleClose}
            >
              Mégse
            </button>
            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={handleUpdate}
            >
              Mentés
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
