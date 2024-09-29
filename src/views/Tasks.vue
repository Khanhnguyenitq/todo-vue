<template>
  <div class="w-full h-screen bg-gray-100 pt-8">
    <div class="bg-white p-3 max-w-md mx-auto">
      <div class="text-center">
        <h1 class="text-3xl font-bold">ToDo App</h1>
        <NewTask @addTask="fetchAllTask" />
      </div>
      <div class="mt-8">
        <ul>
          <Task
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @updateTask="handleUpdateTask"
            @removeTask="handleRemoveTask"
            @completeTask="handleCompleteTask"
          />
        </ul>
      </div>
      <div class="mt-8">
        <button @click="handleClearCompletedTask" class="border-2 border-red-500 p-2 text-red-500">
          Clear Completed Task
        </button>
        <button class="border-2 border-indigo-500 p-2 text-indigo-500 ml-4">Reset Todo List</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import NewTask from "../components/NewTask.vue";
import Task from "../components/Task.vue";
import TaskRemove from "../components/TaskRemove.vue";
import { getAllTask, updateTask, removeTask, completeTask, clearCompletedTask } from "../api";
import { computed, onMounted, ref } from "vue";

const tasks = ref([]);

const fetchAllTask = async () => {
  const res = await getAllTask();
  tasks.value = res;
};
onMounted(() => {
  fetchAllTask();
});

const isEdit = ref(false);

const handleUpdateTask = async (task) => {
  console.log(task);

  const { isEdit, ...taskData } = task;
  // debugger;
  const res = await updateTask(task.id, taskData);
  task.value = res;
  task.isEdit = false;
};

const handleRemoveTask = async (task) => {
  if (confirm("Are you sure you want to delete this task?")) {
    await removeTask(task.id);
    fetchAllTask();
  }
};

const handleCompleteTask = async (task) => {
  const newCompleted = !task.completed;
  await completeTask(task.id, newCompleted);
  task.completed = newCompleted;
};

const handleClearCompletedTask = async () => {
  const completedTaskIds = tasks.value.filter((task) => task.completed).map((task) => task.id);

  if (completedTaskIds.length > 0) {
    const result = await clearCompletedTask(completedTaskIds);

    if (result) {
      fetchAllTask();
    } else {
      alert("Đã xảy ra lỗi khi xóa các tác vụ đã hoàn thành.");
    }
  } else {
    alert("Không có tác vụ nào đã hoàn thành để xóa.");
  }
};

// console.log(tasks);
</script>
