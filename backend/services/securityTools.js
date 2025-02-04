import { exec } from 'child_process';
import path from 'path';
import { promisify } from 'util';
const execAsync = promisify(exec);

const TOOL_PATHS = {
  slither: 'slither',
  mythril: 'myth analyze',
  echidna: 'echidna-test'
};

export async function analyzeContract(contractPath, toolName) {
  try {
    const { stdout, stderr } = await execAsync(
      `${TOOL_PATHS[toolName]} ${contractPath}`
    );
    
    return {
      tool: toolName,
      output: parseToolOutput(stdout),
      errors: stderr
    };
  } catch (error) {
    return {
      tool: toolName,
      error: error.message,
      stack: error.stack
    };
  }
}

function parseToolOutput(rawOutput) {
  return rawOutput
    .split('\n')
    .filter(line => line.includes('VULNERABILITY') || line.includes('WARNING'));
}
