<template>
  <div>
    <li class="p-2 rounded-lg">
      <div class="flex align-middle flex-row justify-between">
        <div class="p-2">
          <input
            type="checkbox"
            class="h-6 w-6"
            value="true"
            :checked="task.completed"
            @change="emit('completeTask', task)"
          />
        </div>
        <div
          @click="task.isEdit = true"
          :class="task.completed ? 'line-through text-gray-400' : 'text-lg'"
          class="p-2"
        >
          <p v-if="task.isEdit">
            <input
              type="text"
              class="border-2 border-gray-300 p-2 rounded-lg"
              v-model="task.title"
              v-focus
              @blur="task.isEdit = false"
              @keyup.enter="emit('updateTask', task)"
            />
          </p>
          <span v-else>
            {{ task.title }}
          </span>
        </div>
        <TaskRemove :task="task" @remove="emit('removeTask', task)" />
      </div>
      <hr class="mt-2" />
    </li>
  </div>
</template>
<script setup>
import TaskRemove from "./TaskRemove.vue";
const emit = defineEmits(["updateTask", "removeTask", "completeTask"]);
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const vFocus = {
  mounted(el) {
    el.focus();
  },
};
</script>
