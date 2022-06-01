import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import Loading from '../components/loading/Loading'
import MVList from '../pages/video/mvList/MVList'
import Video from '../pages/video/Video'
import VideoList from '../pages/video/videoList/VideoList'
import MVDetail from '../pages/videoDetail/mv/MVDetail'
import VideoDetail from '../pages/videoDetail/v/VideoDetail'

const Content = lazy(() => import('../layout/defalutLayout/content/Content'))
const Home = lazy(() => import('../pages/home/Home'))
const MusicDetail = lazy(() => import('../layout/defalutLayout/MusicDetail/MusicDetail'))
const Suggest = lazy(() => import('../pages/home/suggest/Suggest'))
const SongSheets = lazy(() => import('../pages/home/songSheets/SongSheets'))
const HighQuality = lazy(() => import('../pages/HighQuality/HighQuality'))
const Rank = lazy(() => import('../pages/home/rank/Rank'))
const PersonalFm = lazy(() => import('../pages/personalFm/PersonalFm'))
const SongSheet = lazy(() => import('../pages/songSheet/SongSheet'))
const Album = lazy(() => import('../pages/album/Album'))
const Artist = lazy(() => import('../pages/artist/Artist'))
const Search = lazy(() => import('../pages/search/Search'))
const Artists = lazy(() => import('../pages/home/artists/Artists'))
// const VideoDetail = lazy(() => import('../pages/videoDetail/v/VideoDetail'))

export const GetRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <Suspense fallback={<Loading />}>
          <Content />
        </Suspense>
      ),
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          ),
          children: [
            {
              path: '',
              element: (
                <Suspense fallback={<Loading />}>
                  <Suggest />
                </Suspense>
              )
            },
            {
              path: 'songSheets',
              element: (
                <Suspense fallback={<Loading />}>
                  <SongSheets />
                </Suspense>
              )
            },
            {
              path: 'songSheets/default/',
              element: (
                <Suspense fallback={<Loading />}>
                  <SongSheets />
                </Suspense>
              )
            },
            {
              path: 'songSheets/default/:type',
              element: (
                <Suspense fallback={<Loading />}>
                  <SongSheets />
                </Suspense>
              )
            },
            {
              path: 'songSheets/highquality/:type',
              element: (
                <Suspense fallback={<Loading />}>
                  <HighQuality />
                </Suspense>
              )
            },
            {
              path: 'rank',
              element: (
                <Suspense fallback={<Loading />}>
                  <Rank />
                </Suspense>
              )
            },
            {
              path: 'artists',
              element: (
                <Suspense fallback={<Loading />}>
                  <Artists />
                </Suspense>
              )
            }
          ]
        },
        {
          path: '/video',
          element: (
            <Suspense fallback={<Loading />}>
              <Video />
            </Suspense>
          ),
          children: [
            {
              path: 'v',
              element: (
                <Suspense fallback={<Loading />}>
                  <VideoList />
                </Suspense>
              )
            },
            {
              path: 'mv',
              element: (
                <Suspense fallback={<Loading />}>
                  <MVList />
                </Suspense>
              )
            }
          ]
        },
        {
          path: '/personalFm',
          element: (
            <Suspense fallback={<Loading />}>
              <PersonalFm />
            </Suspense>
          )
        },
        {
          path: '/songSheet/:id',
          element: (
            <Suspense fallback={<Loading />}>
              <SongSheet />
            </Suspense>
          )
        },
        {
          path: '/album/:id',
          element: (
            <Suspense fallback={<Loading />}>
              <Album />
            </Suspense>
          )
        },
        {
          path: '/artist/:id',
          element: (
            <Suspense fallback={<Loading />}>
              <Artist />
            </Suspense>
          )
        },
        {
          path: '/search/:keyword',
          element: (
            <Suspense fallback={<Loading />}>
              <Search />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '/',
      element: (
        <Suspense fallback={<Loading />}>
          <Content hiddenSideBar={true} />
        </Suspense>
      ),
      children: [
        {
          path: '/videoDetail/v/:id',
          element: (
            <Suspense fallback={<Loading />}>
              <VideoDetail />
            </Suspense>
          )
        },
        {
          path: '/videoDetail/mv/:id',
          element: (
            <Suspense fallback={<Loading />}>
              <MVDetail />
            </Suspense>
          )
        }
      ]
    }
  ])
  return routes
}
