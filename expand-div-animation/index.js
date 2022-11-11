window.onload = function() {
    var btnExpand = document.querySelector('#btn-expand');
    var txtExpand = document.querySelector('#txt-expand');

    btnExpand.addEventListener('click', function() {
        txtExpand.classList.toggle('open');
    });
}