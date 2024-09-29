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
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const tasks = computed(() => store.getters.tasks);
// console.log(tasks);

const fetchAllTask = () => {
  store.dispatch("fetchTasks");
};
onMounted(async () => {
  await fetchAllTask();
});

const isEdit = ref(false);

const handleUpdateTask = async (task) => {
  await store.dispatch("handleUpdateTask", task);
};

const handleRemoveTask = async (task) => {
  await store.dispatch("handleRemoveTask", task);
};

const handleCompleteTask = async (task) => {
  await store.dispatch("handleCompleteTask", { id: task.id, completed: !task.completed });
};

const handleClearCompletedTask = async () => {
  await store.dispatch("handleClearCompletedTasks");
};

// console.log(tasks);
</script>
