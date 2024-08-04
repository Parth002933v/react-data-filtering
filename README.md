## Project Overview

The task involves developing a web application that allows users to browse through a list of stores categorized by various parameters. Users should be able to filter, sort, and search for stores based on different criteria. Additionally, they should have the ability to bookmark their favorite stores, with these preferences stored locally and reflected in the UI.

## Github Repo:
https://github.com/Parth002933v/react-data-filtering.git

## Video Demo
https://github.com/user-attachments/assets/b35d1244-66ed-4b7b-9c8e-07e4295cad25








### Setting Up and run the Project locally

follow these steps:

1. Clone the repository and navigate to the project folder.
2. Run `npm install` ( I used `pnpm install` ).
3. Start the project using `npm run start` ( I used `pnpm run start`).
4. Access the React website at http://localhost:5173/ and the API at http://localhost:3001.

Note: 
  If you are not using `pnpm` change the script in package.json
  
   ```
  "scripts": {
    "build": "tsc -b && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview",
    "start_api": "npx json-server db.json -p 3001",
    "dev": "vite",
    "start": "concurrently --names \"react app, apis\" \"npm run dev\"  \"npm run start_api\""
  },
```
