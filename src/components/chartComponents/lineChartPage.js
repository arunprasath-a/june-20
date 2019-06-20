import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadlineChartData } from "../../store/actions/actions";
import EnhancedComponent from "../HOC/index";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);


class LineChart extends React.Component {


  componentDidMount() {

    this.props.loadlineChartData();
  }


  componentDidUpdate() {
    var chart = am4core.create("linechartdiv", am4charts.XYChart);
    chart.paddingRight = 20;


    chart.data = this.props.data.data;

    // Create axes
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "year";
    categoryAxis.renderer.minGridDistance = 50;
    categoryAxis.renderer.grid.template.location = 0.5;
    categoryAxis.startLocation = 0.5;
    categoryAxis.endLocation = 0.5;

    // Pre zoom
    chart.events.on("datavalidated", function () {
      categoryAxis.zoomToIndexes(Math.round(chart.data.length * 0.4), Math.round(chart.data.length * 0.55));
    });

    // Create value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.baseValue = 0;

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.categoryX = "year";
    series.strokeWidth = 2;
    series.tensionX = 0.77;

    var range = valueAxis.createSeriesRange(series);
    range.value = 0;
    range.endValue = 1000;
    range.contents.stroke = am4core.color("#FF0000");
    range.contents.fill = range.contents.stroke;

    // Add scrollbar
    var scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    chart.cursor = new am4charts.XYCursor();

  }


  render() {
    return (
      <React.Fragment>
        <div className="line">


          <div className="linechartdiv"></div>
          <br></br>
          <br></br>
          <h3>Line chart</h3>
        </div>
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    data: state.mainReducer.linechartData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadlineChartData: loadlineChartData,
  }, dispatch)
}


export default connect(mapStateToProps,mapDispatchToProps)((LineChart));