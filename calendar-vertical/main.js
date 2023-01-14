function createCalendar(month, year) {
    var html = String.raw`
        <div class="calendar" month="${month}" year="${year}">
            <header>
                <h2 id="month" class="month">Abril</h2>
            </header>
            
            <h2 id="year" class="year">2023</h2>
            
            <table>
                <thead>
                    <tr>
                        <td>Dom</td>
                        <td>Seg</td>
                        <td>Ter</td>
                        <td>Qua</td>
                        <td>Qui</td>
                        <td>Sex</td>
                        <td>Sab</td>
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

/**
 * Create multiple calendars
 * @param {Object} props - The configs calendars
 * @param {number} props.month - The current month. 
 * @param {number} props.year - The current year. 
 * @param {number} props.repeat - Number of calendars. 
 */
function calendars({ month, year, repeat }) {
    var calendars = document.querySelector('#calendars');

    Array.from({ length: repeat }, function(_, key) {
        if (month < 12) {
            calendars.innerHTML += createCalendar(month, year);
            getDaysCalendar(month, year);

            month++;

            // Reseta mês e muda o ano
            if (month == 12) {
                month = 0;
                year++;
            }

            console.log(key)
        } 
    });
}

var now = new Date();
var month = now.getMonth();
var year = now.getFullYear();

var props = {
    month, 
    year, 
    repeat: 24
};

window.onload = calendars(props);