var ctxLine = document.getElementById('lineChart').getContext('2d');
var lineChart = new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
            label: 'Ventas',
            data: [65, 59, 80, 81, 56, 55, 65, 59, 80, 81, 56, 55],
            borderColor: 'blue',
            borderWidth: 1
        }]
    },
    options: {
        responsive: false
    }
});

var ctxBar = document.getElementById('barChart').getContext('2d');
var barChart = new Chart(ctxBar, {
    type: 'bar',
    data: {
        labels: ['Enero', 'Febrero'],
        datasets: [{
            label: 'Ventas',
            data: [65, 59],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        responsive: false
    }
});

var ctxPie = document.getElementById('pieChart').getContext('2d');
var pieChart = new Chart(ctxPie, {
    type: 'pie',
    data: {
        labels: ['Rojo', 'Verde', 'Azul'],
        datasets: [{
            data: [30, 30, 40],
            backgroundColor: ['red', 'green', 'blue']
        }]
    },
    options: {
        responsive: false
    }
});
var ctxPie2 = document.getElementById('pieChart2').getContext('2d');
var pieChart2 = new Chart(ctxPie2, {
    type: 'pie',
    data: {
        labels: ['Rojo', 'Verde', 'Azul'],
        datasets: [{
            data: [30, 30, 40],
            backgroundColor: ['red', 'green', 'blue']
        }]
    },
    options: {
        responsive: false
    }
});