module.exports = {
    cli () {
        var currentNodeVersion = process.versions.node;
        var semver = currentNodeVersion.split('.');
        var major = semver[0];
        
        if (major < 8) {
            console.error(
                'You are running Node ' +
                currentNodeVersion +
                '.\n' +
                'Requires Node 8 or higher. \n' +
                'Please update your version of Node.'
            );
            process.exit(1);
        }
        
        require('./gen.js')();
    }
};
