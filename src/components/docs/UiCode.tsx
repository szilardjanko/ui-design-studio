import React from "react";

export const UiCode = () => {
  return (
    <div className="flex w-full max-w-4xl flex-col p-4">
      <h1 className="mb-4 text-2xl font-bold">UI Code</h1>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Code Generation</h2>
        <p>
          Convert your visual designs into code that can be used in your
          projects.
        </p>

        <h3 className="mb-2 mt-4 border-t border-slate-500 pt-4 text-lg font-medium">
          Features:
        </h3>
        <ul className="list-inside list-disc">
          <li>Copy Code:</li>
          <ul className="list-circle ml-10 list-inside">
            <li>Copies the code that is shown to your clipboard</li>
          </ul>
          <li>
            Instructions:
            <ul className="list-circle ml-10 list-inside">
              <li>
                Instructions on how to setup images and folders for the UI
              </li>
            </ul>
          </li>
          <li>
            Save Images:
            <ul className="list-circle ml-10 list-inside">
              <li>
                Opens the option to save the images that are used in the UI to
                your project
              </li>
            </ul>
          </li>
          <li>
            Auto Scale:
            <ul className="list-circle ml-10 list-inside">
              <li>
                Toggle to automatically scale the UI to the size of the screen
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  );
};
