//import { gettext } from 'i18n'
//import { DEFAULT_TODO_LIST } from './../utils/constants'
import Time from '../utils/Time.js'

AppSettingsPage({
    state: {
      todoList: [],
      props: {},
      newAlarm: {title: 'Alarm', note: "", time:{hours:0, minutes:0}},
      screen: 'main',
    },
    addTodoList(val) {
      time = new Time()
      time.setTime(23, 49)
      time2 = new Time()
      time2.setTime(23, 50)
      //this.state.todoList = {alarms: [{time:time, title: "Cymbalta", note: "20mg"}, {time:time2, title: "Gabapentin", note: "600mg"}]}
      this.state.alarms = this.state.props.getItem('alarms')
      console.log(JSON.stringify(this.state.alarms))
      this.setItem()
    },
    addNewAlarm() {
        let alarmHours = this.state.newAlarm.hours;
        let alarmMinutes = this.state.newAlarm.minutes;
        let newAlarm = {
            time:   { hours:alarmHours, minutes:alarmMinutes },
            title:  this.state.newAlarm.title,
            note:   this.state.newAlarm.note
        };
        this.state.alarms.push(newAlarm);
        this.state.props.settingsStorage.setItem('alarms', JSON.stringify(this.state.alarms));
        this.state.newAlarm = {title: 'Alarm', note: '', hours:0, minutes:0}
    },
    deleteAlarm(idx) {
        this.state.alarms.splice(idx, 1);
        this.state.props.settingsStorage.setItem('alarms', JSON.stringify(this.state.alarms));
    },
    pushAlarms() {
        console.log(this.state.alarms)
        this.state.props.settingsStorage.setItem('alarms', JSON.stringify(this.state.alarms));
    },
    setItem() {
      const newString = JSON.stringify(this.state.todoList)
      this.state.props.settingsStorage.setItem('todoList', newString)
    },
    setState(props) {
      this.state.props = props
      if (props.settingsStorage.getItem('alarms')) {
        console.log(props.settingsStorage.getItem('alarms'))
        this.state.alarms = JSON.parse(props.settingsStorage.getItem('alarms'))
      } else {
        this.state.alarms = []
      }
      console.log('alarms: ', JSON.stringify(this.state.alarms, null, 2))
    },
    getHourSelectOptions() {
        array = []
        for (i = 0; i < 24; i++) {
            array.push({name: i.toString().padStart(2, '0'), value: i})
        }
        return array;
    },
    getMinuteSelectOptions() {
        array = []
        for (i = 0; i < 60; i=i+1) {
            array.push({name: i.toString().padStart(2, '0'), value: i})
        }
        return array;
    },
    getNewAlarmNote() {
        if (typeof this.state.newAlarm.note === 'undefined') {
            return ""
        } else {
            return this.state.newAlarm.note;
        }
    },
    getNewAlarmTitle() {
        if (typeof this.state.newAlarm.title === 'undefined') {
            console.log('Title empty')
            return "Alarm"
        } else {
            return this.state.newAlarm.title;
        }
    },
    build(props) {
        const timeStyle = {
            margin: '5px',
            padding: '5px',
        }
        const alarmsStyle = {
            display: 'flex',
        }
        this.setState(props)
        let contentItems = []
        if (this.state.screen == 'main') {
            this.state.alarms.forEach((alarm, idx) => {
                contentItems.push(View({
                    style: {
                        fontSize: '20px',
                        display: 'flex',
                        margin: '10px',
                        justifyContent: 'space-between'

                    }},
                    [
                        View({style: alarmsStyle}, [
                            View({
                                style: {
                                    ...alarmsStyle,
                                    width: 80,
                                    marginRight: '5px',
                                }},
                                Text({
                                    style: {
                                        margin: 'auto'
                                    }},
                                    `${this.state.alarms[idx].time.hours.toString().padStart(2, '0')}:${this.state.alarms[idx].time.minutes.toString().padStart(2, '0')}`)
                            ),
                            View({
                                    style: {
                                        ...alarmsStyle,
                                        marginLeft: '5px',
                                        paddingLeft: '5px',
                                        paddingRight: '5px',
                                    }
                                },
                                Text({
                                    style: {
                                        margin: 'auto'
                                    }},
                                    this.state.alarms[idx].title),
                            )]
                        ),
                        View({style: alarmsStyle}, [
                            Button({
                                style: {
                                    ...alarmsStyle,
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                    marginRight: '5px',
                                    background: '#409EFF',
                                    color: 'white',
                                },
                                label:'Edit',
                            }),
                            Button({
                                style: {
                                    ...alarmsStyle,
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                    marginLeft: '5px',
                                    background: '#409EFF',
                                    color: 'white',
                                },
                                label:'Delete',
                                onClick: () => {
                                    this.deleteAlarm(idx)
                                }
                            })]
                        ),
                    ]));
            });
            contentItems.push(View(
                {
                    style: {
                        margin: '10px',
                        display: 'flex'
                    }
                },
                [
                    View({
                        style: {
                            width: '50%',
                            margin: '5px'
                        }},
                        Button({
                          label: 'Push alarms',
                          style: {
                            fontSize: '20px',
                            lineHeight: '50px',
                            borderRadius: '10px',
                            background: '#409EFF',
                            color: 'white',
                            textAlign: 'center',
                            height: 50,
                            width: '100%'
                          },
                          onClick: () => {
                              this.pushAlarms()
                          }
                        })
                    ),
                    View({
                        style: {
                            width:'50%',
                            margin: '5px'
                        }},
                        Button({
                          label: 'New alarm',
                          onClick: () => {
                              this.state.screen = 'new';
                              this.state.props.settingsStorage.setItem('foo', 'bar')
                          },
                          style: {
                            fontSize: '20px',
                            lineHeight: '50px',
                            borderRadius: '10px',
                            background: '#409EFF',
                            color: 'white',
                            textAlign: 'center',
                            height: 50,
                            width: '100%'
                          }
                        })
                    )
                ]));
                //contentItems.push(View({}, Text({style: {fontSize:'10px'}}, JSON.stringify(this.state.alarms))))
                //contentItems.push(View({}, Text({style: {fontSize:'10px'}}, this.state.props.settingsStorage.getItem('alarms'))))
        } else {
            let titleProps = {}
            if (this.state.newAlarm.title && this.state.newAlarm.title !== 'Alarm') {
                titleProps.value = this.state.newAlarm.title;
                titleProps.label =  'Title';
            } else {
                titleProps.placeholder = 'Title';
                titleProps.label =  'Add title';
            }
            contentItems.push(View({
                style: {
                    outline: 'solid',
                    borderRadius: '10px',
                    fontSize: '20px',
                    margin: '10px',
                    display: 'flex'
                }},
                [
                    View({
                        style: {...timeStyle,
                                width: '100%'}},
                        TextInput({
                            ...titleProps,
                            onChange: str => {
                                this.state.newAlarm.title = str;
                                this.state.props.settingsStorage.setItem('foo', 'bar')
                                console.log(str)
                            },
                        }),
                    )
                ]));
            contentItems.push(View({
                style: {
                    outline: 'solid',
                    borderRadius: '10px',
                    fontSize: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '10px',
                }},
                [
                    View({
                        style: {
                            ...timeStyle,
                        }},
                        Select({
                            options: this.getHourSelectOptions(),
                            onChange: (selectValue) => {
                                this.state.newAlarm.hours = selectValue;
                                console.log(JSON.stringify(this.state.newAlarm, null, 2))
                            },
                        }),
                    ),
                    View({
                        style: {
                            ...timeStyle,
                        }},
                        Text({}, ':'),
                    ),
                    View({
                        style: {
                            ...timeStyle,
                        }},
                        Select({
                            options: this.getMinuteSelectOptions(),
                            onChange: (selectValue) => {
                                this.state.newAlarm.minutes = selectValue;
                                console.log(JSON.stringify(this.state.newAlarm, null, 2))
                            },
                        }),
                    ),
                ]));

            let noteProps = {}
            if (this.state.newAlarm.note) {
                noteProps.value = this.state.newAlarm.note;
                noteProps.label = 'Note';
            } else {
                noteProps.label = 'Add note';
                noteProps.placeholder = 'Note';
            }
            contentItems.push(View({
                style: {
                    outline: 'solid',
                    borderRadius: '10px',
                    fontSize: '20px',
                    margin: '10px',
                    display: 'flex'
                }},
                [
                    View({
                        style: {
                            ...timeStyle,
                            width: '100%'
                        }},
                        TextInput({
                            ...noteProps,
                            multiline: true,
                            rows: 5,
                            //value: this.getNewAlarmNote(),
                            onChange: str => {
                                this.state.newAlarm.note = str;
                                this.state.props.settingsStorage.setItem('foo', 'bar')
                                console.log(str)
                            },
                        }),
                    )
                ]));
            contentItems.push(View(
              {
                  style: {
                      margin: '10px',
                      display: 'flex'
                  }
              },
              [
                View({
                    style: {
                        width: '50%',
                        margin: '5px'
                    }},
                    Button({
                      label: 'Cancel',
                      onClick: () => {
                          this.state.screen = 'main';
                          this.state.props.settingsStorage.setItem('foo', 'bar')
                      },
                      style: {
                        fontSize: '20px',
                        lineHeight: '50px',
                        borderRadius: '10px',
                        background: '#409EFF',
                        color: 'white',
                        textAlign: 'center',
                        height: 50,
                        width: '100%'
                      }
                    })
                ),
                View({
                    style: {
                        width:'50%',
                        margin: '5px'
                    }},
                    Button({
                      label: 'Add alarm',
                      onClick: () => {
                          this.state.screen = 'main';
                          this.addNewAlarm();
                      },
                      style: {
                        fontSize: '20px',
                        lineHeight: '50px',
                        borderRadius: '10px',
                        background: '#409EFF',
                        color: 'white',
                        textAlign: 'center',
                        height: 50,
                        width: '100%'
                      }
                    })
                )
              ]));
        }
        return View(
            {},
              contentItems
            )
    }
})
