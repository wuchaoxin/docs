import {
  ComponentPublicInstance,
  DefineComponent,
  h,
  render,
  ComponentInternalInstance,
} from "vue";

type VueInstance = ComponentPublicInstance & { remove: () => void };

/**
 * @description 实例化组件，返回实例
 * @param {DefineComponent<AnyObject, AnyObject, any>} Compnent 需要被实例化的组件
 * @param {AnyObject} props
 * @returns {ComponentPublicInstance | null}
 */
export function useCreateComponent(
  Compnent: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    any
  >,
  props: Record<string, unknown> = {}
): ComponentPublicInstance | null {
  const instance = h(Compnent, props);
  const el = document.createElement("div");
  render(instance, el);
  const ctx = instance.component?.proxy;
  if (ctx) {
    return ctx;
  } else {
    return null;
  }
}

/**
 * @description 实例化组件，并且直接插入到 DOM
 * @param {DefineComponent<AnyObject, AnyObject, any>} Compnent
 * @param {AnyObject} props
 * @returns {VueInstance | null}
 */
export function useInsertComponent(
  Compnent: DefineComponent<
    Record<string, unknown>,
    Record<string, unknown>,
    any
  >,
  props: Record<string, unknown> = {}
): (ComponentPublicInstance & {}) | null {
  const instance = h(Compnent, props);
  const el = document.createElement("div");
  render(instance, el);
  document.body.appendChild(el);
  const ctx = instance.component?.proxy;
  if (ctx) {
    const customCtx = ctx as VueInstance;
    customCtx.remove = () => {
      document.body.removeChild(el);
    };
    return customCtx;
  } else {
    return null;
  }
}

/**
 * @description 获取实例化上的 remove 方法（只有被上面的方面实例的才有 remove 方法）
 * @returns {()=>void}
 */
export function useGetComponentRemove(
  instance: ComponentInternalInstance | null
): () => void {
  const proxy = instance?.proxy as VueInstance;
  const defaultFn = () => {};
  return proxy.remove || defaultFn;
}
