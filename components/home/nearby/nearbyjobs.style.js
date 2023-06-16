import { StyleSheet } from 'react-native';

import { COLORS, FONT, SIZES,Darkmode } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.small,
  },
  headerTitle:(darkmode)=>( {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color:darkmode? Darkmode.gray2:COLORS.primary,
  }),
  headerBtn:(darkmode)=>( {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color:darkmode? Darkmode.gray2:COLORS.primary,
  }),
  cardsContainer: {
    marginTop: SIZES.xxLarge,
    marginBottom: SIZES.xxLarge,
    scrollbar: {
      display: 'none'
    },
    backgroundColor:COLORS.two,
    width:'100%',
    padding:0,
    gap:0

  },
});

export default styles;
