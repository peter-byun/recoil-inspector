The Chrome extension consists of two parts.<br/>

One is the background script is a service worker runs along with the client application, <br/>
and it handles messaging between the client application and the extension's frontend application. <br/>
<br/>

And the last is one the content script has access to the window object the the client application. <br/>
So whenever the background script and the extension's frontend need data from the client application, <br/>
they should send an event(message) to the client application's window object through the content-script.
