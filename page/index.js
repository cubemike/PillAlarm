import { getText } from '@zos/i18n'
import * as Styles from 'zosLoader:./index.[pf].layout.js'
import * as hmUI from '@zos/ui'
import * as alarm from '@zos/alarm'
import * as router from '@zos/router'
import { BasePage } from '@zeppos/zml/base-page'
import Time from '../utils/Time.js'

function log() {
    console.log(...arguments, '\n');
}

Page(
  BasePage({
    onInit() {
      log('page onInit invoked')
      this.getTodoList()
    },
    build() {
        hmUI.createWidget(hmUI.widget.TEXT, {
            x:50,
            y:200,
            w: 400,
            color: 0xffffff,
            text: "Push alarms from the app settings\nApp will automatically close"
        });

        //log(JSON.stringify(alarm.getAllAlarms()));




        //hmUI.createWidget(hmUI.widget.BUTTON, {
        //    x: 466/2-150/2,
        //    y: 300,
        //    h: 75,
        //    w: 150,
        //    radius: 10,
        //    text: "set alarm",
        //    normal_color: 0xff6000,
        //    press_color: 0xffb000,
        //    click_func: () => {
        //        let date = new Date();
        //        date.setDate(date.getDate()-1)
        //        date.setSeconds(date.getSeconds() + 10);
        //        log(date);
        //        const option = {
        //            url: 'page/alarm',
        //            time: date.getTime()/1000,
        //            repeat_type: alarm.REPEAT_DAY,
        //            param: JSON.stringify({title: 'Propranolol', time: '3:30 PM', note: 'note'})
        //        };
        //        let id = alarm.set(option);
        //        log(`Set alarm ${id}`)
        //        router.home()
        //    }
        //});


    },
    onCall(req) {
      //const dataList = req.result.map((i) => ({ name: i, img_src: 'delete.png' }))
      log('call dataList', req.result.alarms)

      //this.refreshAndUpdate(dataList)
      if (req.result.alarms) {
          alarm.getAllAlarms().forEach((x) => {
              alarm.cancel(x);
              log(`Cleared alarm ${x}`);
          });
          alarms = JSON.parse(req.result.alarms)
          alarms.forEach((item) => {
                log(JSON.stringify(item))
                let date = new Date();
                let time = new Time()
                time.foo(item.time)
                log(time)
                date.setDate(date.getDate()-1)
                date.setHours(time.getHours(), time.getMinutes(), 10)
                log('date:', date);
                let option = {
                    url: 'page/alarm',
                    time: date.getTime()/1000,
                    repeat_type: alarm.REPEAT_DAY,
                    param: JSON.stringify(item)
                };
                let id = alarm.set(option);
                log(`Set alarm ${id}`)
                router.home()
          })
      }
    },
    getTodoList() {
      log('this.getTodoList()')
      this.request({
        method: 'PING'
      })
        .then(({result}) => {
          //this.state.dataList = result.map((d) => ({ name: d, img_src: 'delete.png' }))
          //this.createAndUpdateList()
          log('result: ', result)
        })
        .catch((res) => {
          log('caught: ', res)
          //this.createAndUpdateList()
        })
    },
}))
