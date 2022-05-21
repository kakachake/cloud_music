import { FC } from 'react'
import { ArtistType } from '../../../type/artist'

interface ArtistTabPageProps {
  data?: { dataList: Partial<ArtistType>[]; curPage: number; totalPage: number }

  setCurPage: React.Dispatch<any>
}

const ArtistTabPage: FC<ArtistTabPageProps> = (props) => {
  const {
    data = {
      dataList: [],
      curPage: 0,
      totalPage: 0
    },
    setCurPage
  } = props
  return <div>{JSON.stringify(data)}</div>
}

export default ArtistTabPage
