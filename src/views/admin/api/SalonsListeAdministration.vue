<template>
  <el-container>
    <el-header style="font-size: 24px; text-align: center">Gestions des salons</el-header>

    <el-main>
      <span>Séléctionner un salon</span>
      <el-select
        style="width:300px; margin-right:20px;"
        v-model="salon.id"
        remote
        filterable
        placeholder="Selectionner un salon"
        :remote-method="getAllSalons"
        :loading="loading"
        @change="getSalon()"
      >
        <el-option v-for="salon in salons" :key="salon.id" :label="salon.name" :value="salon.id"></el-option>
      </el-select>

      <div v-if="salon.id !== ''" style="margin-top: 15px">
        <el-form ref="form" :model="salon" :inline="true" :disabled="formEnable">
          <el-form-item label="Nom">
            <el-input style="width: 150px" type="text" v-model="salon.name" />
          </el-form-item>
          <el-form-item label="Playlist du salon">
            <el-select
              v-model="salon.playlist.id"
              remote
              filterable
              placeholder="Selectionner une playlist"
              :remote-method="getAllPlaylists"
              :loading="loading"
              @change="getPlaylist()"
              style="width: 300px"
            >
              <el-option v-for="playlist in playlists" :key="playlist.id" :label="playlist.name" :value="playlist.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Dernière modification de la playlist">
            <el-date-picker v-model="salon.playlist.lastUpdate" type="datetime" format="dd/MM/yyyy HH:mm:ss" disabled> </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Envoyer</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="formEnable = !formEnable">Modifier</el-button>

        <el-table :data="tracks" stripe border style="width: 100%; margin-top: 10px">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column label="Image" width="100">
            <template slot-scope="scope">
              <el-image :src="scope.row.image"></el-image>
            </template>
          </el-table-column>
          <el-table-column sortable label="Titre">
            <template slot-scope="scope">
              <el-link :href="scope.row.url" target="_blank">{{ scope.row.title }}</el-link>
            </template>
          </el-table-column>
          <el-table-column label="Artiste(s)">
            <template slot-scope="scope">
              <div v-for="(val, index) in scope.row.artists" :key="val.id">
                <el-link :href="val.url" target="_blank">{{ val.name }}</el-link>
                <span v-if="index != scope.row.artists.length - 1"> / </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Extrait">
            <template slot-scope="scope" name="tpl-extract">
              <audio controls v-bind:src="scope.row.preview">
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Salon } from '@/store/musichome.models'
import call from '@/api'

@Component({})
export default class SalonsListeAdministration extends Vue {
  salons = this.getAllSalons('')
  playlists = this.getAllPlaylists('')
  formEnable = true

  loading = false

  tracks = []

  salon: Salon = {
    id: '',
    name: '',
    lastUpdate: new Date(),
    playlist: {
      id: '',
      name: '',
      lastUpdate: new Date(),
      tracks: []
    }
  }

  showTracksTable() {
    if (this.salon.playlist) {
      if (this.salon.playlist.tracks) {
        if (this.salon.playlist.tracks.length) {
          return true
        }
      }
    }
    return false
  }

  async getPlaylist() {
    this.salon.playlist = (await call.get(`/playlist/${this.salon.playlist.id}`)).data
  }

  async getAllPlaylists(query: string) {
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

  async getPlaylistTracks() {
    this.tracks = (await call.get(`/playlist/${this.salon.playlist.id}/tracks`)).data
  }

  async getAllSalons(query: string) {
    this.loading = true
    const res = await call.get('/salon')
    if (query !== '') {
      this.salons = res.data.filter((item: { id: string; name: string }) => {
        return item.name.toLowerCase().indexOf(query.toLowerCase()) > -1
      })
    } else {
      this.salons = res.data
    }
    this.loading = false
  }

  async getSalon() {
    if (this.salon.id !== '') {
      this.salon = (await call.get(`/salon/${this.salon.id}`)).data
      this.salon.playlist.tracks = []
      await this.getPlaylistTracks()
    }
  }

  onSubmit() {
    console.log(this.salon)
  }
}
</script>
