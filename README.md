# Micro-Frontend Angular Application Template

This repository provides a template for creating a micro-frontend application using Angular. It leverages Angular's capabilities to create a modular, scalable, and maintainable micro-frontend architecture. The steps below will guide you through the process of setting up a new remote application and configuring it to work within a micro-frontend environment.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (version 14.x or higher)
- **Angular CLI** (version 12.x or higher)

### Setting Up the Micro-Frontend Application

Follow these steps to create and configure your micro-frontend application:

1. **Generate a New Remote Application**

   First, generate a new Angular application that will act as a remote micro-frontend:

   ```bash
   ng g application remote
   ```

   This command creates a new Angular project named `remote`. This project will serve as our micro-frontend application.

2. **Initialize the Application for Module Federation**

   Next, initialize the newly created Angular project for module federation using the `@angular-architects/native-federation` package:

   ```bash
   ng g @angular-architects/native-federation:init --project=remote --port=4201 --type=remote
   ```

   This command sets up the `remote` application for module federation and assigns it a default port of `4201`.

3. **Update the Federation Manifest File**

   The micro-frontend application will be served on port `4201`. Make sure to update the port configuration in the federation manifest file (`webpack.config.js` or `module-federation.config.js`, depending on your setup) to reflect this:

   ```javascript
   // webpack.config.js or module-federation.config.js
   
   module.exports = {
     ...
     devServer: {
       port: 4201,
     },
     ...
   };
   ```

4. **Add the Route to Load the Micro-Frontend Application**

   In the host application, configure the routes to load the micro-frontend application dynamically. Add the following route configuration to your host application’s routing module:

   ```typescript
   import { loadRemoteModule } from '@angular-architects/module-federation';

   const routes: Routes = [
     {
       path: 'remote',
       loadChildren: () =>
         loadRemoteModule({
           remoteEntry: 'http://localhost:4201/remoteEntry.js',
           remoteName: 'remote',
           exposedModule: './Module'
         }).then(m => m.RemoteModule)
     },
     // other routes...
   ];
   ```

   This route configuration dynamically loads the remote module when the path `remote` is accessed.

### Running the Application

To run your micro-frontend application, execute the following command in the root directory of the `remote` project:

```bash
ng serve remote --port=4201
```

Ensure the host application is also running, and navigate to the appropriate route to see your micro-frontend in action.

### Notes

- **Port Configuration**: Make sure the ports are correctly configured and do not conflict with other services or applications.
- **Federation Manifest**: Keep the federation manifest file updated with the correct entry points and modules.

## Contributing

Contributions are welcome! Feel free to open a pull request or report an issue.

## License

This project is licensed under the MIT License.
