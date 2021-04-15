import React, { useState, useEffect, useContext } from "react";
import Logger from "util/logger";
const logger = Logger("Config-provider");

export const ConfigContext = React.createContext();

export const ConfigProvider = (props) => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    fetch(`/config.json`, {})
      .then((res) => res.json())
      .then((config) => {
        logger.info("config fetched", config);
        setConfig(config);
      })
      .catch((err) => {
        logger.error("failed to fetch config", err);
      });
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        config,
      }}
    >
      {props.children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
