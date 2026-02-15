export default function Contact({ contact, onDelete, onToggleFavorite }) {
  return (
    <div className={`contact ${contact.favorito ? "favorite" : ""}`}>
      <h4>{contact.nombre} {contact.apellido}</h4>
      <p> {contact.telefono}</p>

      <button onClick={() => onToggleFavorite(contact.id)}>
        {contact.favorito ? "Quitar favorito" : "Agregar a favoritos"}
      </button>

      <button onClick={() => onDelete(contact.id)}>Eliminar</button>
    </div>
  );
}