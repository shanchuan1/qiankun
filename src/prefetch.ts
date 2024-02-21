/**
 * @author Kuitos
 * @since 2019-02-26
 */

import type { Entry, ImportEntryOpts } from 'import-html-entry';
import { importEntry } from 'import-html-entry';
import { isFunction } from 'lodash';
import { getAppStatus, getMountedApps, NOT_LOADED } from 'single-spa';
import type { AppMetadata, PrefetchStrategy } from './interfaces';

declare global {
  interface NetworkInformation {
    saveData: boolean;
    effectiveType: string;
  }
}

function idleCall(cb: IdleRequestCallback, start: number) {
  cb({
    didTimeout: false,
    timeRemaining() {
      return Math.max(0, 50 - (Date.now() - start));
    },
  });
}

// RIC and shim for browsers setTimeout() without it idle
let requestIdleCallback: (cb: IdleRequestCallback) => any;
if (typeof window.requestIdleCallback !== 'undefined') {
  requestIdleCallback = window.requestIdleCallback;
} else if (typeof window.MessageChannel !== 'undefined') {
  // The first recommendation is to use MessageChannel because
  // it does not have the 4ms delay of setTimeout
  const channel = new MessageChannel();
  const port = channel.port2;
  const tasks: IdleRequestCallback[] = [];
  channel.port1.onmessage = ({ data }) => {
    const task = tasks.shift();
    if (!task) {
      return;
    }
    idleCall(task, data.start);
  };
  requestIdleCallback = function(cb: IdleRequestCallback) {
    tasks.push(cb);
    port.postMessage({ start: Date.now() });
  };
} else {
  requestIdleCallback = (cb: IdleRequestCallback) => setTimeout(idleCall, 0, cb, Date.now());
}

declare global {
  interface Navigator {
    connection: {
      saveData: boolean;
      effectiveType: string;
      type: 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown';
    };
  }
}

/* navigator.connection 获取设备的网络连接信息 */
const isSlowNetwork = navigator.connection
  ? navigator.connection.saveData ||
    (navigator.connection.type !== 'wifi' &&
      navigator.connection.type !== 'ethernet' &&
      /([23])g/.test(navigator.connection.effectiveType))
  : false;

/**
 * 预加载资源，在移动网络中不执行任何操作
 * prefetch assets, do nothing while in mobile network
 * @param entry
 * @param opts
 */
function prefetch(entry: Entry, opts?: ImportEntryOpts): void {
  if (!navigator.onLine || isSlowNetwork) {
    // Don't prefetch if in a slow network or offline
    return;
  }

  requestIdleCallback(async () => {
    /* 重点是importEntry做了哪些工作？ 返回了js与css文件？？ */
    const { getExternalScripts, getExternalStyleSheets } = await importEntry(entry, opts);
    console.log(
      '🚀 ~ requestIdleCallback ~ getExternalScripts, getExternalStyleSheets:',
      getExternalScripts,
      getExternalStyleSheets,
    );
    requestIdleCallback(getExternalStyleSheets);
    requestIdleCallback(getExternalScripts);
  });
}

/*
第一次挂载后的预加载
*/
function prefetchAfterFirstMounted(apps: AppMetadata[], opts?: ImportEntryOpts): void {
  window.addEventListener('single-spa:first-mount', function listener() {
    /*
    getAppStatus 获取应用状态常量
    NOT_LOADED 应用已经加载和初始化，还未挂载
     */
    const notLoadedApps = apps.filter((app) => getAppStatus(app.name) === NOT_LOADED);

    if (process.env.NODE_ENV === 'development') {
      /*
      getMountedApps 获取当前已经挂载应用的名字数组
      */
      const mountedApps = getMountedApps();
      console.log(`[qiankun] prefetch starting after ${mountedApps} mounted...`, notLoadedApps);
    }

    notLoadedApps.forEach(({ entry }) => prefetch(entry, opts));

    window.removeEventListener('single-spa:first-mount', listener);
  });
}

/*
立即预载
手动预加载指定的微应用静态资源
*/
export function prefetchImmediately(apps: AppMetadata[], opts?: ImportEntryOpts): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('[qiankun] prefetch starting for apps...', apps);
  }

  apps.forEach(({ entry }) => prefetch(entry, opts));
}

/*

这个函数 doPrefetchStrategy 用于执行预取策略，根据传入的预取策略参数，对应用进行预取。

函数接受三个参数：
apps: AppMetadata[]：表示应用的元数据数组，每个元数据包含了应用的名称等信息。
prefetchStrategy: PrefetchStrategy：表示预取策略，可以是一个字符串数组、一个函数或者一个布尔值。
importEntryOpts?: ImportEntryOpts：表示导入入口的选项。

函数的主要逻辑如下：
定义了一个内部函数 appsName2Apps，用于根据应用名称数组获取对应的应用元数据数组。
根据传入的 prefetchStrategy 类型进行不同的处理：
如果是一个数组，则将数组中的应用名称对应的应用进行预取。
如果是一个函数，则执行该函数，根据函数返回的结果执行不同的预取策略。
如果是布尔值 true，则对所有应用进行预取。
如果是字符串 'all'，则对所有应用进行立即预取。
其他情况不执行任何操作。

在执行预取时，根据不同的策略调用了两个内部函数：
prefetchImmediately(apps, importEntryOpts)：立即预取应用，即立即开始加载应用的资源。
prefetchAfterFirstMounted(apps, importEntryOpts)：在第一个应用挂载后开始预取应用，即等待第一个应用挂载完成后再开始加载其他应用的资源。
最后，根据传入的预取策略，采取相应的预取行为。
*/
export function doPrefetchStrategy(
  apps: AppMetadata[],
  prefetchStrategy: PrefetchStrategy,
  importEntryOpts?: ImportEntryOpts,
) {
  const appsName2Apps = (names: string[]): AppMetadata[] => apps.filter((app) => names.includes(app.name));

  if (Array.isArray(prefetchStrategy)) {
    prefetchAfterFirstMounted(appsName2Apps(prefetchStrategy as string[]), importEntryOpts);
  } else if (isFunction(prefetchStrategy)) {
    (async () => {
      // critical rendering apps would be prefetch as earlier as possible
      const { criticalAppNames = [], minorAppsName = [] } = await prefetchStrategy(apps);
      prefetchImmediately(appsName2Apps(criticalAppNames), importEntryOpts);
      prefetchAfterFirstMounted(appsName2Apps(minorAppsName), importEntryOpts);
    })();
  } else {
    switch (prefetchStrategy) {
      case true:
        prefetchAfterFirstMounted(apps, importEntryOpts);
        break;

      case 'all':
        prefetchImmediately(apps, importEntryOpts);
        break;

      default:
        break;
    }
  }
}
