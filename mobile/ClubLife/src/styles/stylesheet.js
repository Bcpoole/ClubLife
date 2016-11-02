import {StyleSheet} from 'react-native';
import homepage from 'homepage';

export default styles = StyleSheet.create(
    Object.assign({}, //merge a bunch of objects together, assuming we have different stylesheet files for different purproses
        homepage //, otherStyles, otherotherstyles, etc.
    )
);
