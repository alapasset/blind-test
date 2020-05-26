<template>
  <div class="home">
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>Spotify</template>
            <el-menu-item-group>
              <el-menu-item @click="changeView('spotify-authentification')" index="1-1">Authentification</el-menu-item>
              <el-menu-item @click="changeView('spotify-playlist')" index="1-2">Playliste</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>Music Home</template>
            <el-menu-item-group>
              <el-menu-item @click="changeView('musichome-salon')" index="2-1">Salons</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <SpotifyPlaylist v-if="checkMenu('spotify-playlist')" />
      <SpotifyAuthentification v-if="checkMenu('spotify-authentification')" />
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SpotifyAuthentification from '@/views/admin/spotify/Authentification.vue'
import SpotifyPlaylist from '@/views/admin/spotify/Playlist.vue'

@Component({
  components: {
    SpotifyAuthentification,
    SpotifyPlaylist
  }
})
export default class Admin extends Vue {
  selectedMenu = 'spotify-authentification'

  changeView(selectedMenu: string) {
    this.selectedMenu = selectedMenu
  }

  checkMenu(menuTocheck: string) {
    return menuTocheck === this.selectedMenu
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  font-style: none;
}
</style>
