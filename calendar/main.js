document.addEventListener('DOMContentLoaded', function() {
    var monthsBR = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
    var tableDays = document.getElementById('days');

    function GetDaysCalendar(month, year) {
        document.getElementById('month').innerHTML = monthsBR[month];
        document.getElementById('year').innerHTML = year;

        var firstDayOfWeek = new Date(year, month, 1).getDay() - 1;
        var getLastDayThisMonth = new Date(year, month + 1, 0).getDate();

        for (var i = -firstDayOfWeek, index = 0; i < (35 - firstDayOfWeek); i++, index++) {
            var dt = new Date(year, month, i);
            var dtNow = new Date();
            var dayTable = tableDays.getElementsByTagName('td')[index];
            dayTable.classList.remove('prev-month');
            dayTable.classList.remove('next-month');
            dayTable.classList.remove('current-day');
            dayTable.innerHTML = dt.getDate();

            if (dt.getFullYear() == dtNow.getFullYear() && dt.getMonth() == dtNow.getMonth() && dt.getDate() == dtNow.getDate()) {
                dayTable.classList.add('current-day');
            }

            if (i < 1) {
                dayTable.classList.add('prev-month');
            } 
            
            if (i > getLastDayThisMonth) {
                dayTable.classList.add('next-month');
            }
        }
    }

    var now = new Date();
    var month = now.getMonth();
    var year = now.getFullYear();

    GetDaysCalendar(0, 2023);

    var btnNext = document.getElementById('btn-next');
    var btnPrev = document.getElementById('btn-prev');

    btnNext.onclick = function() {
        month++;
        if (month > 11) {
            month = 0;
            year++;
        }
        GetDaysCalendar(month, year);
    } 
    
    btnPrev.onclick = function() {
        month--;
        if (month < 0) {
            month = 11;
            year--;
        }
        GetDaysCalendar(month, year);
    }  
});