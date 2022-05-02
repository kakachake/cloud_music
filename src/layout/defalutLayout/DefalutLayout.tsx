import { FunctionComponent } from 'react'
import Header from './header/Header'
import MusicBar from './musicBar/MusicBar'
import Content from './content/Content'
const DefaultLayout: FunctionComponent = () => {
  return (
    <div>
      <Header />
      <Content />
      <MusicBar />
    </div>
  )
}

export default DefaultLayout
