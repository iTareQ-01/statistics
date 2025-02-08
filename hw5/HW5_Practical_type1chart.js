function createChart1(servers, attackers, attackerDatatsets) {

    if (myChart !== null) {
        myChart.destroy();
    }

    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: servers,
            datasets: attackerDatatsets
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
                        display: true,
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
                        color: 'black'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'successful breach',
                        color: "black",
                        font: {
                            size: 18,
                        },
                    },
                    position: 'right',
                    grid: {
                        color: 'grey'
                    },
                    ticks: {
                        stepSize: 1,
                        color: 'black'
                    }
                }
            }
        }
    });
}

function generateDataset1(attackers, servers, probability) {

    let dataset = [];

    for (let i = 1; i <= attackers.length; i++) {
        let attackerData = [];
        attackerData.push(0);
        let max = 0;

        for (let j = 1; j < servers.length; j++) {

            let randomValue = Math.random();

            let value = max;
            if (randomValue < probability) {
                max = max + 1;
                value = max;
            }

            attackerData.push(value);
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

    return dataset;
}


function generateRandomHexColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function generateChartType1(integer1, integer2, p) {

    const servers = [];
    for (let i = 0; i <= integer1; i++) {
        servers.push(i);
    }

    const attackers = [];
    for (let i = 1; i <= integer2; i++) {
        attackers.push(i);
    }

    attackerDatatsets = generateDataset1(attackers, servers, p)

    let attackerPenetrations = []
    attackerDatatsets.forEach((attacker) => {
        const finalPenetrations = attacker.data[attacker.data.length - 1];
        attackerPenetrations.push(finalPenetrations)
    });


    createChart1(servers, attackers, attackerDatatsets);
    document.getElementById('chartContainer').style.display = 'flex';
}