const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Persons = mongoose.model("person", personSchema);

module.exports = Persons;
