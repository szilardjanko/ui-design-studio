import { Div } from "@/pages/CreateUi";
import React, { useState } from "react";
import Button from "../Button";

type UiCodeProps = {
  divs: Div[];
};

export const UiCode = ({ divs }: UiCodeProps) => {
  const [openUiCode, setOpenUiCode] = useState(false);
  const [copyCodeText, setCopyCodeText] = useState("Copy Code");

  const screenWidth = 1248;
  const screenHeight = 702;

  const widthPercent = (div: Div) => (div.size.width / screenWidth) * 100;
  const heightPercent = (div: Div) => (div.size.height / screenHeight) * 100;
  const positionXleft = (div: Div) => (div.position.x * screenWidth) / 100;
  const positionXright = (div: Div) =>
    ((100 - (div.position.x + widthPercent(div))) * screenWidth) / 100;
  const positionYtop = (div: Div) => (div.position.y * screenHeight) / 100;
  const positionYbottom = (div: Div) =>
    ((100 - (div.position.y + heightPercent(div))) * screenHeight) / 100;

  const createUiTransform = (div: Div) => {
    const posX = div.containerName
      ? div.position.x
      : div.position.x + widthPercent(div) / 2 < 50
        ? positionXleft(div)
        : positionXright(div);
    const posY = div.containerName
      ? div.position.y
      : div.position.y + heightPercent(div) / 2 < 50
        ? positionYtop(div)
        : positionYbottom(div);

    return `
        positionType: '${div.positionType}',
        position: {
          ${div.position.x + widthPercent(div) / 2 < 50 ? "left" : "right"}: '${posX.toFixed(2)}px',
          ${div.position.y + heightPercent(div) / 2 < 50 ? "top" : "bottom"}: '${posY.toFixed(2)}px',
        },
        width: '${div.size.width.toFixed(2)}px',
        height: '${div.size.height.toFixed(2)}px'
      `;
  };

  const createUiElement = (div: Div): string => {
    const uiTransform = createUiTransform(div);
    const backgroundColor = `Color4.fromHexString('${div.backgroundColor}')`;
    const textColor = `Color4.fromHexString('${div.textColor}')`;

    switch (div.uiElementType) {
      case "label":
        return `
    <Label
      value="${div.text}"
      fontSize={18}
      color={${textColor}}
      uiTransform={{${uiTransform}}}
      uiBackground={{ color: ${backgroundColor} }}
    />`;
      case "button":
        return `
    <Button
      value="${div.text}"
      variant="primary"
      fontSize={18}
      color={${textColor}}
      uiTransform={{${uiTransform}}}
      uiBackground={{ color: ${backgroundColor} }}
      onMouseDown={() => console.log('Clicked on the ${div.text} button')}
    />`;
      case "input":
        return `
    <Input
      placeholder='${div.text}'
      fontSize={18}
      placeholderColor={${textColor}}
      color={${textColor}}
      uiTransform={{${uiTransform}}}
      uiBackground={{ color: ${backgroundColor} }}
      onSubmit={(value) => console.log('submitted value: ' + value)}
    />`;
      case "container":
        return `
    <UiEntity 
      uiTransform={{ 
        display: 'flex', 
        positionType: '${div.positionType}', 
        flexDirection: '${div.flexDirection}', 
        justifyContent: '${div.justifyContent}', 
        alignItems: '${div.alignItems}', 
        alignContent: '${div.alignContent}', 
        flexWrap: '${div.flexWrap}', 
        position: { 
          right: '${div.containerName !== "" ? div.position.x : positionXright(div).toFixed(2)}px', 
          bottom: '${div.containerName !== "" ? div.position.y : positionYbottom(div).toFixed(2)}px'
        }, 
        width: '${div.size.width.toFixed(2)}px',
        height: '${div.size.height.toFixed(2)}px'
        }} 
      uiBackground={{ color: ${backgroundColor} }}
    >
    ${handleNestedUiElements(div)}
    </UiEntity>`;
      default:
        return "";
    }
  };

  const handleNestedUiElements = (div: Div) => {
    return div.containedElements
      .map((nestedDiv) => createUiElement(nestedDiv))
      .join("");
  };

  const handleUiElements = () => {
    return divs.map((div) => createUiElement(div)).join("");
  };

  const handleImports = () => {
    const uniqueUiElementTypes = new Set<string>();

    const addElementTypes = (div: Div) => {
      if (div.uiElementType !== "container") {
        const elementType =
          div.uiElementType.charAt(0).toUpperCase() +
          div.uiElementType.slice(1);
        uniqueUiElementTypes.add(elementType);
      }
      div.containedElements.forEach(addElementTypes);
    };

    divs.forEach(addElementTypes);
    return Array.from(uniqueUiElementTypes).join(", ");
  };

  const codeSnippet = `import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { ${handleImports()}, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

const uiComponent = () => (
  <UiEntity
    uiTransform={{
      display: 'flex',
      positionType: 'absolute',
      position: {
        right: '0.00%',
        top: '0.00%'
      },
      width: '100%',
      height: '100%'
    }}
  >
  ${handleUiElements()}
  </UiEntity>
)
`;

  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div>
      <Button text={"Open Ui Code"} onClick={() => setOpenUiCode(true)} />
      {openUiCode && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-75"
          onClick={() => setOpenUiCode(false)}
        >
          <div
            className="flex flex-col items-center rounded-lg border border-slate-400 bg-black p-2"
            onClick={handleInnerClick}
          >
            <div className="h-[30rem] overflow-y-auto">
              <div className="mx-6 mt-4 select-text text-left text-sm text-white">
                <pre>{codeSnippet}</pre>
              </div>
            </div>
            <div className="mt-2 flex w-full flex-col items-center border-t border-slate-400 pt-2">
              <Button
                className="mx-2 my-1 w-40 rounded-xl text-center"
                text={copyCodeText}
                variant="copy"
                onClick={() => {
                  navigator.clipboard.writeText(codeSnippet);
                  setCopyCodeText("Code Copied");
                  setTimeout(() => {
                    setCopyCodeText("Copy Code");
                  }, 2000);
                }}
              />
              <Button
                className="mx-2 my-1 w-40 rounded-xl text-center"
                text={"Close"}
                variant="remove"
                onClick={() => setOpenUiCode(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
