**README**

<ins>**Note 1:**</ins> 
Make sure that **npm** and **Node.js** are properly installed in your system. The recommended versions are **Node@16.15.0** and **npm@8.8.0**.

# Usage
Upon initial setup, use the following command to install all packages and resources:
```bash
npm install --force
```

To run the website in a local development environment, use the following command:
```bash
npm run start
```

To put any change into production, use the following command:
```bash
npm run build
```

To run the website in a local production server, run the following commands:
```bash
npm install -g serve
serve -s build
```