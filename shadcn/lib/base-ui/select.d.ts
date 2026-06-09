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
export interface Group<Item = any> {
	[key: string]: unknown;
	items: ReadonlyArray<Item>;
}
/**
 * Groups all parts of the select.
 * Doesn't render its own HTML element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare function SelectRoot<Value, Multiple extends boolean | undefined = false>(props: SelectRoot.Props<Value, Multiple>): React$1.JSX.Element;
export type SelectValueType<Value, Multiple extends boolean | undefined> = Multiple extends true ? Value[] : Value;
export interface SelectRootProps<Value, Multiple extends boolean | undefined = false> {
	children?: React$1.ReactNode;
	/**
	 * A ref to access the hidden input element.
	 */
	inputRef?: React$1.Ref<HTMLInputElement> | undefined;
	/**
	 * Identifies the field when a form is submitted.
	 */
	name?: string | undefined;
	/**
	 * Identifies the form that owns the hidden input.
	 * Useful when the select is rendered outside the form.
	 */
	form?: string | undefined;
	/**
	 * Provides a hint to the browser for autofill.
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete
	 */
	autoComplete?: string | undefined;
	/**
	 * The id of the Select.
	 */
	id?: string | undefined;
	/**
	 * Whether the user must choose a value before submitting a form.
	 * @default false
	 */
	required?: boolean | undefined;
	/**
	 * Whether the user should be unable to choose a different option from the select popup.
	 * @default false
	 */
	readOnly?: boolean | undefined;
	/**
	 * Whether the component should ignore user interaction.
	 * @default false
	 */
	disabled?: boolean | undefined;
	/**
	 * Whether multiple items can be selected.
	 * @default false
	 */
	multiple?: Multiple | undefined;
	/**
	 * Whether moving the pointer over items should highlight them.
	 * Disabling this prop allows CSS `:hover` to be differentiated from the `:focus` (`data-highlighted`) state.
	 * @default true
	 */
	highlightItemOnHover?: boolean | undefined;
	/**
	 * Whether the select popup is initially open.
	 *
	 * To render a controlled select popup, use the `open` prop instead.
	 * @default false
	 */
	defaultOpen?: boolean | undefined;
	/**
	 * Event handler called when the select popup is opened or closed.
	 */
	onOpenChange?: ((open: boolean, eventDetails: SelectRootChangeEventDetails) => void) | undefined;
	/**
	 * Event handler called after any animations complete when the select popup is opened or closed.
	 */
	onOpenChangeComplete?: ((open: boolean) => void) | undefined;
	/**
	 * Whether the select popup is currently open.
	 */
	open?: boolean | undefined;
	/**
	 * Determines if the select enters a modal state when open.
	 * - `true`: user interaction is limited to the select: document page scroll is locked and pointer interactions on outside elements are disabled.
	 * - `false`: user interaction with the rest of the document is allowed.
	 * @default true
	 */
	modal?: boolean | undefined;
	/**
	 * A ref to imperative actions.
	 * - `unmount`: When specified, the select will not be unmounted when closed.
	 * Instead, the `unmount` function must be called to unmount the select manually.
	 * Useful when the select's animation is controlled by an external library.
	 */
	actionsRef?: React$1.RefObject<SelectRootActions | null> | undefined;
	/**
	 * Data structure of the items rendered in the select popup.
	 * When specified, `<Select.Value>` renders the label of the selected item instead of the raw value.
	 * @example
	 * ```tsx
	 * const items = {
	 *   sans: 'Sans-serif',
	 *   serif: 'Serif',
	 *   mono: 'Monospace',
	 *   cursive: 'Cursive',
	 * };
	 * <Select.Root items={items} />
	 * ```
	 */
	items?: Record<string, React$1.ReactNode> | ReadonlyArray<{
		label: React$1.ReactNode;
		value: any;
	}> | ReadonlyArray<Group<any>> | undefined;
	/**
	 * When the item values are objects (`<Select.Item value={object}>`), this function converts the object value to a string representation for display in the trigger.
	 * If the shape of the object is `{ value, label }`, the label will be used automatically without needing to specify this prop.
	 */
	itemToStringLabel?: ((itemValue: Value) => string) | undefined;
	/**
	 * When the item values are objects (`<Select.Item value={object}>`), this function converts the object value to a string representation for form submission.
	 * If the shape of the object is `{ value, label }`, the value will be used automatically without needing to specify this prop.
	 */
	itemToStringValue?: ((itemValue: Value) => string) | undefined;
	/**
	 * Custom comparison logic used to determine if a select item value matches the current selected value. Useful when item values are objects without matching referentially.
	 * Defaults to `Object.is` comparison.
	 */
	isItemEqualToValue?: ((itemValue: Value, value: Value) => boolean) | undefined;
	/**
	 * The uncontrolled value of the select when it's initially rendered.
	 *
	 * To render a controlled select, use the `value` prop instead.
	 */
	defaultValue?: SelectValueType<Value, Multiple> | null | undefined;
	/**
	 * The value of the select. Use when controlled.
	 */
	value?: SelectValueType<Value, Multiple> | null | undefined;
	/**
	 * Event handler called when the value of the select changes.
	 */
	onValueChange?: ((value: SelectValueType<Value, Multiple> | (Multiple extends true ? never : null), eventDetails: SelectRootChangeEventDetails) => void) | undefined;
}
export interface SelectRootState {
}
export interface SelectRootActions {
	unmount: () => void;
}
export type SelectRootChangeEventReason = typeof triggerPress | typeof outsidePress | typeof escapeKey | typeof windowResize | typeof itemPress | typeof focusOut | typeof listNavigation | typeof cancelOpen | typeof none;
export type SelectRootChangeEventDetails = BaseUIChangeEventDetails<SelectRootChangeEventReason>;
export declare namespace SelectRoot {
	type Props<Value, Multiple extends boolean | undefined = false> = SelectRootProps<Value, Multiple>;
	type State = SelectRootState;
	type Actions = SelectRootActions;
	type ChangeEventReason = SelectRootChangeEventReason;
	type ChangeEventDetails = SelectRootChangeEventDetails;
}
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
export interface NonNativeButtonProps {
	/**
	 * Whether the component renders a native `<button>` element when replacing it
	 * via the `render` prop.
	 * Set to `true` if the rendered element is a native button.
	 * @default false
	 */
	nativeButton?: boolean | undefined;
}
export type Orientation = "horizontal" | "vertical";
export type Errors = Record<string, string | string[]>;
export interface FormContext {
	errors: Errors;
	clearErrors: (name: string | undefined) => void;
	formRef: React$1.RefObject<{
		fields: Map<string, {
			name: string | undefined;
			/**
			 * After this returns, the field registry entry reflects the latest synchronous
			 * validity verdict. Async validators do not block submit.
			 */
			validate: () => void;
			validityData: FieldValidityData;
			controlRef: React$1.RefObject<HTMLElement | null>;
			getValue: () => unknown;
		}>;
	}>;
	validationMode: Form.ValidationMode;
	submitAttemptedRef: React$1.RefObject<boolean>;
}
declare const FormContext: React$1.Context<FormContext>;
declare const Form: {
	<FormValues extends Record<string, any> = Record<string, any>>(props: Form.Props<FormValues> & {
		ref?: React$1.Ref<HTMLFormElement> | undefined;
	}): React$1.JSX.Element;
};
export type FormSubmitEventReason = typeof none;
export type FormSubmitEventDetails = BaseUIGenericEventDetails<Form.SubmitEventReason>;
export type FormValidationMode = "onSubmit" | "onBlur" | "onChange";
export interface FormActions {
	validate: (fieldName?: string | undefined) => void;
}
export interface FormState {
}
export interface FormProps<FormValues extends Record<string, any> = Record<string, any>> extends BaseUIComponentProps<"form", FormState> {
	/**
	 * Determines when the form should be validated.
	 * The `validationMode` prop on `<Field.Root>` takes precedence over this.
	 *
	 * - `onSubmit` (default): validates the field when the form is submitted, afterwards fields will re-validate on change.
	 * - `onBlur`: validates a field when it loses focus.
	 * - `onChange`: validates the field on every change to its value.
	 *
	 * @default 'onSubmit'
	 */
	validationMode?: FormValidationMode | undefined;
	/**
	 * Validation errors returned externally, typically after submission by a server or a form action.
	 * This should be an object where keys correspond to the `name` attribute on `<Field.Root>`,
	 * and values correspond to error(s) related to that field.
	 */
	errors?: FormContext["errors"] | undefined;
	/**
	 * Event handler called when the form is submitted.
	 * `preventDefault()` is called on the native submit event when used.
	 */
	onFormSubmit?: ((formValues: FormValues, eventDetails: Form.SubmitEventDetails) => void) | undefined;
	/**
	 * A ref to imperative actions.
	 * - `validate`: Validates all fields when called. Optionally pass a field name to validate a single field.
	 * @example
	 * ```tsx
	 * // validate all fields
	 * actionsRef.current.validate();
	 *
	 * // validate one field
	 * actionsRef.current.validate('email');
	 * ```
	 */
	actionsRef?: React$1.RefObject<Form.Actions | null> | undefined;
}
declare namespace Form {
	type Props<FormValues extends Record<string, any> = Record<string, any>> = FormProps<FormValues>;
	type State = FormState;
	type Actions = FormActions;
	type ValidationMode = FormValidationMode;
	type SubmitEventReason = FormSubmitEventReason;
	type SubmitEventDetails = FormSubmitEventDetails;
	type Values<FormValues extends Record<string, any> = Record<string, any>> = FormValues;
}
declare const FieldRoot: React$1.ForwardRefExoticComponent<Omit<FieldRootProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface FieldValidityData {
	state: {
		badInput: boolean;
		customError: boolean;
		patternMismatch: boolean;
		rangeOverflow: boolean;
		rangeUnderflow: boolean;
		stepMismatch: boolean;
		tooLong: boolean;
		tooShort: boolean;
		typeMismatch: boolean;
		valueMissing: boolean;
		valid: boolean | null;
	};
	error: string;
	errors: string[];
	value: unknown;
	initialValue: unknown;
}
export interface FieldRootActions {
	validate: () => void;
}
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
export interface FieldRootProps extends BaseUIComponentProps<"div", FieldRootState> {
	/**
	 * Whether the component should ignore user interaction.
	 * Takes precedence over the `disabled` prop on the `<Field.Control>` component.
	 * @default false
	 */
	disabled?: boolean | undefined;
	/**
	 * Identifies the field when a form is submitted.
	 * Takes precedence over the `name` prop on the `<Field.Control>` component.
	 */
	name?: string | undefined;
	/**
	 * A function for custom validation. Return a string or an array of strings with
	 * the error message(s) if the value is invalid, or `null` if the value is valid.
	 * Asynchronous functions are supported, but they do not prevent form submission
	 * when using `validationMode="onSubmit"`.
	 */
	validate?: ((value: unknown, formValues: Form.Values) => string | string[] | null | Promise<string | string[] | null>) | undefined;
	/**
	 * Determines when the field should be validated.
	 * This takes precedence over the `validationMode` prop on `<Form>`.
	 *
	 * - `onSubmit`: triggers validation when the form is submitted, and re-validates on change after submission.
	 * - `onBlur`: triggers validation when the control loses focus.
	 * - `onChange`: triggers validation on every change to the control value.
	 *
	 * @default 'onSubmit'
	 */
	validationMode?: Form.ValidationMode | undefined;
	/**
	 * How long to wait between `validate` callbacks if
	 * `validationMode="onChange"` is used. Specified in milliseconds.
	 * @default 0
	 */
	validationDebounceTime?: number | undefined;
	/**
	 * Whether the field is invalid.
	 * Useful when the field state is controlled by an external library.
	 */
	invalid?: boolean | undefined;
	/**
	 * Whether the field's value has been changed from its initial value.
	 * Useful when the field state is controlled by an external library.
	 */
	dirty?: boolean | undefined;
	/**
	 * Whether the field has been touched.
	 * Useful when the field state is controlled by an external library.
	 */
	touched?: boolean | undefined;
	/**
	 * A ref to imperative actions.
	 * - `validate`: Validates the field when called.
	 */
	actionsRef?: React$1.RefObject<FieldRoot.Actions | null> | undefined;
}
declare namespace FieldRoot {
	type State = FieldRootState;
	type Props = FieldRootProps;
	type Actions = FieldRootActions;
}
/**
 * An accessible label that is automatically associated with the select trigger.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectLabel: React$1.ForwardRefExoticComponent<Omit<SelectLabelProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export type SelectLabelState = FieldRoot.State;
export interface SelectLabelProps extends Omit<BaseUIComponentProps<"div", SelectLabel.State>, "id"> {
}
export declare namespace SelectLabel {
	type State = SelectLabelState;
	type Props = SelectLabelProps;
}
export declare type Axis = "x" | "y";
export declare type ClientRectObject = Prettify<Rect & SideObject>;
export declare type Coords = {
	[key in Axis]: number;
};
export declare type Dimensions = {
	[key in Length]: number;
};
export declare type Length = "width" | "height";
export declare type Padding = number | Prettify<Partial<SideObject>>;
export declare type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};
export declare type Rect = Prettify<Coords & Dimensions>;
export declare type Side = "top" | "right" | "bottom" | "left";
export declare type SideObject = {
	[key in Side]: number;
};
/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */
export declare interface VirtualElement {
	getBoundingClientRect(): ClientRectObject;
	getClientRects?(): Array<ClientRectObject> | DOMRectList;
	contextElement?: Element;
}
export type InteractionType = "mouse" | "touch" | "pen" | "keyboard" | "";
export type TransitionStatus = "starting" | "ending" | "idle" | undefined;
export interface UseRenderElementComponentProps<State> {
	/**
	 * The class name to apply to the rendered element.
	 * Can be a string or a function that accepts the state and returns a string.
	 */
	className?: string | ((state: State) => string | undefined) | undefined;
	/**
	 * The render prop or React element to override the default element.
	 */
	render?: undefined | React$1.ReactElement | ComponentRenderFn<React$1.HTMLAttributes<any>, State>;
	/**
	 * The style to apply to the rendered element.
	 * Can be a style object or a function that accepts the state and returns a style object.
	 */
	style?: React$1.CSSProperties | ((state: State) => React$1.CSSProperties | undefined) | undefined;
}
export interface UseFloatingPortalNodeProps {
	ref?: React$1.Ref<HTMLDivElement> | undefined;
	container?: HTMLElement | ShadowRoot | null | React$1.RefObject<HTMLElement | ShadowRoot | null> | undefined;
	componentProps?: UseRenderElementComponentProps<any> | undefined;
	elementProps?: React$1.HTMLAttributes<HTMLDivElement> | undefined;
}
declare const FloatingPortal: React$1.ForwardRefExoticComponent<Omit<FloatingPortal.Props<any> & {
	renderGuards?: boolean | undefined;
}, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface FloatingPortalState {
}
declare namespace FloatingPortal {
	type State = FloatingPortalState;
	interface Props<TState> extends BaseUIComponentProps<"div", TState> {
		/**
		 * A parent element to render the portal element into.
		 */
		container?: UseFloatingPortalNodeProps["container"] | undefined;
	}
}
type Side$1 = "top" | "bottom" | "left" | "right" | "inline-end" | "inline-start";
export type Align = "start" | "center" | "end";
export type Boundary = "clipping-ancestors" | Element | Element[] | Rect;
export type OffsetFunction = (data: {
	side: Side$1;
	align: Align;
	anchor: {
		width: number;
		height: number;
	};
	positioner: {
		width: number;
		height: number;
	};
}) => number;
export interface SideFlipMode {
	/**
	 * How to avoid collisions on the side axis.
	 * - `'flip'`: If there is not enough space, place the popup on the opposite side.
	 * - `'none'`: Keep the preferred side even if it overflows.
	 */
	side?: "flip" | "none" | undefined;
	/**
	 * How to avoid collisions on the align axis.
	 * - `'flip'`: If there is not enough space, swap `'start'` and `'end'` alignment.
	 * - `'shift'`: Keep the alignment and shift the popup to fit within the boundary.
	 * - `'none'`: Keep the preferred alignment even if it overflows.
	 */
	align?: "flip" | "shift" | "none" | undefined;
	/**
	 * If both sides on the preferred axis do not fit, determines whether to fallback
	 * to a side on the perpendicular axis and which logical side to prefer.
	 * - `'start'`: Prefer the logical start side on the perpendicular axis.
	 * - `'end'`: Prefer the logical end side on the perpendicular axis.
	 * - `'none'`: Do not fallback to the perpendicular axis.
	 */
	fallbackAxisSide?: "start" | "end" | "none" | undefined;
}
export interface SideShiftMode {
	/**
	 * How to avoid collisions on the side axis.
	 * - `'shift'`: Keep the preferred side and shift the popup to fit within the boundary.
	 * - `'none'`: Keep the preferred side even if it overflows.
	 */
	side?: "shift" | "none" | undefined;
	/**
	 * How to avoid collisions on the align axis.
	 * - `'shift'`: Keep the alignment and shift the popup to fit within the boundary.
	 * - `'none'`: Keep the preferred alignment even if it overflows.
	 */
	align?: "shift" | "none" | undefined;
	/**
	 * If both sides on the preferred axis do not fit, determines whether to fallback
	 * to a side on the perpendicular axis and which logical side to prefer.
	 * - `'start'`: Prefer the logical start side on the perpendicular axis.
	 * - `'end'`: Prefer the logical end side on the perpendicular axis.
	 * - `'none'`: Do not fallback to the perpendicular axis.
	 */
	fallbackAxisSide?: "start" | "end" | "none" | undefined;
}
export type CollisionAvoidance = SideFlipMode | SideShiftMode;
export interface UseAnchorPositioningSharedParameters {
	/**
	 * An element to position the popup against.
	 * By default, the popup will be positioned against the trigger.
	 */
	anchor?: Element | null | VirtualElement | React$1.RefObject<Element | null> | (() => Element | VirtualElement | null) | undefined;
	/**
	 * Determines which CSS `position` property to use.
	 * @default 'absolute'
	 */
	positionMethod?: "absolute" | "fixed" | undefined;
	/**
	 * Which side of the anchor element to align the popup against.
	 * May automatically change to avoid collisions.
	 * @default 'bottom'
	 */
	side?: Side$1 | undefined;
	/**
	 * Distance between the anchor and the popup in pixels.
	 * Also accepts a function that returns the distance to read the dimensions of the anchor
	 * and positioner elements, along with its side and alignment.
	 *
	 * The function takes a `data` object parameter with the following properties:
	 * - `data.anchor`: the dimensions of the anchor element with properties `width` and `height`.
	 * - `data.positioner`: the dimensions of the positioner element with properties `width` and `height`.
	 * - `data.side`: which side of the anchor element the positioner is aligned against.
	 * - `data.align`: how the positioner is aligned relative to the specified side.
	 *
	 * @example
	 * ```jsx
	 * <Positioner
	 *   sideOffset={({ side, align, anchor, positioner }) => {
	 *     return side === 'top' || side === 'bottom'
	 *       ? anchor.height
	 *       : anchor.width;
	 *   }}
	 * />
	 * ```
	 *
	 * @default 0
	 */
	sideOffset?: number | OffsetFunction | undefined;
	/**
	 * How to align the popup relative to the specified side.
	 * @default 'center'
	 */
	align?: Align | undefined;
	/**
	 * Additional offset along the alignment axis in pixels.
	 * Also accepts a function that returns the offset to read the dimensions of the anchor
	 * and positioner elements, along with its side and alignment.
	 *
	 * The function takes a `data` object parameter with the following properties:
	 * - `data.anchor`: the dimensions of the anchor element with properties `width` and `height`.
	 * - `data.positioner`: the dimensions of the positioner element with properties `width` and `height`.
	 * - `data.side`: which side of the anchor element the positioner is aligned against.
	 * - `data.align`: how the positioner is aligned relative to the specified side.
	 *
	 * @example
	 * ```jsx
	 * <Positioner
	 *   alignOffset={({ side, align, anchor, positioner }) => {
	 *     return side === 'top' || side === 'bottom'
	 *       ? anchor.width
	 *       : anchor.height;
	 *   }}
	 * />
	 * ```
	 *
	 * @default 0
	 */
	alignOffset?: number | OffsetFunction | undefined;
	/**
	 * An element or a rectangle that delimits the area that the popup is confined to.
	 * @default 'clipping-ancestors'
	 */
	collisionBoundary?: Boundary | undefined;
	/**
	 * Additional space to maintain from the edge of the collision boundary.
	 * @default 5
	 */
	collisionPadding?: Padding | undefined;
	/**
	 * Whether to maintain the popup in the viewport after
	 * the anchor element was scrolled out of view.
	 * @default false
	 */
	sticky?: boolean | undefined;
	/**
	 * Minimum distance to maintain between the arrow and the edges of the popup.
	 *
	 * Use it to prevent the arrow element from hanging out of the rounded corners of a popup.
	 * @default 5
	 */
	arrowPadding?: number | undefined;
	/**
	 * Whether to disable the popup from tracking any layout shift of its positioning anchor.
	 * @default false
	 */
	disableAnchorTracking?: boolean | undefined;
	/**
	 * Determines how to handle collisions when positioning the popup.
	 *
	 * `side` controls overflow on the preferred placement axis (`top`/`bottom` or `left`/`right`):
	 * - `'flip'`: keep the requested side when it fits; otherwise try the opposite side
	 *   (`top` and `bottom`, or `left` and `right`).
	 * - `'shift'`: never change side; keep the requested side and move the popup within
	 *   the clipping boundary so it stays visible.
	 * - `'none'`: do not correct side-axis overflow.
	 *
	 * `align` controls overflow on the alignment axis (`start`/`center`/`end`):
	 * - `'flip'`: keep side, but swap `start` and `end` when the requested alignment overflows.
	 * - `'shift'`: keep side and requested alignment, then nudge the popup along the
	 *   alignment axis to fit.
	 * - `'none'`: do not correct alignment-axis overflow.
	 *
	 * `fallbackAxisSide` controls fallback behavior on the perpendicular axis when the
	 * preferred axis cannot fit:
	 * - `'start'`: allow perpendicular fallback and try the logical start side first
	 *   (`top` before `bottom`, or `left` before `right` in LTR).
	 * - `'end'`: allow perpendicular fallback and try the logical end side first
	 *   (`bottom` before `top`, or `right` before `left` in LTR).
	 * - `'none'`: do not fallback to the perpendicular axis.
	 *
	 * When `side` is `'shift'`, explicitly setting `align` only supports `'shift'` or `'none'`.
	 * If `align` is omitted, it defaults to `'flip'`.
	 *
	 * @example
	 * ```jsx
	 * <Positioner
	 *   collisionAvoidance={{
	 *     side: 'shift',
	 *     align: 'shift',
	 *     fallbackAxisSide: 'none',
	 *   }}
	 * />
	 * ```
	 *
	 */
	collisionAvoidance?: CollisionAvoidance | undefined;
}
/**
 * A button that opens the select popup.
 * Renders a `<button>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectTrigger: React$1.ForwardRefExoticComponent<Omit<SelectTriggerProps, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
export interface SelectTriggerState extends FieldRootState {
	/**
	 * Whether the select popup is currently open.
	 */
	open: boolean;
	/**
	 * Whether the select popup is readonly.
	 */
	readOnly: boolean;
	/**
	 * Indicates which side the corresponding popup is positioned relative to its anchor.
	 */
	popupSide: Side$1 | null;
	/**
	 * The value of the currently selected item.
	 */
	value: any;
	/**
	 * Whether the select doesn't have a value.
	 */
	placeholder: boolean;
}
export interface SelectTriggerProps extends NativeButtonProps, BaseUIComponentProps<"button", SelectTriggerState> {
	children?: React$1.ReactNode;
	/**
	 * Whether the component should ignore user interaction.
	 */
	disabled?: boolean | undefined;
}
export declare namespace SelectTrigger {
	type State = SelectTriggerState;
	type Props = SelectTriggerProps;
}
/**
 * A text label of the currently selected item.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectValue: React$1.ForwardRefExoticComponent<Omit<SelectValueProps, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
export interface SelectValueState {
	/**
	 * The value of the currently selected item.
	 */
	value: any;
	/**
	 * Whether the placeholder is being displayed.
	 */
	placeholder: boolean;
}
export interface SelectValueProps extends Omit<BaseUIComponentProps<"span", SelectValueState>, "children"> {
	/**
	 * Accepts a function that returns a `ReactNode` to format the selected value.
	 * @example
	 * ```tsx
	 * <Select.Value>
	 *   {(value: string | null) => value ? labels[value] : 'No value'}
	 * </Select.Value>
	 * ```
	 */
	children?: React$1.ReactNode | ((value: any) => React$1.ReactNode);
	/**
	 * The placeholder value to display when no value is selected.
	 * This is overridden by `children` if specified, or by a null item's label in `items`.
	 */
	placeholder?: React$1.ReactNode;
}
export declare namespace SelectValue {
	type State = SelectValueState;
	type Props = SelectValueProps;
}
/**
 * An icon that indicates that the trigger button opens a select popup.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectIcon: React$1.ForwardRefExoticComponent<Omit<SelectIconProps, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
export interface SelectIconState {
	/**
	 * Whether the select popup is currently open.
	 */
	open: boolean;
}
export interface SelectIconProps extends BaseUIComponentProps<"span", SelectIconState> {
}
export declare namespace SelectIcon {
	type State = SelectIconState;
	type Props = SelectIconProps;
}
/**
 * A portal element that moves the popup to a different part of the DOM.
 * By default, the portal element is appended to `<body>`.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectPortal: React$1.ForwardRefExoticComponent<Omit<SelectPortalProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface SelectPortalState {
}
export interface SelectPortalProps extends FloatingPortal.Props<SelectPortalState> {
}
export declare namespace SelectPortal {
	type State = SelectPortalState;
	type Props = SelectPortalProps;
}
/**
 * An overlay displayed beneath the menu popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectBackdrop: React$1.ForwardRefExoticComponent<Omit<SelectBackdropProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface SelectBackdropState {
	/**
	 * Whether the component is open.
	 */
	open: boolean;
	/**
	 * The transition status of the component.
	 */
	transitionStatus: TransitionStatus;
}
export interface SelectBackdropProps extends BaseUIComponentProps<"div", SelectBackdropState> {
}
export declare namespace SelectBackdrop {
	type State = SelectBackdropState;
	type Props = SelectBackdropProps;
}
/**
 * Positions the select popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectPositioner: React$1.ForwardRefExoticComponent<Omit<SelectPositionerProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface SelectPositionerState {
	/**
	 * Whether the component is open.
	 */
	open: boolean;
	/**
	 * The side of the anchor the component is placed on.
	 */
	side: Side$1 | "none";
	/**
	 * The alignment of the component relative to the anchor.
	 */
	align: Align;
	/**
	 * Whether the anchor element is hidden.
	 */
	anchorHidden: boolean;
}
export interface SelectPositionerProps extends UseAnchorPositioningSharedParameters, BaseUIComponentProps<"div", SelectPositionerState> {
	/**
	 * Whether the positioner overlaps the trigger so the selected item's text is aligned with the trigger's value text. This only applies to mouse input and is automatically disabled if there is not enough space.
	 * @default true
	 */
	alignItemWithTrigger?: boolean | undefined;
}
export declare namespace SelectPositioner {
	type State = SelectPositionerState;
	type Props = SelectPositionerProps;
}
/**
 * A container for the select list.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectPopup: React$1.ForwardRefExoticComponent<Omit<SelectPopupProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface SelectPopupProps extends BaseUIComponentProps<"div", SelectPopupState> {
	children?: React$1.ReactNode;
	/**
	 * Determines the element to focus when the select popup is closed.
	 *
	 * - `false`: Do not move focus.
	 * - `true`: Move focus based on the default behavior (trigger or previously focused element).
	 * - `RefObject`: Move focus to the ref element.
	 * - `function`: Called with the interaction type (`mouse`, `touch`, `pen`, or `keyboard`).
	 *   Return an element to focus, `true` to use the default behavior, or `false`/`undefined` to do nothing.
	 */
	finalFocus?: boolean | React$1.RefObject<HTMLElement | null> | ((closeType: InteractionType) => boolean | HTMLElement | null | void) | undefined;
}
export interface SelectPopupState {
	/**
	 * The side of the anchor the component is placed on.
	 */
	side: Side$1 | "none";
	/**
	 * The alignment of the component relative to the anchor.
	 */
	align: Align;
	/**
	 * Whether the component is open.
	 */
	open: boolean;
	/**
	 * The transition status of the component.
	 */
	transitionStatus: TransitionStatus;
}
export declare namespace SelectPopup {
	type Props = SelectPopupProps;
	type State = SelectPopupState;
}
/**
 * A container for the select items.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectList: React$1.ForwardRefExoticComponent<Omit<SelectListProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface SelectListProps extends BaseUIComponentProps<"div", SelectListState> {
}
export interface SelectListState {
}
export declare namespace SelectList {
	type Props = SelectListProps;
	type State = SelectListState;
}
/**
 * An individual option in the select popup.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectItem: React$1.NamedExoticComponent<Omit<SelectItemProps, "ref"> & React$1.RefAttributes<HTMLElement>>;
export interface SelectItemState {
	/**
	 * Whether the item should ignore user interaction.
	 */
	disabled: boolean;
	/**
	 * Whether the item is selected.
	 */
	selected: boolean;
	/**
	 * Whether the item is highlighted.
	 */
	highlighted: boolean;
}
export interface SelectItemProps extends NonNativeButtonProps, Omit<BaseUIComponentProps<"div", SelectItemState>, "id"> {
	children?: React$1.ReactNode;
	/**
	 * A unique value that identifies this select item.
	 * @default null
	 */
	value?: any;
	/**
	 * Whether the component should ignore user interaction.
	 * @default false
	 */
	disabled?: boolean | undefined;
	/**
	 * Specifies the text label to use when the item is matched during keyboard text navigation.
	 *
	 * Defaults to the item text content if not provided.
	 */
	label?: string | undefined;
}
export declare namespace SelectItem {
	type State = SelectItemState;
	type Props = SelectItemProps;
}
/**
 * Indicates whether the select item is selected.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectItemIndicator: React$1.ForwardRefExoticComponent<Omit<SelectItemIndicatorProps, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
export interface SelectItemIndicatorState {
	/**
	 * Whether the item is selected.
	 */
	selected: boolean;
	/**
	 * The transition status of the component.
	 */
	transitionStatus: TransitionStatus;
}
export interface SelectItemIndicatorProps extends BaseUIComponentProps<"span", SelectItemIndicatorState> {
	children?: React$1.ReactNode;
	/**
	 * Whether to keep the HTML element in the DOM when the item is not selected.
	 */
	keepMounted?: boolean | undefined;
}
export declare namespace SelectItemIndicator {
	type State = SelectItemIndicatorState;
	type Props = SelectItemIndicatorProps;
}
/**
 * A text label of the select item.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectItemText: React$1.NamedExoticComponent<Omit<SelectItemTextProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface SelectItemTextState {
}
export interface SelectItemTextProps extends BaseUIComponentProps<"div", SelectItemTextState> {
}
export declare namespace SelectItemText {
	type State = SelectItemTextState;
	type Props = SelectItemTextProps;
}
/**
 * Displays an element positioned against the select popup anchor.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectArrow: React$1.ForwardRefExoticComponent<Omit<SelectArrowProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface SelectArrowState {
	/**
	 * Whether the select popup is currently open.
	 */
	open: boolean;
	/**
	 * The side of the anchor the component is placed on.
	 */
	side: Side$1 | "none";
	/**
	 * The alignment of the component relative to the anchor.
	 */
	align: Align;
	/**
	 * Whether the arrow cannot be centered on the anchor.
	 */
	uncentered: boolean;
}
export interface SelectArrowProps extends BaseUIComponentProps<"div", SelectArrowState> {
}
export declare namespace SelectArrow {
	type State = SelectArrowState;
	type Props = SelectArrowProps;
}
/**
 * An element that scrolls the select popup down when hovered. Does not render when using touch input.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectScrollDownArrow: React$1.ForwardRefExoticComponent<Omit<SelectScrollDownArrowProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface SelectScrollDownArrowState {
}
export interface SelectScrollDownArrowProps extends BaseUIComponentProps<"div", SelectScrollDownArrowState> {
	/**
	 * Whether to keep the HTML element in the DOM while the select popup is not scrollable.
	 * @default false
	 */
	keepMounted?: boolean | undefined;
}
export declare namespace SelectScrollDownArrow {
	type State = SelectScrollDownArrowState;
	type Props = SelectScrollDownArrowProps;
}
/**
 * An element that scrolls the select popup up when hovered. Does not render when using touch input.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectScrollUpArrow: React$1.ForwardRefExoticComponent<Omit<SelectScrollUpArrowProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface SelectScrollUpArrowState {
}
export interface SelectScrollUpArrowProps extends BaseUIComponentProps<"div", SelectScrollUpArrowState> {
	/**
	 * Whether to keep the HTML element in the DOM while the select popup is not scrollable.
	 * @default false
	 */
	keepMounted?: boolean | undefined;
}
export declare namespace SelectScrollUpArrow {
	type State = SelectScrollUpArrowState;
	type Props = SelectScrollUpArrowProps;
}
/**
 * Groups related select items with the corresponding label.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectGroup: React$1.ForwardRefExoticComponent<Omit<SelectGroupProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface SelectGroupState {
}
export interface SelectGroupProps extends BaseUIComponentProps<"div", SelectGroupState> {
}
export declare namespace SelectGroup {
	type State = SelectGroupState;
	type Props = SelectGroupProps;
}
/**
 * An accessible label that is automatically associated with its parent group.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Select](https://base-ui.com/react/components/select)
 */
