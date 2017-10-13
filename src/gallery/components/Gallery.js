import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {Card} from "react-native-elements";
import autobind from 'class-autobind';

import colors from "../../colors";

import galleryService from '../services/GalleryService'

class Gallery extends Component {
    constructor() {
        super();
        autobind(this);

        this.state = {
            loading: true,
            gallery: [],
        };

        galleryService.list()
            .then((gallery) => this.setState({gallery, loading: false}))
    }

    render() {
        return this.state.loading
            ? (
                <View style={{flex: 1}}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <ActivityIndicator
                                color={colors.orangeDarken}
                                size={'large'}
                            />
                        </View>
                    </View>
                </View>
            )
            : (
                <View style={styles.cardsWrappers}>
                    {
                        this.state.gallery.map((item, index) => (
                            <Card
                                key={`gallery-item-${index}`}
                                containerStyle={styles.cardContainer}
                                image={item.imagem}>
                                <Text>
                                    {item.nomeAcao}
                                </Text>
                                <Text style={styles.cardResponsibleName}>
                                    {item.nomeResponsavel}
                                </Text>
                            </Card>
                        ))
                    }
                </View>
            )
    }
}

const styles = StyleSheet.create({
    cardsWrappers: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    cardContainer: {
        width: '45%',
        marginLeft: 0,
        marginRight: 0,
    },
    cardResponsibleName: {
        fontSize: 12,
        color: "#8f8a8f",
    },
});

export default Gallery;
