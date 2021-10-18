import React, { useContext } from "react";
import { LiveAnnouncer, LiveMessenger } from "react-aria-live";

import Logger from "../util/logger";
const logger = Logger("providers/announce");

export const AnnounceContext = React.createContext();

/**
 * Function to fetch content for the announce provider
 */
const Content = ({ announcePolite, announceAssertive, children }) => {
  /**
   * Function to announce message
   * @param {object} message - message to be announced
   * @param {boolean} assertive - should message be assertive
   */
  const announceMessage = (message, assertive) => {
    if (message) {
      if (assertive) {
        logger.debug("announce assertive: ", message);
        announceAssertive(message);
      } else {
        logger.debug("announce polite: ", message);
        announcePolite(message);
      }
    }
  };

  return (
    <AnnounceContext.Provider value={{ announceMessage }}>
      {children}
    </AnnounceContext.Provider>
  );
};

/**
 * The provider for announce context
 */
export const AnnounceProvider = ({ children }) => (
  <LiveAnnouncer>
    <LiveMessenger>
      {({ announcePolite, announceAssertive }) => (
        <Content
          announcePolite={announcePolite}
          announceAssertive={announceAssertive}
        >
          {children}
        </Content>
      )}
    </LiveMessenger>
  </LiveAnnouncer>
);

export const useAnnounce = () => useContext(AnnounceContext);
