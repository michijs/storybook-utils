import type { ComponentAnnotations, Args } from "@storybook/types";
import { GetElementProps } from "@michijs/michijs";
import { MichiRenderer } from "./Preview";

export type Meta<T = Args, A = {}> = ComponentAnnotations<
  MichiRenderer,
  GetElementProps<T> & A
>;
