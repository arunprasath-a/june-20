import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadbarChartData } from "../../store/actions/actions";
import EnhancedComponent from "../HOC/index";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);


class BarChart extends React.Component {


  componentDidMount() {
    
    this.props.loadbarChartData();

  }

  componentDidUpdate() {
    var chart = am4core.create("Barchartdiv", am4charts.XYChart);


    chart.data = this.props.data.data;

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
      if (target.dataItem && target.dataItem.index & 2 == 2) {
        return dy + 25;
      }
      return dy;
    });

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.name = "Visits";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;

    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
  }



  render() {
    console.log(this.props.data);
    
    return (
      <React.Fragment>

        <div className="bar">

          <div className="Barchartdiv"></div>
          <br></br>
          <br></br>
          <h3>bar chart</h3>
        </div>
      </React.Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    data: state.mainReducer.barchartData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadbarChartData: loadbarChartData,
  }, dispatch)
}



export default connect(mapStateToProps,mapDispatchToProps)((BarChart));