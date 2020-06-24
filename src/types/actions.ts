import { Identifier } from './context';

export type JumpTo = (id: Identifier) => void;
export type Next = () => void;
export type Previous = () => void;
