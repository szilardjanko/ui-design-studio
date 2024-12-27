import {
  JustifyContentTypes,
  AlignItemsTypes,
  FlexWrapTypes,
  FlexDirectionTypes,
  Div,
} from "@/pages/create";
import React, { useState } from "react";

type ContainerPropertiesProps = {
  div: Div;
  divs: Div[];
  setDivs: React.Dispatch<React.SetStateAction<Div[]>>;
};

const flexDirectionOptions: FlexDirectionTypes[] = ["row", "column"];

const justifyContentOptions: JustifyContentTypes[] = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
];

const alignItemsOptions: AlignItemsTypes[] = [
  // "auto",
  "flex-start",
  "center",
  "flex-end",
  // "stretch",
  // "baseline",
  "space-between",
  "space-around",
];

const flexWrapOptions: FlexWrapTypes[] = ["wrap", "nowrap", "wrap-reverse"];

export const ContainerProperties = ({
  div,
  divs,
  setDivs,
}: ContainerPropertiesProps) => {
  const [hidden, setHidden] = useState(true);

  const handleFlexDirectionChange = (value: FlexDirectionTypes) => {
    const selected = div;
    if (!selected) return;

    const updateDivs = [...divs];

    if (selected.containerName !== "") {
      updateDivs.map((div) => {
        if (div.uuid === selected.containerName) {
          div.containedElements.map((containedElement) => {
            if (containedElement.uuid === selected.uuid) {
              containedElement.flexDirection = value;
            }
          });
        } else {
          div.containedElements
            .filter(
              (containedElementLayerTwo) =>
                containedElementLayerTwo.uiElementType === "container",
            )
            .map((containedElementLayerTwo) => {
              containedElementLayerTwo.containedElements.map(
                (containedElementLayerThree) => {
                  if (containedElementLayerThree.uuid === selected.uuid) {
                    containedElementLayerThree.flexDirection = value;
                  }
                },
              );
            });
        }
      });
      setDivs(updateDivs);
    }

    updateDivs.map((div) => {
      if (div.uuid === selected.uuid) {
        div.flexDirection = value;
      }
    });
    setDivs(updateDivs);
  };

  const handleJustifyContentChange = (value: JustifyContentTypes) => {
    const selected = div;
    if (!selected) return;

    const updateDivs = [...divs];

    if (selected.containerName !== "") {
      updateDivs.map((div) => {
        if (div.uuid === selected.containerName) {
          div.containedElements.map((containedElement) => {
            if (containedElement.uuid === selected.uuid) {
              containedElement.justifyContent = value;
            }
          });
        } else {
          div.containedElements
            .filter(
              (containedElementLayerTwo) =>
                containedElementLayerTwo.uiElementType === "container",
            )
            .map((containedElementLayerTwo) => {
              containedElementLayerTwo.containedElements.map(
                (containedElementLayerThree) => {
                  if (containedElementLayerThree.uuid === selected.uuid) {
                    containedElementLayerThree.justifyContent = value;
                  }
                },
              );
            });
        }
      });
      setDivs(updateDivs);
    }

    updateDivs.map((div) => {
      if (div.uuid === selected.uuid) {
        div.justifyContent = value;
      }
    });
    setDivs(updateDivs);
  };

  const handleAlignContentChange = (value: AlignItemsTypes) => {
    const selected = div;
    if (!selected) return;

    const updateDivs = [...divs];

    if (selected.containerName !== "") {
      updateDivs.map((div) => {
        if (div.uuid === selected.containerName) {
          div.containedElements.map((containedElement) => {
            if (containedElement.uuid === selected.uuid) {
              containedElement.alignContent = value;
            }
          });
        } else {
          div.containedElements
            .filter(
              (containedElementLayerTwo) =>
                containedElementLayerTwo.uiElementType === "container",
            )
            .map((containedElementLayerTwo) => {
              containedElementLayerTwo.containedElements.map(
                (containedElementLayerThree) => {
                  if (containedElementLayerThree.uuid === selected.uuid) {
                    containedElementLayerThree.alignContent = value;
                  }
                },
              );
            });
        }
      });
      setDivs(updateDivs);
    }

    updateDivs.map((div) => {
      if (div.uuid === selected.uuid) {
        div.alignContent = value;
      }
    });
    setDivs(updateDivs);
  };

  const handleAlignItemsChange = (value: AlignItemsTypes) => {
    const selected = div;
    if (!selected) return;

    const updateDivs = [...divs];

    if (selected.containerName !== "") {
      updateDivs.map((div) => {
        if (div.uuid === selected.containerName) {
          div.containedElements.map((containedElement) => {
            if (containedElement.uuid === selected.uuid) {
              containedElement.alignItems = value;
            }
          });
        } else {
          div.containedElements
            .filter(
              (containedElementLayerTwo) =>
                containedElementLayerTwo.uiElementType === "container",
            )
            .map((containedElementLayerTwo) => {
              containedElementLayerTwo.containedElements.map(
                (containedElementLayerThree) => {
                  if (containedElementLayerThree.uuid === selected.uuid) {
                    containedElementLayerThree.alignItems = value;
                  }
                },
              );
            });
        }
      });
      setDivs(updateDivs);
    }

    updateDivs.map((div) => {
      if (div.uuid === selected.uuid) {
        div.alignItems = value;
      }
    });
    setDivs(updateDivs);
  };

  const handleFlexWrapChange = (value: FlexWrapTypes) => {
    const selected = div;
    if (!selected) return;

    const updateDivs = [...divs];

    if (selected.containerName !== "") {
      updateDivs.map((div) => {
        if (div.uuid === selected.containerName) {
          div.containedElements.map((containedElement) => {
            if (containedElement.uuid === selected.uuid) {
              containedElement.flexWrap = value;
            }
          });
        } else {
          div.containedElements
            .filter(
              (containedElementLayerTwo) =>
                containedElementLayerTwo.uiElementType === "container",
            )
            .map((containedElementLayerTwo) => {
              containedElementLayerTwo.containedElements.map(
                (containedElementLayerThree) => {
                  if (containedElementLayerThree.uuid === selected.uuid) {
                    containedElementLayerThree.flexWrap = value;
                  }
                },
              );
            });
        }
      });
      setDivs(updateDivs);
    }

    updateDivs.map((div) => {
      if (div.uuid === selected.uuid) {
        div.flexWrap = value;
      }
    });
    setDivs(updateDivs);
  };

  return (
    <div className="flex w-full flex-col items-center bg-gradient-to-t from-slate-900 to-slate-800">
      <div
        className="mb-1 w-full cursor-pointer border-y border-slate-500 py-2 text-center text-white"
        onClick={() => setHidden(!hidden)}
      >
        Container Properties
      </div>
      <div
        className={`overflow-hidden transition-all duration-700 ${
          hidden ? "max-h-0" : "max-h-96"
        }`}
      >
        <div className="flex w-full flex-col items-start px-2 pb-1">
          <div className="my-2 flex w-full items-center justify-between">
            <label htmlFor="flexDirection" className="text-white">
              Flex Direction:
            </label>
            <select
              id="flexDirection"
              className="ml-2 w-32 cursor-pointer rounded-xl border border-slate-800 bg-slate-800 px-2 py-1 text-sm hover:border-slate-500"
              value={div.flexDirection}
              onChange={(e) =>
                handleFlexDirectionChange(e.target.value as FlexDirectionTypes)
              }
            >
              {flexDirectionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2 flex w-full items-center justify-between">
            <label htmlFor="justifyContent" className="text-white">
              Justify Content:
            </label>
            <select
              id="justifyContent"
              className="ml-2 w-32 cursor-pointer rounded-xl border border-slate-800 bg-slate-800 px-2 py-1 text-sm hover:border-slate-500"
              value={div.justifyContent}
              onChange={(e) =>
                handleJustifyContentChange(
                  e.target.value as JustifyContentTypes,
                )
              }
            >
              {justifyContentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2 flex w-full items-center justify-between">
            <label htmlFor="alignContent" className="text-white">
              Align Content:
            </label>
            <select
              id="alignContent"
              className="ml-2 w-32 cursor-pointer rounded-xl border border-slate-800 bg-slate-800 px-2 py-1 text-sm hover:border-slate-500"
              value={div.alignContent}
              onChange={(e) =>
                handleAlignContentChange(e.target.value as AlignItemsTypes)
              }
            >
              {alignItemsOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2 flex w-full items-center justify-between">
            <label htmlFor="alignItems" className="text-white">
              Align Items:
            </label>
            <select
              id="alignItems"
              className="ml-2 w-32 cursor-pointer rounded-xl border border-slate-800 bg-slate-800 px-2 py-1 text-sm hover:border-slate-500"
              value={div.alignItems}
              onChange={(e) =>
                handleAlignItemsChange(e.target.value as AlignItemsTypes)
              }
            >
              {alignItemsOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2 flex w-full items-center justify-between">
            <label htmlFor="flexWrap" className="text-white">
              Flex Wrap:
            </label>
            <select
              id="flexWrap"
              className="ml-2 w-32 cursor-pointer rounded-xl border border-slate-800 bg-slate-800 px-2 py-1 text-sm hover:border-slate-500"
              value={div.flexWrap}
              onChange={(e) =>
                handleFlexWrapChange(e.target.value as FlexWrapTypes)
              }
            >
              {flexWrapOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
