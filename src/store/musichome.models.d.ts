export interface Playlist {
  id: string
  name: string
  lastUpdate: Date
  tracks: Array<Track>
}

export interface Track {
  artists: Array<Artist>
  url: string
  id: string
  title: string
  preview: string
  image: string
}

export interface Artist {
  url: string
  id: string
  name: string
}

export interface Salon {
  id: string
  name: string
  lastUpdate: Date
  playlist: Playlist
}
