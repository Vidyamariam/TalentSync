import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../src/data/problems";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import Navbar from "../components/Navbar/Navbar";
import OutputPanel from "../components/OutputPanel/OutputPanel";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import ProblemDescription from "../components/ProblemDescription/ProblemDescription";
import { executeCode } from "../src/lib/piston";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

function ProblemDetailPage() {
  const { id } = useParams();

  const [currentProblemId, setCurrentProblemId] = useState("two-sum");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState<string | undefined>(
    PROBLEMS[currentProblemId].starterCode.javascript
  );
  const [output, setOutput] = useState<{
    success: boolean;
    output?: string;
    error?: string;
  } | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const currentProblem = PROBLEMS[currentProblemId];
  const navigate = useNavigate();

  //To update the problem when url param changes
  useEffect(() => {
    if (id && PROBLEMS[id]) {
      setCurrentProblemId(id);
      setCode(PROBLEMS[id].starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id, selectedLanguage]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(PROBLEMS[currentProblemId].starterCode[newLang]);
    setOutput(null);
  };

  const handleProblemsChange = (problemId: string) => {
    console.log(problemId, "problemId");
    navigate(`/problem/${problemId}`);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });

    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  };

  const normalizeOutput = (output: any) => {
    // normalize output for comparison (trim whitespace, handle different spacing)
    return output
      .trim()
      .split("\n")
      .map((line: any) =>
        line
          .trim()
          // remove spaces after [ and before ]
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          // normalize spaces around commas to single space after comma
          .replace(/\s*,\s*/g, ",")
      )
      .filter((line: any) => line.length > 0)
      .join("\n");
  };

  const checkIfTestsPassed = (actualOutput: any, expectedOutput: any) => {
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);
    return normalizedActual === normalizedExpected;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    try {
      const result = await executeCode(selectedLanguage, code ?? "");

      console.log(result, "result");
      setOutput(result);
      setIsRunning(false);

      if (result.success) {
        const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
        const testsPassed = checkIfTestsPassed(result.output, expectedOutput);

        console.log(testsPassed, "testsPassed");

        if (testsPassed) {
          triggerConfetti();
          toast.success("All test cases passed! 🎉");
        } else {
          toast.error("Some test cases failed. Check the output.");
        }
      } else {
        toast.error("Error executing code. Please try again.");
      }
    } catch (err) {
      console.error("Error running code:", err);
    }
  };

  return (
    <div className="h-screen">
      <Navbar />

      {/* Panel group - horizontal direction */}
      <PanelGroup direction="horizontal">
        {/* Left panel - Problem description */}
        <Panel defaultSize={60} minSize={30}>
          <ProblemDescription
            currentProblem={currentProblem}
            currentProblemId={currentProblemId}
            selectedLanguage={selectedLanguage}
            onProblemChange={handleProblemsChange}
            allProblems={Object.values(PROBLEMS)}
          />
        </Panel>

        {/* Resize handle */}
        <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize " />

        {/* Right panel - Code editor Panel and Output Panel */}
        <Panel defaultSize={40} minSize={30}>
          {/* Panel Group - vertical direction */}
          <PanelGroup direction="vertical">
            {/* Top panel - Code Editor Panel */}
            <Panel defaultSize={70} minSize={20}>
              <CodeEditor
                selectedLanguage={selectedLanguage}
                code={code}
                isRunning={isRunning}
                onLanguageChange={handleLanguageChange}
                onCodeChange={setCode}
                onRunCode={handleRunCode}
              />
            </Panel>

            {/* Resize handle */}
            <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

            {/* Bottom panel - Output Panel */}
            <Panel defaultSize={30} minSize={20}>
              <OutputPanel output={output} />
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default ProblemDetailPage;
