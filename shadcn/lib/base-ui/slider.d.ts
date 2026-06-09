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
/**
 * Details of custom generic events emitted by Base UI components.
 */
export type BaseUIGenericEventDetail<Reason extends string, CustomProperties extends object> = {
	/**
	 * The reason for the event.
	 */
	reason: Reason;
	/**
	 * The native event associated with the custom event.
	 */
	event: ReasonToEvent<Reason>;
} & CustomProperties;
export type BaseUIGenericEventDetails<Reason extends string, CustomProperties extends object = {}> = Reason extends string ? BaseUIGenericEventDetail<Reason, CustomProperties> & {} : never;
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
export type Orientation = "horizontal" | "vertical";
export interface FieldRootState {
	/**
	 * Whether the component should ignore user interaction.
	 */
	disabled: boolean;
	/**
	 * Whether the field has been touched.
	 */
	touched: boolean;
	/**
	 * Whether the field value has changed from its initial value.
	 */
	dirty: boolean;
	/**
	 * Whether the field is valid.
	 */
	valid: boolean | null;
	/**
	 * Whether the field has a value.
	 */
	filled: boolean;
	/**
	 * Whether the field is focused.
	 */
	focused: boolean;
}
/**
 * Groups all parts of the slider.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
 */
export declare const SliderRoot: {
	<Value extends number | readonly number[]>(props: SliderRoot.Props<Value> & {
		ref?: React$1.Ref<HTMLDivElement> | undefined;
	}): React$1.JSX.Element;
};
export interface SliderRootState extends FieldRootState {
	/**
	 * The index of the active thumb.
	 */
	activeThumbIndex: number;
	/**
	 * Whether the component should ignore user interaction.
	 */
	disabled: boolean;
	/**
	 * Whether the thumb is currently being dragged.
	 */
	dragging: boolean;
	/**
	 * The maximum value.
	 */
	max: number;
	/**
	 * The minimum value.
	 */
	min: number;
	/**
	 * The minimum steps between values in a range slider.
	 * @default 0
	 */
	minStepsBetweenValues: number;
	/**
	 * The component orientation.
	 */
	orientation: Orientation;
	/**
	 * The step increment of the slider when incrementing or decrementing. It will snap
	 * to multiples of this value. Decimal values are supported.
	 * @default 1
	 */
	step: number;
	/**
	 * The raw number value of the slider.
	 */
	values: readonly number[];
}
export interface SliderRootProps<Value extends number | readonly number[] = number | readonly number[]> extends BaseUIComponentProps<"div", SliderRootState> {
	/**
	 * The uncontrolled value of the slider when it's initially rendered.
	 *
	 * To render a controlled slider, use the `value` prop instead.
	 */
	defaultValue?: Value | undefined;
	/**
	 * Whether the slider should ignore user interaction.
	 * @default false
	 */
	disabled?: boolean | undefined;
	/**
	 * Options to format the input value.
	 */
	format?: Intl.NumberFormatOptions | undefined;
	/**
	 * The locale used by `Intl.NumberFormat` when formatting the value.
	 * Defaults to the user's runtime locale.
	 */
	locale?: Intl.LocalesArgument | undefined;
	/**
	 * The maximum allowed value of the slider.
	 * Should not be equal to min.
	 * @default 100
	 */
	max?: number | undefined;
	/**
	 * The minimum allowed value of the slider.
	 * Should not be equal to max.
	 * @default 0
	 */
	min?: number | undefined;
	/**
	 * The minimum steps between values in a range slider.
	 * @default 0
	 */
	minStepsBetweenValues?: number | undefined;
	/**
	 * Identifies the field when a form is submitted.
	 */
	name?: string | undefined;
	/**
	 * Identifies the form that owns the slider inputs.
	 * Useful when the slider is rendered outside the form.
	 */
	form?: string | undefined;
	/**
	 * The component orientation.
	 * @default 'horizontal'
	 */
	orientation?: Orientation | undefined;
	/**
	 * The granularity with which the slider can step through values. (A "discrete" slider.)
	 * The `min` prop serves as the origin for the valid values.
	 * We recommend (max - min) to be evenly divisible by the step.
	 * @default 1
	 */
	step?: number | undefined;
	/**
	 * The granularity with which the slider can step through values when using Page Up/Page Down or Shift + Arrow Up/Arrow Down.
	 * @default 10
	 */
	largeStep?: number | undefined;
	/**
	 * How the thumb(s) are aligned relative to `Slider.Control` when the value is at `min` or `max`:
	 * - `center`: The center of the thumb is aligned with the control edge
	 * - `edge`: The thumb is inset within the control such that its edge is aligned with the control edge
	 * - `edge-client-only`: Same as `edge` but renders after React hydration on the client, reducing bundle size in return
	 * @default 'center'
	 */
	thumbAlignment?: "center" | "edge" | "edge-client-only" | undefined;
	/**
	 * Controls how thumbs behave when they collide during pointer interactions.
	 *
	 * - `'push'` (default): Thumbs push each other without restoring their previous positions when dragged back.
	 * - `'swap'`: Thumbs swap places when dragged past each other.
	 * - `'none'`: Thumbs cannot move past each other; excess movement is ignored.
	 *
	 * @default 'push'
	 */
	thumbCollisionBehavior?: "push" | "swap" | "none" | undefined;
	/**
	 * The value of the slider.
	 * For ranged sliders, provide an array with two values.
	 */
	value?: Value | undefined;
	/**
	 * Callback function that is fired when the slider's value changed.
	 * You can pull out the new value by accessing `event.target.value` (any).
	 *
	 * The `eventDetails.reason` indicates what triggered the change:
	 *
	 * - `'input-change'` when the hidden range input emits a change event (for example, via form integration)
	 * - `'track-press'` when the control track is pressed
	 * - `'drag'` while dragging a thumb
	 * - `'keyboard'` for keyboard input
	 * - `'none'` when the change is triggered without a specific interaction
	 */
	onValueChange?: ((value: Value extends number ? number : Value, eventDetails: SliderRoot.ChangeEventDetails) => void) | undefined;
	/**
	 * Callback function that is fired when the `pointerup` is triggered.
	 * **Warning**: This is a generic event not a change event.
	 *
	 * The `eventDetails.reason` indicates what triggered the commit:
	 *
	 * - `'drag'` while dragging a thumb
	 * - `'track-press'` when the control track is pressed
	 * - `'keyboard'` for keyboard input
	 * - `'input-change'` when the hidden range input emits a change event (for example, via form integration)
	 * - `'none'` when the commit occurs without a specific interaction
	 */
	onValueCommitted?: ((value: Value extends number ? number : Value, eventDetails: SliderRoot.CommitEventDetails) => void) | undefined;
}
export interface SliderRootChangeEventCustomProperties {
	/**
	 * The index of the active thumb at the time of the change.
	 */
	activeThumbIndex: number;
}
export type SliderRootChangeEventReason = typeof inputChange | typeof trackPress | typeof drag | typeof keyboard | typeof none;
export type SliderRootChangeEventDetails = BaseUIChangeEventDetails<SliderRoot.ChangeEventReason, SliderRootChangeEventCustomProperties>;
export type SliderRootCommitEventReason = typeof inputChange | typeof trackPress | typeof drag | typeof keyboard | typeof none;
export type SliderRootCommitEventDetails = BaseUIGenericEventDetails<SliderRoot.CommitEventReason>;
export declare namespace SliderRoot {
	type State = SliderRootState;
	type Props<Value extends number | readonly number[] = number | readonly number[]> = SliderRootProps<Value>;
	type ChangeEventReason = SliderRootChangeEventReason;
	type ChangeEventDetails = SliderRootChangeEventDetails;
	type CommitEventReason = SliderRootCommitEventReason;
	type CommitEventDetails = SliderRootCommitEventDetails;
}
/**
 * An accessible label that is automatically associated with the slider thumbs.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
 */
