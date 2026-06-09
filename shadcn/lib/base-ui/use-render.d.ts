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
export type StateAttributesMapping<State> = {
	[Property in keyof State]?: (state: State[Property]) => Record<string, string> | null;
};
/**
 * Renders a Base UI element.
 *
 * @public
 */
export declare function useRender<State extends Record<string, unknown>, RenderedElementType extends Element, Enabled extends boolean | undefined = undefined>(params: useRender.Parameters<State, RenderedElementType, Enabled>): useRender.ReturnValue<Enabled>;
export type UseRenderRenderProp<State = Record<string, unknown>> = React$1.ReactElement | ComponentRenderFn<React$1.HTMLAttributes<any>, State>;
export type UseRenderElementProps<ElementType extends React$1.ElementType> = React$1.ComponentPropsWithRef<ElementType>;
export type UseRenderComponentProps<ElementType extends React$1.ElementType, State = {}, RenderFunctionProps = HTMLProps> = React$1.ComponentPropsWithRef<ElementType> & {
	/**
	 * Allows you to replace the component's HTML element
	 * with a different tag, or compose it with another component.
	 *
	 * Accepts a `ReactElement` or a function that returns the element to render.
	 */
	render?: React$1.ReactElement | ComponentRenderFn<RenderFunctionProps, State> | undefined;
};
export interface UseRenderParameters<State, RenderedElementType extends Element, Enabled extends boolean | undefined> {
	/**
	 * The React element or a function that returns one to override the default element.
	 */
	render?: UseRenderRenderProp<State> | undefined;
	/**
	 * The ref to apply to the rendered element.
	 */
	ref?: React$1.Ref<RenderedElementType> | React$1.Ref<RenderedElementType>[] | undefined;
	/**
	 * The state of the component, passed as the second argument to the `render` callback.
	 * State properties are automatically converted to data-* attributes.
	 */
	state?: State | undefined;
	/**
	 * Custom mapping for converting state properties to data-* attributes.
	 * @example
	 * { isActive: (value) => (value ? { 'data-is-active': '' } : null) }
	 */
	stateAttributesMapping?: StateAttributesMapping<State> | undefined;
	/**
	 * Props to be spread on the rendered element.
	 * They are merged with the internal props of the component, so that event handlers
	 * are merged, `className` strings and `style` properties are joined, while other external props overwrite the
	 * internal ones.
	 */
	props?: Record<string, unknown> | undefined;
	/**
	 * If `false`, the hook will skip most of its internal logic and return `null`.
	 * This is useful for rendering a component conditionally.
	 * @default true
	 */
	enabled?: Enabled | undefined;
	/**
	 * The default tag name to use for the rendered element when `render` is not provided.
	 * @default 'div'
	 */
	defaultTagName?: keyof React$1.JSX.IntrinsicElements | undefined;
}
export type UseRenderReturnValue<Enabled extends boolean | undefined> = Enabled extends false ? null : React$1.ReactElement;
export interface UseRenderState {
}
export declare namespace useRender {
	type State = UseRenderState;
	type RenderProp<TState = Record<string, unknown>> = UseRenderRenderProp<TState>;
	type ElementProps<ElementType extends React$1.ElementType> = UseRenderElementProps<ElementType>;
	type ComponentProps<ElementType extends React$1.ElementType, TState = {}, RenderFunctionProps = HTMLProps> = UseRenderComponentProps<ElementType, TState, RenderFunctionProps>;
	type Parameters<TState, RenderedElementType extends Element, Enabled extends boolean | undefined> = UseRenderParameters<TState, RenderedElementType, Enabled>;
	type ReturnValue<Enabled extends boolean | undefined> = UseRenderReturnValue<Enabled>;
}

export {};
