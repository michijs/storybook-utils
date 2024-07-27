import type { BaseAnnotations, Renderer, Args, Canvas } from "@storybook/types";

export interface MichiRenderer extends Renderer {
  /** What is the type of the `component` annotation in this renderer? */
  component: Element;
  /** What does the story function return in this renderer? */
  storyResult: Element;
  /** What type of element does this renderer render to? */
  canvasElement: Element;
  mount(): Promise<Canvas>;
  T?: Element;
}
export type Preview<TArgs = Args> = BaseAnnotations<MichiRenderer, TArgs>;
