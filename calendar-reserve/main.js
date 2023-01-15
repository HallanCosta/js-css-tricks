function createCalendar(month, year) {
    var html = String.raw`
        <div class="calendar" month="${month}" year="${year}">
            <header>
                <h2 id="month" class="month">Abril</h2>
                <h2 id="year" class="year">2023</h2>
            </header>
            
            <table>
                <thead class="week">
                    <tr>
                        <td>S</td>
                        <td>M</td>
                        <td>T</td>
                        <td>W</td>
                        <td>T</td>
                        <td>F</td>
                        <td>S</td>
                    </tr>
                </thead>
                <tbody id="days" class="days">
                    <tr>
                        <td class="prev-month">1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td class="event">2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td class="event">2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>5</td>
                        <td>6</td>
                        <td class="next-month">7</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    return html;
}

function getDaysCalendar(month, year) {
    var monthsBR = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

    document.querySelector('#calendars .calendar[month="'+month+'"][year="'+year+'"] #month').innerHTML = monthsBR[month];
    document.querySelector('#calendars .calendar[month="'+month+'"][year="'+year+'"] #year').innerHTML = year;

    var tableDays = document.querySelector('#calendars .calendar[month="'+month+'"][year="'+year+'"] #days');
    
    var firstDayOfWeek = new Date(year, month, 1).getDay() - 1;
    var getLastDayThisMonth = new Date(year, month + 1, 0).getDate();

    for (var i = -firstDayOfWeek, index = 0; i < (35 - firstDayOfWeek); i++, index++) {
        var dt = new Date(year, month, i);
        var dtNow = new Date();
        var dayTable = tableDays.querySelectorAll('td')[index]; 

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

function daysClickHandlers({ days, month, year }) {
    days.forEach(function(dayTable) {
        var now = new Date();
        var dayNumber = Number(dayTable.innerText);
        
        var is_next_month = dayTable.classList.contains('next-month');
        var is_prev_month = dayTable.classList.contains('prev-month');

        // Dias antes do dia atual está bloqueado para reserva
        if (dayNumber <= now.getDate() && month <= now.getMonth() && year <= now.getFullYear() && !is_next_month && !is_prev_month) {
            dayTable.setAttribute('disabled', '');
        }

        var dayDisaled = dayTable.getAttribute('disabled');

        if (dayDisaled === null && !is_next_month && !is_prev_month) {
            // Deseleciona todos os dias e seleciona um novo
            dayTable.addEventListener('click', function() {
                days.forEach(function(day) {
                    day.removeAttribute('selected');
                });

                dayTable.setAttribute('selected', '');
            });
        }
    });
}

/**
 * Create multiple calendars
 * @param {Object} props - The configs calendars
 * @param {number} props.day - The current day. 
 * @param {number} props.month - The current month. 
 * @param {number} props.year - The current year. 
 * @param {number} props.repeat - Number of calendars. 
 */
function calendars({ month, year, repeat }) {
    var calendars = document.querySelector('#calendars');

    Array.from({ length: repeat }, function(_, key) {
        if (month < 12) {
            // Cria calendário
            calendars.innerHTML += createCalendar(month, year);

            // Coloca os dias do calendário
            getDaysCalendar(month, year);

            // Adiciona click event nos dias do calendário
            var days = calendars.querySelectorAll('.calendar .days td');
            daysClickHandlers({ days, month, year });

            // Adiciona classe para o primeiro calendário
            if (key === 0) document.querySelectorAll('#calendars .calendar')[0].classList.add('first');

            month++;

            // Reseta mês e muda o ano
            if (month === 12) {
                month = 0;
                year++;
            }
        } 
    });
}

var now = new Date();
var day = now.getDate();
var month = now.getMonth();
var year = now.getFullYear();

var props = {
    day,
    month, 
    year, 
    repeat: 24
};

document.addEventListener("DOMContentLoaded", function() {
    calendars(props);
}, false);