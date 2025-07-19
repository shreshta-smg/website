import { exec } from 'child_process';
import os from 'os';

const installBun = () => {
    let command;

    const platform = os.platform(); // 'darwin', 'win32', 'linux', etc.

    isBunInstalled();
    switch (platform) {
        case 'darwin': // macOS
            command = 'curl -fsSL https://bun.sh/install.sh | bash';
            break;
        case 'linux': // Linux
            command = 'curl -fsSL https://bun.sh/install.sh | bash';
            break;
        case 'win32': // Windows
            // Bun recommends using PowerShell for installation on Windows
            // Ensure PowerShell is available.
            // This command assumes you're running it in a PowerShell-capable terminal.
            command = 'powershell -c "irm https://bun.sh/install.ps1 | iex"';
            break;
        default:
            console.error(`❌ Unsupported platform: ${platform}. Please install Bun manually.`);
            process.exit(1); // Exit with an error code
    }

    console.log(`🚀 Attempting to install Bun on ${platform} using command:`);
    console.log(`\`${command}\``);
    console.log('This may take a moment...');

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`\n❌ Error installing Bun:`);
            console.error(`Error code: ${error.code}`);
            console.error(`Error message: ${error.message}`);
            if (stderr) console.error(`Stderr: ${stderr}`);
            return;
        }
        if (stderr) {
            // Some installation scripts might output non-critical messages to stderr
            console.warn(`\n⚠️ Installation warnings (stderr):`);
            console.warn(stderr);
        }
        console.log(`\n✅ Bun installation output:`);
        console.log(stdout);
        console.log('\n✨ Bun installation process initiated. You might need to restart your terminal or source your shell profile (e.g., ~/.bashrc, ~/.zshrc) for Bun to be available in your PATH.');
    });
};

const isBunInstalled = () => {
    try {
        // Try to get Bun version
        exec('bun --version', (error, stdout, stderr) => {
            if (!error && stdout) {
                console.log(`✅ Bun is already installed: v${stdout.trim()}`);
                process.exit(0);
            }
        });
    } catch (e) {
        installBun();
    }
};

isBunInstalled();
