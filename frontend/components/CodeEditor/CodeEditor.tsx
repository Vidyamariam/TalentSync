import React from "react";
import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG, LanguageConfig } from "../../src/data/problems";

interface CodeEditorProps {
  selectedLanguage: string;
  code: string | undefined;
  isRunning: boolean;
  onLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCodeChange: (newCode?: string) => void;
  onRunCode: () => void;
}

function CodeEditor({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}: CodeEditorProps) {
  return (
    <div className="h-full bg-base-300 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 bg-base-200 border-b border-base-300">
        <div className="flex items-center gap-4">
          <img
            src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            className="h-6 w-6"
          />
          <select
            className="select select-sm"
            value={selectedLanguage}
            onChange={onLanguageChange}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>
                {config.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={onRunCode}
          disabled={isRunning}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="animate-spin h-5 w-5 text-primary" />
              Running...
            </>
          ) : (
            <>
              <PlayIcon className="size-5" />
              Run Code
            </>
          )}
        </button>
      </div>

      <div className="flex-1">
        <Editor
          height={"100%"}
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 16,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
