<template>
  <div class="home">
    <h1 class="page-title">Administration</h1>
    <spotify />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Spotify from '@/components/Spotify.vue'

@Component({
  components: {
    Spotify
  }
})
export default class Admin extends Vue {}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  font-style: none;
}
</style>
