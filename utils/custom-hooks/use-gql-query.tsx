import { useQuery } from "react-query";
import { GraphQLClient, request } from "graphql-request";

const useGraphQLQuery = (key: any, query: any) => {
  let endpoint: string = "http://localhost:4000";

  const fetchData = async () => await request(endpoint, query);

  return useQuery(key, fetchData);
};

export default useGraphQLQuery;
