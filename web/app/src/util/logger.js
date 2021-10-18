const Logger = (context) => ({
  log: (...args) => console.log(`${context}: `, ...args),
  info: (...args) => console.info(`${context}: `, ...args),
  warning: (...args) => console.warning(`${context}: `, ...args),
  error: (...args) => console.error(`${context}: `, ...args),
  debug: (...args) => console.log(`${context}: `, ...args),
});

export default Logger;