export declare const SliderLabel: React$1.ForwardRefExoticComponent<Omit<SliderLabelProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export type SliderLabelState = SliderRoot.State;
export interface SliderLabelProps extends Omit<BaseUIComponentProps<"div", SliderLabel.State>, "id"> {
}
export declare namespace SliderLabel {
	type State = SliderLabelState;
	type Props = SliderLabelProps;
}
/**
 * Displays the current value of the slider as text.
 * Renders an `<output>` element.
 *
 * Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
 */
export declare const SliderValue: React$1.ForwardRefExoticComponent<Omit<SliderValueProps, "ref"> & React$1.RefAttributes<HTMLOutputElement>>;
export interface SliderValueState extends SliderRootState {
}
export interface SliderValueProps extends Omit<BaseUIComponentProps<"output", SliderValueState>, "children"> {
	children?: null | ((formattedValues: readonly string[], values: readonly number[]) => React$1.ReactNode) | undefined;
}
export declare namespace SliderValue {
	type State = SliderValueState;
	type Props = SliderValueProps;
}
/**
 * The clickable, interactive part of the slider.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
 */
export declare const SliderControl: React$1.ForwardRefExoticComponent<Omit<SliderControlProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface SliderControlState extends SliderRootState {
}
export interface SliderControlProps extends BaseUIComponentProps<"div", SliderControlState> {
}
export declare namespace SliderControl {
	type State = SliderControlState;
	type Props = SliderControlProps;
}
/**
 * Contains the slider indicator and represents the entire range of the slider.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
 */
