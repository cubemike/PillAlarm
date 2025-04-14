import { BaseSideService } from '@zeppos/zml/base-side'
import { settingsLib } from '@zeppos/zml/base-side'


function getTodoList() {
    console.log(settingsLib.getItem('todoList'))
  return settingsLib.getItem('todoList')
    ? JSON.parse(settingsLib.getItem('todoList'))
    : []
}
AppSideService(
  BaseSideService({
    onInit() {},
    onRequest(req, res) {
      if (req.method === 'PING') {
        res(null, {
          result: "ACK"
        })
      } else if (req.method === 'ADD') {
        // 这里补充一个
        const todoList = getTodoList()
        const newTodoList = [...todoList, String(Math.floor(Math.random() * 100))]
        settingsLib.setItem('todoList', JSON.stringify(newTodoList))

        res(null, {
          result: newTodoList
        })
      } else if (req.method === 'DELETE') {
        const { index } = req.params
        const todoList = getTodoList()
        const newTodoList = todoList.filter((_, i) => i !== index)
        settingsLib.setItem('todoList', JSON.stringify(newTodoList))

        res(null, {
          result: newTodoList
        })
      }
    },
    onSettingsChange({ key, newValue, oldValue }) {
      console.log(`settings change ${key}, ${newValue}, ${oldValue}`)
      if (key === 'alarms') {
          this.call({
            result: {alarms: newValue}
          })
      }
    },
    onRun() {},
    onDestroy() {}
  })
)
