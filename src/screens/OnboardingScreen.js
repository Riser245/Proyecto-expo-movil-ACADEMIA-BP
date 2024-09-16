import React from 'react';
import {
    SafeAreaView,
    Image,
    StyleSheet,
    FlatList,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const COLORS = { primary: '#282534', white: '#fff', black: 'black' };

const slides = [
    {
        id: '1',
        image: require('../imagenes/equipo.png'),
        title: '¡Acabas de ingresar a la app de La Academia BP!',
        subtitle: 'Bienvenido, usuario. Descubre todo lo relacionado a nuestros productos.',
    },
    {
        id: '2',
        image: require('../imagenes/equipo.png'),
        title: 'Esperamos que tengas una buena experiencia',
        subtitle: 'Y puedas adquirir los productos que más te gusten y te identifiquen con nosotros.',
    },
];

const Slide = ({ item }) => {
    return (
        <View style={styles.slideContainer}>
            <Image
                source={item?.image}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item?.title}</Text>
                <Text style={styles.description}>{item?.subtitle}</Text>
            </View>
        </View>
    );
};

const OnboardingScreen = ({ navigation }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const ref = React.useRef();
    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    const goToNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex != slides.length) {
            const offset = nextSlideIndex * width;
            ref?.current.scrollToOffset({ offset });
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    };

    const Footer = () => {
        return (
            <View style={styles.footerContainer}>
                <View style={styles.indicatorContainer}>
                    {slides.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.indicator,
                                currentSlideIndex == index && {
                                    backgroundColor: COLORS.black,
                                    width: 25,
                                },
                            ]}
                        />
                    ))}
                </View>

                <View style={{ marginBottom: 30 }}>
                    {currentSlideIndex == slides.length - 1 ? (
                        <View style={{ height: 50 }}>
                            <TouchableOpacity
                                style={styles.btn}
                                onPress={() => navigation.replace('Login')}>
                                <Text style={styles.btnText}>
                                    Siguiente
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: 15 }} />
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={goToNextSlide}
                                style={styles.btn}>
                                <Text style={styles.btnText}>
                                    Siguiente
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar backgroundColor={COLORS.white} />
            <FlatList
                ref={ref}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                contentContainerStyle={{ height: height * 0.85 }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={slides}
                pagingEnabled
                renderItem={({ item }) => <Slide item={item} />}
            />
            <Footer />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    slideContainer: {
        alignItems: 'center',
        width,
    },
    textContainer: {
        position: 'absolute',
        bottom: 140,
        width: '80%',
        alignItems: 'center',
    },
    description: {
        color: COLORS.black,
        fontSize: 13,
        marginTop: 1,
        textAlign: 'center',
        lineHeight: 23,
    },
    title: {
        color: COLORS.black,
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    image: {
        height: '60%', // Reducir la altura de la imagen para dar más espacio a los textos
        width: '100%',
        resizeMode: 'contain',
    },
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
    },
    indicator: {
        height: 2.0,
        width: 20,
        backgroundColor: 'grey',
        marginHorizontal: 3,
        borderRadius: 2,
    },
    btn: {
        flex: 1,
        height: 50,
        borderRadius: 5,
        backgroundColor: '#040457',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: COLORS.white,
    },
    footerContainer: {
        height: height * 0.15,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
    },
});

export default OnboardingScreen;
