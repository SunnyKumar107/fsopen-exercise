const personsRouter = require("express").Router();
const Persons = require("../models/person");

personsRouter.get("/", (req, res) => {
  Persons.find({})
    .then((persons) => {
      res.json(persons);
    })
    .catch((error) => {
      res.status(400).end();
    });
});

personsRouter.get("/api/persons", (req, res) => {
  const id = req.params.id;
  Persons.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => {
      res.status(400).send({ error: "malformated id" });
    });
});

personsRouter.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  Persons.findByIdAndDelete(id)
    .then((person) => {
      res.status(204).end();
    })
    .catch((error) => {
      console.log("error");
      res.status(400).send({ error: "Not Deleted. Some Error Happend!" });
    });
});

personsRouter.post("/api/persons", (req, res) => {
  const body = req.body;

  const generateId = () => {
    const maxId =
      Persons.find({}).length > 0
        ? Math.max(Persons.find({}).then((person) => person.map((p) => p.id)))
        : 0;
    return maxId + 1;
  };

  Persons.find({}).then((allPerson) => {
    const existName = allPerson.find((p) => p.name === body.name);

    if (!body.name) {
      console.log("name missing");
      return res.status(400).json({
        error: "name missing",
      });
    } else if (!body.number) {
      console.log("number missing");
      return res.status(400).json({
        error: "number missing",
      });
    } else if (existName) {
      console.log("name must be uniqe");
      return res.status(400).json({
        error: "name must be uniqe",
      });
    }

    const newPerson = new Persons({
      id: generateId(),
      name: body.name,
      number: body.number,
    });

    newPerson
      .save()
      .then((person) => {
        res.json(person);
        console.log(person);
      })
      .catch((error) => {
        console.log("error");
        res.status(400).send({ error: "Not Created. Some Error Happend!" });
      });
  });
});

personsRouter.put("/api/persons/:id", (req, res) => {
  const body = req.body;
  const id = req.params.id;

  const person = {
    name: body.name,
    number: body.number,
  };

  Persons.findByIdAndUpdate(id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson);
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({ error: "Not Updated. Some error happend!" });
    });
});

module.exports = personsRouter;
