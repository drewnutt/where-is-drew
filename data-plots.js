// List of datasets: CSV file, x column, y column, plot title, axis labels
const datasets = [
    { csv: 'data/daily_hiking_distances.csv', xCol: 'Date', yCol: 'Distance (miles)', title: 'Distance Hiked Per Day', xLabel: 'Date', yLabel: 'Distance (miles)' , type: 'bar'},
    { csv: 'data/peanut_butter.csv', xCol: 'date finished', yCol: 'cumulative weight', title: 'Peanut Butter Consumption Over Time', xLabel: 'Date', yLabel: 'Peanut Butter Consumed (lbs)' , type: 'scatter'},
];

// Function to load CSV and parse x and y
function loadCSVData(csvFile, xCol, yCol) {
    return fetch(csvFile)
        .then(response => response.text())
        .then(csvText => {
            const rows = csvText.trim().split('\n');
            const headers = rows[0].split(',');
            const xIndex = headers.indexOf(xCol);
            const yIndex = headers.indexOf(yCol);

            const xData = [];
            const yData = [];

            for (let i = 1; i < rows.length; i++) {
                const cols = rows[i].split(',');
                const xVal = xCol.toLowerCase().includes('date') ? new Date(cols[xIndex]).toISOString() : parseFloat(cols[xIndex]);
                const yVal = parseFloat(cols[yIndex]);
                xData.push(xVal);
                yData.push(yVal);
            }

            return { xData, yData };
        });
}

// Create plot in given div
function createPlot(divId, data, title, xLabel, yLabel, plotType) {
    const trace = {
        x: data.xData,
        y: data.yData,
        type: plotType === 'bar' ? 'bar' : 'scatter',
        mode: plotType === 'scatter' ? 'markers' : undefined,
        marker: { color: 'blue' }
    };

    const layout = {
        xaxis: { title: { text: xLabel, font: { size: 14 } }, type: xLabel.toLowerCase().includes('date') ? 'date' : 'category' },
        yaxis: { title: { text: yLabel, font: { size: 14 } } },
        autosize: true,
        margin: { t: 40, b: 50, l: 50, r: 30 }
    };

    const config = { responsive: true };
    Plotly.newPlot(divId, [trace], layout, config);
}

// Generate plots dynamically
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('plots-container');

    datasets.forEach((ds, i) => {
        const boxDiv = document.createElement('div');
        boxDiv.className = 'plot-box';

        const h2 = document.createElement('h2');
        h2.textContent = ds.title;
        boxDiv.appendChild(h2);

        const plotDiv = document.createElement('div');
        plotDiv.id = `plot${i}`;
        plotDiv.className = 'plot-container';
        boxDiv.appendChild(plotDiv);

        container.appendChild(boxDiv);

        loadCSVData(ds.csv, ds.xCol, ds.yCol)
            .then(data => createPlot(plotDiv.id, data, ds.title, ds.xLabel, ds.yLabel, ds.type));
    });
});
