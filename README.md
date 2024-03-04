<div align="center">
<h1> BONDADOSA CODE CHALLANGE </h1>
Shop all your grocery needs online.
  <br>
  
[VIEW THE DEPLOYED SITE HERE](https://bondadosa-code-challenge.vercel.app/)

<br>
</div>

# Built With:

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" /> 
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /> 
  <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" />

</div>




# Abstract: 
This is a virtual grocery store that fetches information from the Edamam Food Database API. This web app allows users to search for products, add them to their cart, and purchase the items! The app uses search params so that users can easily share their search with others. Users are able to change the quantity of a certain item in their cart, or remove it altogether. To account for users being able to view a confirmation of their orders even after navigating away from the site, previously placed orders are saved in localStorage. This behavior is built to mimic a database, which is not implemented in this application. The app was built with React and JavaScript, using React Router for routing and Prop Types for a better development experience. Future ideas for continuing to expand on this application include adding a database to replace localStorage, saving the users current cart in session storage, and allowing users to filter products by their nutritional content. 

# Preview of App:





https://github.com/lauraguerra1/bondadosa-code-challenge/assets/121131581/df84d686-d243-474b-909f-e82978d605a1






<div align="center">

  



</div>

# Dependencies 
- [UUID](https://www.npmjs.com/package/uuid)
- [React Router Dom](https://www.npmjs.com/package/react-router-dom)
- [Prop Types](https://www.npmjs.com/package/prop-types)

# Installation Instructions 
- Fork [this](https://github.com/lauraguerra1/bondadosa-code-challenge) repository. 
- Clone it to your local machine using the command: `git clone git@github.com:lauraguerra1/bondadosa-code-challenge.git`.
- Run the command: `cd bondadosa-code-challenge`
- Open the project with the command `code .`
- Add a `.env` file to the root of the project, and create environment variables for `REACT_APP_KEY` and `REACT_APP_ID`. (Further instructions below)
- Run the command: `npm install`
- Run the command: `npm start`
- Once the app has finished compiling, enter `http://localhost:3000/` into your browser to see the live web page.

### Environment Variables
To get the necessary environment variables, follow these steps: 
- Step 1: Sign up for a free DEVELOPER account for the Food Database API here
- Step 2: Be sure to select the Developer plan for the Food Database API in the Choose your plan drop down menu.
- Step 3: You will be asked to provide an organization during the sign-up process. Please enter your name for the organization or your own personal organization name/identifier if you have one (this is to ensure that you can make use of the free Developer plan).
- Step 4: Once your account is fully set up, you will be able to set up an Application here, which is where you will be able to find your Application ID and Application Keys, both of which you will need to make GET requests (you're welcome to name your application whatever you'd like to call it).

  
If you need assistance or would like to use my credentials, please email l.garciaguerra1@gmail.

