export interface Playlist {
  id: string
  name: string
  tracks: PagingObject<PlaylistTrack>
}

interface PagingObject<T> {
  href: string
  items: T[]
  limit: number
  next: string
  offset: number
  previous: string
  total: number
}

export interface PlaylistTrack {
  track: Track
}

export interface Track {
  artists: Artist[]
  external_urls: ExternalUrl
  id: string
  name: string
  preview_url: string
  album: Album
}

export interface Album {
  images: Image[]
}

export interface Image {
  height: number
  url: string
  width: number
}

export interface Artist {
  external_urls: ExternalUrl
  id: string
  name: string
  href: string
  type: 'artist'
  uri: string
}

export interface ExternalUrl {
  spotify: string
}
