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
            <el-menu-item-group title="Salon">
              <el-menu-item @click="changeView('musichome-salons-liste')" index="2-1">Liste des salons</el-menu-item>
              <el-menu-item @click="changeView('musichome-salons-creation')" index="2-2">Créer un salon</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <SpotifyPlaylist v-if="checkMenu('spotify-playlist')" />
      <SpotifyAuthentification v-if="checkMenu('spotify-authentification')" />
      <SalonsListeAdministration v-if="checkMenu('musichome-salons-liste')" />
      <SalonsCreationAdministration v-if="checkMenu('musichome-salons-creation')" />
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import SpotifyAuthentification from '@/views/admin/spotify/Authentification.vue'
import SpotifyPlaylist from '@/views/admin/spotify/Playlist.vue'
import SalonsListeAdministration from '@/views/admin/api/SalonsListeAdministration.vue'
import SalonsCreationAdministration from '@/views/admin/api/SalonsCreationAdministration.vue'

@Component({
  components: {
    SpotifyAuthentification,
    SpotifyPlaylist,
    SalonsListeAdministration,
    SalonsCreationAdministration
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
