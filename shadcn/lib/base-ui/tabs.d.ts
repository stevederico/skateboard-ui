/* @base-ui/react 1.5.0 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import * as React$1 from 'react';

declare const none: "none";
declare const triggerPress: "trigger-press";
declare const triggerHover: "trigger-hover";
declare const triggerFocus: "trigger-focus";
declare const outsidePress: "outside-press";
declare const itemPress: "item-press";
declare const closePress: "close-press";
declare const linkPress: "link-press";
declare const clearPress: "clear-press";
declare const chipRemovePress: "chip-remove-press";
declare const trackPress: "track-press";
declare const incrementPress: "increment-press";
declare const decrementPress: "decrement-press";
declare const inputChange: "input-change";
declare const inputClear: "input-clear";
declare const inputBlur: "input-blur";
declare const inputPaste: "input-paste";
declare const inputPress: "input-press";
declare const focusOut: "focus-out";
declare const escapeKey: "escape-key";
declare const closeWatcher: "close-watcher";
declare const listNavigation: "list-navigation";
declare const keyboard: "keyboard";
declare const pointer: "pointer";
declare const drag: "drag";
declare const wheel: "wheel";
declare const scrub: "scrub";
declare const cancelOpen: "cancel-open";
declare const siblingOpen: "sibling-open";
declare const disabled: "disabled";
declare const missing: "missing";
declare const initial: "initial";
declare const imperativeAction: "imperative-action";
declare const swipe: "swipe";
declare const windowResize: "window-resize";
export interface ReasonToEventMap {
	[none]: Event;
	[triggerPress]: MouseEvent | PointerEvent | TouchEvent | KeyboardEvent;
	[triggerHover]: MouseEvent;
	[triggerFocus]: FocusEvent;
	[outsidePress]: MouseEvent | PointerEvent | TouchEvent;
	[itemPress]: MouseEvent | KeyboardEvent | PointerEvent;
	[closePress]: MouseEvent | KeyboardEvent | PointerEvent;
	[linkPress]: MouseEvent | PointerEvent;
	[clearPress]: PointerEvent | MouseEvent | KeyboardEvent;
	[chipRemovePress]: PointerEvent | MouseEvent | KeyboardEvent;
	[trackPress]: PointerEvent | MouseEvent | TouchEvent;
	[incrementPress]: PointerEvent | MouseEvent | TouchEvent;
	[decrementPress]: PointerEvent | MouseEvent | TouchEvent;
	[inputChange]: InputEvent | Event;
	[inputClear]: InputEvent | FocusEvent | Event;
	[inputBlur]: FocusEvent;
	[inputPaste]: ClipboardEvent;
	[inputPress]: MouseEvent | PointerEvent | TouchEvent | KeyboardEvent;
	[focusOut]: FocusEvent | KeyboardEvent;
	[escapeKey]: KeyboardEvent;
	[closeWatcher]: Event;
	[listNavigation]: KeyboardEvent;
	[keyboard]: KeyboardEvent;
	[pointer]: PointerEvent;
	[drag]: PointerEvent | TouchEvent;
	[swipe]: PointerEvent | TouchEvent;
	[wheel]: WheelEvent;
	[scrub]: PointerEvent;
	[cancelOpen]: MouseEvent;
	[siblingOpen]: Event;
	[disabled]: Event;
	[missing]: Event;
	[initial]: Event;
	[imperativeAction]: Event;
	[windowResize]: UIEvent;
}
/**
 * Maps a change `reason` string to the corresponding native event type.
 */
export type ReasonToEvent<Reason extends string> = Reason extends keyof ReasonToEventMap ? ReasonToEventMap[Reason] : Event;
export type BaseUIChangeEventDetail<Reason extends string, CustomProperties extends object> = {
	/**
	 * The reason for the event.
	 */
	reason: Reason;
	/**
	 * The native event associated with the custom event.
	 */
	event: ReasonToEvent<Reason>;
	/**
	 * Cancels Base UI from handling the event.
	 */
	cancel: () => void;
	/**
	 * Allows the event to propagate in cases where Base UI will stop the propagation.
	 */
	allowPropagation: () => void;
	/**
	 * Indicates whether the event has been canceled.
	 */
	isCanceled: boolean;
	/**
	 * Indicates whether the event is allowed to propagate.
	 */
	isPropagationAllowed: boolean;
	/**
	 * The element that triggered the event, if applicable.
	 */
	trigger: Element | undefined;
} & CustomProperties;
/**
 * Details of custom change events emitted by Base UI components.
 */
export type BaseUIChangeEventDetails<Reason extends string, CustomProperties extends object = {}> = Reason extends string ? BaseUIChangeEventDetail<Reason, CustomProperties> & {} : never;
export type HTMLProps<T = any> = React$1.HTMLAttributes<T> & {
	ref?: React$1.Ref<T> | undefined;
};
/**
 * Shape of the render prop: a function that takes props to be spread on the element and component's state and returns a React element.
 *
 * @template Props Props to be spread on the rendered element.
 * @template State Component's internal state.
 */
