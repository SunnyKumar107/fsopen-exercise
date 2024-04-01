import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const create = (personObject) => {
  const request = axios.post(baseUrl, personObject);
  return request.then((res) => res.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((res) => res.data);
};
//

const update = (id, updatedObject) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedObject);
  return request.then((res) => res.data);
};

export default {
  getAll: getAll,
  create: create,
  deletePerson: deletePerson,
  update: update,
};
