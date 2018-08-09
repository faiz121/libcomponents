import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  'aria-hidden': PropTypes.bool,
  refFn: PropTypes.func,
};

export const defaultProps = {
  className: '',
  'aria-hidden': true,
  refFn: undefined,
};

export default function Icon(props) {
  const { className, name, refFn, ...propsToPassDown } = props;

  return (
    <i
      {...propsToPassDown}
      ref={refFn}
      className={classNames(`ent-${name}`, className)}
    />
  );
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;
