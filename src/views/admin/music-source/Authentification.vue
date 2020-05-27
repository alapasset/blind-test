<template>
  <el-container>
    <el-header style="font-size: 24px; text-align: center">Source - Authentification</el-header>

    <el-main>
      <div v-if="needLogin">
        <el-button @click="goToMusicSourceConnexion()">MusicSource Login</el-button>
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
import { MusicSourceModule } from '@/store/modules/music-source'

@Component({
  created: function() {
    if (this.$route.query.code) {
      MusicSourceModule.setCode(this.$route.query.code.toString())
      MusicSourceModule.getNewAuthorization()
      this.$router.push({ name: 'admin' })
    }
  }
})
export default class MusicSourceAuthentification extends Vue {
  get info() {
    return MusicSourceModule
  }

  get needLogin() {
    return MusicSourceModule.mustHaveNewAuthorization
  }

  goToMusicSourceConnexion() {
    location.replace(MusicSourceModule.authUrl)
  }
}
</script>
