> Please read this documentation before you start implementation

## Project Structure :spiral_notepad:

### :open_file_folder: `public` \
This folder contain the static files. 
* `index.html` :page_facing_up:
* `favicon.ico` :page_facing_up:
* `assets` :file_folder:
> When you want to add images to the application, please add those imagest to the `/assets/` :file_folder:. To import the images, please use following format. Do not import images as file into the React components.

E.g.: Import MS Club logo to the image tag. \
`<img src="/assets/ms-club-logo.png" alt="logo" />`

### :open_file_folder: `src` \
This folder contain all the React components and pages that are renderd to the browser. The `src` :open_file_folder: include,
* :file_folder: `api` - Implement all the API calling in this folder
* :file_folder: `assets` - This folder contains fonts and images (Static)
* :file_folder: `components` - Implement UI components in this folder.
* :file_folder: `constants` - Declare all the constants in this folder's `index.ts` file.
* :file_folder: `data` - Add all the data files (`.json`) files to this folder.
* :file_folder: `interfaces` - Declare all the component interfaces in this folder.
* :file_folder: `pages` - Contains main pages in the application.
* :file_folder: `routes` - Declare page routes in this folder.
* :file_folder: `styles` - Implement style files in this folder and then import that files into the `App.scss` file.
* :page_facing_up: `App.tsx` 
* :page_facing_up: `index.tsx`
* :page_facing_up: `reportWebVitals.ts` 
* :page_facing_up: `setupTests.ts` 

## IMPORTANT NOTES :pencil2:
### Install Dependencies
Please you `yarn` to install the dependencies to the application. \
Example: Install `axios` to the application. \
`$ yarn add axios` \
Or if you want to install all the dependencies, use this command. \
`$ yarn install`

### Start the Application
Use following command to start the application. \
`$ yarn start`

### Implement UI Components
When you start implement a UI component, create a folder by using the name of the component. Then create an `index.tsx` :page_facing_up: to implement the UI logic. Please go through the following example. 
> Implement a `card` component. (This example already there in the codebase. Please take a :eyes:). The same steps are applied to the `pages` implementation.
1. Create a folder called `card` inside the `components` :open_file_folder:
2. Create an `index.tsx` file inside the `card` folder.
3. Implement your UI.
4. Export that component as default.
5. Go to the `/components/index.tsx` file.
6. Import the `Card` component to the file.
7. Add that `Card` component to the `export` section.
