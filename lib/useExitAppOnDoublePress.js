import {BackHandler, ToastAndroid} from "react-native";
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
    let condition = true;
    let message = "Press Again To Exit";
    let timeout = 2000;
    if(options){
        let condition = options.condition || true;
        let message = options.message ||  "Press Again To Exit";
        let timeout = options.timeout || 2000;
    }
    const[backPressed,setBackClickCount] = useState(0);
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    }, [backPressed]);

    function handleBackButton() {
        if(condition){
            if (backPressed > 0) {
                BackHandler.exitApp();
                setBackClickCount(0);
            } else {
                setBackClickCount(backPressed + 1);
                ToastAndroid.show(message, ToastAndroid.SHORT);
                setTimeout(() => {
                    setBackClickCount(0)
                }, timeout);
                return true;
            }
        }
        else
            return false
    }
}