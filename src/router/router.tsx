import { lazy, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

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
const VideoDetail = lazy(() => import('../pages/videoDetail/VideoDetail'))

export const GetRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <Suspense fallback='加载中。。。'>
          <Content />
        </Suspense>
      ),
      children: [
        {
          path: '/',
          element: (
            <Suspense fallback='加载中。。。'>
              <Home />
            </Suspense>
          ),
          children: [
            {
              path: '/',
              element: (
                <Suspense fallback='加载中。。。'>
                  <Suggest />
                </Suspense>
              )
            },
            {
              path: '/songSheets',
              element: (
                <Suspense fallback='加载中。。。'>
                  <SongSheets />
                </Suspense>
              )
            },
            {
              path: '/songSheets/default/',
              element: (
                <Suspense fallback='加载中。。。'>
                  <SongSheets />
                </Suspense>
              )
            },
            {
              path: '/songSheets/default/:type',
              element: (
                <Suspense fallback='加载中。。。'>
                  <SongSheets />
                </Suspense>
              )
            },
            {
              path: '/songSheets/highquality/:type',
              element: (
                <Suspense fallback='加载中。。。'>
                  <HighQuality />
                </Suspense>
              )
            },
            {
              path: '/rank',
              element: (
                <Suspense fallback='加载中。。。'>
                  <Rank />
                </Suspense>
              )
            },
            {
              path: '/artists',
              element: (
                <Suspense fallback='加载中。。。'>
                  <Artists />
                </Suspense>
              )
            }
          ]
        },
        {
          path: '/personalFm',
          element: (
            <Suspense fallback='加载中。。。'>
              <PersonalFm />
            </Suspense>
          )
        },
        {
          path: '/songSheet/:id',
          element: (
            <Suspense fallback='加载中。。。'>
              <SongSheet />
            </Suspense>
          )
        },
        {
          path: '/album/:id',
          element: (
            <Suspense fallback='加载中。。。'>
              <Album />
            </Suspense>
          )
        },
        {
          path: '/artist:/id',
          element: (
            <Suspense fallback='加载中。。。'>
              <Artist />
            </Suspense>
          )
        },
        {
          path: '/search/:keyword',
          element: (
            <Suspense fallback='加载中。。。'>
              <Search />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '/',
      element: (
        <Suspense fallback='加载中。。。'>
          <Content hiddenSideBar={true} />
        </Suspense>
      ),
      children: [
        {
          path: '/videoDetail',
          element: (
            <Suspense fallback='加载中。。。'>
              <VideoDetail />
            </Suspense>
          )
        }
      ]
    }
  ])
  return routes
}
