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
declare const DEFAULT_COORDS: {
	x: number;
	y: number;
};
declare const DEFAULT_SIZE: {
	width: number;
	height: number;
};
declare const DEFAULT_OVERFLOW_EDGES: {
	xStart: boolean;
	xEnd: boolean;
	yStart: boolean;
	yEnd: boolean;
};
declare const DEFAULT_HIDDEN_STATE: {
	x: boolean;
	y: boolean;
	corner: boolean;
};
export type HiddenState = typeof DEFAULT_HIDDEN_STATE;
export type OverflowEdges = typeof DEFAULT_OVERFLOW_EDGES;
export type Size = typeof DEFAULT_SIZE;
export type Coords = typeof DEFAULT_COORDS;
/**
 * Groups all parts of the scroll area.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
 */
export declare const ScrollAreaRoot: React$1.ForwardRefExoticComponent<Omit<ScrollAreaRootProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface ScrollAreaRootState {
	/**
	 * Whether the scroll area is being scrolled.
	 */
	scrolling: boolean;
	/**
	 * Whether horizontal overflow is present.
	 */
	hasOverflowX: boolean;
	/**
	 * Whether vertical overflow is present.
	 */
	hasOverflowY: boolean;
	/**
	 * Whether there is overflow on the inline start side for the horizontal axis.
	 */
	overflowXStart: boolean;
	/**
	 * Whether there is overflow on the inline end side for the horizontal axis.
	 */
	overflowXEnd: boolean;
	/**
	 * Whether there is overflow on the block start side.
	 */
	overflowYStart: boolean;
	/**
	 * Whether there is overflow on the block end side.
	 */
	overflowYEnd: boolean;
	/**
	 * Whether the scrollbar corner is hidden.
	 */
	cornerHidden: boolean;
}
export interface ScrollAreaRootProps extends BaseUIComponentProps<"div", ScrollAreaRootState> {
	/**
	 * The threshold in pixels that must be passed before the overflow edge attributes are applied.
	 * Accepts a single number for all edges or an object to configure them individually.
	 * @default 0
	 */
	overflowEdgeThreshold?: number | Partial<{
		xStart: number;
		xEnd: number;
		yStart: number;
		yEnd: number;
	}> | undefined;
}
export declare namespace ScrollAreaRoot {
	type State = ScrollAreaRootState;
	type Props = ScrollAreaRootProps;
}
/**
 * The actual scrollable container of the scroll area.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
 */
export declare const ScrollAreaViewport: React$1.ForwardRefExoticComponent<Omit<ScrollAreaViewportProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface ScrollAreaViewportProps extends BaseUIComponentProps<"div", ScrollAreaViewportState> {
}
export interface ScrollAreaViewportState extends ScrollAreaRootState {
}
export declare namespace ScrollAreaViewport {
	type Props = ScrollAreaViewportProps;
	type State = ScrollAreaViewportState;
}
/**
 * A vertical or horizontal scrollbar for the scroll area.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
 */
export declare const ScrollAreaScrollbar: React$1.ForwardRefExoticComponent<Omit<ScrollAreaScrollbarProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface ScrollAreaScrollbarState extends ScrollAreaRootState {
	/**
	 * Whether the scroll area is being hovered.
	 */
	hovering: boolean;
	/**
	 * Whether the scroll area is being scrolled.
	 */
	scrolling: boolean;
	/**
	 * The orientation of the scrollbar.
	 */
	orientation: "vertical" | "horizontal";
}
export interface ScrollAreaScrollbarProps extends BaseUIComponentProps<"div", ScrollAreaScrollbarState> {
	/**
	 * Whether the scrollbar controls vertical or horizontal scroll.
	 * @default 'vertical'
	 */
	orientation?: "vertical" | "horizontal" | undefined;
	/**
	 * Whether to keep the HTML element in the DOM when the viewport isn't scrollable.
	 * @default false
	 */
	keepMounted?: boolean | undefined;
}
export declare namespace ScrollAreaScrollbar {
	type State = ScrollAreaScrollbarState;
	type Props = ScrollAreaScrollbarProps;
}
/**
 * A container for the content of the scroll area.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
 */
export declare const ScrollAreaContent: React$1.ForwardRefExoticComponent<Omit<ScrollAreaContentProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface ScrollAreaContentState extends ScrollAreaRootState {
}
export interface ScrollAreaContentProps extends BaseUIComponentProps<"div", ScrollAreaContentState> {
}
export declare namespace ScrollAreaContent {
	type State = ScrollAreaContentState;
	type Props = ScrollAreaContentProps;
}
/**
 * The draggable part of the scrollbar that indicates the current scroll position.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
 */
export declare const ScrollAreaThumb: React$1.ForwardRefExoticComponent<Omit<ScrollAreaThumbProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface ScrollAreaThumbState {
	/**
	 * The component orientation.
	 */
	orientation?: "horizontal" | "vertical" | undefined;
}
export interface ScrollAreaThumbProps extends BaseUIComponentProps<"div", ScrollAreaThumbState> {
}
export declare namespace ScrollAreaThumb {
	type State = ScrollAreaThumbState;
	type Props = ScrollAreaThumbProps;
}
/**
 * A small rectangular area that appears at the intersection of horizontal and vertical scrollbars.
 * Renders a `<div>` element.
 *
 * Documentation: [Base UI Scroll Area](https://base-ui.com/react/components/scroll-area)
 */
export declare const ScrollAreaCorner: React$1.ForwardRefExoticComponent<Omit<ScrollAreaCornerProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
export interface ScrollAreaCornerState {
}
export interface ScrollAreaCornerProps extends BaseUIComponentProps<"div", ScrollAreaCornerState> {
}
export declare namespace ScrollAreaCorner {
	type State = ScrollAreaCornerState;
	type Props = ScrollAreaCornerProps;
}

declare namespace ScrollArea {
	export { ScrollAreaContent as Content, ScrollAreaCorner as Corner, ScrollAreaRoot as Root, ScrollAreaScrollbar as Scrollbar, ScrollAreaThumb as Thumb, ScrollAreaViewport as Viewport };
}

export {
	ScrollArea,
};

export {};
