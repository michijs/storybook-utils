import type { ComponentAnnotations, Args, Renderer } from '@storybook/types';
import { GetElementProps } from '@michijs/michijs';

export type Meta<T = Args, A = {}> = ComponentAnnotations<
  Renderer,
  GetElementProps<T> & A
>;
