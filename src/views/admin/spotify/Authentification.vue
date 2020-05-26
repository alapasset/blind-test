<template>
  <el-container>
    <el-header style="font-size: 24px; text-align: center">Spotify - Authentification</el-header>

    <el-main>
      <div v-if="needLogin">
        <el-button @click="goToSpotifyConnexion()">Spotify Login</el-button>
      </div>
      <div v-else>
        <el-table :data="[info]" stripe border style="width: 100%">
          <el-table-column prop="code" label="Code"> </el-table-column>
          <el-table-column prop="accessToken" label="Access Token"> </el-table-column>
          <el-table-column prop="refreshToken" label="Refresh Token"> </el-table-column>
          <el-table-column prop="accessTokenExpireEpoch" label="Expiration">
            <template slot-scope="scope">
              <el-date-picker v-model="scope.row.accessTokenExpireEpoch" type="datetime" format="dd/MM/yyyy HH:mm:ss" disabled> </el-date-picker>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SpotifyModule } from '@/store/modules/spotify'

@Component({
  created: function() {
    if (this.$route.query.code) {
      SpotifyModule.setCode(this.$route.query.code.toString())
      SpotifyModule.getNewAuthorization()
      this.$router.push({ name: 'admin' })
    }
  }
})
export default class SpotifyAuthentification extends Vue {
  get info() {
    return SpotifyModule
  }

  get needLogin() {
    return SpotifyModule.mustHaveNewAuthorization
  }

  goToSpotifyConnexion() {
    location.replace(SpotifyModule.authUrl)
  }
}
</script>
