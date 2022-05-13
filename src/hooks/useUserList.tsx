import { useSelector } from 'react-redux'

export const useUserList = () => {
  const userPlayList = useSelector((state: any) => state.user.userPlayList)
  const userId = useSelector((state: any) => state.user.userId)
  console.log(userPlayList)

  if (!userPlayList) {
    return [[], []]
  }
  return [
    userPlayList.filter((item: { userId: any }) => item.userId === userId),
    userPlayList.filter((item: { userId: any }) => item.userId !== userId)
  ]
}
