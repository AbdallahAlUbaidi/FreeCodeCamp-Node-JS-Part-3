require('dotenv').config();
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});
let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({ name: "Abdullah", age: 22, favoriteFoods: ["Pizza"] });
  person.save((err, data) => {
    if (err) done(err)
    else done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) done(err)
    else done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, people) => {
    if (err) done(err);
    else done(null, people);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, person) => {
    if (err) done(err);
    else done(null, person);
  });
};

const findPersonById = (personId, done) => {
  Person.findOne({ _id: personId }, (err, person) => {
    if (err) done(err)
    else done(null, person);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findOne({ _id: personId }, (err, person) => {
    if (err) done(err)
    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {
      if (err) done(err)
      else done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, person) => {
    if (err) done(err)
    else done(null, person);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) => {
    if (err) done(err);
    else done(null, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) done(err)
    else done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec((err, result) => {
      if (err) done(err)
      else done(null, result)
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
