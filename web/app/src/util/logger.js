const Logger = (context) => ({
  log: (...args) => console.log(...args),
  info: (...args) => console.info(...args),
  warning: (...args) => console.warning(...args),
  error: (...args) => console.error(...args),
});

export default Logger
