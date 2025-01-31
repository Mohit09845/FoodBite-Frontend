import { useSearchRestaurants } from "@/api/restaurantApi";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
}

function SearchPage() {
  const { city } = useParams();
  const [searchState,setSearchState] = useState<SearchState>({
    searchQuery: ""
  })
  const { results, isLoading } = useSearchRestaurants(searchState,city);

  const setSearchQuery = (searchFormData: SearchForm)=>{
    setSearchState((prevState)=> ({
      ...prevState,
      searchQuery: searchFormData.searchQuery
    }))
  }

  const resetSearch = ()=>{
    setSearchState((prevState)=> ({
      ...prevState,
      searchQuery: ""
    }))
  }

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
        <SearchBar searchQuery={searchState.searchQuery} onSubmit={setSearchQuery} placeHolder="Search By Cuisines or Restaurant Name" onReset={resetSearch}/>
        <SearchResultInfo total={results.pagination.total} city={city} />
        {results?.data.map((restaurant, idx) => (
          <SearchResultCard restaurant={restaurant} key={idx} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
