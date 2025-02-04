#!/bin/bash
# Full security toolchain installer

# Auto-update base system
sudo apt-get update && sudo apt-get upgrade -y

# Zero-touch maintenance
sudo apt-get update -y
sudo apt-get upgrade -y

# System dependencies
sudo apt-get update
sudo apt-get install -y python3-pip npm docker.io

# Node security
npm install -g npm@latest
npx npm-force-resolutions
n latest

# Dependency hygiene
npm ci --production
npm update --save --save-exact
npm audit fix --force

# Project dependencies
npm ci
npm update --save

# SBOM generation
npm install -g cyclonedx-npm
cyclonedx-npm --output bom.xml

# Security updates
npm audit fix --force

# Solidity tools
echo "Installing Solidity analysis tools..."
pip3 install slither-analyzer mythril
gh repo clone crytic/echidna && cd echidna && make install
gh repo clone crytic/medusa && cd medusa && pip3 install -r requirements.txt

# Cairo tools
echo "Installing Cairo toolchain..."
pip3 install amarna
gh repo clone FuzzingLabs/cairo-fuzzer && cd cairo-fuzzer && cargo build --release
gh repo clone software-mansion/cairo-profiler && cd cairo-profiler && make install

# Foundry & EVM tools
echo "Installing Foundry..."
curl -L https://foundry.paradigm.xyz | bash
foundryup
gh repo clone vyperlang/vyper && cd vyper && make install

# LLM Models
echo "Installing AI models..."
ollama pull deepseek-r1:671b
ollama pull llama3.3:70b
ollama pull falcon3:10b
ollama pull phi4:14b
ollama pull opencoder:8b

# Node dependencies
echo "Installing Node dependencies..."
npm install -g ganache
npm install -g @crytic/caracal @nethermindeth/entro

# Create tool symlinks
ln -s $(pwd)/cairo-fuzzer/target/release/cairo-fuzzer /usr/local/bin/cairo-fuzzer
ln -s $(pwd)/cairo-profiler/cairo-profiler /usr/local/bin/cairo-profiler
