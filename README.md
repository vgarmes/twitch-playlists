# Twitcher

This is an app to make a playlist consisting of Twitch videos, specially useful for users that want to watch past streams since the official web app doesn't provide such functionality.

The app is done in React JS and uses `localStorage` to save the playlist on the client side.

## Installation

In the project directory, run:

### `npm install && npm start`

## Instructions

In order to add a video to the playlist, paste URL inside the form with a format similar to:

`https://www.twitch.tv/videos/123456789`

The app will parse the URL and return an error message if it is not valid. Otherwise, another form will be displayed that lets the user write a title to the video that is about to be added to the playlist.

Press Submit and the video will be added to the playlist.

Click on the video title to play it.

Videos can be removed and edited (the title). The whole playlist can also be cleared.
