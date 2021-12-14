<template>
  <div
    class="
      p-2
      h-full
      w-full
      flex flex-col
      justify-center
      items-center
      space-y-8
    "
  >
    <Title name="Home" />

    <ul class="flex flex-col space-y-2 decoration-clone">
      <li><router-link to="/test">Test</router-link></li>
      <li><router-link to="/page1">Page1</router-link></li>
      <li><router-link to="/page2">Page2</router-link></li>
    </ul>
    <button
      @click="state.count++"
      class="mt-3 border-2 border-black rounded-md p-2"
    >
      count is: {{ state.count }}
    </button>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const state = reactive({
  count: 0,
});
</script>

<style scoped>
h1,
a {
  color: green;
}
</style>
