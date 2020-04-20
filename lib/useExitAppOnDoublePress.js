import {BackHandler, ToastAndroid, Platform} from "react-native";
import {useEffect,useState} from "react";

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
    const condition = options && options.condition ? options.condition : false;
    useEffect(() => {
        if(options.condition && Platform.OS === 'android' ){
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        }
        return ()=>{
            if (Platform.OS === 'android'){
                BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
            }
        }
    }, [condition, backPressed]);
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