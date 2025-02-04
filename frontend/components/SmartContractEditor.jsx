import { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

const SmartContractEditor = ({ onAnalysisComplete }) => {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    configureSolidityLanguage(monaco);
  }

  const configureSolidityLanguage = (monaco) => {
    monaco.languages.register({ id: 'solidity' });
    monaco.languages.setMonarchTokensProvider('solidity', {
      keywords: ['contract', 'function', 'returns', 'memory', 'storage'],
      tokenizer: {
        root: [
          [/\/\/.*/, 'comment'],
          [/(\bcontract\b|\bfunction\b)/, 'keyword'],
          [/[0-9]+/, 'number'],
          [/[\=|\+|\-|\*|\/]/, 'operator']
        ]
      }
    });
  };

  return (
    <div className="h-screen w-full">
      <Editor
        height="90vh"
        defaultLanguage="solidity"
        theme="vs-dark"
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: true },
          automaticLayout: true,
          scrollBeyondLastLine: false
        }}
      />
    </div>
  );
};

export default SmartContractEditor;
