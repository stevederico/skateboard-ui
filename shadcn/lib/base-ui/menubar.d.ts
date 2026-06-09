/* @base-ui/react 1.5.0 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import * as React from 'react';

type HTMLProps<T = any> = React.HTMLAttributes<T> & {
  ref?: React.Ref<T> | undefined;
};
type ComponentRenderFn<Props, State> = (props: Props, state: State) => React.ReactElement<unknown>;
type BaseUIComponentProps<ElementType extends React.ElementType, State, RenderFunctionProps = HTMLProps> = Omit<React.ComponentPropsWithRef<ElementType>, 'className' | 'color' | 'defaultValue' | 'defaultChecked' | 'style'> & {
  /** CSS class applied to the element, or a function that returns a class based on the component's state. */
  className?: string | ((state: State) => string | undefined) | undefined;
  /** Replace the component's HTML element with a different tag, or compose it with another component. */
  render?: React.ReactElement | ComponentRenderFn<RenderFunctionProps, State> | undefined;
  /** Style applied to the element, or a function that returns a style object based on the component's state. */
  style?: React.CSSProperties | ((state: State) => React.CSSProperties | undefined) | undefined;
};
type MenubarOrientation = 'horizontal' | 'vertical';
export interface MenubarState {
  /** The orientation of the menubar. */
  orientation: MenubarOrientation;
  /** Whether the menubar is modal. */
  modal: boolean;
  /** Whether any submenu within the menubar is open. */
  hasSubmenuOpen: boolean;
}
export interface MenubarProps extends BaseUIComponentProps<'div', MenubarState> {
  /** Whether the menubar is modal. @default true */
  modal?: boolean | undefined;
  /** Whether the whole menubar is disabled. @default false */
  disabled?: boolean | undefined;
  /** The orientation of the menubar. @default 'horizontal' */
  orientation?: MenubarOrientation | undefined;
  /** Whether to loop keyboard focus back to the first item when the end of the list is reached while using the arrow keys. @default true */
  loopFocus?: boolean | undefined;
}
/**
 * The container for menus.
 *
 * Documentation: [Base UI Menubar](https://base-ui.com/react/components/menubar)
 */
export declare const Menubar: React.ForwardRefExoticComponent<Omit<MenubarProps, 'ref'> & React.RefAttributes<HTMLDivElement>>;
export declare namespace Menubar {
  type State = MenubarState;
  type Props = MenubarProps;
}

export {};
