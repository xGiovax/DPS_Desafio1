import Contact from "./Contact";

export default function ContactList({ contacts, onDelete, onToggleFavorite }) {
  return (
    <>
      {contacts.map(contact => (
        <Contact
          key={contact.id}
          contact={contact}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </>
  );
}