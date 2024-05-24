import { Div } from "@/pages/CreateUi";
import React, { useState } from "react";
import Button from "../Button";

type uiCodeProps = {
  divs: Div[];
};

export const UiCode: React.FC<uiCodeProps> = ({ divs }) => {
  const [openUiCode, setOpenUiCode] = useState(false);
  const [copyCodeText, setCopyCodeText] = useState("Copy Code");

  if (!divs) return null;
  if (divs.length === 0) return null;

  const screenWidth = 1248;
  const screenHeight = 702;

  const handleUiElementType = (uiElementType: string, div: Div) => {
    const widthPercent = (div.size.width / screenWidth) * 100;
    const heightPercent = (div.size.height / screenHeight) * 100;
    switch (uiElementType) {
      case "label":
        return `    <Label
          value="${div.text}"
          fontSize={18}
          color={Color4.fromHexString('#000000')}
          uiTransform={{ 
            positionType: 'absolute',
            position: {
              ${div.position.x + widthPercent / 2 < 50 ? "left" : "right"}: '${div.position.x + widthPercent / 2 < 50 ? div.position.x.toFixed(2) : (100 - (div.position.x + widthPercent)).toFixed(2)}%',
              ${div.position.y + heightPercent / 2 < 50 ? "top" : "bottom"}: '${div.position.y + heightPercent / 2 < 50 ? div.position.y.toFixed(2) : (100 - (div.position.y + heightPercent)).toFixed(2)}%',
            },
            width: "${widthPercent.toFixed(2)}%",
            height: "${heightPercent.toFixed(2)}%"
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
              ${div.position.x + widthPercent / 2 < 50 ? "left" : "right"}: '${div.position.x + widthPercent / 2 < 50 ? div.position.x.toFixed(2) : (100 - (div.position.x + widthPercent)).toFixed(2)}%',
              ${div.position.y + heightPercent / 2 < 50 ? "top" : "bottom"}: '${div.position.y + heightPercent / 2 < 50 ? div.position.y.toFixed(2) : (100 - (div.position.y + heightPercent)).toFixed(2)}%',
            },
            width: "${widthPercent.toFixed(2)}%",
            height: "${heightPercent.toFixed(2)}%"
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
              ${div.position.x + widthPercent / 2 < 50 ? "left" : "right"}: '${div.position.x + widthPercent / 2 < 50 ? div.position.x.toFixed(2) : (100 - (div.position.x + widthPercent)).toFixed(2)}%',
              ${div.position.y + heightPercent / 2 < 50 ? "top" : "bottom"}: '${div.position.y + heightPercent / 2 < 50 ? div.position.y.toFixed(2) : (100 - (div.position.y + heightPercent)).toFixed(2)}%',
            },
            width: "${widthPercent.toFixed(2)}%",
            height: "${heightPercent.toFixed(2)}%"
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
          width: '75%',
          height: '100%'
      }}
  >
  ${handleUiElements()}
  </UiEntity>
)
`;

  return (
    <div>
      <Button text={"Open Ui Code"} onClick={() => setOpenUiCode(true)} />
      {openUiCode && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-75">
          <div className="flex flex-col items-center rounded-lg border border-slate-400 bg-black p-2">
            <div className="h-[30rem] overflow-y-auto">
              <div className="mx-6 mt-4 select-text text-left text-sm">
                <pre>{codeSnippet}</pre>
              </div>
            </div>
            <div className="mt-2 flex flex-col items-center">
              <Button
                className="w-40 text-center"
                text={copyCodeText}
                onClick={() => {
                  navigator.clipboard.writeText(codeSnippet);
                  setCopyCodeText("Code Copied");
                  setTimeout(() => {
                    setCopyCodeText("Copy Code");
                  }, 2000);
                }}
              />
              <Button
                className="w-40 text-center"
                text={"Close"}
                onClick={() => setOpenUiCode(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
