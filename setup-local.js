#!/usr/bin/env node

// Digital Library Setup Script - Simple local development setup

const { execSync } = require('child_process');
const os = require('os');

console.log('🚀 Setting up Digital Library for local development...');

function execCommand(command) {
    try {
        const result = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
        return { success: true, output: result.trim() };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

function checkNodeVersion() {
    const result = execCommand('node --version');
    if (!result.success) {
        console.log('❌ Node.js is not installed.');
        console.log('Please install Node.js from https://nodejs.org/');
        console.log('Recommended version: 18.19.1 or higher');
        process.exit(1);
    }
    
    const version = result.output.replace('v', '');
    const [major, minor] = version.split('.').map(Number);
    
    console.log(`✅ Node.js version: v${version}`);
    
    if (major < 18 || (major === 18 && minor < 19)) {
        console.log('⚠️  Warning: Your Node.js version may be too old for Angular 19');
        console.log('Recommended: v18.19.1 or higher');
    }
}

function checkNpm() {
    const result = execCommand('npm --version');
    if (!result.success) {
        console.log('❌ npm is not available.');
        console.log('Please ensure npm is installed with Node.js');
        process.exit(1);
    }
    
    console.log(`✅ npm version: v${result.output}`);
}

function installDependencies() {
    console.log('📦 Installing npm dependencies...');
    
    const result = execCommand('npm install');
    if (!result.success) {
        console.log('❌ Failed to install dependencies');
        console.log(result.error);
        process.exit(1);
    }
    
    console.log('✅ Dependencies installed successfully');
}

function verifySetup() {
    console.log('🅰️ Verifying Angular CLI...');
    
    const result = execCommand('npm run ng -- version');
    if (!result.success) {
        console.log('❌ Angular CLI verification failed');
        process.exit(1);
    }
    
    console.log('✅ Angular CLI is working correctly');
}

function main() {
    try {
        checkNodeVersion();
        checkNpm();
        installDependencies();
        verifySetup();
        
        console.log('');
        console.log('✅ Setup complete! You can now run:');
        console.log('   npm start        - Start the development server');
        console.log('   npm test         - Run tests');
        console.log('   npm run build    - Build for production');
        console.log('   npm run ng       - Use Angular CLI commands');
        
    } catch (error) {
        console.log('❌ Setup failed:', error.message);
        process.exit(1);
    }
}

main();
