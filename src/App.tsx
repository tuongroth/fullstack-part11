import React, { useState, useEffect } from "react";

const App = () => {
  // Initialize data directly into the app, instead of fetching from db.json
  const initialData = [
    { id: 1, name: "John Doe", number: "123-456" },
    { id: 2, name: "Jane Doe", number: "987-654" }
  ];

  const [persons, setPersons] = useState(initialData); // Set initial data in the state
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [notificationType, setNotificationType] = useState("");

  // Notification component
  const Notification = ({ message, type }) => {
    if (!message) return null;

    const style = {
      color: type === "success" ? "green" : "red",
      background: "lightgrey",
      fontSize: "20px",
      border: "1px solid",
      borderRadius: "5px",
      padding: "10px",
      marginBottom: "10px",
    };

    return <div style={style}>{message}</div>;
  };

  // Handle form submit to add a person
  const handleAddPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find((p) => p.name === newName);
    const newPerson = { name: newName, number: newNumber };

    if (existingPerson) {
      // Update number for an existing contact
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        setPersons(
          persons.map((p) =>
            p.id === existingPerson.id ? { ...p, number: newNumber } : p
          )
        );
        showNotification(`Updated ${newName}`, "success");
      }
    } else {
      // Add new contact
      const newId = persons.length + 1;
      const newPersonWithId = { ...newPerson, id: newId };
      setPersons(persons.concat(newPersonWithId));
      showNotification(`Added ${newName}`, "success");
    }

    setNewName("");
    setNewNumber("");
  };

  // Handle delete action
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      setPersons(persons.filter((p) => p.id !== id));
      showNotification(`Deleted ${name}`, "success");
    }
  };

  // Show notifications
  const showNotification = (message, type) => {
    setNotification(message);
    setNotificationType(type);

    setTimeout(() => {
      setNotification(null);
      setNotificationType("");
    }, 5000);
  };

  // Filtered list of persons
  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} type={notificationType} />

      <div>
        filter shown with:{" "}
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <h3>Add a new</h3>
      <form onSubmit={handleAddPerson}>
        <div>
          name:{" "}
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h3>Numbers</h3>
      <ul>
        {personsToShow.map((p) => (
          <li key={p.id}>
            {p.name} {p.number}{" "}
            <button onClick={() => handleDelete(p.id, p.name)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
