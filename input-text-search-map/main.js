var API_KEY_MAPBOX = 'pk.eyJ1IjoiaGFsbGFuZW9wbGFuIiwiYSI6ImNsZG5rdjVsejBoYjMzb2tkNGpvZmpqdzkifQ.UCTS5u-Zqbsi17tHSm-5fQ';

window.onload = function() {
    var dropdown = document.getElementById('address-dropdown');
    var input = document.getElementById('address-input');

    var debounce = function (func, wait) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    };

    var inputHandler = debounce(function () {
        dropdown.innerHTML = '';
        dropdown.style.display = 'block';

        var inputValue = input.value;
     
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "https://api.mapbox.com/geocoding/v5/mapbox.places/" + inputValue + ".json?access_token=" + API_KEY_MAPBOX);
        xhr.onload = function(){
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                // Process results and display dropdown options
                data.features.forEach(function(feature) {
                    var option = document.createElement('div');
                    option.className = 'dropdown-item';
                    option.textContent = feature.place_name;
                    option.addEventListener('click', function () {
                        input.value = feature.place_name;
                        dropdown.style.display = 'none';
                    });
                    dropdown.appendChild(option);
                });
            }
        };
        xhr.send();
    }, 500);

    input.addEventListener('input', inputHandler);
};