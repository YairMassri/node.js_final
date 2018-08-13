# node.js_final

Create a TODO list in ExpressJS

The website should require you to login using a combination of email and password, and then display a list of your TODO items. 

If the list is empty, you should see a message asking you to add your first item. 

Each item on the list should provide a delete option, and you should be able to add new items to the list.

Each user should have its own list of items, so when I login, my list should be different than the list for other users. 

The user and its items should be stored on a database. 

You should be able to create new users by passing name, email and password. 

Emails should be validated, and passwords should be at least six characters long and stored as a hash.

The app should be done using ExpressJS. 

The code must be posted to your github and the TODO list must be running at your own private server. 

Submit both the link to github and the link to your app running on your private server.


Build a Github Issues Page

Make a simple version of Github’s Issues page. Here's an example: https://github.com/facebook/create-react-app/issues . 

To keep the scope small, just focus on implementing the list of issues, and ignore the stuff in the header (search, filtering, stars, etc).

You must fetch open issues from Github’s API and display them in a list. Do not use static data for this app.

Then add a pagination control to allow navigating through the entire list of issues. 

You might find it useful to add React Router too, so that you can navigate directly to a given page.

For added difficulty (optional), implement the issue detail page too. 

Render the issue’s Markdown text and its comments using something like react-markdown.
