import { createContext, useContext } from 'react';

export const ConferenceAuthContext = createContext({ signedIn: false, ready: false });
export const useConferenceAuth = () => useContext(ConferenceAuthContext);