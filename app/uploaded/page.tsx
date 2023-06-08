
import getSongsByUserId from '@/actions/server/getSongsByUserId'
import PageContent from '@/components/PageContent'


export const revalidate = 0

export default async function Uploaded() {

  const songs = await getSongsByUserId()
  return (
   <PageContent songs={songs} />
  )
}
