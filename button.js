function toggleSections(sectionToShow) {
    const sections = ['basket', 'football'];

    sections.forEach(section => {
        const element = document.getElementById(section);

        if (element) {
            if (section === sectionToShow) {
                element.style.display = 'flex';
                element.style.flexDirection = 'column'
            } else {
                element.style.display = 'none';
            }
        }
    });
}


 /* ------basket*/
        let leaguevalue; 
        const demo = document.getElementById("demoba")
        const baskurl =" https://v1.basketball.api-sports.io/standings"
        const output = document.querySelector("output");
        const season = '2023-2024';
        const groupt = 'Central';
        const groupw = `Western Conference`;
        const groupe = `Eastern Conference`;
        const groupa = `Atlantic`;
        const groups = `Southeast`;
        const groupn = `Northwest`;
        const grouptp = `Pacific`;
        const groupso = `Southwest`;
        const baseUrl = "https://v3.football.api-sports.io/standings";
        const groupedStandings = {};
        
       

        function updFe(newLeagueValue) {
            leaguevalue = newLeagueValue;
        
            const url = `${baskurl}?league=${leaguevalue}&season=2023-2024`;
            console.log(url);
        
            fetch(url, {
                method: "GET",
                headers: {
                    "x-rapidapi-host": "v1.basketball.api-sports.io",
                    "x-rapidapi-key": "fba17dd9971e623eafdb8526afa325d7"
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
             
        
            if (leaguevalue === '12' && data.response.length > 0) {
            const resp = data.response[0];
            const displayedGroups = {};
            function createStandings(data) {
            if (data && Array.isArray(data)) { // Correct the check to data instead of data.response[0]
            const teamsByGroup = {};
                    
            data.forEach(team => {
            const groupName = team.group.name;
                    
            if (!teamsByGroup[groupName]) {
            teamsByGroup[groupName] = [];
            }
                    
            teamsByGroup[groupName].push(team);
            });
                    
            for (const groupName in teamsByGroup) {
            if (teamsByGroup.hasOwnProperty(groupName)) {
             teamsByGroup[groupName].sort((a, b) => a.position - b.position);
            }
            }
                    
            return teamsByGroup;
            }
                    
            return null;
            }
            console.log(createStandings())       
            const standings = createStandings(resp);
                      
            console.log(standings);
                     
                
                     // ...
            const tableContainer = document.getElementById("groupS");
                
            function createStandingsHTML(standings) {
            const tableContainer = document.getElementById("groupS");
                      
            Object.keys(standings).forEach(groupName => {
                          // Créez un élément de groupe existant s'il existe déjà
            let groupDiv = document.getElementById(`group-${groupName}`);
                          
                          // S'il n'existe pas, créez un nouvel élément de groupe
            if (!groupDiv) {
            groupDiv = document.createElement("div");
            groupDiv.setAttribute("class", "group");
            groupDiv.setAttribute("id", `group-${groupName}`);
                      
            const groupHeader = document.createElement("h3");
            groupHeader.textContent = groupName;
            groupDiv.appendChild(groupHeader);
                      
            const groupTable = document.createElement("table");
            groupTable.setAttribute("class", "group-table");
                      
            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");
            headerRow.innerHTML = "<th>position</th><th>team</th><th>win</th><th>lose</th>";
            thead.appendChild(headerRow);
                      
            const tbody = document.createElement("tbody");
            groupTable.appendChild(thead);
            groupTable.appendChild(tbody);
                      
            groupDiv.appendChild(groupTable);
            tableContainer.appendChild(groupDiv);
            }
                      
                          // Ajoutez les données d'équipe à la tbody existante
            const tbody = groupDiv.querySelector("tbody");
            standings[groupName].forEach(team => {
            const teams = team.team.name;
            const logo = team.team.logo;
            const rank = team.position;
            const win = team.games.win.total;
            const loss = team.games.lose.total;
            const row = document.createElement("tr");
            row.innerHTML = `<td>${rank}</td>
            <td class="imgf"><img src="${logo}">${teams}</td>
            <td>${win}</td>
            <td>${loss}</td>`;
            tbody.appendChild(row);
            });
            });
            }
                      
                      // Utilisation
            createStandingsHTML(standings);
                      
                      
            }

            else{
            const content = document.getElementById("groupS");
            let htmlContent = "";

            const classement = data.response[0];


            htmlContent += `
            <table>
            <thead>
            <tr>
                <th>position</th>
                <th>team</th>
                <th>win</th>
                <th>lose</th>
            </tr>
            </thead>
            <tbody>
            `;

            classement.forEach(team => {
            const teams = team.team.name;
            const logo = team.team.logo;
            const rank = team.position;
            const win = team.games.win.total;
            const loss = team.games.lose.total;

            htmlContent += `
            <tr>
            <td>${rank}</td>
            <td class="imgf"><img src="${logo}">${teams}</td>
            <td>${win}</td>
            <td>${loss}</td>
            </tr>
            `;
            });

            htmlContent += `
            </tbody>
            </table>
            `;

            content.innerHTML = htmlContent;
            }                        
                                   
                               
                                     
                   
                        
                       



                   
                   
                    
                      
    })
            .catch(error => {
                console.error("Une erreur s'est produite lors de la récupération des données :", error);
            });
        }



          
         function calen(leaguevalue, datavalue) {
                datee.innerHTML ="";
                if (datavalue && typeof datavalue === 'string') {
                
                const selectedDate = new Date(datavalue).toISOString().split('T')[0];
        
                console.log('Formatted Date:', selectedDate);
        
                fetch(`https://v1.basketball.api-sports.io/games?date=${selectedDate}&league=${leaguevalue}&season=2023-2024`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "v1.basketball.api-sports.io",
                        "x-rapidapi-key": "fba17dd9971e623eafdb8526afa325d7"
                    }
                })
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    const dattee = document.getElementById('datee');
                    let htmlContent = "";
                    const match = result.response;
                    for(let i = 0; i < result.response.length; i++) {
                        
                        const teamH = match[i].teams.home.name
                        console.log(teamH)
                        const teamA = match[i].teams.away.name
                        const isoDateString = match[i].date
                        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' }

                        const date = new Date(isoDateString).toLocaleString('fr-FR', options);
                        
                        const scroreH = match[i].scores.home.total;
                        const scroreA = match[i].scores.away.total;
                        const league = match[i].league.name
                        
                        console.log(match)
                        htmlContent += `
                        <div>
                         <div class="top">
                        <p>${date} </p> 
                        <p>${league} </p>
                        </div>
                        <div class="bot">
                        <p>${teamA}: ${scroreA}</p>
                        <p>${scroreH} :${teamH} </p>
                
                        </div>
                        </div>
                        `
                       
                    }
                    dattee.innerHTML =htmlContent
                })
                .catch(err => {
                    console.log(err);
                });
            } else {
                console.error('Invalid date value:', datavalue);
            }
        }

        function updateAndFetch(leagueValue) {
            const url = `${baseUrl}?league=${leagueValue}&season=2023`;
            const demofoo = document.getElementById("demofoo")
              fetch(url, {
                method: "GET",
                headers: {
                  "x-rapidapi-host": "v3.football.api-sports.io",
                  "x-rapidapi-key": "fba17dd9971e623eafdb8526afa325d7"
                }
              })
              .then(response => response.json())
              .then(data => {
                console.log(data)
                console.log("API Response:", data.response[0].league.standings);
                let htmlContent = "";
                const classement = data.response[0].league.standings[0];
                classement.forEach(team => {
                const teams = team.team.name
                const logo = team.team.logo
                const rank = team.rank
                const point = team.all.played;
                const win = team.all.win;
                const draw = team.all.draw;
                const goal = team.all.goals.for
                const loss = team.all.lose;
                htmlContent += `
                
                <tr>
                <td>${rank}</td>
                <td class="imgf"><img src ="${logo}">${teams}</td>
                <td>${point}</td>
                <td>${win}</td>
                <td>${draw}</td>
                <td>${loss}</td>
                <td>${goal}</td>        
                
                 </tr>
                `;
                })
                demofoo.innerHTML = htmlContent;
            
              })
              .catch(error => {
                console.error("Une erreur s'est produite lors de la récupération des données :", error);
              });
            
            
            fetch(`https://v3.football.api-sports.io/players/topscorers?season=2023&league=${leagueValue}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v3.football.api-sports.io",
                    "x-rapidapi-key": "fba17dd9971e623eafdb8526afa325d7"
                }
            })
            .then(response => response.json())
            .then(date => {
                console.log(date)
              const scorefo = document.getElementById("top")
              let htmlContent = "";
              const top =date.response
              console.log(`jouer ${date}`);
              for(let i =0 ;i < top.length ; i++){
                const nom = top[i].player.name;
                const pic = top[i].player.photo;
                const teams = top[i].statistics[0].team.name;
                const score=  top[i].statistics[0].goals.total;
                const duel = top[i].statistics[0].duels.total;
                const duelw =top[i].statistics[0].duels.won;
                const gameli =top[i].statistics[0].games.lineups;
                const gametime =top[i].statistics[0].games.minutes;
                const posi =top[i].statistics[0].games.position;
                htmlContent += 
                `<div class="jouertop">
                <img src="${pic}">
                <h4>${nom}</h4>
                <p> ${teams} </p>
                <p> position :${posi}</p>
                <p>scrore :${score}</p>
                <p>duel :${duel} duel win ${duelw}</p>
                <p>game lineup:${gameli} game time :${gametime}min</p>
                </div>
                `;
            
              }
              scorefo.innerHTML = htmlContent;
            
            })
            .catch(err => {
                console.log(err);
            });
            
            fetch("https://v3.football.api-sports.io/fixtures?live=all", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "v3.football.api-sports.io",
                    "x-rapidapi-key": "fba17dd9971e623eafdb8526afa325d7"
                }
            })
            .then(response => response.json())
            .then(data => {
              console.log(data)
              const calen =document.getElementById("calen")
              let htmlContent = "";
              const fix = data.response
              for(let i = 0; i<fix.length; i++){
                const home = fix[i].teams.home.name;
            
                const away = fix[i].teams.away.name;
             
                const isoDateString = fix[i].fixture.date;;
                const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' }
                const date = new Date(isoDateString).toLocaleString('fr-FR', options);

               

                const league = fix[i].league.name;
                const goalh = fix[i].goals.home;
                const goala = fix[i].goals.away;
                
                htmlContent += `
                <div>
                <div class="top">
                <p>${date} </p> 
                <p>${league} </p>
                </div>
                <div class="bot">
                <p>${away}: ${goala}</p>
                <p>${goalh} :${home} </p>
                
                </div>
                </div>
                `
              }
              calen.innerHTML =htmlContent;
            })
            .catch(err => {
                console.log(err);
            });
            
            
            }