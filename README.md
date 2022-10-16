# Time Capsule
![alt text](https://github.com/sachinmloecher/Sachacks-Project/blob/main/color%201.jpg?raw=true)


A serverless web application which allows you to capture audio in any moment, transcribe it to text, and find it later by searching for keywords. Record messages that you and your loved ones can reminisce on later.

Time Capsule records local audio, uploads it to Firestore, and then generates a transcript of the file using AssemblyAI speech recognition. Files can then be searched for using keywords. All using a serverless architecture.

#### App overview
##### Record page
The record page lets you record your audio using the device microphone, name it, and transcribe it using AssemblyAI speech recognition.
##### Explore/Search Page
The Explore Page displays all of the user's audio transcripts currently present. It has a scrollable library of the transcripts, recordings, titles, and dates, and a search bar to filter files based on entered keywords.

#### Inspiration
For many, mourning the loss of a loved one comes with the immense desire to preserve memories and mementos. Many will look to old letters, printed emails, and particularly to videos and recordings, which by their nature feel so alive and close to heart.

We recognize how our phones hold these cherished communications - and how our conversations are the digital proof of beloved bonds. From sweet sentiments to simple daily check-ins, inside jokes to “I love you’s", we understand the need to never lose those meaningful moments.

#### What it does
Time Capsule gives you comfort in knowing that these conversations can be saved forever. It lets stories, messages, and memories live on. Time Capsule allows you to record special moments, generate transcripts of conversations, and keep them easily accessible for you to revisit whenever you wish.

#### How we built it
We built Time Capsule using Svelte, Typescript, Firebase, Assembly AI, and Webspeech API. We decided to use a completely serverless architecture, and used Visual Studio Code Live Share to collaborate. Half of the team worked on the front end and half the team worked on backend functionality. Then we integrated the two in the UI and began testing.

#### Challenges we ran into
We ran into mostly authentication errors on the backend side of things, and had difficulty implementing our design ideas in the front end. It took a long time to get everything working as we envisioned it, and creating a simple, aesthetic UI was more difficult than we expected. Choosing free, functional APIs was also a hurdle we did not expect to run into.

#### Accomplishments that we're proud of
We are proud of all the features we implemented, and the overall design of the app. We think we did a great job with the accessibility of the app, by using a simple design and implementing voice commands.

#### What we learned
We learned many valuable web development and design skills over the course of this project, which we think will be very useful in the future. We gained experience in teamwork and collaboration, implementing and designing a useful product, firebase, and speech recognition APIs.

#### What's next for Time Capsule
In the future, we would like to implement features we did not have time for, such as Google/User Authentication, integration with home assistants like Siri and Alexa, Sentiment analysis of the transcripts, and a ‘favorites’ feature for audio files.
