import store from '@/store'
import { Playlist } from '@/store/spotify.models'
import Axios from 'axios'
import { Action, getModule, Module, Mutation, VuexModule } from 'vuex-module-decorators'

@Module({
  dynamic: true,
  store,
  name: 'spotify'
})
class Spotify extends VuexModule {
  public code = ''
  public accessToken = ''
  public refreshToken = ''
  public accessTokenExpireEpoch = new Date()

  get authUrl(): string {
    // prettier-ignore
    return `https://accounts.spotify.com/authorize?client_id=f80117db049c42f18beba3911fe96479&response_type=code&redirect_uri=${encodeURIComponent('http://127.0.0.1:8080/admin')}&scope=${encodeURI('playlist-read-collaborative playlist-read-private')}`
  }

  get mustRefreshAccessToken(): boolean {
    return Date.now() > this.accessTokenExpireEpoch.getTime()
  }

  get mustHaveNewAuthorization(): boolean {
    return this.code === '' ? true : false
  }

  @Mutation
  async setCode(code: string) {
    this.code = code
  }

  @Mutation
  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken
  }

  @Mutation
  setRefreshToken(refreshToken: string): void {
    this.refreshToken = refreshToken
  }

  @Mutation
  setAccessTokenExpireEpoch(accessTokenExpireEpoch: Date): void {
    this.accessTokenExpireEpoch = accessTokenExpireEpoch
  }

  @Action
  async getNewAuthorization() {
    try {
      const call = Axios.create()

      const params = new URLSearchParams()
      params.append('grant_type', 'authorization_code')
      params.append('code', this.code)
      params.append('redirect_uri', 'http://127.0.0.1:8080/admin')
      params.append('client_id', 'f80117db049c42f18beba3911fe96479')
      params.append('client_secret', 'e9c4343b58484480ae6a8a1d122f12f6')

      const response = await call.post(`https://accounts.spotify.com/api/token`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })

      if (response.status === 200) {
        const expireIn: Date = new Date()
        expireIn.setMinutes(expireIn.getMinutes() + response.data.expires_in / 60)
        this.setRefreshToken(response.data.refresh_token)
        this.setAccessToken(response.data.access_token)
        this.setAccessTokenExpireEpoch(expireIn)
      }
    } catch (error) {
      console.log('Error', error.response)
      if (error.response.status == 400 && error.response.data.error == 'invalid_grant') {
        this.setCode('')
      }
    }
  }

  @Action
  async refreshAuthorization() {
    try {
      const call = Axios.create()

      const params = new URLSearchParams()
      params.append('grant_type', 'refresh_token')
      params.append('refresh_token', this.refreshToken)

      const response = await call.post(`https://accounts.spotify.com/api/token`, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${atob('f80117db049c42f18beba3911fe96479:e9c4343b58484480ae6a8a1d122f12f6')}`
        }
      })

      if (response.status === 200) {
        console.log(response)
        const expireIn: Date = new Date()
        expireIn.setMinutes(expireIn.getMinutes() + response.data.expires_in / 60)
        this.setAccessToken(response.data.access_token)
        this.setAccessTokenExpireEpoch(expireIn)
      }
    } catch (error) {
      console.log('Error', error.response)
      if (error.response.status == 400 && error.response.data.error == 'invalid_grant') {
        this.setCode('')
      }
    }
  }

  private checkAccessToken() {
    return new Promise((resolve, reject) => {
      try {
        if (!this.accessTokenExpireEpoch) {
          resolve(false)
        } else if (Date.now() > this.accessTokenExpireEpoch.getTime()) {
          this.refreshAuthorization().then(() => {
            resolve(true)
          })
        } else {
          resolve(true)
        }
      } catch (e) {
        reject()
      }
    })
  }

  @Action
  public async getPlaylistInformations(playlistId: string): Promise<Playlist> {
    try {
      const call = Axios.create()
      const fields = 'id,name,tracks.items(track(id,name,preview_url,artists,external_urls(spotify),album(images)))'
      const response = await call(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        },
        responseType: 'json'
      })
      return response.data as Playlist
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  @Action
  public async getPlaylistTracksInformations(playlistId: string) {
    try {
      const call = Axios.create()
      const response = await call(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        },
        responseType: 'json'
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}
export const SpotifyModule = getModule(Spotify)
