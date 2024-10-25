import { ApolloError, useQuery } from '@apollo/client';
import { GET_OWNER } from '@gql';
import { Owner } from '@types';
import { nanoid } from 'nanoid';
import { createContext, ReactNode, useState, useEffect, useContext } from 'react';

export interface IOwnerContext {
  owner: Owner | undefined;
  error: ApolloError | undefined;
  loading: boolean | false;
}

export const OwnerContext = createContext<IOwnerContext>({});

interface IOwnerProvider {
  children: ReactNode;
}

export const OwnerProvider = ({ children }: IOwnerProvider) => {
  const { loading, error, data } = useQuery<{
    owner: Owner;
  }>(GET_OWNER, {
    variables: {
      id: 1,
    },
  });

  const value: IOwnerContext = {
    owner: data?.owner,
    loading,
    error,
  };
  return <OwnerContext.Provider value={{ ...value }}>{children}</OwnerContext.Provider>;
};

export const useOwner = (): IOwnerContext => useContext(OwnerContext);
