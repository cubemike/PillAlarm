import * as hmUI from '@zos/ui'
import * as alarm from '@zos/alarm'
import * as sensor from '@zos/sensor'
import * as router from '@zos/router'
const vibrator = new sensor.Vibrator()
import Time from '../utils/Time.js'
Page({
    build() {
        let id;

        obj = JSON.parse(getApp()._options.globalData.foo)
        time = new Time()
        time.foo(obj.time)
        hmUI.createWidget(hmUI.widget.TEXT, {
            x: 100,
            y: 80,
            w: 300,
            color: 0xffffff,
            text: `${obj.title}\n${time}\n${obj.note}`,
            text_style: hmUI.text_style.WRAP
        });

        hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 466/2-150-10,
            y: 300,
            w: 150,
            h: 75,
            radius: 10,
            text: "Stop",
            normal_color: 0xff5000,
            press_color: 0xffa000,
            click_func: () => {
                vibrator.stop();
                alarm.cancel(id);
                router.home();
            }
        });

        hmUI.createWidget(hmUI.widget.BUTTON, {
            x: 466/2+10,
            y: 300,
            w: 150,
            h: 75,
            radius: 10,
            text: "Snooze",
            normal_color: 0xff5000,
            press_color: 0xffa000,
            click_func: () => {
                vibrator.stop();
                router.home();
            }
        });

        vibrator.setMode(sensor.VIBRATOR_SCENE_TIMER);
        vibrator.start();

        let date = new Date();
        date.setMinutes(date.getMinutes() + 10);
        console.log(date, '\n');
        const option = {
            url: 'page/alarm',
            time: date.getTime()/1000,
            param: getApp()._options.globalData.foo
        };
        id = alarm.set(option);
        console.log(`Set alarm ${id}`, '\n')

    }
})
