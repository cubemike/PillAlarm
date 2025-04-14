import { getText } from '@zos/i18n'
import * as Styles from 'zosLoader:./index.[pf].layout.js'
import * as hmUI from '@zos/ui'
import * as alarm from '@zos/alarm'
import * as router from '@zos/router'
import { BasePage } from '@zeppos/zml/base-page'
import Time from '../utils/Time.js'
Page(
  BasePage({
    onInit() {
      console.log('page onInit invoked')
      this.getTodoList()
    },
    build() {
        hmUI.createWidget(hmUI.widget.TEXT, {
            x:100,
            y:100,
            text: "hello"
        });

        //console.log(JSON.stringify(alarm.getAllAlarms()));

        alarm.getAllAlarms().forEach((x) => {
            alarm.cancel(x);
            console.log(`Cleared alarm ${x}`);
        });



        hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 466/2-150/2,
            y: 300,
            h: 75,
            w: 150,
            radius: 10,
            text: "set alarm",
            normal_color: 0xff6000,
            press_color: 0xffb000,
            click_func: () => {
                let date = new Date();
                date.setDate(date.getDate()-1)
                date.setMinutes(date.getMinutes() + 10);
                console.log(date);
                const option = {
                    url: 'page/alarm',
                    time: date.getTime()/1000,
                    repeat_type: alarm.REPEAT_DAY,
                    param: JSON.stringify({title: 'Propranolol', time: '3:30 PM', comment: '2.5mg, the quick brown fox jumps over the lazy dog easily and happily. Almost down to 0mg!!! Keep going, almost there!!!'})
                };
                let id = alarm.set(option);
                console.log(`Set alarm ${id}`)
                router.home()
            }
        });


    },
    onCall(req) {
      //const dataList = req.result.map((i) => ({ name: i, img_src: 'delete.png' }))
      console.log('call dataList', req.result.alarms)

      //this.refreshAndUpdate(dataList)
      if (req.result.alarms) {
          alarms = JSON.parse(req.result.alarms)
          alarms.forEach((item) => {
                console.log(JSON.stringify(item))
                let date = new Date();
                let time = new Time()
                time.foo(item.time)
                console.log(time)
                date.setDate(date.getDate()-1)
                date.setHours(time.getHours(), time.getMinutes(), 0)
                console.log('date:', date);
                let option = {
                    url: 'page/alarm',
                    time: date.getTime()/1000,
                    repeat_type: alarm.REPEAT_DAY,
                    param: JSON.stringify(item)
                };
                let id = alarm.set(option);
                console.log(`Set alarm ${id}`)
                router.home()
          })
      }
    },
    getTodoList() {
      console.log('this.getTodoList()')
      this.request({
        method: 'PING'
      })
        .then(({result}) => {
          //this.state.dataList = result.map((d) => ({ name: d, img_src: 'delete.png' }))
          //this.createAndUpdateList()
          console.log('result: ', result)
        })
        .catch((res) => {
          console.log('cacught: ', res)
          //this.createAndUpdateList()
        })
    },
}))
