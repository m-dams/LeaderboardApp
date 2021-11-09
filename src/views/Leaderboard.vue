<script>
import { collapsed, toggleSidebar } from "@/components/sidebar/state";
import Index from "../components/leaderboard/Index";
export default {
  components: { Index },
  setup() {
    return { collapsed, toggleSidebar };
  },
  
};
</script>

<template>
  <Index />
</template>
