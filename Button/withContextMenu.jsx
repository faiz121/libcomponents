// @flow
import * as React from 'react';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import Button, { getButtonClass, type ButtonProps } from 'lib/components/Button';
import { type TriggerSlotContext } from 'lib/components/PortalDropdown/types';
import PortalDropdown from 'lib/components/PortalDropdown';

import styles from './styles.sass';

type Props = ButtonProps & {
  contextMenuProps: *,
  dropdownAlignment?: 'left' | 'right',
  inPlace: boolean,
  triggerTestHook?: string,
};

export default function withContextMenu(DropdownContentComponent: React.Component<>, WrappedButtonComponent: Button): * {
  class WithContextMenu extends React.Component<Props> {
    static displayName = `Wrapped(${WrappedButtonComponent.displayName})`;
    static defaultProps = {
      ...WrappedButtonComponent.defaultProps,
      inPlace: false,
    };

    render(): React.Node {
      const { contextMenuProps, dropdownAlignment, triggerTestHook, inPlace, ...propsToPassDown } = this.props;

      return (
        <React.Fragment>
          <WrappedButtonComponent
            {...propsToPassDown}
            withContextMenu
          />
          <PortalDropdown
            alignment={dropdownAlignment}
            inPlace={inPlace}
            renderTriggerSlot={(context: TriggerSlotContext): React.Node => (
              <button
                className={classNames(getButtonClass(this.props), styles.Button__contextMenu)}
                onClick={context.toggle}
                ref={context.refFn}
                data-test={triggerTestHook}
              >
                &bull;&bull;&bull;
              </button>
            )}
          >
            <DropdownContentComponent {...propsToPassDown} {...contextMenuProps} />
          </PortalDropdown>
        </React.Fragment>
      );
    }
  }

  return CSSModules(WithContextMenu, styles, { allowMultiple: true });
}
