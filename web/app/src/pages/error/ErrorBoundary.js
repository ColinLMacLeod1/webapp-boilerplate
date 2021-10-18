import { Component } from "react";
import PropTypes from "prop-types";
import Logger from "../../util/logger";
const logger = Logger("pages/error");

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logger.error(error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

ErrorBoundary.defaultProps = {
  fallback: null,
};

ErrorBoundary.propTypes = {
  fallback: PropTypes.oneOfType([PropTypes.elementType, PropTypes.element]),
};

export default ErrorBoundary;
