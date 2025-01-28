import { useSearchRestaurants } from "@/api/restaurantApi";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useParams } from "react-router-dom";

function SearchPage() {
  const { city } = useParams();
  const { results, isLoading } = useSearchRestaurants(city);

  if (isLoading) {
    <span>Loading....</span>;
  }
  if (!results?.data || !city) {
    return <span>No results found</span>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">Insert Cuisines here :)</div>
      <div id="main-content" className="flex flex-col gap-4">
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results?.data.map((restaurant, idx) => (
          <SearchResultCard restaurant={restaurant} key={idx} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
