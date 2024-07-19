import getSongsByTitle from "@/actions/server/getSongsByTitle";
import PageContent from "@/components/PageContent";
export const revalidate = 0;
interface SearchProps {
  searchParams: { title: string };
}

const SearchPage = async ({ searchParams }: SearchProps) => {
  const searchTerms = searchParams.title;
  const searchedResult = await getSongsByTitle(searchTerms);

  return <PageContent songs={searchedResult} />;
};

export default SearchPage;
