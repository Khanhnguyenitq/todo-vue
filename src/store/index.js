import {
  addTask,
  clearCompletedTask,
  completeTask,
  fetchAllTask,
  removeTask,
  updateTask,
} from "@/api";
import { createStore } from "vuex";

const store = createStore({
  state: {
    tasks: [],
  },
  mutations: {
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    updateTask(state, updatedTask) {
      const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    removeTask(state, taskId) {
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    setTaskCompletion(state, { id, completed }) {
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.completed = completed;
      }
    },
    clearCompletedTasks(state) {
      state.tasks = state.tasks.filter((task) => !task.completed);
    },
  },
  getters: {
    tasks: (state) => state.tasks,
  },
  actions: {
    async fetchTasks({ commit }) {
      const tasks = await fetchAllTask();
      commit("setTasks", tasks);
    },

    async handleAddTask({ commit }, task) {
      const newTask = await addTask(task);
      commit("addTask", newTask);
    },
    async handleUpdateTask({ commit }, task) {
      const updatedTask = await updateTask(task.id, task);
      commit("updateTask", updatedTask);
    },
    async handleRemoveTask({ commit }, taskId) {
      await removeTask(taskId);
      commit("removeTask", taskId);
    },
    async handleCompleteTask({ commit }, { id, completed }) {
      await completeTask(id, completed);
      commit("setTaskCompletion", { id, completed });
    },
    async handleClearCompletedTasks({ commit, state }) {
      const completedTaskIds = state.tasks.filter((task) => task.completed).map((task) => task.id);
      await clearCompletedTask(completedTaskIds);
      commit("clearCompletedTasks");
    },
  },
});

export default store;
