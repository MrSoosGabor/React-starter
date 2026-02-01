import { ErrorMessage, Field, Form, Formik } from "formik";

export default function TelefonForm({ gyartok, onSubmit }) {
  return (
    <div className="d-flex justify-content-center pt-5">
      <div style={{ width: "100%", maxWidth: "500px", padding: "30px" }}>
        <h2 className="text-center mb-4 text-white" style={{ backgroundColor: "#667eea", padding: "20px", borderRadius: "10px 10px 0 0" }}>Telefon Felvétel</h2>
        <Formik
          initialValues={{ _id: "", nev: "", ar: "", gyartId: "" }}
          validate={(values) => {
            const errors = {};
            if (!values._id) {
              errors._id = "Kötelező kitölteni";
            }
            if (!values.nev) {
              errors.nev = "Kötelező kitölteni";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            console.log("Form data", values);
            await onSubmit(values);
            setSubmitting(false);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="p-4" style={{ backgroundColor: "#f8f9fa", borderRadius: "0 0 10px 10px", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}>
              <div className="mb-3">
                <label htmlFor="_id" className="form-label">ID: </label>
                <Field type="text" name="_id" placeholder="Adjon meg egy egyedi ID-t" className="form-control" />
                <ErrorMessage name="_id" component="div" className="text-danger mt-2" />
              </div>
              <div className="mb-3">
                <label htmlFor="nev" className="form-label">Telefon Neve: </label>
                <Field type="text" name="nev" placeholder="pl. iPhone 15 Pro" className="form-control" />
                <ErrorMessage name="nev" component="div" className="text-danger mt-2" />
              </div>
              <div className="mb-3">
                <label htmlFor="ar" className="form-label">Ár (Ft): </label>
                <Field type="text" name="ar" placeholder="pl. 500000" className="form-control" />
                <ErrorMessage name="ar" component="div" className="text-danger mt-2" />
              </div>
              <div className="mb-3">
                <label htmlFor="gyartId" className="form-label">Gyártó: </label>
                <Field name="gyartId" as="select" className="form-select">
                  <option value="">-- Válasszon gyártót --</option>
                  {gyartok.map((gyarto) => (
                    <option key={gyarto._id} value={gyarto._id}>{gyarto.nev}</option>
                  ))}
                </Field>
                <ErrorMessage name="gyartId" component="div" className="text-danger mt-2" />
              </div>

              <button type="submit" disabled={isSubmitting} className="btn btn-primary w-100 fw-bold">
                {isSubmitting ? "Feldolgozás..." : "Hozzáadás"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
