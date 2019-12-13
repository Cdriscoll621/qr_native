import React from "react"
import { StyleSheet, Text, View, Image, Button } from "react-native"
import * as Google from "expo-google-app-auth"

const LoginPage = props => {
  return (
      <View>
        <Button title="Sign in with Google"
                onPress={() => props.signIn()} />
      </View>
  )
}

const LoggedInPage = props => {

  var tasks = [];
  for (var i = 0; i < props.tasks.length; i++) {
    tasks.push(<Text>{props.tasks[i].title}</Text>);
  }

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome: {props.name}</Text>
        <Image style={styles.image} source={{ uri: props.photoUrl }}/>

        {tasks}

      </View>
  )
}

export default class GoogleIntro extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: "",
      accessToken: "",
      userId: "",
      tasks: []
    };
  }

  loadTasks = async () => {
    let result = await fetch("https://www.googleapis.com/tasks/v1/users/@me/lists", {
      headers: new Headers({
        "Authorization": "Bearer " + this.state.accessToken
      })
    });
    let resultJson = await result.json();
    let items = resultJson.items;
    let taskItems = [];
    for (var i = 0; i < items.length; i++) {
      let uri = "https://www.googleapis.com/tasks/v1/lists/" + items[i].id + "/tasks?showCompleted=true&showHidden=true";
      let taskResults = await fetch(uri, {
        headers: new Headers({
          "Authorization": "Bearer " + this.state.accessToken
        })
      });
      let taskResultJson = await taskResults.json();
      taskItems = taskItems.concat(taskResultJson.items);
    }
    this.setState({
      tasks: taskItems
    });
  }

  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: "299625647719-vc8v07qmmttp9h6t5nopr23plhs51jdo.apps.googleusercontent.com",
        iosClientId: "299625647719-d2qjfekcffpg42nfjuu4itenrk8v8tk7.apps.googleusercontent.com",
        scopes: ["openid", "profile", "email", "https://www.googleapis.com/auth/tasks"]
      });

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl,
          accessToken: result.accessToken,
          userId: result.user.id
        });
        await this.loadTasks();
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }


  render() {
    return (

        <View style={styles.container}>
          {this.state.signedIn ? (
              <LoggedInPage
                  name={this.state.name}
                  photoUrl={this.state.photoUrl}
                  tasks={this.state.tasks} />
          ) : (
              <LoginPage signIn={this.signIn} />
          )}
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },

  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
