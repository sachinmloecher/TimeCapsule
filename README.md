# Time Capsule
![alt text](https://github.com/sachinmloecher/Sachacks-Project/blob/main/color 1.jpg?raw=true)


A serverless web application which allows you to capture audio in any moment, transcribe it to text, and find it later by searching for keywords. Record messages that you and your loved ones can reminisce on later.

Time Capsule records local audio, uploads it to Firestore, and then generates a transcript of the file using AssemblyAI speech recognition. Files can then be searched for using keywords. All using a serverless architecture.

#### App overview
##### Record page
The record page lets you record your audio using the device microphone, name it, and transcribe it using AssemblyAI speech recognition.
##### Explore/Search Page
The Explore Page displays all of the user's audio transcripts currently present. It has a scrollable library of the transcripts, recordings, titles, and dates, and a search bar to filter files based on entered keywords.
