<template>
  <el-container>
    <el-header style="font-size: 24px; text-align: center">Création d'un salon</el-header>

    <el-main>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Nom">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Playlist">
          <el-select
            v-model="form.playlistId"
            remote
            filterable
            placeholder="Selectionner une playliste"
            :remote-method="getAllPlaylistsInformations"
            :loading="loading"
          >
            <el-option v-for="playlist in playlists" :key="playlist.id" :label="playlist.name" :value="playlist.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Créer</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import call from '@/api'

@Component({})
export default class SalonsCreationAdministration extends Vue {
  playlist = this.getAllPlaylistsInformations('')
  loading = false
  playlists = []
  form = {
    name: '',
    playlistId: ''
  }

  async getAllPlaylistsInformations(query: string) {
    this.loading = true
    const res = await call.get('/playlist')
    if (query !== '') {
      this.loading = false
      this.playlists = res.data.filter((item: { id: string; name: string }) => {
        return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1
      })
    } else {
      this.playlists = res.data
    }
  }

  async onSubmit() {
    const res = await call.post('/salon', this.form)
    console.log('submit!', res)
  }
}
</script>
