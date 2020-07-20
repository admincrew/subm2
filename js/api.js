const API_KEY = '86c697c92bdd464ea206d6a4236152a3';
const BASE_URL = 'https://api.football-data.org/v2/';

const Endpoint_Ing = `${BASE_URL}competitions/2021/standings`;
const Endpoint_Jer = `${BASE_URL}competitions/2002/standings`;
const Endpoint_Spn = `${BASE_URL}competitions/2014/standings`;
const Endpoint_Prc = `${BASE_URL}competitions/2015/standings`;
const Endpoint_Champs = `${BASE_URL}competitions/2001/standings`;

const fetchAPI = (url) => {
    return fetch(url, {
            headers: {
                'X-Auth-Token': API_KEY,
            },
        })
        .then((res) => {
            if (res.status !== 200) {
                console.log('Error: ' + res.status);
                return Promise.reject(new Error(res.statusText));
            } else {
                return Promise.resolve(res);
            }
        })
        .then((res) => res.json())
        .catch((err) => {
            console.log(err);
        });
};

function getStandingsIng() {
    if ('caches' in window) {
        caches.match(Endpoint_Ing).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log('Competition Data: ' + data);
                    showStanding(data);
                });
            }
        });
    }

    fetchAPI(Endpoint_Ing)
        .then((data) => {
            showStanding(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function getStandingsPrc() {
    if ('caches' in window) {
        caches.match(Endpoint_Prc).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log('Competition Data: ' + data);
                    showStanding(data);
                });
            }
        });
    }

    fetchAPI(Endpoint_Prc)
        .then((data) => {
            showStanding(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function getStandingsSpn() {
    if ('caches' in window) {
        caches.match(Endpoint_Spn).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log('Competition Data: ' + data);
                    showStanding(data);
                });
            }
        });
    }

    fetchAPI(Endpoint_Spn)
        .then((data) => {
            showStanding(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function getStandingsJer() {
    if ('caches' in window) {
        caches.match(Endpoint_Jer).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log('Competition Data: ' + data);
                    showStanding(data);
                });
            }
        });
    }

    fetchAPI(Endpoint_Jer)
        .then((data) => {
            showStanding(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function getStandingsChamps() {
    if ('caches' in window) {
        caches.match(Endpoint_Champs).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    console.log('Competition Data : ' + data);
                    showStanding(data);
                });
            }
        });
    }

    fetchAPI(Endpoint_Champs)
        .then((data) => {
            showStanding(data);
        })
        .catch((error) => {
            console.log(error);
        });
}


// const base_url = "https://readerapi.codepolitan.com/";
// // Blok kode yang akan di panggil jika fetch berhasil
// function status(response) {
//     if (response.status !== 200) {
//         console.log("Error : " + response.status);
//         // Method reject() akan membuat blok catch terpanggil
//         return Promise.reject(new Error(response.statusText));
//     } else {
//         // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
//         return Promise.resolve(response);
//     }
// }
// // Blok kode untuk memparsing json menjadi array JavaScript
// function json(response) {
//     return response.json();
// }
// // Blok kode untuk meng-handle kesalahan di blok catch
// function error(error) {
//     // Parameter error berasal dari Promise.reject()
//     console.log("Error : " + error);
// }
// // Blok kode untuk melakukan request data json
// function getArticles() {
//     if ('caches' in window) {
//         caches.match(base_url + "articles").then(function (response) {
//             if (response) {
//                 response.json().then(function (data) {
//                     var articlesHTML = "";
//                     data.result.forEach(function (article) {
//                         articlesHTML += `
//                     <div class="card">
//                       <a href="./article.html?id=${article.id}">
//                         <div class="card-image waves-effect waves-block waves-light">
//                           <img src="${article.thumbnail}" />
//                         </div>
//                       </a>
//                       <div class="card-content">
//                         <span class="card-title truncate">${article.title}</span>
//                         <p>${article.description}</p>
//                       </div>
//                     </div>
//                   `;
//                     });
//                     // Sisipkan komponen card ke dalam elemen dengan id #content
//                     document.getElementById("articles").innerHTML = articlesHTML;
//                 })
//             }
//         })
//     }
//     fetch(base_url + "articles")
//         .then(status)
//         .then(json)
//         .then(function (data) {
//             // Menyusun komponen card artikel secara dinamis
//             var articlesHTML = "";
//             data.result.forEach(function (article) {
//                 articlesHTML += `
//               <div class="card">
//                 <a href="./article.html?id=${article.id}">
//                   <div class="card-image waves-effect waves-block waves-light">
//                     <img src="${article.thumbnail}" />
//                   </div>
//                 </a>
//                 <div class="card-content">
//                   <span class="card-title truncate">${article.title}</span>
//                   <p>${article.description}</p>
//                 </div>
//               </div>
//             `;
//             });
//             // Sisipkan komponen card ke dalam elemen dengan id #content
//             document.getElementById("articles").innerHTML = articlesHTML;
//         })
//         .catch(error);
// }

// function getArticleById() {
//     // Ambil nilai query parameter (?id=)
//     const urlParams = new URLSearchParams(window.location.search);
//     const idParam = urlParams.get("id");
//     if ('caches' in window) {
//         caches.match(base_url + "article/" + idParam).then(function (response) {
//             if (response) {
//                 response.json().then(function (data) {
//                     let articleHTML = `
//                         <div class="card">
//                             <div class="card-image waves-effect waves-block waves-light">
//                                 <img src="${data.result.cover}" />
//                             </div>
//                             <div class="card-content">
//                                 <span class="card-title">${data.result.post_title}</span>
//                                 ${snarkdown(data.result.post_content)}
//                             </div>
//                         </div>
//                         `;
//                     // Sisipkan komponen card ke dalam elemen dengan id #content
//                     document.getElementById("body-content").innerHTML = articleHTML;
//                 });
//             }
//         });
//     }
//     fetch(base_url + "article/" + idParam)
//         .then(status)
//         .then(json)
//         .then(function (data) {
//             // Objek JavaScript dari response.json() masuk lewat variabel data.
//             console.log(data);
//             // Menyusun komponen card artikel secara dinamis
//             var articleHTML = `
//             <div class="card">
//                 <div class="card-image waves-effect waves-block waves-light">
//                 <img src="${data.result.cover}" />
//                 </div>
//                 <div class="card-content">
//                 <span class="card-title">${data.result.post_title}</span>
//                 ${snarkdown(data.result.post_content)}
//                 </div>
//             </div>
//             `;
//             // Sisipkan komponen card ke dalam elemen dengan id #content
//             document.getElementById("body-content").innerHTML = articleHTML;
//         });
// }