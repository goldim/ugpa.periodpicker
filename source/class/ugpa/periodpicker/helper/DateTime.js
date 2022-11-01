qx.Class.define("ugpa.periodpicker.helper.DateTime", {
    type: "static",

    statics: {
        addTimeToDate(date, time) {
            const h = Math.floor(time / 3600);
            const m = Math.floor(time % 3600 / 60);
            const s = Math.floor(time % 3600 % 60);
            date.setHours(h, m, s, 0);
        },

        getYesterdayStart() {
            const dt = this.getYesterday();
            this.setDayStart(dt);
            return dt;
        },

        getYesterdayEnd() {
            const dt = this.getYesterday();
            this.setDayEnd(dt);
            return dt;
        },

        getYesterday() {
            return this.getPrevDayOfDate(this.getCurrentDateTime());
        },

        getPrevDayOfDate(dt) {
            const ts = dt.valueOf() - 24 * 60 * 60 * 1000;
            return new Date(ts);
        },

        setDayStart(dt) {
            dt.setHours(0, 0, 0, 0);
        },

        setDayEnd(dt) {
            dt.setHours(23, 59, 59, 999);
        },

        getTodayStart() {
            const dt = this.getCurrentDateTime();
            this.setDayStart(dt);
            return dt;
        },

        getTodayEnd() {
            const dt = this.getCurrentDateTime();
            this.setDayEnd(dt);
            return dt;
        },

        getCurrentDateTime() {
            return new Date();
        },

        getHourStartSeconds(dt) {
            const hours = dt.getHours();
            return hours * 3600;
        },

        getCurrentHourStart() {
            return this.getCurrentHourWithOffset(0);
        },

        getCurrentHourEnd() {
            return this.getCurrentHourWithOffset(3600);
        },

        getCurrentHourWithOffset(offset) {
            const dt = this.getCurrentDateTime();
            this.setOffsetToHour(dt, offset);
            return dt;
        },

        setOffsetToHour(dt, offset) {
            const seconds = this.getHourStartSeconds(dt) + offset;
            this.addTimeToDate(dt, seconds);
        },

        getCurrentMinuteStart() {
            return this.getCurrentMinuteWithOffset(0);
        },

        getCurrentMinuteEnd() {
            return this.getCurrentMinuteWithOffset(60);
        },

        getCurrentMinuteWithOffset(offset) {
            const dt = this.getCurrentDateTime();
            this.setOffsetToMinute(dt, offset);
            return dt;
        },

        setOffsetToMinute(dt, offset) {
            const hours = dt.getHours();
            const minutes = dt.getMinutes();
            const seconds = hours * 3600 + minutes * 60 + offset;
            this.addTimeToDate(dt, seconds);
        },

        extractTimeFromDateTime(dt) {
            return dt.toLocaleTimeString();
        },

        getTodayPeriod() {
            const start = this.getTodayStart();
            const end = this.getTodayEnd();
            return new ugpa.periodpicker.Period(start, end);
        },

        getYesterdayPeriod() {
            const start = this.getYesterdayStart();
            const end = this.getYesterdayEnd();
            return new ugpa.periodpicker.Period(start, end);
        },

        getCurrentHourPeriod() {
            const start = this.getCurrentHourStart();
            const end = this.getCurrentHourEnd();
            return new ugpa.periodpicker.Period(start, end);
        },

        getCurrentMinutePeriod() {
            const start = this.getCurrentMinuteStart();
            const end = this.getCurrentMinuteEnd();
            return new ugpa.periodpicker.Period(start, end);
        },

        getSeconds(dt) {
            const ts = this.extractTimeFromDateTime(dt).split(":");
            return Date.UTC(1970, 0, 1, ts[0], ts[1], ts[2]) / 1000;
        }
    }
});
