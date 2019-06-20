import React from 'react';
import EnhancedComponent from "./HOC/index";
import AmChartsComponent from "./aMchartsPage";

const ChartComp =EnhancedComponent(AmChartsComponent)



class LandingChart extends React.Component {

    render() {

        return (
            <React.Fragment >
               <ChartComp/>
            </React.Fragment>
        )
    }
}



export default (LandingChart);


