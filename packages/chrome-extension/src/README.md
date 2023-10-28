The background script is a service worker runs along with the client application,
and it handles messaging between the client application and the extension's frontend application.

The content script has access to the window object the the client application.
So whenever the background script and the extension's frontend need data from the client application,
they should send an event(message) to the client application's window object through the content-script.
