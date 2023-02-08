import { HANDLE } from "./const";

export type Hanlde = typeof HANDLE[keyof typeof HANDLE];

export interface ContainerExpose {
  changeStatus: () => void;
  refresh: () => void;
}
