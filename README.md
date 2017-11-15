# Full-Stack Technical Test

The goal of this test is to evaluate your ability to architecture a small full-stack app.

## Instructions

The app is comprised of 2 parts:

- the backend, responsible for:
  - handling the HTTP routing;
  - storing items in a database;
  - indexing items in an Algolia index when they change;

- and the JS frontend, responsible for displaying two pages:
  - one displaying a search page;
  - one displaying a form to add records to the index.

The app you need to build is a small **Movies DB admin page**. The initial import dataset can be found here: [movies.json](https://gist.github.com/alexandremeunier/49533eebe2ec93b14d32b2333272f9f8).

### Backend

Build a minimal application using technologies you are most confortable with (e.g. Rails, Node). Should you use Rails, you can use the [algoliasearch-rails](https://github.com/algolia/algoliasearch-rails) integration.

The app needs to implement the following endpoints:

  - `GET /` => Render an HTML page displaying the JS frontend app;
  - `POST /api/1/movies` => Add a movie (as a JSON object) to the DB and return its `id`;
  - `DELETE /api/1/movies/:id` => Delete a amovie from the DB.

The items should be indexed in Algolia.

### Frontend

Build a minimal React SPA that can be used to search for, delete, and add new movies along with the [Algolia JS client](https://github.com/algolia/algoliasearch-client-js). Remember, you might not need Redux :).

- the search page needs to:
  - display a searchbox to search in the movies using Algolia;
  - show the results as a list or table;
  - it should be possible to delete any item in the results using the Backend API;

- the form page needs to:
  - display a form to create a new item;
  - validates that the data has the correct format;
  - use the Backend API to add the item to the DB and Algolia.

## Evaluation Criteria

Please push your code to a public GitHub repository. We'll assess the following in priority:

- the quality of the code;
- the UI & UX of the frontend app;
- the architecture of the backend app.


Good luck!
