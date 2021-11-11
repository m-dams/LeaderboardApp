<script>
import { collapsed, toggleSidebar } from "@/components/sidebar/state";
import Leaderboard from "../components/leaderboard/Leaderboard";
export default {
  components: { Leaderboard },
  setup() {
    return { collapsed, toggleSidebar };
  },
};
</script>

<template>
  <Leaderboard />
</template>
