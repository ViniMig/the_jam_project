import React from 'react';
import { Animated, StyleSheet, I18nManager, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { RectButton, Swipeable } from 'react-native-gesture-handler';

const AnimatedView = Animated.createAnimatedComponent(View);

const renderRightView = (_progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>, onClick: any) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <RectButton style={styles.rightAction} onPress={onClick}>
        <AnimatedView style={ { transform: [{ scale }] }}>
            <FontAwesome
            size={28}
            style={{ marginBottom: -3, marginRight: 20 }}
            name="trash"
            />
        </AnimatedView>
      </RectButton>
    );
};

const CustomSwipeableRow = ({children, onClick}: {children: React.ReactNode, onClick: any}) => {
    return (
      <Swipeable
        friction={2}
        rightThreshold={50}
        renderRightActions={(progress, dragX) => renderRightView(progress, dragX, onClick)}>
            {children}
      </Swipeable>
    );
}

const styles = StyleSheet.create({
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
    backgroundColor: 'plum',
    height: 20,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'flex-end',
    maxWidth: '40%',
  },
});

export default CustomSwipeableRow;