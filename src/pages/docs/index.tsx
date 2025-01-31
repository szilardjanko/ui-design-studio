import { DocsLayout } from "@/components/docs/DocsLayout";
import Link from "next/link";

export default function DocsPage() {
  return (
    <DocsLayout>
      <div className="flex w-full max-w-4xl flex-col p-4">
        <p className="mb-8 text-lg">
          Welcome to the DCL UI Design Studio documentation. Here you'll find
          comprehensive guides and documentation to help you start working with
          our UI design tool quickly and easily.
        </p>

        <div className="space-y-8">
          <section>
            <Link href="/docs/components">
              <h2 className="mb-2 text-xl font-semibold text-slate-200">
                Components
              </h2>
            </Link>

            <p className="text-white">
              Learn about the core building blocks of your UI:
            </p>
            <ul className="mt-2 list-disc pl-6 text-white">
              <li>Containers - Organize and group UI elements</li>
              <li>Labels - Display text and images</li>
              <li>Buttons - Create interactive elements</li>
              <li>Input Fields - Capture user input</li>
            </ul>
          </section>

          <section>
            <Link href="/docs/templates">
              <h2 className="mb-2 text-xl font-semibold text-slate-200">
                Templates
              </h2>
            </Link>

            <p className="text-white">
              Explore our pre-built UI layouts and learn how to:
            </p>
            <ul className="mt-2 list-disc pl-6 text-white">
              <li>Use preset designs as starting points</li>
              <li>Customize templates to match your needs</li>
              <li>Save time with ready-to-use layouts</li>
            </ul>
          </section>

          <section>
            <Link href="/docs/controls">
              <h2 className="mb-2 text-xl font-semibold text-slate-200">
                Controls
              </h2>
            </Link>

            <p className="text-white">Master the workspace controls:</p>
            <ul className="mt-2 list-disc pl-6 text-white">
              <li>File management - Save, load, and export designs</li>
              <li>Canvas controls - Grid, zoom, and background options</li>
              <li>Safe zone toggle for DCL compatibility</li>
              <li>Layer management and element organization</li>
            </ul>
          </section>

          <section>
            <Link href="/docs/ui-editor">
              <h2 className="mb-2 text-xl font-semibold text-slate-200">
                UI Editor
              </h2>
            </Link>

            <p className="text-white">
              Customize every aspect of your UI elements:
            </p>
            <ul className="mt-2 list-disc pl-6 text-white">
              <li>Position and size adjustments</li>
              <li>Color and styling options</li>
              <li>Layout and alignment tools</li>
              <li>Interactive behaviors and click actions</li>
              <li>Container-specific properties</li>
            </ul>
          </section>

          <section>
            <Link href="/docs/ui-code">
              <h2 className="mb-2 text-xl font-semibold text-slate-200">
                UI Code
              </h2>
            </Link>

            <p className="text-white">
              Generate and customize code for your designs:
            </p>
            <ul className="mt-2 list-disc pl-6 text-white">
              <li>View generated code</li>
              <li>Copy code directly to your project</li>
            </ul>
          </section>
        </div>
      </div>
    </DocsLayout>
  );
}
