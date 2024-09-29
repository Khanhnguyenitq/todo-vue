import axios from "axios";

export const getAllTask = () => {
  return axios
    .get("http://localhost:3002/tasks")
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const addTask = (task) => {
  return axios
    .post("http://localhost:3002/tasks", task)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const updateTask = (id, task) => {
  return axios
    .put(`http://localhost:3002/tasks/${task.id}`, task)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const removeTask = (id) => {
  return axios
    .delete(`http://localhost:3002/tasks/${id}`)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

export const completeTask = (id, completed) => {
  return axios
    .patch(`http://localhost:3002/tasks/${id}`, { completed })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// export const clearCompletedTask = (ids) => {
//   return axios
//     .delete("http://localhost:3002/tasks", { data: { ids } })
//     .then((res) => res.data)
//     .catch((err) => console.log(err));
// };

export const clearCompletedTask = async (ids) => {
  const deletePromises = ids.map((id) => {
    return axios.delete(`http://localhost:3002/tasks/${id}`);
  });

  try {
    await Promise.all(deletePromises);
    return true; // Hoặc có thể trả về thông tin khác nếu cần
  } catch (err) {
    console.log(err);
    return false; // Nếu có lỗi xảy ra
  }
};
