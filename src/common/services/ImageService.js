import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

class ImageService {
    autoHeightOnLayoutCallback(image, callback) {
        let source = resolveAssetSource(image);
        let proportion = source.height / source.width;

        return onLayoutCallback;

        function onLayoutCallback(event) {
            let width = event.nativeEvent.layout.width;
            let newHeight = width * proportion;
            callback({
                autoHeight: newHeight,
            })
        }
    }
}

export default new ImageService();
