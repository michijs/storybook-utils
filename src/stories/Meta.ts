import type { ComponentAnnotations, Args } from "@storybook/types";
import type { GetElementProps } from "@michijs/michijs";
import type { MichiRenderer } from "./Preview";

export type Meta<T = Args, A = {}> = ComponentAnnotations<
  MichiRenderer,
  GetElementProps<T> & A
>;
