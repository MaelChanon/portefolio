import { IronSession, IronSessionOptions } from 'iron-session';
import Router from 'next/router';

declare module 'iron-session' {
  interface IronSessionData {
    userToken: string;
  }
}
export interface IUser extends IronSession, Record<string, unknown> {
  userToken: string;
}

export const ironOptions: IronSessionOptions = {
  cookieName: 'sess',
  password: process.env['TOKEN_SECRET'] || '',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env['NODE_ENV'] === 'production',
    // secure: host !== 'http://localhost:3000',
    maxAge: 60 * 60 * 8,
    httpOnly: false,
    path: '/',
    sameSite: 'lax',
  },
};

let currentSession: string | undefined = undefined;

export function getToken() {
  return currentSession;
}

export function setToken(token?: string) {
  currentSession = token;
}
