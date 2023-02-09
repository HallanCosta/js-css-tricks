document.addEventListener("DOMContentLoaded", function () {
    window.onload = function() {
        const selectedInstruments = [];

        var selectorContainer = document.querySelector(".instruments-selector-container");

        var btnInstruments = selectorContainer.querySelector('.btn-instruments');
        var instrumentsWrapper = selectorContainer.querySelector('.instruments-wrapper');
        var instrumentsContainer = selectorContainer.querySelector('.instruments');

        btnInstruments.onclick = function() { 
            instrumentsWrapper.toggleAttribute('hidden');
        }

        var instruments = selectorContainer.querySelectorAll(".instrument");
        instruments.forEach(function(instrument) {
            instrument.addEventListener('click', function() {
                btnInstruments.innerText = '';

                var instrumentText = instrument.innerText;
                var instrumentValue = instrument.getAttribute('value');

                if (instrument.classList.contains('selected')) {
                    for (var i = 0; i < selectedInstruments.length; i++) {
                        var selectedInstrument = selectedInstruments[i];
            
                        if (instrumentValue == selectedInstrument.value) {
                            selectedInstruments.splice(i, 1);
                            instrument.classList.remove('selected');
                        }
                    }
    
                    console.log('Instruments Values added:', selectedInstruments);
                } else {
                    instrument.classList.add('selected');
                    selectedInstruments.push({
                        name: instrumentText,
                        value: instrumentValue
                    });
                    console.log('> Instruments Values deleted:', selectedInstruments);
                }
                
                var btnInstrumentsText = selectedInstruments.length == 0
                ? 'Choose a instrument'
                : selectedInstruments.map(instrument => instrument.name).join(', ');
                
                btnInstruments.innerText = btnInstrumentsText;

                console.log('Instruments Selected:', selectedInstruments);
            });
        });
    }
});