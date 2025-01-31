import React from "react";

export const Components = () => {
  return (
    <div className="flex w-full max-w-4xl flex-col p-4">
      <section className="mb-4 border-b border-slate-500 pb-4">
        <h1 className="mb-2 text-2xl font-bold">Components</h1>
        <p>
          Create your UI design using container, label, and button components.
        </p>
        <li>
          Add a component by clicking on one of the components in the sidebar.
        </li>
        <li>
          Drag the component to position it where you want by clicking and
          dragging the top left corner move icon.
        </li>
        <li>
          Resize the component by dragging the bottom right corner resize icon.
        </li>
        <li>
          On top of the component, you will find the duplicate, lock and delete
          options.
        </li>
        <li>
          Select a component to open the UI Editor and customize its properties.
        </li>
      </section>

      <section className="mb-4 border-b border-slate-500 pb-4">
        <h2 className="mb-2 text-xl font-semibold">Containers</h2>
        <p>
          Containers are the building blocks of your UI. They act like boxes
          that can hold other elements.
        </p>
        <li>
          Containers can hold other elements, including other containers,
          labels, and buttons.
        </li>
      </section>

      <section className="mb-4 border-b border-slate-500 pb-4">
        <h2 className="mb-2 text-xl font-semibold">Labels</h2>
        <p>
          Labels are used to display text and images in your UI. They&apos;re
          great for titles, descriptions, or any other text content as well as
          custom images.
        </p>
      </section>

      <section className="mb-4 border-b border-slate-500 pb-4">
        <h2 className="mb-2 text-xl font-semibold">Buttons</h2>
        <p>
          Buttons are interactive elements that users can click. They&apos;re
          used to trigger actions in your UI.
        </p>
        <h3 className="mb-2 mt-4 text-lg font-medium">How to use Buttons:</h3>
        <ul className="list-inside list-disc">
          <li>
            To make your button interactive, use the &quot;Click Actions&quot;
            dropdown in the UI Editor to select what happens when the button is
            clicked.
          </li>
        </ul>
      </section>

      <p className="mt-4">
        You can always select any element on the canvas to see and edit its
        properties in the right-hand UI Editor panel. Experiment with different
        combinations of containers, labels, and buttons to create your perfect
        UI.
      </p>
    </div>
  );
};
