import React from "react";
import { ExecuteCodeResult } from "../../src/lib/piston";

interface OutputPanelProps {
  output: ExecuteCodeResult | null;
}

function OutputPanel({ output }: OutputPanelProps) {
  return (
    <div className="h-full bg-base-100 flex flex-col">
      <div className="p-4 bg-base-200 border-b border-base-300 font-semibold">
        Output
      </div>
      <div className="flex-1 p-4 font-mono text-sm overflow-auto whitespace-pre-wrap">
        {output === null ? (
          <p className="text-base-content/60">
            No output yet. Run your code to see the output here.
          </p>
        ) : output.success ? (
          <pre className="text-sm font-mono text-base-content whitespace-pre-wrap mb-2">
            {output.output}
          </pre>
        ) : (
          <div>
            {output.output && (
              <pre className="text-sm font-mono text-red-600 whitespace-pre-wrap">
                {output.output}
              </pre>
            )}
            <p className="text-sm text-error font-mono mb-2">{output.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;
