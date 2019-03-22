export default class BarcodeScannerExample extends React.Component {

  

    state = {
      hasCameraPermission: null,
    }
  
    async componentDidMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasCameraPermission: status === 'granted' });
      }
  
    render() {
      const { hasCameraPermission } = this.state;
  
      if (hasCameraPermission === null) {
        return <Text>Requesting for camera permission</Text>;
      }
      if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      }
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeScanned={this.handleBarCodeScanned}
            style={StyleSheet.absoluteFill}
          />
  
  
        <Button
            containerStyle={{ padding:10, height:45, overflow:'hidden', borderRadius:4, marginTop: 620, backgroundColor: 'white'}}
            disabledContainerStyle={{backgroundColor: 'grey'}}
            style={{fontSize: 20, color: 'pink'}}>
            Press me!
          </Button>
  
  
        </View>
      );
    }
  
    handleBarCodeScanned = ({ type, data }) => {
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    }
  }