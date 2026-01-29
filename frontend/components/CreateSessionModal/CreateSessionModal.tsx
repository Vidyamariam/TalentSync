import React from "react";
import { PROBLEMS } from "../../src/data/problems";
import { Code2Icon, Loader2Icon, Plus, PlusIcon } from "lucide-react";

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  roomConfig: { problem: string; difficulty: string };
  setRoomConfig: (config: { problem: string; difficulty: string }) => void;
  onCreateRoom: () => void;
  isCreating: boolean;
}

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}: CreateSessionModalProps) {
  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="bg-base-100 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl text-white font-bold mb-4">
          Create New Session
        </h2>

        <div className="space-y-8">
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-semibold">Select Problem</span>
              <span className="label-text-alt text-error">*</span>
            </label>

            <select
              className="select w-full"
              value={roomConfig.problem}
              onChange={(e) => {
                let selectedProblem = problems.find(
                  (prob) => prob.title === e.target.value,
                );
                setRoomConfig({
                  problem: e.target.value,
                  difficulty: selectedProblem?.difficulty || "",
                });
              }}
            >
              <option value="" disabled>
                Choose a coding problem
              </option>
              {problems.map((problem) => (
                <option key={problem.id} value={problem.title}>
                  {problem.title} - {problem.difficulty}
                </option>
              ))}
            </select>
          </div>

          {/* ROOM SUMMARY */}
          {roomConfig.problem && (
            <div className="alert alert-success">
              <Code2Icon className="size-5" />
              <div>
                <p className="font-semibold">Room Summary:</p>
                <p>
                  Problem:{" "}
                  <span className="font-medium">{roomConfig.problem}</span>
                </p>
                <p>
                  Max Participants:{" "}
                  <span className="font-medium">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 btn btn-outline rounded hover:opacity-90"
            disabled={isCreating}
          >
            Cancel
          </button>
          <button
            onClick={onCreateRoom}
            className="px-4 py-2 btn btn-primary rounded hover:opacity-90 text-white font-bold"
            disabled={isCreating || !roomConfig.problem}
          >
            {isCreating ? (
              <Loader2Icon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}{" "}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}

export default CreateSessionModal;