export declare const SliderTrack: React$1.ForwardRefExoticComponent<Omit<SliderTrackProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface SliderTrackState extends SliderRootState {
}
export interface SliderTrackProps extends BaseUIComponentProps<"div", SliderTrackState> {
}
export declare namespace SliderTrack {
	type State = SliderTrackState;
	type Props = SliderTrackProps;
}
export interface LabelableContext {
	/**
	 * The `id` of the labelable element.
	 * When `null` the association is implicit.
	 */
	controlId: string | null | undefined;
	registerControlId: (source: symbol, id: string | null | undefined) => void;
	/**
	 * The `id` of the label.
	 */
	labelId: string | undefined;
	setLabelId: React$1.Dispatch<React$1.SetStateAction<string | undefined>>;
	/**
	 * An array of `id`s of elements that provide an accessible description.
	 */
	messageIds: string[];
	setMessageIds: React$1.Dispatch<React$1.SetStateAction<string[]>>;
	getDescriptionProps: (externalProps: HTMLProps) => HTMLProps;
}
declare const LabelableContext: React$1.Context<LabelableContext>;
/**
 * The draggable part of the slider at the tip of the indicator.
 * Renders a `<div>` element and a nested `<input type="range">`.
 *
 * Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
 */
export declare const SliderThumb: React$1.ForwardRefExoticComponent<Omit<SliderThumbProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface ThumbMetadata {
	inputId: LabelableContext["controlId"];
}
export interface SliderThumbState extends SliderRootState {
}
export interface SliderThumbProps extends Omit<BaseUIComponentProps<"div", SliderThumbState>, "onBlur" | "onFocus"> {
	/**
	 * Whether the thumb should ignore user interaction.
	 * @default false
	 */
	disabled?: boolean | undefined;
	/**
	 * A function which returns a string value for the [`aria-label`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label) attribute of the `input`.
	 */
	getAriaLabel?: ((index: number) => string) | null | undefined;
	/**
	 * A function which returns a string value for the [`aria-valuetext`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-valuetext) attribute of the `input`.
	 * This is important for screen reader users.
	 */
	getAriaValueText?: ((formattedValue: string, value: number, index: number) => string) | null | undefined;
	/**
	 * The index of the thumb which corresponds to the index of its value in the
	 * `value` or `defaultValue` array.
	 * This prop is required to support server-side rendering for range sliders
	 * with multiple thumbs.
	 * @example
	 * ```tsx
	 * <Slider.Root value={[10, 20]}>
	 *   <Slider.Thumb index={0} />
	 *   <Slider.Thumb index={1} />
	 * </Slider.Root>
	 * ```
	 */
	index?: number | undefined;
	/**
	 * A ref to access the nested input element.
	 */
	inputRef?: React$1.Ref<HTMLInputElement> | undefined;
	/**
	 * A blur handler forwarded to the `input`.
	 */
	onBlur?: React$1.FocusEventHandler<HTMLInputElement> | undefined;
	/**
	 * A focus handler forwarded to the `input`.
	 */
	onFocus?: React$1.FocusEventHandler<HTMLInputElement> | undefined;
	/**
	 * Optional tab index attribute forwarded to the `input`.
	 */
	tabIndex?: number | undefined;
}
export declare namespace SliderThumb {
	type State = SliderThumbState;
	type Props = SliderThumbProps;
}
/**
 * Visualizes the current value of the slider.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Slider](https://base-ui.com/react/components/slider)
 */
export declare const SliderIndicator: React$1.ForwardRefExoticComponent<Omit<SliderIndicatorProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface SliderIndicatorState extends SliderRootState {
}
export interface SliderIndicatorProps extends BaseUIComponentProps<"div", SliderIndicatorState> {
}
export declare namespace SliderIndicator {
	type State = SliderIndicatorState;
	type Props = SliderIndicatorProps;
}

declare namespace Slider {
	export { SliderControl as Control, SliderIndicator as Indicator, SliderLabel as Label, SliderRoot as Root, SliderThumb as Thumb, SliderTrack as Track, SliderValue as Value };
}

export {
	Slider,
};

export {};
