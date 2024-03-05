// hooks/usePokemonData.js
import { useQueryWrapper } from "services/api/apiHelper";
import { extractNumberFromUrl } from "utils/helper";

const usePokemonData = (category, searchTerm) => {
  // React Query key includes both the category and searchTerm to ensure uniqueness
  const catNo = extractNumberFromUrl(category);

  const queryKey = ["pokemonData", catNo, searchTerm];

  const { data, isLoading, isError } = useQueryWrapper(queryKey, `/type/${catNo}`, {
    // This select function filters the data based on the searchTerm within the hook
    select: (response: any) => {
      const pokemons = response.pokemon.map((p) => p.pokemon);
      return searchTerm
        ? pokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()),
          )
        : pokemons;
    },
    // Ensures the query is only executed if a category is provided
    enabled: !!category,
  });

  return { data, isLoading, isError };
};

export default usePokemonData;
