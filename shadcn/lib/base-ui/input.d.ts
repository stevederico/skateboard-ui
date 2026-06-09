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
declare const FieldLabel: React$1.ForwardRefExoticComponent<Omit<FieldLabelProps, "ref"> & React$1.RefAttributes<HTMLElement>>;
export interface FieldLabelState extends FieldRootState {
}
export interface FieldLabelProps extends BaseUIComponentProps<"label", FieldLabelState> {
	/**
	 * Whether the component renders a native `<label>` element when replacing it via the `render` prop.
	 * Set to `false` if the rendered element is not a label (for example, `<div>`).
	 *
	 * This is useful to avoid inheriting label behaviors on `<button>` controls (such as `<Select.Trigger>` and `<Combobox.Trigger>`), including avoiding `:hover` on the button when hovering the label, and preventing clicks on the label from firing on the button.
	 * @default true
	 */
	nativeLabel?: boolean | undefined;
}
declare namespace FieldLabel {
	type State = FieldLabelState;
	type Props = FieldLabelProps;
}
export type TransitionStatus = "starting" | "ending" | "idle" | undefined;
declare const FieldError: React$1.ForwardRefExoticComponent<Omit<FieldErrorProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface FieldErrorState extends FieldRootState {
	/**
	 * The transition status of the component.
	 */
	transitionStatus: TransitionStatus;
}
export interface FieldErrorProps extends BaseUIComponentProps<"div", FieldErrorState> {
	/**
	 * Determines whether to show the error message according to the field's
	 * [ValidityState](https://developer.mozilla.org/en-US/docs/Web/API/ValidityState).
	 * Specifying `true` will always show the error message, and lets external libraries
	 * control the visibility.
	 */
	match?: boolean | keyof ValidityState | undefined;
}
declare namespace FieldError {
	type State = FieldErrorState;
	type Props = FieldErrorProps;
}
declare const FieldDescription: React$1.ForwardRefExoticComponent<Omit<FieldDescriptionProps, "ref"> & React$1.RefAttributes<HTMLParagraphElement>>;
export interface FieldDescriptionState extends FieldRootState {
}
export interface FieldDescriptionProps extends BaseUIComponentProps<"p", FieldDescriptionState> {
}
declare namespace FieldDescription {
	type State = FieldDescriptionState;
	type Props = FieldDescriptionProps;
}
declare const FieldControl: React$1.ForwardRefExoticComponent<Omit<FieldControlProps, "ref"> & React$1.RefAttributes<HTMLElement>>;
export interface FieldControlState extends FieldRootState {
}
export interface FieldControlProps extends BaseUIComponentProps<"input", FieldControlState> {
	/**
	 * Callback fired when the `value` changes. Use when controlled.
	 */
	onValueChange?: ((value: string, eventDetails: FieldControl.ChangeEventDetails) => void) | undefined;
	defaultValue?: React$1.ComponentProps<"input">["defaultValue"] | undefined;
}
export type FieldControlChangeEventReason = typeof none;
export type FieldControlChangeEventDetails = BaseUIChangeEventDetails<FieldControl.ChangeEventReason>;
declare namespace FieldControl {
	type State = FieldControlState;
	type Props = FieldControlProps;
	type ChangeEventReason = FieldControlChangeEventReason;
	type ChangeEventDetails = FieldControlChangeEventDetails;
}
declare const FieldValidity: React$1.FC<FieldValidity.Props>;
export interface FieldValidityState extends Omit<FieldValidityData, "state"> {
	/**
	 * The validity state.
	 */
	validity: FieldValidityData["state"];
	/**
	 * The transition status of the component.
	 */
	transitionStatus: TransitionStatus;
}
export interface FieldValidityProps {
	/**
	 * A function that accepts the field validity state as an argument.
	 *
	 * ```jsx
	 * <Field.Validity>
	 *   {(validity) => {
	 *     return <div>...</div>
	 *   }}
	 * </Field.Validity>
	 * ```
	 */
	children: (state: FieldValidityState) => React$1.ReactNode;
}
declare namespace FieldValidity {
	type State = FieldValidityState;
	type Props = FieldValidityProps;
}
declare const FieldItem: React$1.ForwardRefExoticComponent<Omit<FieldItemProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface FieldItemState extends FieldRootState {
}
export interface FieldItemProps extends BaseUIComponentProps<"div", FieldItemState> {
	/**
	 * Whether the wrapped control should ignore user interaction.
	 * The `disabled` prop on `<Field.Root>` takes precedence over this.
	 * @default false
	 */
	disabled?: boolean | undefined;
}
declare namespace FieldItem {
	type State = FieldItemState;
	type Props = FieldItemProps;
}
/**
 * A native input element that automatically works with [Field](https://base-ui.com/react/components/field).
 * Renders an `<input>` element.
 *
 * Documentation: [Base UI Input](https://base-ui.com/react/components/input)
 */
export declare const Input: React$1.ForwardRefExoticComponent<Omit<InputProps, "ref"> & React$1.RefAttributes<HTMLElement>>;
export interface InputProps extends BaseUIComponentProps<"input", InputState> {
	/**
	 * Callback fired when the `value` changes. Use when controlled.
	 */
	onValueChange?: ((value: string, eventDetails: Input.ChangeEventDetails) => void) | undefined;
	/**
	 * The default value of the input. Use when uncontrolled.
	 */
	defaultValue?: FieldControl.Props["defaultValue"] | undefined;
	/**
	 * The value of the input. Use when controlled.
	 */
	value?: React$1.ComponentProps<"input">["value"] | undefined;
}
export interface InputState extends FieldControlState {
}
export type InputChangeEventReason = FieldControl.ChangeEventReason;
export type InputChangeEventDetails = FieldControl.ChangeEventDetails;
export declare namespace Input {
	type Props = InputProps;
	type State = InputState;
	type ChangeEventReason = InputChangeEventReason;
	type ChangeEventDetails = InputChangeEventDetails;
}

export {};
