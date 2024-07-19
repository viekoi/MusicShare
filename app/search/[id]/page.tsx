import getSongById from "@/actions/server/getSongById";
import PageContent from "@/components/PageContent";

export const revalidate = 0;
interface SearchPageBySongIdProps {
  params: { id: string };
}

const SearchPageBySongId = async ({ params }: SearchPageBySongIdProps) => {
  const searchedResult = await getSongById(params.id);

  return <PageContent songs={searchedResult} isStarting />;
};

export default SearchPageBySongId;
