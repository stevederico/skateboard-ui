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
 * Displays a user's profile picture, initials, or fallback icon.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Avatar](https://base-ui.com/react/components/avatar)
 */
export declare const AvatarRoot: React$1.ForwardRefExoticComponent<Omit<AvatarRootProps, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
export type ImageLoadingStatus = "idle" | "loading" | "loaded" | "error";
export interface AvatarRootState {
	/**
	 * The image loading status.
	 */
	imageLoadingStatus: ImageLoadingStatus;
}
export interface AvatarRootProps extends BaseUIComponentProps<"span", AvatarRootState> {
}
export declare namespace AvatarRoot {
	type State = AvatarRootState;
	type Props = AvatarRootProps;
}
export type TransitionStatus = "starting" | "ending" | "idle" | undefined;
type ImageLoadingStatus$1 = "idle" | "loading" | "loaded" | "error";
/**
 * The image to be displayed in the avatar.
 * Renders an `<img>` element.
 *
 * Documentation: [Base UI Avatar](https://base-ui.com/react/components/avatar)
 */
export declare const AvatarImage: React$1.ForwardRefExoticComponent<Omit<AvatarImageProps, "ref"> & React$1.RefAttributes<HTMLImageElement>>;
export interface AvatarImageState extends AvatarRootState {
	/**
	 * The transition status of the component.
	 */
	transitionStatus: TransitionStatus;
}
export interface AvatarImageProps extends BaseUIComponentProps<"img", AvatarImageState> {
	/**
	 * Callback fired when the loading status changes.
	 */
	onLoadingStatusChange?: ((status: ImageLoadingStatus$1) => void) | undefined;
}
export declare namespace AvatarImage {
	type State = AvatarImageState;
	type Props = AvatarImageProps;
}
/**
 * Rendered when the image fails to load or when no image is provided.
 * Renders a `<span>` element.
 *
 * Documentation: [Base UI Avatar](https://base-ui.com/react/components/avatar)
 */
export declare const AvatarFallback: React$1.ForwardRefExoticComponent<Omit<AvatarFallbackProps, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
export interface AvatarFallbackState extends AvatarRootState {
}
export interface AvatarFallbackProps extends BaseUIComponentProps<"span", AvatarFallbackState> {
	/**
	 * How long to wait before showing the fallback. Specified in milliseconds.
	 */
	delay?: number | undefined;
}
export declare namespace AvatarFallback {
	type State = AvatarFallbackState;
	type Props = AvatarFallbackProps;
}

declare namespace Avatar {
	export { AvatarFallback as Fallback, AvatarImage as Image, AvatarRoot as Root };
}

export {
	Avatar,
};

export {};
