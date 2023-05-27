import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Button,
  Image,
  TouchableHighlight,
} from "react-native";
import { useState, useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import { soundsDB } from "../DB/soundsDB";
import { Audio } from "expo-av";
const Home = () => {
  const [sound, setSound] = useState();
  const [show, setShow] = useState(0);
  async function playSound(soundToPlay) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(soundToPlay, {
      volume: 1.0,
    });

    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  return (
    <SafeAreaView style={{ flex: 1, background: COLORS.primary }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium, marginTop: 20 }}></View>
        <View style={styles.navbar}>
          <TouchableHighlight
            onPress={() => {
              setShow(0);
            }}
          >
            <Image source={icons.music} style={{ width: 64, height: 64 }} />
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => {
              setShow(1);
            }}
          >
            <Image source={icons.musiceffects} />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              setShow(2);
            }}
          >
            <Image source={icons.mamic} />
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              if (sound) {
                sound.unloadAsync();
              }
            }}
          >
            <Image source={icons.stop} />
          </TouchableHighlight>
        </View>
        {show === 0 && (
          <ScrollView>
            <View style={styles.buttonContainer}>
              {soundsDB.songs.map((item, i) => {
                return (
                  <TouchableHighlight
                    style={styles.effectButton}
                    onPress={() => {
                      playSound(item.src);
                    }}
                    key={i + item.title}
                  >
                    <View>
                      <Text style={styles.textStyle}>{item.title}</Text>

                      <Image
                        source={icons.circle}
                        style={{
                          width: 120,
                          height: 120,
                          position: "absolute",
                          top: -40,
                          bottom: 0,
                          left: -10,
                          right: 0,
                          zIndex: -2,
                        }}
                      />
                    </View>
                  </TouchableHighlight>
                );
              })}
            </View>
          </ScrollView>
        )}
        {show === 1 && (
          <View style={styles.buttonContainer}>
            {soundsDB.effects.map((item, i) => {
              return (
                <TouchableHighlight
                  style={styles.effectButton}
                  onPress={() => {
                    playSound(item.src);
                  }}
                  key={i + item.title}
                >
                  <View>
                    <Text style={styles.textStyle}>{item.title}</Text>

                    <Image
                      source={icons.circle}
                      style={{
                        width: 120,
                        height: 120,
                        position: "absolute",
                        top: -40,
                        bottom: 0,
                        left: -10,
                        right: 0,
                        zIndex: -2,
                      }}
                    />
                  </View>
                </TouchableHighlight>
              );
            })}
          </View>
        )}
        {show === 2 && (
          <View style={styles.buttonContainer}>
            {soundsDB.voice.map((item, i) => {
              return (
                <TouchableHighlight
                  style={styles.effectButton}
                  onPress={() => {
                    playSound(item.src);
                  }}
                  key={i + item.title}
                >
                  <View>
                    <Text style={styles.textStyle}>{item.title}</Text>

                    <Image
                      source={icons.circle}
                      style={{
                        width: 120,
                        height: 120,
                        position: "absolute",
                        top: -40,
                        bottom: 0,
                        left: -10,
                        right: 0,
                        zIndex: -2,
                      }}
                    />
                  </View>
                </TouchableHighlight>
              );
            })}
          </View>
        )}
        <Image source={images.shavar} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  buttonImg: {
    position: "absolute",
    top: -40,
    left: -10,
    zIndex: -1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
  },
  navbar: {
    width: "100%",
    marginBottom: 35,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    gap: 10,
    flexWrap: "wrap",
  },
  textStyle: {
    color: "black",
    fontSize: 19,
    backgroundColor: "rgba(255,255,255,.6)",
    width: 100,
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
  },
  effectButton: {
    width: 100,
    height: 100,
    padding: 10,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    position: "relative",
  },
  pijeButton: {
    width: 200,
    height: 200,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
});
