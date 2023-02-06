document.addEventListener("DOMContentLoaded", function () {
    function createHours(hoursContainer) {
        for (let i = 0; i < 24; i++) {
            for (let j = 0; j < 2; j++) {
                let hour = (i < 10 ? "0" + i : i) + ":" + (j === 0 ? "00" : "30");
                let hourDiv = document.createElement("div");
                //option.value = hour;
                hourDiv.innerText = hour;
                hourDiv.classList.add('hour');
                hoursContainer.appendChild(hourDiv);
            }
        }
    }

    window.onload = function() {
        const hourPicker = document.querySelector("#hour-picker");
        const hoursContainer = hourPicker.querySelector(".hours");
        const hourSelect = hourPicker.querySelector("#hour-select");

        createHours(hoursContainer);

        const inputTime = document.querySelector('#input-time');
        inputTime.value = '00:00';

        inputTime.onclick = function() { 
            hourPicker.toggleAttribute('hidden');
            inputTime.setAttribute('disabled', '');
        }

        const hours = hourPicker.querySelectorAll(".hour");
        hours.forEach(function(hour) {
            hour.addEventListener('click', function() {
                hours.forEach(function(hour) {
                    hour.classList.remove('selected');
                });
                
                var hourText = hour.innerText;
                
                hour.classList.add('selected');
                hourSelect.setAttribute('value', hourText);
                inputTime.value = hourText;
                hourPicker.setAttribute('hidden', '');
                inputTime.removeAttribute('disabled');

                console.log('hourSelect:', hourSelect);
            });
        });
    }
});