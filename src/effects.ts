/**
 * @author Kuitos
 * @since 2019-02-19
 */
import { getMountedApps, navigateToUrl } from 'single-spa';

const firstMountLogLabel = '[qiankun] first app mounted';
if (process.env.NODE_ENV === 'development') {
  console.time(firstMountLogLabel);
}

/*
设置主应用启动后默认进入的微应用
*/
export function setDefaultMountApp(defaultAppLink: string) {
  // can not use addEventListener once option for ie support
  window.addEventListener('single-spa:no-app-change', function listener() {
    /* getMountedApps 获取当前已挂载的应用的名字数组 */
    const mountedApps = getMountedApps();
    if (!mountedApps.length) {
      /* navigateToUrl 已注册应用之间跳转 */
      navigateToUrl(defaultAppLink);
    }

    window.removeEventListener('single-spa:no-app-change', listener);
  });
}

export function runDefaultMountEffects(defaultAppLink: string) {
  console.warn(
    '[qiankun] runDefaultMountEffects will be removed in next version, please use setDefaultMountApp instead',
  );
  setDefaultMountApp(defaultAppLink);
}

/*
第一个微应用 mount 后需要调用的方法，比如开启一些监控或者埋点脚本
*/
export function runAfterFirstMounted(effect: () => void) {
  // can not use addEventListener once option for ie support
  window.addEventListener('single-spa:first-mount', function listener() {
    if (process.env.NODE_ENV === 'development') {
      console.timeEnd(firstMountLogLabel);
    }

    effect();

    window.removeEventListener('single-spa:first-mount', listener);
  });
}
