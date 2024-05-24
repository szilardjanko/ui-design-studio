import { Div } from "@/pages/CreateUi";

type SelectedDivEditorProps = {
  div: Div | null;
  onTextChange: (newText: string) => void;
  onDelete: () => void;
  handleSetLock: (lock: boolean) => void;
};

export const SelectedDivEditor: React.FC<SelectedDivEditorProps> = ({
  div,
  onTextChange,
  onDelete,
  handleSetLock,
}) => {
  if (!div) return <div>No Div Selected</div>;

  const handleDelete = () => {
    if (div.lock) return;
    onDelete();
  };

  return (
    <div className="flex w-fit flex-col rounded-t-lg bg-slate-800 pt-1">
      <div className="border-b">Selected Div: {div.text}</div>
      <div className="flex flex-row">
        <div className="mx-4 flex flex-col">
          <label htmlFor="text-input">Text</label>
          <input
            id="text-input"
            name="text-input"
            className="text-center text-black"
            type="text"
            value={div.text}
            onChange={(e) => onTextChange(e.target.value)}
          />
        </div>
        <div className="m-1 flex flex-col">
          <div>Type: {div.uiElementType}</div>
          <div className="w-52">
            Position: x: {div.position.x.toFixed(2)}% y:{" "}
            {div.position.y.toFixed(2)}%
          </div>
          <div>
            Size: h: {div.size.height} w: {div.size.width}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => handleSetLock(!div.lock)}
          >
            Locked: {div.lock ? "True" : "False"}
          </div>
          {div.uiElementType === "button" && (
            <div className="cursor-pointer">Set Button Function</div>
          )}
        </div>
      </div>
      <button
        className="mt-2 rounded-b-lg bg-red-500 hover:bg-red-600"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};
