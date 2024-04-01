exports.info = (req, res) => {
  const currentTime = new Date().toLocaleString();
  Persons.find({}).then((persons) => {
    const resText = `<h2>Phonebook has info for ${persons.length} people </h2><br/><h3>${currentTime}</h3>`;
    res.send(resText);
  });
};

exports.hello = (req, res) => {
  res.send("Hello World");
};
