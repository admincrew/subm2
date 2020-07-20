document.addEventListener("DOMContentLoaded", function () {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                // Muat navigasi
                document.querySelectorAll('.topnav, .sidenav').forEach(element => element.innerHTML = xhttp.responseText);
                // Inisialisasi dropdown materialize
                const elems = document.querySelectorAll('.dropdown-button');
                M.Dropdown.init(elems);

                document.querySelectorAll('.link').forEach(function (lnk) {
                    lnk.addEventListener('click', function (event) {
                        // Tutup sidenav
                        const sidenav = document.querySelector('.sidenav');
                        M.Sidenav.getInstance(sidenav).close();
                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute('href').substr(1);
                        loadPage(page);
                    });
                });


            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
    let page = window.location.hash.substr(1);
    if (page === "") page = "home";
    loadPage(page);

    function loadPage(page) {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState = 4) {
                const content = document.querySelector("#body-content");

                if (page === 'ligaChamps') {
                    getStandingsChamps()
                } else if (page === 'ligaJer') {
                    getStandingsJer()
                } else if (page === 'ligaIng') {
                    getStandingsIng()
                } else if (page === 'ligaSpn') {
                    getStandingsSpn()
                } else if (page === 'ligaPrc') {
                    getStandingsPrc()
                }

                if (this.status == 200) {
                    content.innerHTML = xhttp.responseText;
                    //slider
                    if (page === 'home') {
                        const slider = document.querySelectorAll(".slider");
                        M.Slider.init(slider, {
                            indicators: false,
                            height: 600,
                            transition: 600,
                            interval: 3000
                        });
                    }
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups... halaman tidak dapat diakses.</p>";
                }
            }
        };
        if (
            page === 'ligaJer' ||
            page === 'ligaSpn' ||
            page === 'ligaIng' ||
            page === 'ligaPrc' ||
            page === 'ligaChamps'
        ) {
            xhttp.open("GET", `/pages/liga.html`);
            xhttp.send();
            return;
        } else {
            xhttp.open("GET", "pages/" + page + ".html", true);
            xhttp.send();
        }

    }
});