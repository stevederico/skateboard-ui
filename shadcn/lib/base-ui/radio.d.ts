/* @base-ui/react 1.5.0 — vendored (MIT — MUI Inc).
 * Refresh: scripts/vendor-base-ui.js (see header for instructions).
 * Do not edit by hand. */
import * as React$1 from 'react';

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
export interface NonNativeButtonProps {
	/**
	 * Whether the component renders a native `<button>` element when replacing it
	 * via the `render` prop.
	 * Set to `true` if the rendered element is a native button.
	 * @default false
	 */
	nativeButton?: boolean | undefined;
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
/**
 * Represents the radio button itself.
 * Renders a `<span>` element and a hidden `<input>` beside.
 *
 * Documentation: [Base UI Radio](https://base-ui.com/react/components/radio)
 */
export declare const RadioRoot: {
	<Value>(props: RadioRoot.Props<Value>): React$1.JSX.Element;
};
export interface RadioRootState extends FieldRootState {
	/**
	 * Whether the radio button is currently selected.
	 */
	checked: boolean;
	/**
	 * Whether the component should ignore user interaction.
	 */
	disabled: boolean;
	/**
	 * Whether the user should be unable to select the radio button.
	 */
	readOnly: boolean;
	/**
	 * Whether the user must choose a value before submitting a form.
	 */
	required: boolean;
}
export interface RadioRootProps<Value = any> extends NonNativeButtonProps, Omit<BaseUIComponentProps<"span", RadioRootState>, "value"> {
	/**
	 * The unique identifying value of the radio in a group.
	 */
	value: Value;
	/**
	 * Whether the component should ignore user interaction.
	 */
	disabled?: boolean | undefined;
	/**
	 * Whether the user must choose a value before submitting a form.
	 */
	required?: boolean | undefined;
	/**
	 * Whether the user should be unable to select the radio button.
	 */
	readOnly?: boolean | undefined;
	/**
	 * A ref to access the hidden input element.
	 */
	inputRef?: React$1.Ref<HTMLInputElement> | undefined;
}
export declare namespace RadioRoot {
	type State = RadioRootState;
	type Props<TValue = any> = RadioRootProps<TValue>;
}
export type TransitionStatus = "starting" | "ending" | "idle" | undefined;
/**
 * Indicates whether the radio button is selected.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Radio](https://base-ui.com/react/components/radio)
 */
export declare const RadioIndicator: React$1.ForwardRefExoticComponent<Omit<RadioIndicatorProps, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
export interface RadioIndicatorProps extends BaseUIComponentProps<"span", RadioIndicatorState> {
	/**
	 * Whether to keep the HTML element in the DOM when the radio button is inactive.
	 * @default false
	 */
	keepMounted?: boolean | undefined;
}
export interface RadioIndicatorState {
	/**
	 * Whether the radio button is currently selected.
	 */
	checked: boolean;
	/**
	 * The transition status of the component.
	 */
	transitionStatus: TransitionStatus;
}
export declare namespace RadioIndicator {
	type Props = RadioIndicatorProps;
	type State = RadioIndicatorState;
}

declare namespace Radio {
	export { RadioIndicator as Indicator, RadioRoot as Root };
}

export {
	Radio,
};

export {};
