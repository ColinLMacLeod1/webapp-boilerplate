import { lazy } from "react";
import Logger from "./logger";
const logger = Logger("util/lazyWithPreload");

/**
 * This function will split out a given component into its own chunk to be imported asynchronously either immediately, automatically when the component is used, or manually with Component.preload()
 * Notes:
 *  - Any components loaded this way must be nested under a React.Suspense to handle graceful loading
 *  - For HTTP1.1 the browser can only manage a limited number of concurrent fecthes, so fetching chunks may block other more urgent resources. This is not a concern for HTTP2
 *
 * @param {function} importer - A function that calls the dynamic import of the component. Ex: () => import('path/to/component')
 * @param {boolean} loadImmediately - If true, the chunk for the component will be fetched immediately. If false, the chunk will be fetched automatically when the component is used or fetched manually using Component.preload()
 *
 * @returns {component} - The not yet loaded lazy component
 */
export default function lazyWithPreload(importer, loadImmediately) {
  const Component = lazy(importer);
  if (loadImmediately) {
    importer();
  } else {
    Component.preload = () => {
      logger("Preloading Chunk");
      importer();
    };
  }
  return Component;
}
