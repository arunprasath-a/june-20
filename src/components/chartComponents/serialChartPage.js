import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {loadradarChartData} from "../../store/actions/actions";
import EnhancedComponent from "../HOC/index";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);


class SerialChart extends React.Component {


    componentDidMount() {
        this.props.loadradarChartData();
     }

componentDidUpdate(){
  var chart = am4core.create("Serieschartdiv", am4charts.RadarChart);
  chart.data = this.props.data.data;
    
    /* Create axes */
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.labels.template.location = 0.5;
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.location = 1;
    valueAxis.renderer.labels.template.verticalCenter = "bottom";
    valueAxis.renderer.labels.template.fillOpacity = 0.5;
    valueAxis.renderer.maxLabelPosition = 0.99;
    
    /* Create and configure series */
    var series1 = chart.series.push(new am4charts.RadarColumnSeries());
    series1.dataFields.valueY = "value1";
    series1.dataFields.categoryX = "country";
    series1.name = "Sales";
    series1.strokeWidth = 0;
    series1.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
    series1.sequencedInterpolation = true;
    series1.sequencedInterpolationDelay = 100;
    series1.stacked = true;
    
    var series2 = chart.series.push(new am4charts.RadarColumnSeries());
    series2.dataFields.valueY = "value2";
    series2.dataFields.categoryX = "country";
    series2.name = "Marketing";
    series2.strokeWidth = 0;
    series2.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
    series2.sequencedInterpolation = true;
    series2.sequencedInterpolationDelay = 100;
    series2.stacked = true;
    
    /* Add legend */
    chart.legend = new am4charts.Legend();
    
    /* Add cursor */
    chart.cursor = new am4charts.RadarCursor();
    
    /* Make chart angled */
    chart.startAngle = -170;
    chart.endAngle = -10;
    chart.innerRadius = am4core.percent(50);
}

    render() {
        return (
            <React.Fragment>
              <div className="radar">
                
                    <div className="Serieschartdiv"></div>
                    <br></br>
                <br></br>
              <h3>Radar chart</h3>
                </div>
            </React.Fragment>
        )
    }
}


const mapStateToProps = (state) =>{
  return{
    data:state.mainReducer.radarchartData
  }
}

const mapDispatchToProps = (dispatch) =>{
  return bindActionCreators({
    loadradarChartData:loadradarChartData,
  },dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)( (SerialChart));





