/**
 * @author Kuitos
 * @since 2020-02-21
 */

export { addErrorHandler, removeErrorHandler } from 'single-spa';

/* 添加全局的未捕获异常处理器 */
export function addGlobalUncaughtErrorHandler(errorHandler: OnErrorEventHandlerNonNull): void {
  window.addEventListener('error', errorHandler);
  window.addEventListener('unhandledrejection', errorHandler);
}
/* 移除全局的未捕获异常处理器。 */
export function removeGlobalUncaughtErrorHandler(errorHandler: (...args: any[]) => any) {
  window.removeEventListener('error', errorHandler);
  window.removeEventListener('unhandledrejection', errorHandler);
}
