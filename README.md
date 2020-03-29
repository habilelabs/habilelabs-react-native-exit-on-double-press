# `react-native-exit-on-double-press`

> Custom hook that can be used to exit the app on double press. It uses small toaster inside. This will work only on android. 


## Usage

```
import {useExitAppOnDoublePress} from "@shankarmorwal/react-native-exit-on-double-press";
```

then use it like this 


```
useExitAppOnDoublePress({
        condition: true;
        message: "Press Again To Exit";
        timeout: 2000;
     });
```

This hook currently uses this options. 
>Condition: By default this is set to true. you can pass some custom condition. When this is false then this hook will not work. 

> message: It is custom message on first exit press

> timeout: It is by default set to 2000 milli seconds. It will the duration between two double press to exit the app.   