
import getSongs from '@/actions/server/getSongs'
import PageContent from '@/components/PageContent'



export default async function Home() {
  const songs = await getSongs()
  return (
    <PageContent songs={songs}/>
  )
}
