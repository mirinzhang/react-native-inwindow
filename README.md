# react-native-inwindow

Detects if a element is inside a ScrollView or a ListView and reports back

### Install

```bash
npm i -S react-native-inwindow
```

### Usage

```javascript
import { ScrollView, View, Text } from 'react-native';
import InWindow from 'react-native-inwindow';

onViewChange = (isVisible) => {
    if(isVisible) {
        console.log('component is inside window');
    }
}

render() {
    return (
        <ScrollView style={{flex: 1}}>
            <InWindow
                duration={100} // default is 100
                active={true} // defautt is true
                onChange={this.onViewChange}>
                <View style={{flex: 1, height: 40, borderColot: '#f0f', borderColor: 1}}>
                    <Text>react-native-inwindow</Text>
                </View>
            </InWindow>
        </ScrollView>
    );
}
```
