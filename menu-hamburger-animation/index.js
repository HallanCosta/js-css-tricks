var menuBtn = document.querySelector('.menu-btn');
var menuOpen = false;
menuBtn.addEventListener('click', function() {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen = true;
    } else {
        menuBtn.classList.remove('open');
        menuOpen = false;
    }
})