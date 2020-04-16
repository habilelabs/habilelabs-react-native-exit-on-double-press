import {BackHandler, ToastAndroid} from "react-native";
import {useEffect,useState} from "react";
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';

/**
 * Handle exit on double press hardware back button
 * sample uses
 * options={
        condition: true;
        message: "Press Again To Exit";
        timeout: 2000;
 * }
 * @param props
 */
export function useExitAppOnDoublePress(options) {
    const[backPressed,setBackClickCount] = useState(0);
    const message = options && options.message? options.message : "Press Again To Exit";
    const timeout = options && options.timeout? options.timeout : 2000;
    const isFocused = useIsFocused();
    useEffect(() => {
        if(isFocused){
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        }
        return ()=>{
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        }
    }, [isFocused, backPressed]);
    const [timeoutObj, setTimeoutObj] = useState();

    useEffect(()=>{
       return ()=>{
           clearTimeout(timeoutObj);
       }
    });
    function handleBackButton() {
        if (backPressed > 0) {
            BackHandler.exitApp();
            setBackClickCount(0);
        } else {
            setBackClickCount(backPressed + 1);
            ToastAndroid.show(message, ToastAndroid.SHORT);
            setTimeoutObj(setTimeout(() => {
                setBackClickCount(0)
            }, timeout));
            return true;
        }
    }
}