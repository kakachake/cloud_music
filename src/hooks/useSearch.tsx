import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getSearchResult, SEARCH_TYPE } from '../service/api/search'

export const useSearch = (type: SEARCH_TYPE, limit = 20) => {
  const { keyword } = useParams()
  const [searchResult, setSearchResult] = useState<{
    [key: string]: {
      dataList: any[]
      curPage: number
      totalPage: number
    }
  }>()

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getData()
  }, [keyword, type])
  const getData = (page?: number) => {
    setLoading(true)
    const curPage = page || searchResult?.[SEARCH_TYPE[type].toLowerCase() + 's']?.curPage || 1
    getSearchResult(keyword || '', (curPage - 1) * limit, type)
      .then((res) => {
        formatRes(res, type, curPage, limit, searchResult, setSearchResult)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  const setCurPage = (page: number) => {
    const parseType = SEARCH_TYPE[type].toLowerCase()
    if (searchResult && searchResult[parseType + 's']) {
      getData(page)
    }
  }
  return {
    searchResult,
    setCurPage,

    loading
  }
}

const formatRes = (
  res: any,
  type: SEARCH_TYPE,
  curPage: number,
  limit: number,
  searchResult: any,
  setSearchResult: any
) => {
  const result = res.result

  const parseType = SEARCH_TYPE[type].toLowerCase()
  setSearchResult({
    ...searchResult,
    [parseType + 's']: {
      ...[searchResult?.[parseType + 's']],
      curPage: curPage,
      dataList: result[parseType + 's'],
      totalPage: Math.ceil(result[parseType + 'Count'] / limit)
    }
  })
}
