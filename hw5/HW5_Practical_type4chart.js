function createChart4(servers, attackerDatasets) {

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

function generateDataset4(attackers, intervals, p, dt) {
  let dataset = [];
  let totalSuccessfulJumps = Array(intervals + 1).fill(0);
  const sqrtDt = Math.sqrt(dt);

  for (let i = 1; i <= attackers.length; i++) {
    let attackerData = [];
    attackerData.push(0);
    let max = 0;
    for (let j = 1; j <= intervals; j++) {

      let randomValue = Math.random();

      if (randomValue < p) {
        max = max + sqrtDt;
        totalSuccessfulJumps[j] += 1;
      }
      else {
        max = max - sqrtDt;
      }
      attackerData.push(max);
    }

    dataset.push({
      label: `Attacker ${i}`,
      data: attackerData,
      borderColor: generateRandomHexColor(),
      borderWidth: 2,
      fill: false,
      tension: 0.8,
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


function generateChartType4(integer1, integer1_5, integer2, p, event) {
  if (integer1 < 0 || integer1_5 < integer1) {
    event.preventDefault();
    alert(`Error: The total number of intervals must be greater than the total time window`);
  } else {
    const dt = integer1 / integer1_5;
    const steps = [];
    for (let i = 0; i <= integer1_5; i++) {
      steps.push(i * dt);
    }
    const attackers = [];
    for (let i = 1; i <= integer2; i++) {
      attackers.push(i);
    }
    let [attackerDatasets, successfulJumps, relativeSuccessfulJumps] = generateDataset4(attackers, integer1_5, p, dt)
    createChart4(steps, attackerDatasets, Math.sqrt(dt));
    document.getElementById('chartContainer').style.display = 'block';
  }
}