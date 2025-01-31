import React from "react";

export const Controls = () => {
  return (
    <div className="flex w-full max-w-4xl flex-col p-4">
      <h1 className="mb-4 text-2xl font-bold">Controls</h1>

      <section className="mb-4 border-b border-slate-500 pb-4">
        <h2 className="mb-2 text-xl font-semibold">File</h2>
        <p>Manage your designs with save and load functionality:</p>
        <ul className="list-inside list-disc">
          <li>
            Save your current design to your account, available if you are
            logged in
          </li>
          <li>Start a new design</li>
          <li>
            Open a previously saved design from your account or from your
            computer
          </li>
          <li>Download your current design as a .json file</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Canvas Controls</h2>
        <p>
          Canvas controls help you navigate and manipulate your design
          workspace.
        </p>

        <h3 className="mb-2 mt-4 text-lg font-medium">Available Controls:</h3>
        <ul className="list-inside list-disc">
          <li>
            Canvas Background:
            <ul className="list-circle ml-10 list-inside">
              <li>
                Use the arrow buttons to scroll between preset background
                options
              </li>
              <li>
                Clicking on the background name will set an empty background
              </li>
            </ul>
          </li>
          <li>
            Grid Controls:
            <ul className="list-circle ml-10 list-inside">
              <li>Toggle grid visibility</li>
              <li>Adjust grid size and spacing</li>
            </ul>
          </li>
          <li>
            Safe Zone:
            <ul className="list-circle ml-10 list-inside">
              <li>Toggle to enforce safe zone</li>
            </ul>
          </li>
          <li>
            Zoom Controls:
            <ul className="list-circle ml-10 list-inside">
              <li>Use the zoom slider to adjust canvas zoom level</li>
              <li>
                Click &quot;Reset&quot; to return to a zoom level that fits the screen
              </li>
            </ul>
          </li>
          <li>
            Layer Controls:
            <ul className="list-circle ml-10 list-inside">
              <li>View all elements in a hierarchical structure</li>
              <li>Select individual elements</li>
              <li>Lock/unlock elements to prevent changes</li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  );
};
