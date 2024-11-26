import React from "react";

export const Components = () => {
  return (
    <div className="flex w-full flex-col p-4 max-w-4xl">
      <h1 className="mb-4 text-2xl font-bold">Components</h1>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Containers</h2>
        <p>
          Containers are the building blocks of your UI. They act like boxes
          that can hold other elements.
        </p>
        <h3 className="mb-2 mt-4 text-lg font-medium">
          How to use Containers:
        </h3>
        <ul className="list-inside list-disc">
          <li>
            Click the &quot;Container&quot; button in the sidebar to add a new
            container to your canvas.
          </li>
          <li>Drag the container to position it where you want.</li>
          <li>Resize the container by dragging its corners or edges.</li>
          <li>
            Use the properties panel to customize the container:
            <ul className="list-circle ml-10 list-inside">
              <li>Change the background color or image</li>
              <li>
                Adjust the layout (flex direction, justify content, align items)
              </li>
              <li>Set margins and padding</li>
            </ul>
          </li>
          <li>
            Containers can hold other elements, including other containers,
            labels, and buttons.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Labels</h2>
        <p>
          Labels are used to display text and images in your UI. They&apos;re
          great for titles, descriptions, or any other text content as well as
          custom images.
        </p>
        <h3 className="mb-2 mt-4 text-lg font-medium">How to use Labels:</h3>
        <ul className="list-inside list-disc">
          <li>
            Click the &quot;Labels&quot; button in the sidebar to add a new
            label to your canvas.
          </li>
          <li>Drag the label to position it where you want.</li>
          <li>
            Click on the label to open the UI Editor, and then click on -
            Background - to edit its color, image, or text.
          </li>
          <li>
            Labels can be placed inside containers or directly on the canvas.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Buttons</h2>
        <p>
          Buttons are interactive elements that users can click. They&apos;re
          used to trigger actions in your UI.
        </p>
        <h3 className="mb-2 mt-4 text-lg font-medium">How to use Buttons:</h3>
        <ul className="list-inside list-disc">
          <li>
            Click the &quot;Buttons&quot; button in the sidebar to add a new
            button to your canvas.
          </li>
          <li>Drag the button to position it where you want.</li>
          <li>
            Use the properties panel to customize the button:
            <ul className="list-circle ml-10 list-inside">
              <li>Change the button color</li>
              <li>Adjust the text</li>
              <li>Set the button size</li>
              <li>
                Choose an action for the button (e.g., open links, show/hide
                another element, count clicks)
              </li>
            </ul>
          </li>
          <li>
            Buttons can be placed inside containers or directly on the canvas.
          </li>
          <li>
            To make your button interactive, use the &quot;Click Actions&quot;
            dropdown in the properties panel to select what happens when the
            button is clicked.
          </li>
        </ul>
      </section>

      <p className="mt-4">
        You can always select any element on the canvas to see and
        edit its properties in the right-hand panel. Experiment with different
        combinations of containers, labels, and buttons to create your perfect
        UI!
      </p>
    </div>
  );
};
