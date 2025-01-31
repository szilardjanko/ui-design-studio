import { useRouter } from "next/router";
import Link from "next/link";
import Button from "../Button";

export const SideBarDocs = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <div className="flex w-48 flex-col gap-1 px-2">
      <Link href="/docs/components">
        <Button
          variant={currentPath === "/docs/components" ? "selected" : "neutral"}
          text="Components"
          className="w-full"
        />
      </Link>
      {currentPath === "/docs/components" && (
        <div className="mx-4 my-2 whitespace-nowrap text-sm">
          <div>• Containers</div>
          <div>• Labels</div>
          <div>• Buttons</div>
          <div>• Input Fields</div>
        </div>
      )}
      <Link href="/docs/templates">
        <Button
          variant={currentPath === "/docs/templates" ? "selected" : "neutral"}
          text="Templates"
          className="w-full"
        />
      </Link>
      <Link href="/docs/controls">
        <Button
          variant={currentPath === "/docs/controls" ? "selected" : "neutral"}
          text="Controls"
          className="w-full"
        />
      </Link>
      <Link href="/docs/ui-editor">
        <Button
          variant={currentPath === "/docs/ui-editor" ? "selected" : "neutral"}
          text="UI Editor"
          className="w-full"
        />
      </Link>

      {currentPath === "/docs/ui-editor" && (
        <div className="mx-4 my-2 whitespace-nowrap text-sm">
          <div>• Background</div>
          <div>• Position & Size</div>
          <div>• Align</div>
          <div>• Margin & Padding</div>
          <div>• Click Actions</div>
          <div>• Add Elements</div>
          <div>• Container Props</div>
        </div>
      )}
      <Link href="/docs/ui-code">
        <Button
          variant={currentPath === "/docs/ui-code" ? "selected" : "neutral"}
          text="UI Code"
          className="w-full"
        />
      </Link>
    </div>
  );
};
