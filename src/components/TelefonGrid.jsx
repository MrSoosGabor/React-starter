import { useState } from "react";
import TelefonEditModal from "./TelefonEditModal";

export default function TelefonGrid({ mobilok, gyartok, onDelete, onUpdate }) {
  const [editingTelefon, setEditingTelefon] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openEditModal = (telefon) => {
    setEditingTelefon({ ...telefon });
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
    setEditingTelefon(null);
  }

  const handleUpdate = async (id, updateData) => {
    await onUpdate(id, updateData);
    closeModal();
  }

  return (
    <>
      <div className="container mt-5 mb-5">
        <h2 className="mb-4">Telefonok Listája</h2>
        <div className="row g-4">
          {mobilok && mobilok.length > 0 ? (
            mobilok.map((telefon) => {
              return (
                <div key={telefon._id} className="col-md-4 col-sm-6 col-12">
                  <div className="card h-100 shadow-sm" style={{ borderTop: "4px solid #667eea" }}>
                    <div className="card-body">
                      <h5 className="card-title text-primary">{telefon.nev}</h5>
                      <p className="card-text mb-2">
                        <strong>ID:</strong> {telefon._id}
                      </p>
                      <p className="card-text mb-2">
                        <strong>Ár:</strong> <span className="text-success fw-bold">{telefon.ar} Ft</span>
                      </p>
                      <p className="card-text mb-0">
                        <strong>Gyártó:</strong> {telefon.gyartId ? telefon.gyartId.nev : "Ismeretlen"}
                      </p>
                      <div className="d-flex gap-2 mt-3">
                        <button 
                          className="btn btn-warning btn-sm flex-grow-1"
                          onClick={() => openEditModal(telefon)}
                        >
                          Módosítás
                        </button>
                        <button 
                          className="btn btn-danger btn-sm flex-grow-1"
                          onClick={() => onDelete(telefon._id)}
                        >
                          Törlés
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12">
              <div className="alert alert-info text-center">Nincsenek telefonok az adatbázisban</div>
            </div>
          )}
        </div>
      </div>
      
      <TelefonEditModal 
        isOpen={showModal}
        telefon={editingTelefon}
        gyartok={gyartok}
        onClose={closeModal}
        onSave={handleUpdate}
      />
    </>
  );
}
