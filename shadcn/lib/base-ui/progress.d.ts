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
/**
 * Groups all parts of the progress bar and provides the task completion status to screen readers.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Progress](https://base-ui.com/react/components/progress)
 */
export declare const ProgressRoot: React$1.ForwardRefExoticComponent<Omit<ProgressRootProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export type ProgressStatus = "indeterminate" | "progressing" | "complete";
export interface ProgressRootState {
	/**
	 * The current status.
	 */
	status: ProgressStatus;
}
export interface ProgressRootProps extends BaseUIComponentProps<"div", ProgressRootState> {
	/**
	 * A string value that provides a user-friendly name for `aria-valuenow`, the current value of the progress bar.
	 */
	"aria-valuetext"?: React$1.AriaAttributes["aria-valuetext"] | undefined;
	/**
	 * Options to format the value.
	 */
	format?: Intl.NumberFormatOptions | undefined;
	/**
	 * Accepts a function which returns a string value that provides a human-readable text alternative for the current value of the progress bar.
	 */
	getAriaValueText?: ((formattedValue: string | null, value: number | null) => string) | undefined;
	/**
	 * The locale used by `Intl.NumberFormat` when formatting the value.
	 * Defaults to the user's runtime locale.
	 */
	locale?: Intl.LocalesArgument | undefined;
	/**
	 * The maximum value.
	 * @default 100
	 */
	max?: number | undefined;
	/**
	 * The minimum value.
	 * @default 0
	 */
	min?: number | undefined;
	/**
	 * The current value. The component is indeterminate when value is `null`.
	 * @default null
	 */
	value: number | null;
}
export declare namespace ProgressRoot {
	type State = ProgressRootState;
	type Props = ProgressRootProps;
}
/**
 * Contains the progress bar indicator.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Progress](https://base-ui.com/react/components/progress)
 */
export declare const ProgressTrack: React$1.ForwardRefExoticComponent<Omit<ProgressTrackProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface ProgressTrackState extends ProgressRootState {
}
export interface ProgressTrackProps extends BaseUIComponentProps<"div", ProgressTrackState> {
}
export declare namespace ProgressTrack {
	type State = ProgressTrackState;
	type Props = ProgressTrackProps;
}
/**
 * Visualizes the completion status of the task.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Progress](https://base-ui.com/react/components/progress)
 */
export declare const ProgressIndicator: React$1.ForwardRefExoticComponent<Omit<ProgressIndicatorProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface ProgressIndicatorState extends ProgressRootState {
}
export interface ProgressIndicatorProps extends BaseUIComponentProps<"div", ProgressIndicatorState> {
}
export declare namespace ProgressIndicator {
	type State = ProgressIndicatorState;
	type Props = ProgressIndicatorProps;
}
/**
 * A text label displaying the current value.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Progress](https://base-ui.com/react/components/progress)
 */
export declare const ProgressValue: React$1.ForwardRefExoticComponent<Omit<ProgressValueProps, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
export interface ProgressValueState extends ProgressRootState {
}
export interface ProgressValueProps extends Omit<BaseUIComponentProps<"span", ProgressValueState>, "children"> {
	children?: null | ((formattedValue: string | null, value: number | null) => React$1.ReactNode) | undefined;
}
export declare namespace ProgressValue {
	type State = ProgressValueState;
	type Props = ProgressValueProps;
}
/**
 * An accessible label for the progress bar.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Progress](https://base-ui.com/react/components/progress)
 */
export declare const ProgressLabel: React$1.ForwardRefExoticComponent<Omit<ProgressLabelProps, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
export interface ProgressLabelState extends ProgressRootState {
}
export interface ProgressLabelProps extends BaseUIComponentProps<"span", ProgressLabelState> {
}
export declare namespace ProgressLabel {
	type State = ProgressLabelState;
	type Props = ProgressLabelProps;
}

declare namespace Progress {
	export { ProgressIndicator as Indicator, ProgressLabel as Label, ProgressRoot as Root, ProgressStatus as Status, ProgressTrack as Track, ProgressValue as Value };
}

export {
	Progress,
};

export {};
