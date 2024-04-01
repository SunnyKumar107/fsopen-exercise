const Person = ({ person, onDeleteContact }) => {
  return (
    <div className="contact_list">
      <p>
        {person.name} {person.number}
      </p>
      <button onClick={onDeleteContact}>delete</button>
    </div>
  );
};

export default Person;
