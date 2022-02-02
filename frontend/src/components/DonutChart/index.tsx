import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SaleSum } from 'types/sale';
import { BASE_URL } from 'utils/requests';

type ChartData = {
    labels: string[];
    series: number[];
}

const DonutChart = () => {

    //useState -> Mantém o estado do componente.
    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

    //useEffect -> Executa algo na instanciação ou destruição do componente, observa estado
    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`)
            .then(response => {

                const data = response.data as SaleSum[];
                const mylabels = data.map(x => x.sellerName);
                const myseries = data.map(x => x.sum);

                setChartData({ labels: mylabels, series: myseries });
            })
    }, []);

    //FORMA ERRADA       CHAMADA ASSÍNCRONA
    //let chartData: ChartData = {labels: [], series: []};

    //FORMA ERRADA
    //axios.get(`${BASE_URL}/sales/amount-by-seller`)
    //.then(response => {
    //
    //    const data = response.data as SaleSum[];
    //    const mylabels = data.map(x => x.sellerName);
    //    const myseries = data.map(x => x.sum);
    //
    //    setChartData({labels: mylabels, series: myseries});
    //
    //    console.log(chartData);
    //})

    //const mockData = {
    //    series: [477138, 499928, 444867, 220426, 473088],
    //    labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    //}

    const options = {
        legend: {
            show: true
        }
    }

    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"
        />
    );
}

export default DonutChart;