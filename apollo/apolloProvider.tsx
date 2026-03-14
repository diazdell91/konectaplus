import { ApolloProvider as Provider } from "@apollo/client/react";
import React from "react";
import { createApolloClient } from "./apolloClient";

type Props = {
  children: React.ReactNode;
};

export const ApolloProvider = ({ children }: Props) => {
  const client = React.useMemo(() => createApolloClient(), []);

  return <Provider client={client}>{children}</Provider>;
};
