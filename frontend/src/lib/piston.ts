// Piston API is a service for code execution.

import { LANGUAGE_CONFIG } from "../data/problems";

const PISTON_API = "https://emkc.org/api/v2/piston";

interface LanguageVersion {
  [key: string]: { language: string; version: string };
}

const LANGUAGE_VERSIONS: LanguageVersion = {
  javascript: { language: "javascript", version: "18.15.0" },
  python: { language: "python", version: "3.10.0" },
  java: { language: "java", version: "15.0.2" },
};

/**
 * Execute code using the Piston API.
 * @param {string} language - programming language
 * @param {string} code - code to be executed
 * @returns {Promise<{success: boolean, output?:string, error?:string}>}
 */

interface ExecuteCodeResult {
  success: boolean;
  output?: string;
  error?: string;
}

export async function executeCode(
  language: string,
  code: string
): Promise<ExecuteCodeResult> {
  try {
    const languageConfig = LANGUAGE_VERSIONS[language];

    if (!languageConfig) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    const response = await fetch(`${PISTON_API}/execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: languageConfig.language,
        version: languageConfig.version,
        files: [
          {
            name: `main.${getFileExtensions(language)}`,
            content: code,
          },
        ],
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP error! status: ${response.status}`,
      };
    }

    const data = await response.json();

    // Piston responses usually contain a `run` object. Be defensive and accept multiple shapes.
    const run = data.run || data;

    // Some piston variants use `stdout`/`stderr`, others use `output`/`stderr`.
    const output = run.output ?? run.stdout ?? "";
    const stderr = run.stderr ?? run.error ?? "";
    const exitCode = run.code ?? run.exitCode ?? 0;

    if (stderr || exitCode !== 0) {
      return {
        success: false,
        output: output || "",
        error: stderr || `Process exited with code ${exitCode}`,
      };
    }

    return {
      success: true,
      output: output || "",
    };
  } catch (error: any) {
    return {
      success: false,
      error: `failed to execute code: ${error?.message ?? String(error)}`,
    };
  }
}

function getFileExtensions(language: string) {
  const extensions: { [key: string]: string } = {
    javascript: "js",
    python: "py",
    java: "java",
  };

  return extensions[language] || "txt";
}
