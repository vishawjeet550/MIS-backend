
# MIS Backend

This is a project based on the MIS report ( MIS Report stands for Management Information System and is an umbrella term to describe a set of reports that give a view of the day-to-day activities of a business which allows your business's functions to be analyzed. )

Tech Stack:

    Node.js: a popular and widely-used JavaScript runtime environment for building server-side applications
    Express: a fast and minimalist web framework for Node.js
    Sequelize: a promise-based ORM for Node.js which supports multiple databases like MySQL, PostgreSQL, SQLite and MSSQL
    TypeScript: a typed superset of JavaScript that compiles to plain JavaScript
    Nodemon: a tool that automatically restarts the server when changes are made to the code
    mysql2: a fast MySQL driver for Node.js which supports promises and prepared statements
    jsonwebtoken: a library for generating, verifying, and decoding JSON web tokens (JWT)
    faker: a library for generating fake data
    dotenv: a zero-dependency module that loads environment variables from a .env file

Choice of Plugins/Packages:

    Express: Chosen because it is fast, lightweight, and easy to use for building web applications and APIs.
    Sequelize: Chosen because it is a powerful ORM that supports multiple databases and has a strong community of contributors.
    TypeScript: Chosen because it provides additional type checking and helps catch errors early in the development process.
    Nodemon: Chosen to automatically restart the server during development, which saves time and improves the development experience.
    mysql2: Chosen because it is fast and supports promises and prepared statements, which can help prevent SQL injection attacks.
    jsonwebtoken: Chosen for authentication purposes because it is a widely used library for generating and verifying JSON web tokens.
    faker: Chosen for generating fake data to be used in testing and development environments.
    dotenv: Chosen to easily manage environment variables in a .env file, which makes it easier to manage configuration and secrets.

Overall, these technologies and libraries were chosen for their reliability, performance, and ease of use in building a scalable and secure web application with robust authentication and authorization.

Backend Implementation Architecture:

    The backend of this project is built using Node.js and Express framework, which provides a simple and easy-to-use web server that can handle API requests.
    TypeScript has been used as a programming language to write the backend code. This provides the benefits of type checking and easier code maintenance.
    Sequelize, a Node.js Object Relational Mapper (ORM), has been used as a database toolkit for this project. It provides an easy way to interact with the MySQL database and perform various operations on it.
    Redis has been used as a caching layer to store frequently used data in memory and reduce the load on the database. The redis package is used to interact with Redis in Node.js.
    The API endpoint to generate JSON based on query parameters is implemented in the controller layer of the application. It takes the report type as input and generates a paginated response based on it. It checks the Redis cache first and if the data is not found, it fetches it from the MySQL database and stores it in Redis for future use.
    The authentication layer has been implemented using JWT tokens. The server generates a token when a user logs in and sends it to the client. The client sends this token in the Authorization header with every subsequent request. The server verifies the token and grants access to protected routes accordingly.





# MIS Backend

This is a project based on the MIS report ( MIS Report stands for Management Information System and is an umbrella term to describe a set of reports that give a view of the day-to-day activities of a business which allows your business's functions to be analyzed. )

Tech Stack:

    Node.js: a popular and widely-used JavaScript runtime environment for building server-side applications
    Express: a fast and minimalist web framework for Node.js
    Sequelize: a promise-based ORM for Node.js which supports multiple databases like MySQL, PostgreSQL, SQLite and MSSQL
    TypeScript: a typed superset of JavaScript that compiles to plain JavaScript
    Nodemon: a tool that automatically restarts the server when changes are made to the code
    mysql2: a fast MySQL driver for Node.js which supports promises and prepared statements
    jsonwebtoken: a library for generating, verifying, and decoding JSON web tokens (JWT)
    faker: a library for generating fake data
    dotenv: a zero-dependency module that loads environment variables from a .env file

Choice of Plugins/Packages:

    Express: Chosen because it is fast, lightweight, and easy to use for building web applications and APIs.
    Sequelize: Chosen because it is a powerful ORM that supports multiple databases and has a strong community of contributors.
    TypeScript: Chosen because it provides additional type checking and helps catch errors early in the development process.
    Nodemon: Chosen to automatically restart the server during development, which saves time and improves the development experience.
    mysql2: Chosen because it is fast and supports promises and prepared statements, which can help prevent SQL injection attacks.
    jsonwebtoken: Chosen for authentication purposes because it is a widely used library for generating and verifying JSON web tokens.
    faker: Chosen for generating fake data to be used in testing and development environments.
    dotenv: Chosen to easily manage environment variables in a .env file, which makes it easier to manage configuration and secrets.

Overall, these technologies and libraries were chosen for their reliability, performance, and ease of use in building a scalable and secure web application with robust authentication and authorization.

Backend Implementation Architecture:

    The backend of this project is built using Node.js and Express framework, which provides a simple and easy-to-use web server that can handle API requests.
    TypeScript has been used as a programming language to write the backend code. This provides the benefits of type checking and easier code maintenance.
    Sequelize, a Node.js Object Relational Mapper (ORM), has been used as a database toolkit for this project. It provides an easy way to interact with the MySQL database and perform various operations on it.
    Redis has been used as a caching layer to store frequently used data in memory and reduce the load on the database. The redis package is used to interact with Redis in Node.js.
    The API endpoint to generate JSON based on query parameters is implemented in the controller layer of the application. It takes the report type as input and generates a paginated response based on it. It checks the Redis cache first and if the data is not found, it fetches it from the MySQL database and stores it in Redis for future use.
    The authentication layer has been implemented using JWT tokens. The server generates a token when a user logs in and sends it to the client. The client sends this token in the Authorization header with every subsequent request. The server verifies the token and grants access to protected routes accordingly.


Database Schema:
    Users Table: This table will store all the user details such as their UUID, username, password, email, and organization UUID. The UUID will be the primary key for the table and will be used as a foreign key in other tables. The purpose of this table is to manage user authentication and authorization in the application.

    Roles Table: This table will store all the role details such as their UUID and name. The UUID will be the primary key for the table and will be used as a foreign key in other tables. The purpose of this table is to define the roles of the users in the organization.

    Permissions Table: This table will store all the permission details such as their UUID and name. The UUID will be the primary key for the table and will be used as a foreign key in other tables. The purpose of this table is to define the permissions required to perform various actions in the application.

    Organizations Table: This table will store all the organization details such as their UUID and name. The UUID will be the primary key for the table and will be used as a foreign key in other tables. The purpose of this table is to define the organizations that the users belong to.

    User Roles Table: This table will store the relationship between users and roles. It will have two foreign keys, one for the user UUID and the other for the role UUID. The purpose of this table is to manage the role assignments for the users.

    Role Permissions Table: This table will store the relationship between roles and permissions. It will have two foreign keys, one for the role UUID and the other for the permission UUID. The purpose of this table is to manage the permissions assigned to the roles.

    UI Navigation Table: This table will store all the UI navigation details such as their UUID, name, URL, and permission UUID. The UUID will be the primary key for the table and will be used as a foreign key in other tables. The purpose of this table is to define the UI navigation links and the permissions required to access them.

    MIS_Report Table: This table will store all the MIS report details such as their UUID, report name, report type, and organization UUID. The UUID will be the primary key for the table and will be used as a foreign key in other tables. The purpose of this table is to store the data for the MIS reports.

Endpoints

    There are two endpoints in this system. The first one is /generate-token, which returns a token generated by jsonwebtoken. This token is required to access the other API endpoints. The second endpoint is /mis-report, which returns MIS data based on the report type requested. The results returned by this endpoint will be paginated.
