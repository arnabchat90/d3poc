import React, { PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ART,
    LayoutAnimation,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';

const {
    Surface,
    Group,
    Shape
} = ART;

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';
import Theme from './theme';

const d3 = {
    shape,
    scale
};

import {
    scaleBand,
    scaleLinear
} from 'd3-scale';

//change it to proptypes later
// type Props = {
//   height: number,
//   width: number,
//   pieWidth: number,
//   pieHeight: number,
//   colors: any,
//   onItemSelected: any
// };

class LineChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linePath: "",
            xAxisData: []
        }
        this._value = this._value.bind(this);
        this._label = this._label.bind(this);
        this._color = this._color.bind(this);
        this._createLinePath = this._createLinePath.bind(this);
    }
    _createLinePath(points) {
        const y = d3.scale.scaleLinear()
            // Set our domain, which is our input data, which is our test scores,
            // which can be between 0 and 100.
            .domain([0, 100])
            // Set our range, which is our output data, which is the height of our
            // screen, which is 300 pixels.
            .range([0, 200]);

        const x = d3.scale.scaleLinear()
            // Set our domain, which is our input data, which is our test scores,
            // which can be between 1992 and 2016.
            .domain([1992, 2016])
            // Set our range, which is our output data, which is the width of our
            // screen, which is 300 pixels.
            .range([0, 350]);

        if (points.length > 0) {
            var lineGenerator = d3.shape.line()
                .x(function (d) { return x(d.year); })
                .y(function (d) { return y(d.value); })
                .curve(d3.shape.curveCardinal);
            var tempXdata = [];
            points.map((data) => {
                tempXdata.push(data.year);
            });

            this.setState({
                linePath: lineGenerator(points),
                xAxisData: tempXdata
            });

        }


    }
    componentWillMount() {
        this._createLinePath(this.props.data);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.length != this.props.length) {
            this._createLinePath(nextProps.data);
        }
    }
    _value(item) { return item.number; }

    _label(item) { return item.name; }

    _color(index) { return Theme.colors[index]; }

    render() {
        const margin = styles.container.margin;
        const x = this.props.barWidth / 2 + margin;
        const y = this.props.barHeight / 2 + margin;

        return (

            <View width={this.props.width} height={this.props.height}>
                <Surface width={this.props.width} height={this.props.height}>
                    <Shape
                        d={this.state.linePath}
                        stroke="#000"
                        strokeWidth={1}
                    />

                </Surface>
                {/* <View key={'xData'}>
                    {this.state.xAxisData.map((data, index) => {
                        return (
                            <Text key={index} style={[styles.labelX]}>
                                {data}
                            </Text>
                        );
                    })}
                </View> */}
            </View>

        );
    }

}

LineChart.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    barWidth: PropTypes.number,
    barHeight: PropTypes.number,
    colors: PropTypes.any,
};

const styles = {
    container: {
        margin: 20,
    },
    labelX: {
        position: 'absolute',
        bottom : 0,
        fontSize: 12,
        textAlign: 'center',
    },
    label: {
        fontSize: 15,
        marginTop: 5,
        fontWeight: 'normal',
    }
};



export default LineChart;
