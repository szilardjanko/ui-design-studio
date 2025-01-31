import React from "react";

export const UiEditor = () => {
  return (
    <div className="flex w-full max-w-4xl flex-col p-4">
      <h1 className="mb-4 text-2xl font-bold">UI Editor</h1>

      <section className="mb-8 flex flex-col gap-4 divide-y divide-slate-500">
        <div>
          <h2 className="mb-2 text-xl font-semibold">Editor Features</h2>
          <p>
            The UI Editor panel opens on the right side of the screen when a UI
            Element is selected. It provides powerful tools to customize and
            fine-tune every aspect of your UI element.
          </p>
        </div>

        <div>
          <h2 className="mb-2 mt-4 text-lg font-medium">Background:</h2>
          <p>
            Customize the visual appearance by configuring background colors,
            text colors, background images, and content text to match your
            design needs.
          </p>
          <ul className="mt-2 list-inside list-disc">
            <li>
              Color:
              <ul className="list-circle ml-10 list-inside">
                <li>Color picker for text and background</li>
                <li>Option to set a transparent background</li>
                <li>Preset colors that can be customized</li>
                <li>Switch between different preset options</li>
                <li>Toggle between editing background and text properties</li>
              </ul>
            </li>
            <li>
              Image:
              <ul className="list-circle ml-10 list-inside">
                <li>Upload an image</li>
                <li>Optional sprite sheet settings</li>
                <li>Set the position and size of the sprite sheet section</li>
              </ul>
            </li>
            <li>
              Text:
              <ul className="list-circle ml-10 list-inside">
                <li>Set the text content</li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-2 mt-4 text-lg font-medium">Position & Size:</h2>
          <p>
            Modify the UI element&apos;s X and Y coordinates, as well as its
            width and height.
          </p>
        </div>

        <div>
          <h2 className="mb-2 mt-4 text-lg font-medium">Align:</h2>
          <p>
            Automatically align the UI element to the top, middle, bottom, left,
            center, or right side of the screen.
          </p>
        </div>

        <div>
          <h2 className="mb-2 mt-4 text-lg font-medium">Margin & Padding:</h2>
          <p>
            Customize spacing around and within the UI element by adjusting
            margin and padding values. Set specific pixel values for each side
            (top, right, bottom, and left) to achieve precise spacing control.
          </p>
        </div>

        <div>
          <h2 className="mb-2 mt-4 text-lg font-medium">Click Actions:</h2>
          <p>
            This is a specific property for Button and Social Media UI Elements
            that allows to customize what happens when the UI Element is
            clicked.
          </p>
          <ul className="mt-2 list-inside list-disc">
            <li>
              Open Link:
              <ul className="list-circle ml-10 list-inside">
                <li>Set the URL to open when the UI Element is clicked</li>
                <li>Example: https://www.decentraland.org</li>
              </ul>
            </li>
            <li>
              Show/Hide:
              <ul className="list-circle ml-10 list-inside">
                <li>
                  Select a container to show or hide when the UI Element is
                  clicked
                </li>
                <li>
                  Every element that is within that container will also be
                  hidden or shown
                </li>
                <li>
                  Select whether the container starts visible or hidden by
                  default
                </li>
              </ul>
            </li>
            <li>
              Count:
              <ul className="list-circle ml-10 list-inside">
                <li>Select a Label UI Element to display the count</li>
                <li>
                  Select if the Button should add or subtract from the count
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-2 mt-4 text-lg font-medium">Add Elements:</h2>
          <p>
          Allows you to add elements to the selected UI container. You can add
            any available element, including other containers, to create nested
            layouts. Elements can also be removed from containers, returning them
            to the main canvas for repositioning or reuse.
          </p>
        </div>

        <div>
          <h2 className="mb-2 mt-4 text-lg font-medium">
            Container Properties:
          </h2>
          <p>
            Customize the flex direction (row, clumn), justify content
            (flex-start, flex-end, center, space-between, space-around, and
            space-evenly ), align content (flex-start, flex-end, center,
            space-between, and space-around), align items (flex-start, flex-end,
            center, space-between, and space-around) and flex wrap (wrap,
            nowrap, and wrap-reverse )
          </p>
          <p className="mt-2">
            Think of containers as boxes that organize their contents. The flex
            direction determines if items are arranged horizontally (row) or
            vertically (column). Justify content controls how items are spaced
            along this main direction - you can push them to the start, end,
            center them, or create equal spacing between them. Align items
            controls how elements are positioned in the opposite direction - for
            example, in a row container, this determines if items are at the
            top, middle, or bottom. Flex wrap decides what happens when items
            run out of space - they can either wrap to a new line or stay
            squeezed in a single line.
          </p>
        </div>
      </section>
    </div>
  );
};
