// export const Pagination = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [value, setValue] = useState("");
//   const debouncedSearch = useDebounce(value);
//   const { data } = useSearchPokemonQuery(debouncedSearch);
//   const pagination = usePaginationQuery(currentPage);
//   const pageNumber = Math.ceil(pokemonData?.length / 15);

//   const pokemon = useMemo(() => {
//     if (debouncedSearch) {
//       return data?.data;
//     } else {
//       return pagination?.data?.data;
//     }
//   });

//   const handleChange = (_, i) => {
//     setCurrentPage(i);
//   };
// };
