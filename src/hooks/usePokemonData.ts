import { toast } from "react-toastify";
import { useQueryWrapper } from "services/api/apiHelper";
import { extractNumberFromUrl } from "utils/helper";

const usePokemonData = (category) => {
  const catNo = extractNumberFromUrl(category);
  // Use React Query key with category number
  const queryKey = ["pokemonData", catNo];

  const { data, isLoading, isError } = useQueryWrapper(queryKey, `/type/${catNo}`, {
    select: (response: any) => response.pokemon.map((p) => p.pokemon),
    enabled: !!category,
    onError: () => toast.error("An error occured!"),
  });

  return { data, isLoading, isError };
};

export default usePokemonData;
