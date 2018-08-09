// Switch to this version when Enzyme supports React 16.4
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  'aria-hidden': PropTypes.bool,
};

export const defaultProps = {
  className: '',
  'aria-hidden': true,
};

function Icon(props, ref) {
  const { className, name, ...propsToPassDown } = props;

  return <i {...propsToPassDown} ref={ref} className={classNames(`ent-${name}`, className)} />;
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default forwardRef(Icon);
