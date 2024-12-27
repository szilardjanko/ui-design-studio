import { Div, SpritePropertyTypes } from "@/pages/create";
import React, { useEffect, useMemo } from "react";
import { ImageInstructions } from "./ImageInstructions";
import { useUiElement } from "@/context/UiElementContext";
import { useUiCode } from "@/context/UiCodeContext";

type Coords = { x: number; y: number };

export const UiCode = () => {
  const { divs } = useUiElement();
  const {
    uiCode,
    setUiCode,
    showInstructions,
    setShowInstructions,
    useCanvasInfo,
  } = useUiCode();

  const checkForImageFile = (divs: Div[]): boolean => {
    for (const div of divs) {
      if (div.backgroundImage) {
        return true;
      }
      if (
        div.uiElementType === "container" &&
        checkForImageFile(div.containedElements)
      ) {
        return true;
      }
    }
    return false;
  };

  const hasImageFile = checkForImageFile(divs);

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

  const createPaddingMargin = (div: Div) => {
    return `padding: {
          left: '${div.padding.left.toFixed(2)}px',
          right: '${div.padding.right.toFixed(2)}px',
          top: '${div.padding.top.toFixed(2)}px',
          bottom: '${div.padding.bottom.toFixed(2)}px',
        },
        margin: {
          left: '${div.margin.left.toFixed(2)}px',
          right: '${div.margin.right.toFixed(2)}px',
          top: '${div.margin.top.toFixed(2)}px',
          bottom: '${div.margin.bottom.toFixed(2)}px',
        },`;
  };

  const checkUseCanvasInfoPosition = (div: Div) => {
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

    if (useCanvasInfo && div.containerName === "") {
      return `
        left: \`\${${div.position.x / 100} * canvas.width}px\`,
        top: \`\${${div.position.y / 100} * canvas.height}px\`,
      `;
    } else {
      return `
        ${div.position.x + widthPercent(div) / 2 < 50 ? "left" : "right"}: '${posX.toFixed(2)}px',
        ${div.position.y + heightPercent(div) / 2 < 50 ? "top" : "bottom"}: '${posY.toFixed(2)}px',`;
    }
  };

  const checkUseCanvasInfoSize = (div: Div) => {
    const sizeRatio = div.size.width / div.size.height;
    const heightRatio = Number(div.size.height) / screenHeight;

    if (useCanvasInfo) {
      return `
      width: \`\${${sizeRatio * heightRatio} * canvas.height}px\`,
      height: \`\${${heightRatio} * canvas.height}px\`,
      `;
    } else {
      return `
      width: '${div.size.width.toFixed(2)}px',
      height: '${div.size.height.toFixed(2)}px'
      `;
    }
  };

  const createUiTransform = (div: Div) => {
    return `
        positionType: '${div.positionType}',
        position: {
          ${checkUseCanvasInfoPosition(div)}
        },
        ${createPaddingMargin(div)}
        ${checkUseCanvasInfoSize(div)}
      `;
  };

  const createUiElement = (div: Div): string => {
    const uiTransform = createUiTransform(div);
    const textColor = `Color4.fromHexString('${div.textColor}')`;

    switch (div.uiElementType) {
      case "label":
        return `
    <Label
      value=${div.actionType === "Count" ? "{" + div.actionTypeCount?.targetDivName.replace(/\s+/g, "") + ".toString()}" : "'" + div.text + "'"}
      ${useCanvasInfo ? `fontSize={scaleFontSize(${div.fontSize})}` : `fontSize={${div.fontSize}}`}
      font="${div.fontFamily}"
      textWrap='nowrap'
      color={${textColor}}
      uiTransform={{${uiTransform}}}
      ${handleBackground(div)}
    />`;
      case "button":
        return `
    <Button
      value="${div.text}"
      variant="${div.backgroundImage ? "secondary" : "primary"}"
      ${useCanvasInfo ? `fontSize={scaleFontSize(${div.fontSize})}` : `fontSize={(${div.fontSize})}`}
      font="${div.fontFamily}"
      textWrap='nowrap'
      color={${textColor}}
      uiTransform={{${uiTransform}}}
      ${handleBackground(div)}
      onMouseDown={() => ${handleOnMouseDownType(div)}}
    />`;
      case "input":
        return `
    <Input
      placeholder='${div.text}'
      ${useCanvasInfo ? `fontSize={scaleFontSize(${div.fontSize})}` : `fontSize={(${div.fontSize})}`}
      font="${div.fontFamily}"
      textWrap='nowrap'
      placeholderColor={${textColor}}
      color={${textColor}}
      uiTransform={{${uiTransform}}}
      ${handleBackground(div)}
      onSubmit={(value) => console.log('submitted value: ' + value)}
    />`;
      case "container":
        return `
    <UiEntity 
      uiTransform={{ 
        display: ${div.actionType === "Show/Hide" ? div.actionTypeShow?.show && div.actionTypeShow.targetDivName.replace(/\s+/g, "") + " ? 'flex' : 'none'" : "'flex'"}, 
        positionType: '${div.positionType}', 
        flexDirection: '${div.flexDirection}', 
        justifyContent: '${div.justifyContent}', 
        alignItems: '${div.alignItems}', 
        alignContent: '${div.alignContent}', 
        flexWrap: '${div.flexWrap}', 
        position: { 
          ${checkUseCanvasInfoPosition(div)}
        }, 
        ${createPaddingMargin(div)}
        ${checkUseCanvasInfoSize(div)}
        }} 
      ${handleBackground(div)}
    >
    ${handleNestedUiElements(div)}
    </UiEntity>`;
      case "social":
        return `
    <UiEntity
      uiTransform={{${uiTransform}}}
      uiBackground={{
        textureMode: 'stretch',
        texture: {
          src: 'images${div.backgroundImage}'
        }
      }}
      onMouseDown={() => 
      ${handleOnMouseDownType(div)}
      }
    />`;
      default:
        return "";
    }
  };

  const getUvs = (
    sprite: SpritePropertyTypes | undefined,
    div: Div,
  ): number[] => {
    if (sprite !== undefined && div.backgroundImageSize !== undefined) {
      const A: Coords = {
        x: sprite.x / div.backgroundImageSize?.width,
        y: 1 - (sprite.y + sprite.height) / div.backgroundImageSize?.height,
      };
      const B: Coords = {
        x: sprite.x / div.backgroundImageSize?.width,
        y: 1 - sprite.y / div.backgroundImageSize?.height,
      };
      const C: Coords = {
        x: (sprite.x + sprite.width) / div.backgroundImageSize?.width,
        y: 1 - sprite.y / div.backgroundImageSize?.height,
      };
      const D: Coords = {
        x: (sprite.x + sprite.width) / div.backgroundImageSize?.width,
        y: 1 - (sprite.y + sprite.height) / div.backgroundImageSize?.height,
      };

      const finalUvs: number[] = [A.x, A.y, B.x, B.y, C.x, C.y, D.x, D.y];
      return finalUvs;
    }
    return [];
  };

  const handleBackground = (div: Div) => {
    if (div.hasSprite) {
      return `uiBackground={{
        textureMode: 'stretch',
        uvs: [${getUvs(div.spriteProperties, div)}],
        texture: {
          src: 'images/uiElements/${div.backgroundImageFileName}'
        }
      }}`;
    } else if (div.backgroundColor === "") {
      return "";
    } else {
      const backgroundColor = `Color4.fromHexString('${div.backgroundColor}')`;

      return div.backgroundImage
        ? `uiBackground={{
          textureMode: 'stretch',
          texture: {
            src: 'images/uiElements/${div.backgroundImageFileName}'
          }
        }}`
        : `uiBackground={{ color: ${backgroundColor} }}`;
    }
  };

  const handleOnMouseDownType = (div: Div) => {
    if (div.actionType === "Show/Hide") {
      return `${div.actionTypeShow?.targetDivName.replace(/\s+/g, "")} = !${div.actionTypeShow?.targetDivName.replace(/\s+/g, "")}`;
    } else if (div.actionType === "Open Link") {
      return `
        void openExternalUrl({
          url: '${div.onMouseDown}'
        })`;
    } else if (div.actionType === "Count") {
      return `${div.actionTypeCount?.targetDivName.replace(/\s+/g, "")} ${div.actionTypeCount?.type === "add" ? "+" : "-"}= 1`;
    } else {
      return "{}";
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
      if (div.uiElementType !== "container" && div.uiElementType !== "social") {
        const elementType =
          div.uiElementType.charAt(0).toUpperCase() +
          div.uiElementType.slice(1);
        uniqueUiElementTypes.add(elementType);
      }
      div.containedElements.forEach(addElementTypes);
    };

    divs.forEach(addElementTypes);

    const elementsArray = Array.from(uniqueUiElementTypes);
    return elementsArray.length > 0 ? elementsArray.join(", ") + "," : "";
  };

  const handleExternalUrl = () => {
    const hasExternalUrl = (divs: Div[]): boolean => {
      for (const div of divs) {
        if (div.actionType === "Open Link") {
          return true;
        }
        if (
          div.uiElementType === "container" &&
          hasExternalUrl(div.containedElements)
        ) {
          return true;
        }
      }
      return false;
    };

    return hasExternalUrl(divs)
      ? `import { openExternalUrl } from '~system/RestrictedActions'`
      : "";
  };

  const handleBooleanVariables = () => {
    return divs
      .filter((div) => div.actionType === "Show/Hide")
      .filter((div) => div.uuid === div.actionTypeShow?.targetDivUuid)
      .map(
        (div) =>
          `let ${div.actionTypeShow?.targetDivName.replace(/\s+/g, "")} = ${div.actionTypeShow?.show ? "true" : "false"};`,
      )
      .join("\n");
  };

  const handleNumberVariables = () => {
    const numberVariables: Set<string> = new Set();

    const findNumberVariables = (divs: Div[]) => {
      for (const div of divs) {
        if (
          div.uiElementType === "label" &&
          div.actionType === "Count" &&
          div.actionTypeCount
        ) {
          const variableName = div.actionTypeCount.targetDivName.replace(
            /\s+/g,
            "",
          );
          if (!numberVariables.has(variableName)) {
            numberVariables.add(
              `let ${variableName} = ${div.actionTypeCount.count};`,
            );
          }
        }
        if (div.uiElementType === "container") {
          findNumberVariables(div.containedElements);
        }
      }
    };

    findNumberVariables(divs);

    return Array.from(numberVariables).join("\n");
  };

  const code = useMemo(() => {
    return `import ReactEcs, { ${handleImports()} ReactEcsRenderer, UiEntity, scaleFontSize } from '@dcl/sdk/react-ecs'
import { Color4 } from '@dcl/sdk/math'
${handleExternalUrl()}
${useCanvasInfo ? "import { engine, UiCanvasInformation } from '@dcl/sdk/ecs'" : ""}

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}
${handleBooleanVariables() ? handleBooleanVariables() : ""}
${handleNumberVariables() ? handleNumberVariables() : ""}

const uiComponent = () => {
  ${useCanvasInfo ? "let canvas = UiCanvasInformation.get(engine.RootEntity)" : ""}
  return (
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
}
`;
  }, [divs, useCanvasInfo]);

  useEffect(() => {
    setShowInstructions(false);
    setUiCode(code);
  }, [code]);

  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="flex w-full flex-col items-center rounded border border-slate-600 bg-black"
      onClick={handleInnerClick}
    >
      {showInstructions && (
        <div className="mb-2 w-full overflow-y-auto border-b border-slate-600 pb-2">
          <ImageInstructions divs={divs} />
        </div>
      )}
      <div className="h-[80vh] w-full overflow-y-auto">
        <div className="mx-6 mt-4 select-text text-left text-sm text-white">
          <pre className="whitespace-pre-wrap">{uiCode}</pre>
        </div>
      </div>
    </div>
  );
};
