import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useSearchRestaurants = (searchState: SearchState,city?: string) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery",searchState.searchQuery);
    params.set("page",searchState.page.toString());
    params.set("selectedCuisines",searchState.selectedCuisines.join(","));
    params.set("sortoption",searchState.sortOption);
    const response = await fetch(`${API_BASE_URL}/api/my/restaurantDetail/search/${city}?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Failed to get Restaurant");
    }
    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ["searchRestaurants",searchState],
    createSearchRequest,
    {enabled: !!city}
  );

  return { results, isLoading };
};
