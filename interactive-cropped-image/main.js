document.addEventListener("DOMContentLoaded", function () {
    var oldFile = null;

    var croppieContainer = document.querySelector(".croppie-container");
    var croppieContent = document.querySelector("#croppie");
    var dummyImg = document.querySelector("#dummy-img");
    var inputFile = document.querySelector("#input-file");
    var portrait = document.querySelector("#portrait-cropped");

    var btnCancelCrop = document.querySelector('.croppie-buttons .btn-cancel-crop');
    var btnApplyCrop = document.querySelector('.croppie-buttons .btn-apply-crop');

    var croppie = new Croppie(croppieContent, {
        viewport: {
            width: 200,
            height: 200,
            type: "circle",
        },
        boundary: {
            width: 200,
            height: 200,
        },
        showZoomer: true
    });

    dummyImg.onclick = function() {
        inputFile.click();
    }

    inputFile.onchange = function() {
        console.log(dummyImg)
        console.log('inputFile.files[0]', inputFile.files[0]);
        loadImage(
            inputFile.files[0],
            function (img) {
                dummyImg.setAttribute('hidden', '');
                croppieContainer.removeAttribute('hidden');
                portrait.setAttribute('hidden', '');

                croppie.bind({ url: img.toDataURL() });
            },
            { orientation: true }
        );
    }
    
    // Reset crop
    btnCancelCrop.addEventListener("click", function() {
        var dataTransfer = new DataTransfer();
       
        if (!portrait.querySelector('canvas')) {
            inputFile.files = dataTransfer.files;
            dummyImg.removeAttribute('hidden');
            croppieContainer.setAttribute('hidden', '');
        } else {
            dataTransfer.items.add(oldFile);
            inputFile.files = dataTransfer.files;

            dummyImg.setAttribute('hidden', '');
            croppieContainer.setAttribute('hidden', '');
            portrait.removeAttribute('hidden');
        }

        console.log('btnCancelCrop:', inputFile.files[0]); 
    });

    // Apply Cropped
    btnApplyCrop.addEventListener('click', function() {
        croppie.result({
            type: 'canvas',
            size: 'viewport'
        }).then(function (blob) {
            loadImage(
                blob,
                function (img) {
                    var dataTransfer = new DataTransfer();
                    var file = new File([blob], inputFile.files[0].name + '_cropped.jpg', { type: 'image/jpeg' });

                    oldFile = file;

                    dummyImg.setAttribute('hidden', '');
                    croppieContainer.setAttribute('hidden', '');
                    portrait.removeAttribute('hidden');

                    if (portrait.querySelector('canvas')) {
                        portrait.removeChild(portrait.querySelector('canvas'))
                    }

                    dataTransfer.items.add(file);
                    
                    console.log('inputFile Antigo:', inputFile.files[0]);
                    inputFile.files = dataTransfer.files;
                    console.log('inputFile Novo:', inputFile.files[0]);

                    portrait.appendChild(img);
                },
                { orientation: true }
            );
        });
    });

    portrait.addEventListener('click', function() {
        inputFile.click();
    });
});