import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

interface CalendlyViewProps {
    url: string;
}

const CalendlyView: React.FC<CalendlyViewProps> = ({ url }) => {
    const injectedJavaScript = `
    window.onload = function() {
      var style = document.createElement('style');
      style.textContent = 'body { background-color: transparent; }';
      document.head.appendChild(style);
    }
  `;

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: url }}
                style={styles.webview}
                injectedJavaScript={injectedJavaScript}
                onMessage={(event: any) => {
                    console.log('Received message from Calendly:', event.nativeEvent.data);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
});

export default CalendlyView;