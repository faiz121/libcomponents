/* eslint-disable no-unused-vars */
// @flow
// Button
import * as React from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import { Link } from 'react-router';
import Icon from 'lib/components/Icon';

import styles from './styles.sass';

export type ButtonTypes = 'primary' | 'secondary' | 'tertiary' | 'success' | 'warn' | 'error' | 'muted';
export type ButtonSizes = 'small' | 'medium' | 'large';

export type ButtonProps = {
  children?: React.Node,
  asLink?: boolean,
  className: string,
  iconName?: string,
  leftIconName?: string,
  linkTo?: string,
  rightIconName?: string,
  size?: ButtonSizes,
  title?: string,
  type?: ButtonTypes,
  buttonType?: 'button' | 'submit' | 'reset',
  withContextMenu: boolean,
  onClick?: () => void,
  htmlTitle?: string,
  'data-event-name'?: string,
};

const defaultProps = {
  children: null,
  asLink: false,
  iconName: '',
  leftIconName: '',
  linkTo: '',
  rightIconName: '',
  size: 'medium',
  title: '',
  type: 'secondary',
  buttonType: 'button',
  withContextMenu: false,
  onClick() {},
  htmlTitle: '',
  'data-event-name': undefined,
};

export const getButtonClass = (props: ButtonProps): string => classNames(styles.Button, {
  [styles.Button_link]: props.asLink,
  [styles[`Button_${props.size}`]]: props.size !== defaultProps.size,
  [styles[`Button_${props.type}`]]: props.type !== defaultProps.type,
  [styles.Button_contextual]: props.withContextMenu,
}, props.className);

const Button = (props: ButtonProps): React.Node => {
  const {
    children,
    asLink,
    className,
    iconName,
    leftIconName,
    linkTo,
    rightIconName,
    size,
    title,
    type,
    buttonType,
    onClick,
    withContextMenu,
    htmlTitle,
    ...buttonProps
  } = props;
  const buttonClass = getButtonClass(props);

  if (asLink) {
    return (
      <Link
        to={linkTo}
        className={buttonClass}
        title={title}
        {...buttonProps}
      >
        {title}
      </Link>
    );
  }

  return (
    <button
      className={buttonClass}
      type={buttonType}
      onClick={onClick}
      title={htmlTitle}
      {...buttonProps}
    >
      {children || (
        <div styleName="Button__content">
          {leftIconName && (
            <Icon
              name={leftIconName}
              styleName={classNames('Button__icon', 'Button__icon_small', 'Button__icon_left')}
              title={htmlTitle}
              data-event-name={props['data-event-name']}
            />
          )}
          {title ? (
            <span styleName="Button__title" key="title" title={htmlTitle}>
              {title}
            </span>
          ) : (
            <Icon
              name={iconName}
              key="icon"
              styleName={classNames('Button__icon')}
              title={htmlTitle}
              data-event-name={props['data-event-name']}
            />
          )}
          {rightIconName && (
            <Icon
              name={rightIconName}
              key="right-button"
              title={htmlTitle}
              styleName={classNames('Button__icon', 'Button__icon_small', 'Button__icon_right')}
              data-event-name={props['data-event-name']}
            />
          )}
        </div>
      )}
    </button>
  );
};

Button.defaultProps = defaultProps;

export default CSSModules(Button, styles, { allowMultiple: true });
