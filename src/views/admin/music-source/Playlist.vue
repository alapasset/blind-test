<template>
  <el-container>
    <el-header style="font-size: 24px; text-align: center">Source - Playlist</el-header>

    <el-main v-if="needLogin">
      Vous devenez vous loguer
    </el-main>
    <el-main v-else>
      <div>
        <el-input style="width:250px; margin-right:5px;" type="text" id="playlist_id" name="playlist_id" v-model="playlist_id" />
        <el-button @click="searchPlaylist()">Chercher la playlist</el-button>
        <el-button v-if="playlist.tracks" @click="addPlaylistToBack()">Créer une salle a partir de la playliste</el-button>
      </div>

      <div v-if="playlist.tracks">
        <el-table :data="formatPlaylistInformations(playlist)" stripe border style="width: 100%; margin-top: 10px">
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
                <el-link :href="val.external_urls.spotify" target="_blank">{{ val.name }}</el-link>
                <span v-if="index != Object.keys(scope.row.artists).length - 1"> / </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Extrait">
            <template slot-scope="scope" name="tpl-extract">
              <audio controls v-bind:src="scope.row.previewUrl">
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
import { MusicSourceModule } from '@/store/modules/music-source'
import { Playlist, PlaylistTrack } from '@/store/music-source.models'
import call from '@/api'

@Component({})
export default class MusicSourcePlaylist extends Vue {
  playlist_id = '7oBeEkujcRybm7dCAUAIhG'
  playlist = {}

  get needLogin() {
    return MusicSourceModule.mustHaveNewAuthorization
  }

  async searchPlaylist() {
    this.playlist = (await MusicSourceModule.getPlaylistInformations(this.playlist_id)) as Playlist
  }

  async addPlaylistToBack() {
    console.log(await call.post('/playlist', this.playlist))
  }

  formatPlaylistInformations(playlist: Playlist) {
    const res: object[] = []
    playlist.tracks.items.forEach((item: PlaylistTrack) => {
      res.push({
        title: item.track.name,
        artists: item.track.artists,
        previewUrl: item.track.preview_url,
        image: item.track.album.images[2].url,
        url: item.track.external_urls.spotify
      })
    })
    return res
  }
}
</script>
