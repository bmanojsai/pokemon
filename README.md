# pokemon


Hello Everyone! This is Manoj. Here you can know all the info about the app.

This is a very low level pokemon app written in React native with Typescript where one can login and browse through various pokemons and get to know their details.

-----------------------
Login Functionality:

At first an unregistered user needs to signup in the signup page using Name, Email and Password. Upon successfull signup , user is directed to Login page where he can login with the registered credentials and use the app.

The users details (Name, Email and Password) are stored in Async Storage for now and hence once the app is reinstalled or its data cleared the user needs to signup again to use the app.

This app also rememberes the logged user details in Async storage , so if any logged in user closes app and reopens the app, he is still logged in. In other words, one is no need to login every time they reopen the app.

------------------------
After Login: 

Home Screen:

On successfull login, user is directed to Home screen where 20 pokemon cards will be shown(issue is created to increse the no. of pokemon cards once the user reached the end). The colour of cards is randomly selected from an group of colours every time user logs in or reopens the app(provided he is still logged in).

The cards are animated to come from bottom of screen to top using the 'react-native-reanimated' library. Also letting the user they are scrollable. 

The Home screen also provides Search Functionality where one can search for the pokemon they wanted to know and it will show the pokemons whose name conatins the searched text. This Search is implemented using Debounce search where a search will be happening only after user stops typing for a couple of milliseconds. This will in turn increase the effencieny of the app as well as the user experience.

Details Screen:

On clicking any of the shown pokemons, the user will be directed to Detials page, where some details of the selected pokemon will be shown in a attractive way. again the card colour will be sent to details page to make it as the main colour there. 

One can logout by coming back to Home screen and clicking the logout icon on top right.

-------------------------

Technical Detials:

- This app uses Redux as a global state management system.
- this redux store is configured using the redux toolkit and slice architecture.
- Saga middleware is used for making api calls to the pokeapi endpoint to get the pokemon details.
- A couple of test cases are also written for few pages inorder to test the functionality of the app.
- Async storage is used for storing the registered user details.
- 'react-native-chart-kit' is being used for showing the selected pokemon details in the form of bar graph and progress chart.
- ToastAndroid is used for sowing pop up notifications upon successdull login or any errors.


Few pics of the app are attached.

![openScreen](https://user-images.githubusercontent.com/63059012/200234015-9894a04b-592e-48cc-84bb-e1db212d8b92.png)
![signupScreen](https://user-images.githubusercontent.com/63059012/200234091-ab13b05d-0871-49b9-8977-5f77fd65f141.png)
![loginScreen](https://user-images.githubusercontent.com/63059012/200234124-ac495277-b7e7-405e-b84b-5afad868adda.png)
![homeScreen](https://user-images.githubusercontent.com/63059012/200234136-9efb1abd-4c65-4fc4-91d9-34c5ee5c255f.png)
![detailsScreen](https://user-images.githubusercontent.com/63059012/200234158-cd5c3690-86b7-4901-ae81-40f426824530.png)





Thank You
 

