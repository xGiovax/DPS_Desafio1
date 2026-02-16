// Importo los hooks useState y useEffect desde React.
// useState se usa para manejar el estado de la aplicación
// y useEffect para ejecutar código cuando el componente se monta.
import { useEffect, useState } from "react";

// Importo el componente ContactList que se encarga de mostrar la lista de contactos
import ContactList from "./componentes/ContactList";

// Importo los estilos CSS de la aplicación
import "./styles.css";

function App() {

  // Estado que almacena el arreglo de contactos
  // Aquí se guardan todos los contactos cargados y los que el usuario agregue
  const [contacts, setContacts] = useState([]);

  // Estado que almacena los datos del formulario
  // Se utiliza para controlar los valores de los inputs
  const [form, setForm] = useState({ nombre: "", apellido: "", telefono: "" });

  // useEffect se ejecuta una sola vez cuando el componente se carga
  // Se utiliza para traer los contactos iniciales desde el archivo JSON
  useEffect(() => {
    fetch("/contacts.json")              // Se solicita el archivo JSON
      .then(res => res.json())           // Se convierte la respuesta a formato JSON
      .then(data => setContacts(data));  // Se guardan los contactos en el estado
  }, []);

  // Función que agrega un nuevo contacto a la lista
  const addContact = () => {

    // Se valida que ningún campo esté vacío
    if (!form.nombre || !form.apellido || !form.telefono) return;

    // Se actualiza el estado agregando el nuevo contacto al arreglo
    setContacts([
      ...contacts,                         // Se copian los contactos existentes
      { ...form, id: Date.now(), favorito: false } // Se agrega el nuevo contacto con un ID único
    ]);

    // Se limpian los campos del formulario después de agregar
    setForm({ nombre: "", apellido: "", telefono: "" });
  };

  // Función que elimina un contacto según su ID
  const deleteContact = id => {
    // Se filtra la lista dejando solo los contactos que no coinciden con el ID eliminado
    setContacts(contacts.filter(c => c.id !== id));
  };

  // Función que marca o desmarca un contacto como favorito
  const toggleFavorite = id => {
    setContacts(
      contacts.map(c =>
        // Si el ID coincide, se invierte el valor de favorito
        c.id === id ? { ...c, favorito: !c.favorito } : c
      )
    );
  };

  // Se ordenan los contactos para que los favoritos aparezcan primero
  // Primero se colocan los que son favoritos y luego los normales
  const sortedContacts = [
    ...contacts.filter(c => c.favorito),
    ...contacts.filter(c => !c.favorito)
  ];

  return (
    <div className="container">
      <h2>Lista de Contactos</h2>

      {/* Formulario para ingresar un nuevo contacto */}
      <div className="form">

        {/* Input controlado para el nombre */}
        <input 
          placeholder="Nombre" 
          value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })} 
        />

        {/* Input controlado para el apellido */}
        <input 
          placeholder="Apellido" 
          value={form.apellido}
          onChange={e => setForm({ ...form, apellido: e.target.value })} 
        />

        {/* Input controlado para el teléfono */}
        <input 
          placeholder="Teléfono" 
          value={form.telefono}
          onChange={e => setForm({ ...form, telefono: e.target.value })} 
        />

        {/* Botón que ejecuta la función para agregar un contacto */}
        <button onClick={addContact}>Agregar</button>
      </div>

      {/* Se envía la lista ordenada y las funciones al componente ContactList */}
      <ContactList
        contacts={sortedContacts}
        onDelete={deleteContact}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App;
