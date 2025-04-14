export default class Time {

    constructor() {
        this.hours = 0;
        this.minutes = 0;
        this.ampm = ""
    }

    setTime(hours, minutes) {
        this.hours = hours;
        this.minutes = minutes;
    }

    foo(arf) {
        if (typeof arf.hours === 'number') {
            this.hours = arf.hours;
        }
        if (typeof arf.minutes === 'number') {
            this.minutes = arf.minutes;
        }
        if (typeof arf.ampm === 'number') {
            this.ampm = arf.ampm
        }
    }

    getHours() {
        return this.hours;
    }

    getMinutes() {
        return this.minutes;
    }

    toString() {
        return this.hours.toString().padStart(2, '0') + ':' + this.minutes.toString().padStart(2, '0')
    }
}


Time.prototype.valueOf = function () {
    return this.hours*60 + this.minutes
}
