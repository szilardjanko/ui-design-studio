import React from "react";

export const Templates = () => {
  return (
    <div className="flex w-full max-w-4xl flex-col p-4">
      <h1 className="mb-4 text-2xl font-bold">Preset Designs</h1>

      <section className="mb-4 border-b border-slate-500 pb-4">
        <h2 className="mb-2 text-xl font-semibold">Using Preset Designs</h2>
        <p>
          Preset designs are pre-built UI layouts that you can use as starting
          points for your own designs.
        </p>

        <h3 className="mb-2 mt-4 text-lg font-medium">
          How to use Preset Designs:
        </h3>
        <ul className="list-inside list-disc">
          <li>
            Click the &quot;Preset Designs&quot; button in the sidebar to view available
            templates.
          </li>
          <li>
            Click on a preset to open it and see how it would look in your
            project.
          </li>
          <li>
            Use the UI Editor to customize the preset:
            <ul className="list-circle ml-10 list-inside">
              <li>Modify colors and styling</li>
              <li>Adjust layouts and spacing</li>
              <li>Edit text content</li>
              <li>Add or remove elements</li>
            </ul>
          </li>
        </ul>
      </section>

      <h1 className="mb-4 text-2xl font-bold">Social Media</h1>

      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Social Media Icons</h2>
        <p>
          Ready-to-use social media icons for your UI design. Each icon can be
          configured with a custom URL that opens when clicked, making it easy
          to link to your social media profiles.
        </p>
      </section>
    </div>
  );
};