export type ComponentRenderFn<Props, State> = (props: Props, state: State) => React$1.ReactElement<unknown>;
export type BaseUIEvent<E extends React$1.SyntheticEvent<Element, Event>> = E & {
	preventBaseUIHandler: () => void;
	readonly baseUIHandlerPrevented?: boolean | undefined;
};
export type WithPreventBaseUIHandler<T> = T extends ((event: infer E) => any) ? E extends React$1.SyntheticEvent<Element, Event> ? (event: BaseUIEvent<E>) => ReturnType<T> : T : T extends undefined ? undefined : T;
/**
 * Adds a `preventBaseUIHandler` method to all event handlers.
 */
export type WithBaseUIEvent<T> = {
	[K in keyof T]: WithPreventBaseUIHandler<T[K]>;
};
/**
 * Props shared by all Base UI components.
 * Contains `className` (string or callback taking the component's state as an argument) and `render` (function to customize rendering).
 */
export type BaseUIComponentProps<ElementType extends React$1.ElementType, State, RenderFunctionProps = HTMLProps> = Omit<WithBaseUIEvent<React$1.ComponentPropsWithRef<ElementType>>, "className" | "color" | "defaultValue" | "defaultChecked" | "style"> & {
	/**
	 * CSS class applied to the element, or a function that
	 * returns a class based on the component's state.
	 */
	className?: string | ((state: State) => string | undefined) | undefined;
	/**
	 * Allows you to replace the component's HTML element
	 * with a different tag, or compose it with another component.
	 *
	 * Accepts a `ReactElement` or a function that returns the element to render.
	 */
	render?: React$1.ReactElement | ComponentRenderFn<RenderFunctionProps, State> | undefined;
	/**
	 * Style applied to the element, or a function that
	 * returns a style object based on the component's state.
	 */
	style?: React$1.CSSProperties | ((state: State) => React$1.CSSProperties | undefined) | undefined;
};
export interface NativeButtonProps {
	/**
	 * Whether the component renders a native `<button>` element when replacing it
	 * via the `render` prop.
	 * Set to `false` if the rendered element is not a button (for example, `<div>`).
	 * @default true
	 */
	nativeButton?: boolean | undefined;
}
export type Orientation = "horizontal" | "vertical";
/**
 * An individual interactive tab button that toggles the corresponding panel.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
export declare const TabsTab: React$1.ForwardRefExoticComponent<Omit<TabsTabProps, "ref"> & React$1.RefAttributes<HTMLElement>>;
export type TabsTabValue = any | null;
export type TabsTabActivationDirection = "left" | "right" | "up" | "down" | "none";
export interface TabsTabPosition {
	left: number;
	right: number;
	top: number;
	bottom: number;
}
export interface TabsTabSize {
	width: number;
	height: number;
}
export interface TabsTabMetadata {
	disabled: boolean;
	id: string | undefined;
	value: TabsTab.Value | undefined;
}
export interface TabsTabState {
	/**
	 * Whether the component should ignore user interaction.
	 */
	disabled: boolean;
	/**
	 * Whether the component is active.
	 */
	active: boolean;
	/**
	 * The component orientation.
	 */
	orientation: TabsRoot.Orientation;
}
export interface TabsTabProps extends NativeButtonProps, BaseUIComponentProps<"button", TabsTabState> {
	/**
	 * The value of the Tab.
	 */
	value: TabsTab.Value;
	/**
	 * Whether the Tab is disabled.
	 *
	 * If a first Tab on a `<Tabs.List>` is disabled, it won't initially be selected.
	 * Instead, the next enabled Tab will be selected.
	 * However, it does not work like this during server-side rendering, as it is not known
	 * during pre-rendering which Tabs are disabled.
	 * To work around it, ensure that `defaultValue` or `value` on `<Tabs.Root>` is set to an enabled Tab's value.
	 */
	disabled?: boolean | undefined;
}
export declare namespace TabsTab {
	type Value = TabsTabValue;
	type ActivationDirection = TabsTabActivationDirection;
	type Position = TabsTabPosition;
	type Size = TabsTabSize;
	type Metadata = TabsTabMetadata;
	type State = TabsTabState;
	type Props = TabsTabProps;
}
/**
 * Groups the tabs and the corresponding panels.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
export declare const TabsRoot: React$1.ForwardRefExoticComponent<Omit<TabsRootProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export type TabsRootOrientation = Orientation;
export interface TabsRootState {
	/**
	 * The component orientation.
	 */
	orientation: TabsRoot.Orientation;
	/**
	 * The direction used for tab activation.
	 */
	tabActivationDirection: TabsTab.ActivationDirection;
}
export interface TabsRootProps extends BaseUIComponentProps<"div", TabsRootState> {
	/**
	 * The value of the currently active `Tab`. Use when the component is controlled.
	 * When the value is `null`, no Tab will be active.
	 */
	value?: TabsTab.Value | undefined;
	/**
	 * The default value. Use when the component is not controlled.
	 * When the value is `null`, no Tab will be active.
	 * @default 0
	 */
	defaultValue?: TabsTab.Value | undefined;
	/**
	 * The component orientation (layout flow direction).
	 * @default 'horizontal'
	 */
	orientation?: TabsRoot.Orientation | undefined;
	/**
	 * Callback invoked when new value is being set.
	 *
	 * The event `reason` is `'none'` for user-initiated changes, such as a click
	 * or keyboard navigation; `'initial'` for the first automatic selection or
	 * fallback in uncontrolled roots when `defaultValue` is omitted or
	 * `undefined`, including when the implicit initial value is disabled or
	 * missing; `'disabled'` for automatic fallback when the selected tab becomes
	 * disabled in uncontrolled roots; or `'missing'` for automatic fallback when
	 * the selected tab is removed, or when an explicit `defaultValue` never
	 * matches a mounted tab in uncontrolled roots.
	 *
	 * For automatic changes, the selected value can be `null` when no enabled Tab
	 * is available as a fallback.
	 *
	 * Automatic changes cannot be canceled; calling `eventDetails.cancel()` for
	 * `'initial'`, `'disabled'`, or `'missing'` has no effect.
	 */
	onValueChange?: ((value: TabsTab.Value, eventDetails: TabsRoot.ChangeEventDetails) => void) | undefined;
}
export type TabsRootChangeEventReason = typeof none | typeof disabled | typeof missing | typeof initial;
export type TabsRootChangeEventDetails = BaseUIChangeEventDetails<TabsRoot.ChangeEventReason, {
	activationDirection: TabsTab.ActivationDirection;
}>;
export declare namespace TabsRoot {
	type State = TabsRootState;
	type Props = TabsRootProps;
	type Orientation = TabsRootOrientation;
	type ChangeEventReason = TabsRootChangeEventReason;
	type ChangeEventDetails = TabsRootChangeEventDetails;
}
/**
 * A visual indicator that can be styled to match the position of the currently active tab.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
export declare const TabsIndicator: React$1.ForwardRefExoticComponent<Omit<TabsIndicatorProps, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
export interface TabsIndicatorState extends TabsRootState {
	/**
	 * The active tab position.
	 */
	activeTabPosition: TabsTab.Position | null;
	/**
	 * The active tab size.
	 */
	activeTabSize: TabsTab.Size | null;
	/**
	 * The component orientation.
	 */
	orientation: TabsRoot.Orientation;
}
export interface TabsIndicatorProps extends BaseUIComponentProps<"span", TabsIndicatorState> {
	/**
	 * Whether to render itself before React hydrates.
	 * This minimizes the time that the indicator isn't visible after server-side rendering.
	 * @default false
	 */
	renderBeforeHydration?: boolean | undefined;
}
export declare namespace TabsIndicator {
	type State = TabsIndicatorState;
	type Props = TabsIndicatorProps;
}
export type TransitionStatus = "starting" | "ending" | "idle" | undefined;
/**
 * A panel displayed when the corresponding tab is active.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
export declare const TabsPanel: React$1.ForwardRefExoticComponent<Omit<TabsPanelProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface TabsPanelMetadata {
	id?: string | undefined;
	value: TabsTab.Value;
}
export interface TabsPanelState extends TabsRootState {
	/**
	 * Whether the component is hidden.
	 */
	hidden: boolean;
	/**
	 * The transition status of the component.
	 */
	transitionStatus: TransitionStatus;
}
export interface TabsPanelProps extends BaseUIComponentProps<"div", TabsPanelState> {
	/**
	 * The value of the TabPanel. It will be shown when the Tab with the corresponding value is active.
	 */
	value: TabsTab.Value;
	/**
	 * Whether to keep the HTML element in the DOM while the panel is hidden.
	 * @default false
	 */
	keepMounted?: boolean | undefined;
}
export declare namespace TabsPanel {
	type Metadata = TabsPanelMetadata;
	type State = TabsPanelState;
	type Props = TabsPanelProps;
}
/**
 * Groups the individual tab buttons.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Tabs](https://base-ui.com/react/components/tabs)
 */
export declare const TabsList: React$1.ForwardRefExoticComponent<Omit<TabsListProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface TabsListState extends TabsRootState {
}
export interface TabsListProps extends BaseUIComponentProps<"div", TabsListState> {
	/**
	 * Whether to automatically change the active tab on arrow key focus.
	 * Otherwise, tabs will be activated using <kbd>Enter</kbd> or <kbd>Space</kbd> key press.
	 * @default false
	 */
	activateOnFocus?: boolean | undefined;
	/**
	 * Whether to loop keyboard focus back to the first item
	 * when the end of the list is reached while using the arrow keys.
	 * @default true
	 */
	loopFocus?: boolean | undefined;
}
export declare namespace TabsList {
	type State = TabsListState;
	type Props = TabsListProps;
}

declare namespace Tabs {
	export { TabsIndicator as Indicator, TabsList as List, TabsPanel as Panel, TabsRoot as Root, TabsTab as Tab };
}

export {
	Tabs,
};

export {};
