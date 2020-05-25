export interface Playlist {
  collaborative: boolean
  external_urls: ExternalUrl
  href: string
  id: string
  images: Image[]
  name: string
  owner: SpotifyUserPublic
  public: boolean
  snapshot_id: string
  type: 'playlist'
  uri: string
  description: string
  followers: Followers
  tracks: PlaylistTrack[]
}

export interface PlaylistTrack {
  added_at: string
  added_by: SpotifyUserPublic
  is_local: boolean
  track: Track | Episode
}

export interface Track {
  artists: Artist[]
  available_markets?: string[]
  disc_number: number
  duration_ms: number
  explicit: boolean
  external_urls: ExternalUrl
  href: string
  id: string
  is_playable?: boolean
  linked_from?: TrackLink
  name: string
  preview_url: string
  track_number: number
  type: 'track'
  uri: string
  album: Album
  external_ids: ExternalId
  popularity: number
}

export interface TrackLink {
  external_urls: ExternalUrl
  href: string
  id: string
  type: 'track'
  uri: string
}

export interface ResumePoint {
  full_played: boolean
  resume_position_ms: number
}

export interface Artist {
  external_urls: ExternalUrl
  href: string
  id: string
  name: string
  type: 'artist'
  uri: string
  followers: Followers
  genres: string[]
  images: Image[]
  popularity: number
}

export interface Episode {
  audio_preview_url: string | null
  description: string
  duration_ms: number
  explicit: boolean
  external_urls: ExternalUrl
  href: string
  id: string
  images: Image[]
  is_externally_hosted: boolean
  is_playable: boolean
  languages: string[]
  name: string
  release_date: string
  release_date_precision: string
  resume_point: ResumePoint
  type: 'episode'
  uri: string
  show: Show
}

export interface Album {
  album_type: string
  available_markets?: string[]
  external_urls: ExternalUrl
  href: string
  id: string
  images: Image[]
  name: string
  type: 'album'
  uri: string
  artists: Artist[]
  copyrights: Copyright[]
  external_ids: ExternalId
  genres: string[]
  popularity: number
  release_date: string
  release_date_precision: string
  tracks: Track[]
}

export interface Show {
  available_markets?: string[]
  copyrights: Copyright[]
  description: string
  explicit: boolean
  external_urls: ExternalUrl
  href: string
  id: string
  images: Image[]
  is_externally_hosted: boolean
  languages: string[]
  media_type: string
  name: string
  publisher: string
  type: 'show'
  uri: string
  episodes: Episode[]
}

export interface Copyright {
  text: string
  type: 'C' | 'P'
}

export interface ExternalId {
  isrc?: string
  ean?: string
  upc?: string
}

export interface ExternalUrl {
  spotify: string
}

export interface Image {
  height?: number
  url: string
  width?: number
}

export interface SpotifyUserPublic {
  display_name?: string
  external_urls: ExternalUrl
  followers?: Followers
  href: string
  id: string
  images?: Image[]
  type: 'user'
  uri: string
}

export interface SpotifyUserPrivate extends SpotifyUserPublic {
  birthdate: string
  country: string
  email: string
  product: string
}

export interface Followers {
  href: string
  total: number
}
