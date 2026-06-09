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
export type TransitionStatus = "starting" | "ending" | "idle" | undefined;
export interface UseCollapsibleRootReturnValue {
	/**
	 * Whether the component should ignore user interaction.
	 */
	disabled: boolean;
	handleTrigger: (event: React$1.MouseEvent | React$1.KeyboardEvent) => void;
	/**
	 * Whether the collapsible panel is mounted for transition and hidden-state
	 * purposes. This can be `false` while the element remains in the DOM when
	 * `keepMounted` or `hiddenUntilFound` is enabled.
	 */
	mounted: boolean;
	/**
	 * Whether the collapsible panel is currently open.
	 */
	open: boolean;
	panelId: React$1.HTMLAttributes<Element>["id"];
	setMounted: (nextMounted: boolean) => void;
	setOpen: (open: boolean) => void;
	setPanelIdState: (id: string | undefined) => void;
	transitionStatus: TransitionStatus;
}
/**
 * Groups all parts of the collapsible.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Collapsible](https://base-ui.com/react/components/collapsible)
 */
export declare const CollapsibleRoot: React$1.ForwardRefExoticComponent<Omit<CollapsibleRootProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface CollapsibleRootState extends Pick<UseCollapsibleRootReturnValue, "open" | "disabled" | "transitionStatus"> {
}
export interface CollapsibleRootProps extends BaseUIComponentProps<"div", CollapsibleRootState> {
	/**
	 * Whether the collapsible panel is currently open.
	 *
	 * To render an uncontrolled collapsible, use the `defaultOpen` prop instead.
	 */
	open?: boolean | undefined;
	/**
	 * Whether the collapsible panel is initially open.
	 *
	 * To render a controlled collapsible, use the `open` prop instead.
	 * @default false
	 */
	defaultOpen?: boolean | undefined;
	/**
	 * Event handler called when the panel is opened or closed.
	 */
	onOpenChange?: ((open: boolean, eventDetails: CollapsibleRootChangeEventDetails) => void) | undefined;
	/**
	 * Whether the component should ignore user interaction.
	 * @default false
	 */
	disabled?: boolean | undefined;
}
export type CollapsibleRootChangeEventReason = typeof triggerPress | typeof none;
export type CollapsibleRootChangeEventDetails = BaseUIChangeEventDetails<CollapsibleRootChangeEventReason>;
export declare namespace CollapsibleRoot {
	type State = CollapsibleRootState;
	type Props = CollapsibleRootProps;
	type ChangeEventReason = CollapsibleRootChangeEventReason;
	type ChangeEventDetails = CollapsibleRootChangeEventDetails;
}
/**
 * A button that opens and closes the collapsible panel.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Collapsible](https://base-ui.com/react/components/collapsible)
 */
export declare const CollapsibleTrigger: React$1.ForwardRefExoticComponent<Omit<CollapsibleTriggerProps, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
export interface CollapsibleTriggerState extends CollapsibleRootState {
}
export interface CollapsibleTriggerProps extends NativeButtonProps, BaseUIComponentProps<"button", CollapsibleTriggerState> {
}
export declare namespace CollapsibleTrigger {
	type State = CollapsibleTriggerState;
	type Props = CollapsibleTriggerProps;
}
/**
 * A panel with the collapsible contents.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Collapsible](https://base-ui.com/react/components/collapsible)
 */
export declare const CollapsiblePanel: React$1.ForwardRefExoticComponent<Omit<CollapsiblePanelProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface CollapsiblePanelState extends CollapsibleRootState {
	/**
	 * The transition status of the component.
	 */
	transitionStatus: TransitionStatus;
}
export interface CollapsiblePanelProps extends BaseUIComponentProps<"div", CollapsiblePanelState> {
	/**
	 * Allows the browser's built-in page search to find and expand the panel contents.
	 *
	 * Overrides the `keepMounted` prop and uses `hidden="until-found"`
	 * to hide the element without removing it from the DOM.
	 *
	 * @default false
	 */
	hiddenUntilFound?: boolean | undefined;
	/**
	 * Whether to keep the element in the DOM while the panel is hidden.
	 * This prop is ignored when `hiddenUntilFound` is used.
	 * @default false
	 */
	keepMounted?: boolean | undefined;
}
export declare namespace CollapsiblePanel {
	type State = CollapsiblePanelState;
	type Props = CollapsiblePanelProps;
}

declare namespace Collapsible {
	export { CollapsiblePanel as Panel, CollapsibleRoot as Root, CollapsibleTrigger as Trigger };
}

export {
	Collapsible,
};

export {};
