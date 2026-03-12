import { MY_SESSIONS, MySessionsData } from "@/graphql/mySessions";
import { useQuery } from "@apollo/client/react";
import { isExpired } from "../utils/sessions.utils";

export function useSessionsScreen() {
  const { data, loading, refetch } = useQuery<MySessionsData>(MY_SESSIONS, {
    fetchPolicy: "cache-and-network",
  });

  const items = data?.mySessions?.items ?? [];
  const activeSessions = items.filter((s) => !s.revokedAt && !isExpired(s.expiresAt));
  const inactiveSessions = items.filter((s) => !!s.revokedAt || isExpired(s.expiresAt));

  return {
    loading,
    refetch,
    items,
    activeSessions,
    inactiveSessions,
  };
}
