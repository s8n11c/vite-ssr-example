<template>
  <h1 class="text-4xl m-2 font-semibold capitalize">{{ name }}</h1>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  // type inference enabled
  props: {
    name: String,
  },
});
</script>
