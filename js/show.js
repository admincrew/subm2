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
                        <a class="fntRed">${standing.team.name}</a><br>
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