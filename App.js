import React from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Pie from './components/Pie';
import LineChart from './components/LineChart';
import Theme from './components/theme';
import data from './resources/data';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      spendingsPerYear: data.spendingsPerYear,
    };
    this._onPieItemSelected = this._onPieItemSelected.bind(this);
    this._shuffle = this._shuffle.bind(this);
  }
  _onPieItemSelected(newIndex) {
    this.setState({ ...this.state, activeIndex: newIndex, spendingsPerYear: this._shuffle(data.spendingsPerYear) });
  }

  _shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  }
  render() {
    const height = 200;
    const width = 500;
    return (
      <ScrollView>
        <View style={styles.container} >
          <Text style={styles.chart_title}>Spending Trend Per Year</Text>
            <LineChart
            barWidth={150}
            barHeight={150}
            colors={Theme.colors}
            width={width}
            height={height}
            data={data.spendingsPerYear} />
          <Text style={styles.chart_title}>Distribution of spending this month</Text>
          <Pie
            pieWidth={150}
            pieHeight={150}
            onItemSelected={this._onPieItemSelected}
            colors={Theme.colors}
            width={width}
            height={height}
            data={data.spendingsLastMonth} />
        </View>
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'whitesmoke',
    marginTop: 21,
  },
  chart_title : {
    paddingTop: 15,
    textAlign: 'center',
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 18,
    backgroundColor:'white',
    color: 'grey',
    fontWeight:'bold',
  }
});
