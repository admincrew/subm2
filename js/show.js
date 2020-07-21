function showStanding(data) {
    let standings = '';
    const standingElement = document.getElementById('standings');

    // looping data standings
    data.standings[0].table.forEach(function (standing) {
        standings += `
                <tr>
                    <td>
                        <img src="${standing.team.crestUrl.replace(
											/^http:\/\//i,
											'https://'
                                    )}" width="30px" alt="badge"/>
                    </td>
                    <td>
                        <a class="linked fntRed" href="#team?id=${standing.team.id}">${standing.team.name}</a><br>
                        ${standing.won}<sub><a class="fntGreen">win</a></sub>   
                        ${standing.draw}<sub><a class="fntGrey">draw</a></sub>
                        ${standing.lost}<sub><a class="fntRed">lose</a></sub>
                    </td>
                    <td>
                        Poin :<strong> ${standing.points}</strong><br>
                        Posisi ke- <strong> ${standing.position}</strong>
                    </td>
                    <td>
                        <i class="material-icons left">star_border</i>
                    </td>
    
                </tr>
        `;
    });

    standingElement.innerHTML = `
    
    <div class="row">
        <div class="col s12 m6">
            <div class="card bgColor roundCard standings">
                <center><a class="compName">${data.competition.name}</a><br></center>
                <center><a class="fntWhite">${data.season.startDate} - ${data.season.endDate}</a></td></center>
            </div>
            <div class="card standings roundCard" >
                <table class="striped" >
                    ${standings}
                </table>
            </div>
        </div>
    </div>
	`;
}

// Fungsi untuk menampilkan detail team
function showTeam(team) {
    const teamx = document.getElementById('teamx');
    let pemain = '';
    // Looping data team
    team.squad.forEach((pemainx) => {
        pemain += `
        <ul class="collapsible roundCard">
            <li>
                <div class="collapsible-header roundCard">${pemainx.name}</div>
                    <div class="collapsible-body p-0">
                        <ul class="collection roundCard">
                            <li class="collection-item">Posisi : ${pemainx.position}</li>
                            <li class="collection-item">Negara Kelahiran : ${pemainx.countryOfBirth}</li>
                            <li class="collection-item">Kebangsaan : ${pemainx.nationality}</li>
                            <li class="collection-item">Nomor Pakaian : ${
                                pemainx.shirtNumber == null ? 'Tidak Diketahui' : pemainx.shirtNumber
                            }</li>
                            <li class="collection-item">Sebagai : ${pemainx.role}</li>
                        </ul>
                </div>
            </li>
        </ul>
	  `;
    });
    teamx.innerHTML = `
    <div class="row">
        <div class="col s12 m6">
            <div class="card roundCard">
                <div  class="info-t roundCard"  >
                    <center><a class="putih">Informasi Tim</a></center>
                </div>
            </div>
            <div class="card roundCard">
                <div class="card-image roundCard">
                    <img class="logo-t" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}">
                    <a class="btn-floating halfway-fab waves-effect waves-light blue" id="simpan" href=${team.id} >
                    <i class="material-icons" id="ikonx">save</i></a>
                </div>
                <div class="card-content">
                    <p>${team.name} (${team.shortName}) adalah klub sepakbola yang beralamat di ${team.address}. Klub ini didirikan pada tahun <strong>${
                    team.founded === null ? 'yang tidak diketahui' : team.founded}</strong> dan memiliki warna khas ${team.clubColors}</p>
                </div>
            </div>
            <tr>
                <td>Anggota Tim</td>
            </tr>
            ${pemain}
        </div>
    </div>
    
`;
    // inisialisasi collapse materialize
    $('.collapsible').collapsible();
    const ikonxx = document.getElementById('ikonx');
    // fungsi untuk mengecek apakah id team sudah ada di DB atau belum
    // jika sudah maka tombol save berubah ikonnya menjadi delete
    async function dataxx() {
        if (await isFav(parseInt(window.location.hash.substr(9)))) {
            ikonxx.innerHTML = 'delete';
        }
    }
    dataxx();

    $('#simpan').on('click', async (e) => {
        e.preventDefault();
        // mendapatkan id team dari nilai href
        const teamId = parseInt(e.currentTarget.getAttribute('href'));

        if (await isFav(teamId)) {
            deleteTeamFav(teamId);
            ikonxx.innerHTML = 'save';
            M.toast({
                html: `${team.name} Telah Dihapus Dari Tim Favorit`
            });
        } else {
            M.toast({
                html: `${team.name} Telah Ditambahkan Ke Tim Favorit`
            });
            ikonxx.innerHTML = 'delete';
            addTeamFav(team);
        }
    });
}

// Fungsi untuk menampilkan team favorite
function showFavTeam() {
    getAllTeamFav().then((favs) => {
        let data = '';
        let data2 = '';
        // looping data dari database
        favs.forEach((favs) => {
            data2 += `<tr> <td><img src="${favs.crestUrl.replace(
				/^http:\/\//i,
				'https://'
			)}" width="35px" alt="badge"/></td>
			<td><a class="simpanan" href="#team?id=${favs.id}">${
				favs.name
			}</a> </td> </tr> `;
        });
        data += `<div class="card roundCard standings home"> <table border="1"> 
        ${data2 === '' ? 'Tidak Ada Tim Favorit' : data2} 
			 
			</table> </div>`;

        document.getElementById('teamFavX').innerHTML = data;
        document.querySelectorAll('.simpanan').forEach(function (lnk) {
            lnk.addEventListener('click', function (event) {
                // mengambil nilai id lalu dimasukkan ke variabel urlTeam Param
                urlTeamParam = event.target.getAttribute('href').substr(9);
                // Muat konten halaman yang dipanggil
                loadPage();
            });
        });
    });
}