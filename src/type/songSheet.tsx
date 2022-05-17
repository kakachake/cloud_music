import { SongType } from './song'

export interface SongSheetType {
  id: string
  name: string
  coverImgUrl: string
  playCount: number
  tags: string[]
  description: string
  creator: {
    nickname: string
    avatarUrl: string
  }
  tracks: SongType[]
  shareCount: number
  commentCount: number
  updateTime: number
  createTime: number
}
