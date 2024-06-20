import { Div } from "@/pages/CreateUi";
import React, { useState } from "react";
import Button from "../Button";

type uiCodeProps = {
  divs: Div[];
};

export const UiCode = ({ divs }: uiCodeProps) => {
  const [openUiCode, setOpenUiCode] = useState(false);
  const [showCopyCode, setShowCopyCody] = useState(true);

  if (!divs) return null;
  if (divs.length === 0) return null;

  const screenWidth = 1248;
  const screenHeight = 702;

  const handleUiElementType = (uiElementType: string, div: Div) => {
    const widthPercent = (div.size.width / screenWidth) * 100;
    const heightPercent = (div.size.height / screenHeight) * 100;
    const positionXleft = (div.position.x * screenWidth) / 100;
    const positionXright =
      ((100 - (div.position.x + widthPercent)) * screenWidth) / 100;
    const positionYtop = (div.position.y * screenHeight) / 100;
    const positionYbottom =
      ((100 - (div.position.y + heightPercent)) * screenHeight) / 100;

    switch (uiElementType) {
      case "label":
        return `    <Label
          value="${div.text}"
          fontSize={18}
          color={Color4.fromHexString('#000000')}
          uiTransform={{ 
            positionType: 'absolute',
            position: {
              right: '${positionXright.toFixed(2)}px',
              bottom: '${positionYbottom.toFixed(2)}px',
            },
            width: "${div.size.width.toFixed(2)}px",
            height: "${div.size.height.toFixed(2)}px"
          }}
          uiBackground={{ color: Color4.fromHexString('${div.backgroundColor}') }}
      />\n  `;
      case "button":
        return `    <Button
          value="${div.text}"
          variant="primary"
          fontSize={18}
          color={Color4.fromHexString('#000000')}
          uiTransform={{ 
            positionType: 'absolute',
            position: {
              right: '${positionXright.toFixed(2)}px',
              bottom: '${positionYbottom.toFixed(2)}px',
            },
            width: "${div.size.width.toFixed(2)}px",
            height: "${div.size.height.toFixed(2)}px"
          }}
          uiBackground={{ color: Color4.fromHexString('${div.backgroundColor}') }}
          onMouseDown={() => {
            console.log('Clicked on the ${div.text} button')
          }}
      />\n  `;
      case "input":
        return `    <Input
          placeholder={'${div.text}'}
          fontSize={18}
          placeholderColor={Color4.Black()}
          color={Color4.fromHexString('#000000')}
          uiTransform={{ 
            positionType: 'absolute',
            position: {
              right: '${positionXright.toFixed(2)}px',
              bottom: '${positionYbottom.toFixed(2)}px',
            },
            width: "${div.size.width.toFixed(2)}px",
            height: "${div.size.height.toFixed(2)}px"
          }}
          uiBackground={{ color: Color4.fromHexString('${div.backgroundColor}') }}
          onSubmit={(value) => {
              console.log('submitted value: ' + value)
          }}
      ></Input>\n`;
      default:
        return "UiEntity";
    }
  };

  const handleUiElements = () => {
    return divs
      .map((div) => {
        return handleUiElementType(div.uiElementType, div);
      })
      .join("");
  };

  const handleImports = () => {
    const uniqueUiElementTypes = new Set();
    divs.forEach((div) => {
      const elementType =
        div.uiElementType.slice(0, 1).toUpperCase() +
        div.uiElementType.slice(1, div.uiElementType.length);
      uniqueUiElementTypes.add(elementType);
    });

    return Array.from(uniqueUiElementTypes).join(", ");
  };

  let codeSnippet = `import { Color4 } from '@dcl/sdk/math'
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
            <div className="mt-2 flex w-full flex-row items-center justify-center border-t border-slate-400 pt-2">
              <Button
                className="mx-2 my-1 w-40 rounded-xl text-center"
                text={showCopyCode ? "Copy Code" : "Copied!"}
                variant="selected"
                onClick={() => {
                  navigator.clipboard.writeText(codeSnippet);
                  setShowCopyCody(false);
                  setTimeout(() => {
                    setShowCopyCody(true);
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
