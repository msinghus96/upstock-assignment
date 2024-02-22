import React, {useMemo, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

const SummaryItem = props => {
  const {title, value} = props;
  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryTitle}>{title}</Text>
      <Text>{`₹${Number(value).toFixed(2)}`}</Text>
    </View>
  );
};

const HoldingSummary = props => {
  const {data} = props;
  const [expanded, setExpanded] = useState(true);

  const summary = useMemo(() => {
    if (!data) {
      return;
    }

    let currentValue = 0;
    let totalInvested = 0;
    let todayProfitAndLoss = 0;
    let profitAndLoss = 0;
    for (let item of data) {
      currentValue += item.currentValue;
      totalInvested += item.investedValue;
      todayProfitAndLoss += item.todaysProfit;
      profitAndLoss += item.profileAndLoss;
    }
    return {
      currentValue,
      totalInvested,
      todayProfitAndLoss,
      profitAndLoss,
    };
  }, [data]);

  if (!summary) {
    return;
  }

  const getExpanded = () => {
    if (expanded) {
      return (
        <View style={styles.expandedContainer}>
          <SummaryItem title="Current Value: " value={summary?.currentValue} />
          <SummaryItem
            title="Total Investment: "
            value={summary?.totalInvested}
          />
          <SummaryItem
            title="Today's Profit & Loss:"
            value={summary?.todayProfitAndLoss}
          />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setExpanded(oldState => !oldState);
        }}
        style={expanded ? styles.arrowDown : styles.arrowUp}
      />
      {getExpanded()}
      <SummaryItem title="Profit & Loss: " value={summary?.profitAndLoss} />
    </View>
  );
};

const styles = StyleSheet.create({
  arrowUp: {
    borderTopWidth: 0,
    borderRightWidth: 8,
    borderBottomWidth: 14,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'blue',
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    alignSelf: 'center',
  },
  arrowDown: {
    borderTopWidth: 14,
    borderRightWidth: 8,
    borderBottomWidth: 0,
    borderLeftWidth: 8,
    borderTopColor: 'blue',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    alignSelf: 'center',
  },
  container: {paddingVertical: 2},
  expandedContainer: {marginBottom: 25},
  summaryContainer: {
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 10,
  },
  summaryTitle: {fontWeight: 'bold'},
});

export default HoldingSummary;
