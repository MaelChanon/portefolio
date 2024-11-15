import { ApolloError, useQuery } from '@apollo/client';
import { GET_LOGOS, GET_OWNER } from '@gql';
import { Logo, Owner } from '@types';
import { nanoid } from 'nanoid';
import { createContext, ReactNode, useState, useEffect, useContext } from 'react';

export interface ILogosContext {
  logos: Logo[] | undefined;
  error: ApolloError | undefined;
  loading: boolean | false;
}

export const LogosContext = createContext<ILogosContext>({} as ILogosContext);

interface ILogosProvider {
  children: ReactNode;
}

export const LogosProvider = ({ children }: ILogosProvider) => {
  const { data, error, loading } = useQuery<{
    logos: Logo[];
  }>(GET_LOGOS);

  const value: ILogosContext = {
    logos: data?.logos,
    loading,
    error,
  };
  return <LogosContext.Provider value={{ ...value }}>{children}</LogosContext.Provider>;
};

export const useLogos = (): ILogosContext => useContext(LogosContext);