export declare const SelectGroupLabel: React$1.ForwardRefExoticComponent<Omit<SelectGroupLabelProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface SelectGroupLabelState {
}
export interface SelectGroupLabelProps extends BaseUIComponentProps<"div", SelectGroupLabelState> {
}
export declare namespace SelectGroupLabel {
	type State = SelectGroupLabelState;
	type Props = SelectGroupLabelProps;
}
declare const Separator: React$1.ForwardRefExoticComponent<Omit<SeparatorProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface SeparatorProps extends BaseUIComponentProps<"div", SeparatorState> {
	/**
	 * The orientation of the separator.
	 * @default 'horizontal'
	 */
	orientation?: Orientation | undefined;
}
export interface SeparatorState {
	/**
	 * The orientation of the separator.
	 */
	orientation: Orientation;
}
declare namespace Separator {
	type Props = SeparatorProps;
	type State = SeparatorState;
}

declare namespace Select {
	export { SelectArrow as Arrow, SelectBackdrop as Backdrop, SelectGroup as Group, SelectGroupLabel as GroupLabel, SelectIcon as Icon, SelectItem as Item, SelectItemIndicator as ItemIndicator, SelectItemText as ItemText, SelectLabel as Label, SelectList as List, SelectPopup as Popup, SelectPortal as Portal, SelectPositioner as Positioner, SelectRoot as Root, SelectScrollDownArrow as ScrollDownArrow, SelectScrollUpArrow as ScrollUpArrow, SelectTrigger as Trigger, SelectValue as Value, Separator };
}

export {
	Select,
};

export {};
