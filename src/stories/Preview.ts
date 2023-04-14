import { BaseAnnotations, Renderer, Args } from '@storybook/types';

export type MichiRenderer = Record<keyof Renderer, Element>;
export type Preview<TArgs = Args> = BaseAnnotations<MichiRenderer, TArgs>;
