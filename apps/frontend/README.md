It is the extension's frontend, meaning it is a user(developer) facing application of the Recoil debugger. <br/>
The frontend receives formatted data from the NPM package and visualize the data. <br/>
In order to obtain the data from the client application, it needs to talk to the NPM package that's installed on the user's application. <br/>
Although the frontend only talks to the background script, the background script handles messaging between the extension's frontend and the NPM package.
