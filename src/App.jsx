import { useEffect, useState } from "react";
import ContactList from "./componentes/ContactList";
import "./styles.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ nombre: "", apellido: "", telefono: "" });

  useEffect(() => {
    fetch("/contacts.json")
      .then(res => res.json())
      .then(data => setContacts(data));
  }, []);

  // Agrega un nuevo contacto a la lista
  const addContact = () => {
    if (!form.nombre || !form.apellido || !form.telefono) return;

    setContacts([
      ...contacts,
      { ...form, id: Date.now(), favorito: false }
    ]);

    setForm({ nombre: "", apellido: "", telefono: "" });
  };

  const deleteContact = id => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const toggleFavorite = id => {
    setContacts(
      contacts.map(c =>
        c.id === id ? { ...c, favorito: !c.favorito } : c
      )
    );
  };

  const sortedContacts = [
    ...contacts.filter(c => c.favorito),
    ...contacts.filter(c => !c.favorito)
  ];

  return (
    <div className="container">
      <h2>Lista de Contactos</h2>

      <div className="form">
        <input placeholder="Nombre" value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })} />

        <input placeholder="Apellido" value={form.apellido}
          onChange={e => setForm({ ...form, apellido: e.target.value })} />

        <input placeholder="Teléfono" value={form.telefono}
          onChange={e => setForm({ ...form, telefono: e.target.value })} />

        <button onClick={addContact}>Agregar</button>
      </div>

      <ContactList
        contacts={sortedContacts}
        onDelete={deleteContact}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App;
