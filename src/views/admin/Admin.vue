<template>
  <div class="home">
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1, 2']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>Source</template>
            <el-menu-item-group>
              <el-menu-item @click="changeView('music-source-authentification')" index="1-1">Authentification</el-menu-item>
              <el-menu-item @click="changeView('music-source-playlist')" index="1-2">Playliste</el-menu-item>
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

      <MusicSourcePlaylist v-if="checkMenu('music-source-playlist')" />
      <MusicSourceAuthentification v-if="checkMenu('music-source-authentification')" />
      <SalonsListeAdministration v-if="checkMenu('musichome-salons-liste')" />
      <SalonsCreationAdministration v-if="checkMenu('musichome-salons-creation')" />
    </el-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import MusicSourceAuthentification from '@/views/admin/music-source/Authentification.vue'
import MusicSourcePlaylist from '@/views/admin/music-source/Playlist.vue'
import SalonsListeAdministration from '@/views/admin/api/SalonsListeAdministration.vue'
import SalonsCreationAdministration from '@/views/admin/api/SalonsCreationAdministration.vue'

@Component({
  components: {
    MusicSourceAuthentification,
    MusicSourcePlaylist,
    SalonsListeAdministration,
    SalonsCreationAdministration
  }
})
export default class Admin extends Vue {
  selectedMenu = 'music-source-authentification'

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
