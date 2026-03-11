import { MY_ORDERS, MyOrdersData, MyOrdersVars } from "@/graphql/myOrders";
import { useQuery } from "@apollo/client/react";

export function useMyOrders() {
  const { data, loading, error, refetch } = useQuery<MyOrdersData, MyOrdersVars>(
    MY_ORDERS,
    { fetchPolicy: "cache-and-network", variables: { page: 1, pageSize: 20 } },
  );

  const items = data?.myOrders.items ?? [];

  return { items, loading, error, refetch };
}
