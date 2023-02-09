document.addEventListener("DOMContentLoaded", function () {
    function createHours(hoursContainer) {
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 2; j++) {
                let hour = (i < 10 ? "0" + i : i) + ":" + (j === 0 ? "00" : "30");
                let hourElement = document.createElement("div");
                //option.value = hour;
                hourElement.innerText = hour;
                hourElement.classList.add('hour');
                hoursContainer.appendChild(hourElement);
            }
        }
    }

    window.onload = function() {
        const inputTime = document.querySelector(".input-time");
        const hourPicker = document.querySelector("#hour-picker");
        const hoursContainer = hourPicker.querySelector(".hours");

        createHours(hoursContainer);

        const btnHour = document.querySelector('.btn-hour');

        btnHour.onclick = function() { 
            hourPicker.toggleAttribute('hidden');
        }

        const hours = hourPicker.querySelectorAll(".hour");
        hours.forEach(function(hour) {
            hour.addEventListener('click', function() {
                hours.forEach(function(hour) {
                    hour.classList.remove('selected');
                });
                
                var hourText = hour.innerText;

                
                hour.classList.add('selected');
                hourPicker.setAttribute('hidden', '');

                inputTime.value = hourText;
                btnHour.innerText = hourText;
            });
        });
    }
});