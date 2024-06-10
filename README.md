# Blackbullion Tech Test

A library style screen to display the different learning pathways available to users. There is a filtering feature to filter by assessment.

Created using:

- React Native with the Expo framework
- React Query & axios
- react-native-super-grid

Time spent: 4 - 5 hours spread over a couple of days. Longer than I might typically spend on a tech test but as I've not done mobile dev before I had a bunch of reading to do to get up to speed. I've been meaning to try React native too so it was a fun little project.

## To start the project

- run `npm i` to install dependencies
- then `npm start` to start the Metro bundler
- from here the project can be launched on web / ios / android (assuming, as expo is mentioned in the job ad, that the ios / android dependencies are already installed)
- `npm test` for tests

## If I had more time / If this was a production app:

- I would improve the ellipsis on the intro text as they don't always work. The relevant prop for Text seems to be numberOfLines, but I didn't have time to find a way to account for the title sometimes being more than 1 line long which reduces the amount of lines available to the intro.

- I would flesh out the the different states i.e show some kind of spinner / loader when isPathwaysLoading is true, and add more robust error handling with meaningful messages.

- I don't think I fully utilised themes and I ignored light mode / dark mode in favour of focusing on a forced dark mode theme for brevity. I'd use more time to read up on themes. In a production app I'd be tempted to use a css framework which is a common thing in web dev but I see some sentiment against using one for mobile dev when i google around it.

- In a production app I'd lean towards using a component library rather than building my own ones.

- As for testing I only did some basic unit / integration / snapshot tests, in a production app I'd also add E2E tests and utilise MSW. The tests would look quite different with MSW (which is what I'm used to using but didn't have time to set up), so tests written like this is not something i'd expect to see in a production app. I also couldn't nail down why a worker was hanging.

- I'd add more filters, it would be fairly straightforward to filter by duration. A search bar would also be useful.

- In terms of design the cards could probably be a bit smaller with a smaller image so that more fit on the screen. I'm used to designing for the web where there's more space, with more time I'd likely change them a fair amount. I didn't get a chance to spend any time on styling the drawer menu.
