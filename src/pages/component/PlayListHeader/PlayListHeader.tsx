import {
  createFromIconfontCN,
  DownloadOutlined,
  PlusOutlined,
  ShareAltOutlined,
  StarOutlined
} from '@ant-design/icons'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { formatNumber, formatTime } from '../../../utils'
import HeaderButton from './headerButton/HeaderButton'
import style from './PlayListHeader.module.css'

export enum PLAY_LIST_TYPE {
  songSheet = '歌单'
}

interface PlayListHeaderProps {
  listInfo: any
  type: PLAY_LIST_TYPE
}
const IconFont = createFromIconfontCN({
  scriptUrl: 'https://at.alicdn.com/t/font_3370146_f9nlawuexbc.js'
})
const PlayListHeader: FunctionComponent<PlayListHeaderProps> = ({ listInfo, type }) => {
  console.log(listInfo)

  return (
    <div className={style.playListHeader}>
      <div className={style.listImage}>
        <img src={listInfo.coverImgUrl} alt='' />
      </div>
      <div className={style.listDescribe}>
        <div className={style.listTitle}>
          <div className={style.listType}>{type}</div>
          <div className={style.listName}>{listInfo.name}</div>
        </div>
        <Link to={'/'} className={style.creator}>
          <img src={listInfo.creator?.avatarUrl} alt='' />
          <div className={style.creatorName}>{listInfo.creator?.nickname}</div>
          <div className={style.createTime}>{formatTime(listInfo.createTime)}创建</div>
        </Link>
        <div className={style.handle}>
          <div>
            <HeaderButton
              bg='#ec4141'
              bgHover='#cc3232'
              icon={<IconFont className={`${style.playIcon} ${style.icon}`} type={'icon-play'} />}
              direction='left'
              content={`播放全部`}
            />
            <HeaderButton
              bg='#ec4141'
              bgHover='#cc3232'
              direction='right'
              border='left'
              icon={<PlusOutlined />}
            />
          </div>
          <HeaderButton
            icon={<StarOutlined />}
            content={`收藏(${formatNumber(listInfo.subscribedCount)})`}
          />
          <HeaderButton
            icon={<ShareAltOutlined />}
            content={`收藏(${formatNumber(listInfo.shareCount)})`}
          />
          <HeaderButton icon={<DownloadOutlined />} content={`下载全部`} />
        </div>
        <div className={style.otherDesc}>
          {type === PLAY_LIST_TYPE.songSheet ? (
            <div>
              <div className={`${style.otherDescItem} ${style.tags}`}>
                标签：
                {listInfo?.tags?.map((tag: any, idx: number) => (
                  <div key={idx} className={style.tag}>
                    {idx != 0 ? '/ ' : ''}
                    {tag}
                  </div>
                ))}
              </div>
              <div className={`${style.otherDescItem}`}>
                <div>歌曲：{listInfo.trackCount}</div>
                <div>播放：{formatNumber(listInfo.playCount)}</div>
              </div>
              <div className={`${style.otherDescItem}`}>
                <div>简介：{listInfo.description}</div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PlayListHeader
