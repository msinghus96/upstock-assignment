import React, {Fragment, useMemo} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Header from './Components.tsx/Header';
import {useFetch} from './ApiUtils';
import HoldingListItem from './Components.tsx/HoldingListItem';
import HoldingSummary from './Components.tsx/HoldingSummary';
import ErrorHandler from './Components.tsx/ErrorHandler';
import FullScreenLoader from './Components.tsx/FullScreenLoader';

const HoldingScreenBody = props => {
  const {data} = props;
  if (!data) {
    return;
  }
  return (
    <Fragment>
      <FlatList
        contentContainerStyle={styles.listContentContainer}
        style={styles.listContainer}
        data={data || []}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}) => <HoldingListItem {...item} />}
        ItemSeparatorComponent={<View style={styles.separator} />}
      />
      <View style={styles.componentDivider} />
      <HoldingSummary data={data} />
    </Fragment>
  );
};

function HoldingScreen(): React.JSX.Element {
  const [loading, data, error, refetch] = useFetch({
    url: 'https://run.mocky.io/v3/bde7230e-bc91-43bc-901d-c79d008bddc8',
  });

  const stockListData = useMemo(() => {
    if (!data) {
      return;
    }
    const list = data.userHolding?.map(item => {
      const currentValue = item.ltp * item.quantity;
      const investedValue = item.avgPrice * item.quantity;
      const todaysProfit = (item.close - item.ltp) * item.quantity;
      return {
        ...item,
        currentValue,
        investedValue,
        todaysProfit,
        profileAndLoss: currentValue - investedValue,
      };
    });
    return list;
  }, [data]);

  return (
    <View style={styles.container}>
      <Header title="Upstock Holding" />
      <FullScreenLoader loading={loading} />
      <ErrorHandler error={error} refetch={refetch} />
      <HoldingScreenBody data={stockListData} />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  separator: {
    width: '85%',
    alignSelf: 'center',
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginVertical: 15,
  },
  listContentContainer: {
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  listContainer: {
    backgroundColor: 'rgb(195,195,200)',
  },
  componentDivider: {height: 1, backgroundColor: 'rgb(195,195,200)'},
});

export default HoldingScreen;
