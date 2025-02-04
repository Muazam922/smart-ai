const {execSync} = require('child_process');

module.exports = {
  getVersions: () => ({
    node: process.version,
    npm: execSync('npm -v').toString().trim(),
    packages: JSON.parse(execSync('npm list --json').toString()),
    deploymentTime: new Date().toISOString()
  }),
  
  logDeployment: () => {
    const versions = module.exports.getVersions();
    require('fs').writeFileSync('deployment-manifest.json', 
      JSON.stringify(versions, null, 2));
  }
}
