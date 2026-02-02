import { useState } from "react";
import TobbOldalEditModal from "./EditModal";

export default function Grid({ tobbOldal, egyOldal, onDelete, onUpdate }) {
  const [editingTobbOldal, setEditingTobbOldal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openEditModal = (tobbOldal) => {
    setEditingTobbOldal({ ...tobbOldal });
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
    setEditingTobbOldal(null);
  }

  const handleUpdate = async (id, updateData) => {
    await onUpdate(id, updateData);
    closeModal();
  }

  return (
    <>
      <div className="container mt-5 mb-5">
        <h2 className="mb-4">Lista</h2>
        <div className="row g-4">
          {tobbOldal && tobbOldal.length > 0 ? (
            tobbOldal.map((tobbOldal) => {
              return (
                <div key={tobbOldal._id} className="col-md-4 col-sm-6 col-12">
                  <div className="card h-100 shadow-sm" style={{ borderTop: "4px solid #667eea" }}>
                    <div className="card-body">
                      <h5 className="card-title text-primary">{tobbOldal.nev}</h5>
                      <p className="card-text mb-2">
                        <strong>ID:</strong> {tobbOldal._id}
                      </p>
                      <p className="card-text mb-2">
                        <strong>Ár:</strong> <span className="text-success fw-bold">{tobbOldal.ar} Ft</span>
                      </p>
                      <p className="card-text mb-0">
                        <strong>Gyártó:</strong> {tobbOldal.gyartId ? tobbOldal.gyartId.nev : "Ismeretlen"}
                      </p>
                      <div className="d-flex gap-2 mt-3">
                        <button 
                          className="btn btn-warning btn-sm flex-grow-1"
                          onClick={() => openEditModal(tobbOldal)}
                        >
                          Módosítás
                        </button>
                        <button 
                          className="btn btn-danger btn-sm flex-grow-1"
                          onClick={() => onDelete(tobbOldal._id)}
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
              <div className="alert alert-info text-center">Üres a lista</div>
            </div>
          )}
        </div>
      </div>
      
      <TobbOldalEditModal 
        isOpen={showModal}
        tobbOldal={editingTobbOldal}
        egyOldal={egyOldal}
        onClose={closeModal}
        onSave={handleUpdate}
      />
    </>
  );
}
