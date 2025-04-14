import { BaseApp } from '@zeppos/zml/base-app'

App(
  BaseApp({
    globalData: {
    },
    onCreate(options) {
        console.log('app on create invoke');
        console.log('options:', JSON.stringify(options));
        this.globalData.foo = options;
    },
    onDestroy(options) {
        console.log('app on destroy invoke')
    }
}))
