const fs = require("fs");

// Read package.json file
fs.readFile("package.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading package.json:", err);
    return;
  }

  try {
    const packageJson = JSON.parse(data);
    const dependencies = packageJson.dependencies;

    if (!dependencies || Object.keys(dependencies).length === 0) {
      console.log("No dependencies found in package.json");
      return;
    }

    // Read npm-publish.json file
    fs.readFile("npm-publish.json", "utf8", (err, data) => {
      if (err) {
        console.error("Error reading npm-publish.json:", err);
        return;
      }

      let npmPublishJson = {};

      try {
        npmPublishJson = JSON.parse(data);
      } catch (parseError) {
        console.error("Error parsing npm-publish.json:", parseError);
        return;
      }

      // Add dependencies to npm-publish.json
      npmPublishJson.dependencies = npmPublishJson.dependencies || {};
      Object.assign(npmPublishJson.dependencies, dependencies);

      // Write updated npm-publish.json back to file
      fs.writeFile(
        "npm-publish.json",
        JSON.stringify(npmPublishJson, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.error("Error writing to npm-publish.json:", err);
            return;
          }
          console.log("Dependencies added to npm-publish.json successfully!");
        }
      );
    });
  } catch (parseError) {
    console.error("Error parsing package.json:", parseError);
    return;
  }
});
