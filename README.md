# Nx Project Setup

This repository serves as a reusable Nx monorepo setup with a frontend and backend application, as well as several libraries for backend database interactions, reusable components, and domain logic.

## Applications

### Backend

The backend application is responsible for the server-side logic of the project. It handles API requests and serves data to the frontend.

### Frontend

The frontend application is responsible for the client-side interface. It interacts with the backend to provide a seamless user experience.

## Libraries

### Backend-DB

This library contains all database interactions and models. It ensures a clean separation of data logic from the backend application.

### Components

This library contains reusable UI components used across the frontend application. It promotes reusability and maintainability of the codebase.

### Domains

This library contains the domain logic and business rules. It ensures that the domain logic is decoupled from the application logic, making it easier to maintain and scale.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [Yarn](https://yarnpkg.com/) (recommended for package management)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Sujal-Gaha/nx-project-setup.git
   ```

2. Go inside the repository and install the dependencies:
    ```sh
    yarn install
    ```

3. Remove the existing remote origin:
    ```sh
    git remote remove origin
    ```

4. Add your GitHub repository as the new remote origin:
    ```sh
    git remote add origin https://github.com/your-username/your-repo-name.git
    ```

5. Verify the new remote origin:
    ```sh
    git remote -v
    ```

6. Run the command: (`Optional`)
    ```sh
    yarn dev:frontend // for running the frontend application
    yarn dev:backend // for running the backend application
    yarn build // for building the projects
    ```

## Enjoy coding and feel free to modify this README to better suit your project's needs!
