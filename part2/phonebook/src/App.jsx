import "./App.css";
import { useEffect, useState } from "react";
import personServices from "./services/action";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    personServices
      .getAll()
      .then((initialNote) => {
        setPersons(initialNote);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const handleAddContact = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: Math.floor(Math.random() * 10000).toString(),
    };

    const similarPerson = persons.find((p) => p.name === personObject.name);
    const updatedPerson = { ...similarPerson, number: personObject.number };

    if (similarPerson == undefined) {
      personServices
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
          setSubmitMessage(`Added ${personObject.name}`);
        })
        .catch((error) => {
          setSubmitMessage(error.message);
          setNewName("");
          setNewNumber("");
        });
    } else {
      const isReplace = window.confirm(
        `${similarPerson.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (isReplace) {
        personServices
          .update(similarPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.name !== similarPerson.name ? person : returnedPerson
              )
            );
            setSubmitMessage(`Updated ${personObject.name}`);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            alert(
              `the person ${similarPerson.name} was already deleted from server.`
            );
            setPersons(persons.filter((p) => p.id !== similarPerson.id));
            setSubmitMessage(error.message);
          });
      } else {
        setNewName("");
        setNewNumber("");
      }
    }

    setTimeout(() => {
      setSubmitMessage("");
    }, 2000);
  };

  const handleDeleteContact = (id) => {
    const deleteThisPerson = persons.filter((person) => person.id === id);

    const isDelete = window.confirm(`${deleteThisPerson[0].name} Delete?`);
    if (isDelete) {
      personServices
        .deletePerson(id)
        .then((deletePerson) => {
          setPersons(persons.filter((p) => p.id !== deletePerson.id));
          setSubmitMessage(`Deleted ${deletePerson.name}`);
          setTimeout(() => {
            setSubmitMessage("");
          }, 2000);
        })
        .catch((error) => setSubmitMessage(error.message));
    }
  };

  const filteredPerson = persons.filter((person) =>
    person.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      {submitMessage && (
        <div className="message">
          <p>{submitMessage}</p>
        </div>
      )}
      <div>
        filter shown with{" "}
        <input
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleAddContact}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
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
      <h2>Numbers</h2>
      {filteredPerson.map((person) => (
        <Person
          person={person}
          key={person.id}
          onDeleteContact={() => handleDeleteContact(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
