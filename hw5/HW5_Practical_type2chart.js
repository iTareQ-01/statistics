function createChart2(servers, attackerDatasets) {

    if (myChart !== null) {
        myChart.destroy();
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: servers,
            datasets: attackerDatasets
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        color: 'black'
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: false,
                        text: 'servers',
                        color: "black",
                        font: {
                            size: 18,
                        },
                    },
                    position: 'bottom',
                    grid: {
                        color: 'grey'
                    },
                    ticks: {
                        color: 'grey'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: false,
                        text: 'successful breach',
                        color: "black",
                        font: {
                            size: 18,
                        },
                    },
                    position: 'left',
                    grid: {
                        color: 'grey'
                    },
                    ticks: {
                        stepSize: 1,
                        color: 'grey'
                    }
                },
            }
        }
    });
}

function generateDataset2(attackers, servers, probability) {
    let serverLen = servers.length
    let dataset = [];
    let totalSuccessfulJumps = Array(serverLen).fill(0);

    for (let i = 1; i <= attackers.length; i++) {
        let attackerData = [];
        attackerData.push(0);
        let max = 0;

        for (let j = 1; j < serverLen; j++) {

            let randomValue = Math.random();

            if (randomValue < probability) {
                max = max + 1;
                totalSuccessfulJumps[j] += 1;
            } else {
                max = max - 1;
            }

            attackerData.push(max);
        }

        dataset.push({
            label: `Attacker ${i}`,
            data: attackerData,
            borderColor: generateRandomHexColor(),
            borderWidth: 2,
            fill: false,
            stepped: true,
            pointRadius: 1,
            pointHoverRadius: 1
        });
    }
    const relativeSuccessfulJumps = totalSuccessfulJumps.map((value) => {
        return value / (attackers.length);
    });
    return [dataset, totalSuccessfulJumps, relativeSuccessfulJumps];
}


function generateRandomHexColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function generateChartType2(integer1, integer2, integer3, p, event) {
    event.preventDefault();

    if (integer3 < 0 || integer3 > integer1) {
        event.preventDefault();
        alert(`Error: The intermediate step must be between ${0} and ${integer1}.`);
    } else {
        const servers = [];
        for (let i = 0; i <= integer1; i++) {
            servers.push(i);
        }
        const attackers = [];
        for (let i = 1; i <= integer2; i++) {
            attackers.push(i);
        }
        let [attackerDatasets, successfulJumps, relativeSuccessfulJumps] = generateDataset2(attackers, servers, p)

        createChart2(servers, attackerDatasets);
        document.getElementById('chartContainer').style.display = 'block';

        
    }

};