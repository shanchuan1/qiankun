/*
qiankun错误方法类
*/
export class QiankunError extends Error {
  constructor(message: string) {
    super(`[qiankun]: ${message}`);
  }
}
