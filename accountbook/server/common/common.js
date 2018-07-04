module.exports = {
    formatDate(_dt) {
        _dt = new Date(_dt);
        var _yyyy = _dt.getFullYear();
        var _mm = _dt.getMonth() + 1;
        var _dd = _dt.getDate();
        if (_mm < 10) {
            _mm = "0" + _mm;
        }
        if (_dd < 10) {
            _dd = "0" + _dd;
        }
        return (_yyyy + '-' + _mm + "-" + _dd);
    },
    getDay(_dt) {
        _dt = new Date(_dt);
        var _dd = _dt.getDate();
        return _dd;
    },
    getMonth(_dt) {
        _dt = new Date(_dt);
        var _mm = _dt.getMonth() + 1;
        return _mm;
    },
    getYear(_dt) {
        _dt = new Date(_dt);
        var _yyyy = _dt.getFullYear();
        return _yyyy;
    },
    //星期几
    getDateWeekday (activity_time) {
        var date = new Date(activity_time)
        var nowDayOfWeek = date.getDay(); //今天本周的第几天
        var Week = ['日', '一', '二', '三', '四', '五', '六', '日'];
        var week = `星期${Week[nowDayOfWeek]}`;
        return week;
    }
}

