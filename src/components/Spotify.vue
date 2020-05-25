<template>
  <div class="spotify">
    <h2 class="page-subtitle">Gestion de l'autentification avec Spotify</h2>
    <header>
      <div v-if="needLogin">
        <button><a v-bind:href="urlSpotifyConnexion">Spotify Login</a></button>
      </div>
      <div v-else>
        <div>Code : {{ info.code }}</div>
        <div>Access Token : {{ info.accessToken }}</div>
        <div>Refresh Token : {{ info.refreshToken }}</div>
        <div>Expiration : {{ info.accessTokenExpireEpoch }}</div>
      </div>
    </header>
    <main v-if="!needLogin">
      <section>
        <input type="text" id="playlist_id" name="playlist_id" v-model="playlist_id" />
        <button @click="searchPlaylist()">Chercher la playlist</button>
        <button v-if="playlist.tracks" @click="addPlaylistToBack()">Créer une salle a partir de la playliste</button>
        <div v-if="playlist.tracks">
          <table>
            <thead>
              {{
                playlist.name
              }}
            </thead>
            <tbody>
              <tr v-for="item in playlist.tracks.items" :key="item.track.id">
                <td>{{ item.track.name }}</td>
                <td>{{ getArtists(item.track.artists) }}</td>
                <td>
                  <audio controls v-bind:src="item.track.preview_url">
                    Your browser does not support the
                    <code>audio</code> element.
                  </audio>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SpotifyModule } from '@/store/modules/spotify'
import { Artist, Playlist } from '../store/models'

@Component({
  created: function() {
    if (this.$route.query.code) {
      SpotifyModule.setCode(this.$route.query.code.toString())
      SpotifyModule.getNewAuthorization()
    }
  }
})
export default class Spotify extends Vue {
  playlist_id = '2Vwcetco5KfLncNsk7ijrx'
  playlist = {}

  get info() {
    return SpotifyModule
  }

  get needLogin() {
    return SpotifyModule.mustHaveNewAuthorization
  }

  get urlSpotifyConnexion() {
    return SpotifyModule.authUrl
  }

  async searchPlaylist() {
    this.playlist = (await SpotifyModule.getPlaylistInformations(this.playlist_id)) as Playlist
  }

  getArtists(artists: Artist[]): string {
    let res = ''
    artists.forEach(artist => {
      res += `${artist.name} / `
    })
    return res.slice(0, -2)
  }

  addPlaylistToBack() {
    return false
  }
}
</script>
