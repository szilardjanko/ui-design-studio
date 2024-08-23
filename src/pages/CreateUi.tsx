import React, { useRef, useState, useEffect } from "react";
import { Position, PositionType, Size } from "@/components/UiElement";
import { BlockIcon } from "@/components/icons/Block";
import { DeleteModal } from "@/components/selectedDiv/DeleteModal";
import { SideBar } from "@/components/SideBar";
import { SelectedEditor } from "@/components/selectedDiv/SelectedEditor";
import { Canvas } from "@/components/Canvas";
import {
  ActionTypeCount,
  ActionTypeShow,
  ActionTypes,
} from "@/components/selectedDiv/ClickActions";

export type UiElementTypes =
  | "container"
  | "label"
  | "button"
  | "input"
  | "social";

export type PositionTypes = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type Div = {
  uuid: string;
  uiElementType: UiElementTypes;
  name: string;
  display: "flex" | "none";
  containedElements: Div[];
  containerName: string;
  positionType: PositionType;
  position: Position;
  text: string;
  size: { width: number; height: number };
  backgroundColor: string;
  textColor: string;
  lock: boolean;
  flexDirection: FlexDirectionTypes;
  justifyContent: JustifyContentTypes;
  alignContent: AlignItemsTypes;
  alignItems: AlignItemsTypes;
  flexWrap: FlexWrapTypes;
  margin: PositionTypes;
  padding: PositionTypes;
  backgroundImage?: string;
  onMouseDown?: string;
  actionType?: ActionTypes;
  actionTypeShow?: ActionTypeShow;
  actionTypeCount?: ActionTypeCount;
};

export type JustifyContentTypes =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";

export type AlignItemsTypes =
  // | "auto"
  | "flex-start"
  | "center"
  | "flex-end"
  // | "stretch"
  // | "baseline"
  | "space-between"
  | "space-around";

export type FlexWrapTypes = "wrap" | "nowrap" | "wrap-reverse";

export type FlexDirectionTypes = "row" | "column";

export type PresetTypes =
  | "instagram"
  | "instagram_color"
  | "instagram_negative"
  | "facebook"
  | "facebook_black"
  | "facebook_negative"
  | "twitter"
  | "twitter_negative"
  | "youtube"
  | "youtube_negative"
  | "discord"
  | "discord_negative"
  | "github"
  | "github_negative"
  | "lens"
  | "lens_black"
  | "lens_green";

const CreateUi = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [divs, setDivs] = useState<Array<Div>>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<Div | null>(null);
  const [boundary, setBoundary] = useState({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  });
  const [gridSize, setGridSize] = useState(3);
  const [showGrid, setShowGrid] = useState(true);
  const gridCols = 16 * gridSize;
  const gridRows = 9 * gridSize;
  const [cellWidth, setCellWidth] = useState(0);
  const [cellHeight, setCellHeight] = useState(0);
  const [selected, setSelected] = useState<Div | null>(null);

  const [zoomLevel, setZoomLevel] = useState(1);
  const [bgImage, setBgImage] = useState(`url(dclBgDay.png)`);
  const [bgImageCount, setBgImageCount] = useState(0);

  const calculateZoomLevel = (windowWidth: number) => {
    const minWidth = 1366;
    const maxWidth = 3840;
    const minZoom = 0.71;
    const maxZoom = 2.692;

    if (windowWidth === 1920) return 1.162;
    if (windowWidth === 2560) return 1.675;
    if (windowWidth <= minWidth) return minZoom;
    if (windowWidth >= maxWidth) return maxZoom;

    const ratio = (windowWidth - minWidth) / (maxWidth - minWidth);
    return minZoom + ratio * (maxZoom - minZoom);
  };

  const handleResetZoomLevel = () => {
    const initialZoomLevel = calculateZoomLevel(window.innerWidth);
    setZoomLevel(initialZoomLevel);
  };

  useEffect(() => {
    handleResetZoomLevel();
  }, []);

  const handleZoomChange = (event: any) => {
    setZoomLevel(parseFloat(event.target.value));
  };

  useEffect(() => {
    const adjustedCellWidth = 1248 / gridCols / zoomLevel;
    const adjustedCellHeight = 702 / gridRows / zoomLevel;
    setCellWidth(adjustedCellWidth);
    setCellHeight(adjustedCellHeight);

    if (targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setBoundary({
        top: rect.top,
        left: rect.left,
        bottom: rect.top + 702,
        right: rect.left + 1248,
      });
    }
  }, [zoomLevel, gridCols, gridRows]);

  const handleDivClick = (div: Div, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(div);
  };

  const handleResetDivClick = () => {
    setSelected(null);
  };

  const handleSetShowGrid = () => {
    setShowGrid((prev) => !prev);
    if (gridSize < 20) {
      setGridSize(20);
    } else {
      setGridSize(3);
    }
  };

  const gridBackgroundStyle = showGrid
    ? {
        backgroundImage: `
        linear-gradient(to right, #cccccc 1px, transparent 1px),
        linear-gradient(to bottom, #cccccc 1px, transparent 1px)`,
        backgroundSize: `${cellWidth * zoomLevel}px ${
          cellHeight * zoomLevel
        }px`,
        backgroundPosition: "top left",
        opacity: 0.5,
      }
    : {};

  const snapToGrid = (position: Position) => {
    if (!targetRef.current) return position;
    const gridSizeX =
      ((cellWidth * zoomLevel) / targetRef.current.offsetWidth) * 100;
    const gridSizeY =
      ((cellHeight * zoomLevel) / targetRef.current.offsetHeight) * 100;

    const snappedX = Math.round(position.x / gridSizeX) * gridSizeX;
    const snappedY = Math.round(position.y / gridSizeY) * gridSizeY;

    return { x: snappedX, y: snappedY };
  };

  const addDiv = (uiElementType: UiElementTypes, presetType?: PresetTypes) => {
    const initialWidthPct = 156;
    const initialHeightPct = 78;
    const initialPosition = { x: 50, y: 44.44 };

    if (uiElementType === "social" || uiElementType === "button") {
      setDivs([
        ...divs,
        {
          uuid: crypto.randomUUID(),
          uiElementType: uiElementType,
          name: `${uiElementType} ${divs.length + 1}`,
          display: "flex",
          containedElements: [],
          containerName: "",
          positionType: "absolute",
          position: initialPosition,
          text:
            uiElementType === "social"
              ? ""
              : `New UI ${uiElementType} ${divs.length + 1}`,
          size:
            uiElementType === "social"
              ? { width: 52, height: 52 }
              : { width: initialWidthPct, height: initialHeightPct },
          textColor: "#000000",
          lock: false,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          padding: { top: 0, right: 0, bottom: 0, left: 0 },
          backgroundColor: "#ffffff",
          backgroundImage:
            presetType === "instagram"
              ? `/social/instagram.png`
              : presetType === "instagram_color"
                ? `/social/instagram_color.png`
                : presetType === "instagram_negative"
                  ? `/social/instagram_negative.png`
                  : presetType === "facebook"
                    ? `/social/facebook.png`
                    : presetType === "facebook_black"
                      ? `/social/facebook_black.png`
                      : presetType === "facebook_negative"
                        ? `/social/facebook_negative.png`
                        : presetType === "twitter"
                          ? `/social/twitter.png`
                          : presetType === "twitter_negative"
                            ? `/social/twitter_negative.png`
                            : presetType === "youtube"
                              ? `/social/youtube.png`
                              : presetType === "youtube_negative"
                                ? `/social/youtube_negative.png`
                                : presetType === "discord"
                                  ? `/social/discord.png`
                                  : presetType === "discord_negative"
                                    ? `/social/discord_negative.png`
                                    : presetType === "github"
                                      ? `/social/github.png`
                                      : presetType === "github_negative"
                                        ? `/social/github_negative.png`
                                        : presetType === "lens"
                                          ? `/social/lens.png`
                                          : presetType === "lens_black"
                                            ? `/social/lens_black.png`
                                            : presetType === "lens_green"
                                              ? `/social/lens_green.png`
                                              : "",
          onMouseDown: "",
          actionType: "Open Link",
        },
      ]);
    } else {
      setDivs([
        ...divs,
        {
          uuid: crypto.randomUUID(),
          uiElementType: uiElementType,
          name: `${uiElementType} ${divs.length + 1}`,
          display: "flex",
          containedElements: [],
          containerName: "",
          positionType: "absolute",
          position: initialPosition,
          text: `New UI ${uiElementType} ${divs.length + 1}`,
          size: { width: initialWidthPct, height: initialHeightPct },
          backgroundColor: "#ffffff",
          textColor: "#000000",
          lock: false,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          margin: { top: 0, right: 0, bottom: 0, left: 0 },
          padding: { top: 0, right: 0, bottom: 0, left: 0 },
        },
      ]);
    }
  };

  const updatePosition = (newPosition: Position) => {
    if (!selected) return;

    const updateDivs = [...divs];

    if (selected.containerName !== "") {
      updateDivs.map((div) => {
        if (div.uuid === selected.containerName) {
          div.containedElements.map((containedElement) => {
            if (containedElement.uuid === selected.uuid) {
              containedElement.position = newPosition;
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
                    containedElementLayerThree.position = newPosition;
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
        div.position = newPosition;
      }
    });
    setDivs(updateDivs);
  };

  const updateSize = (newSize: Size) => {
    if (!selected) return;

    const updateDivs = [...divs];

    if (selected.containerName !== "") {
      updateDivs.map((div) => {
        if (div.uuid === selected.containerName) {
          div.containedElements.map((containedElement) => {
            if (containedElement.uuid === selected.uuid) {
              containedElement.size = newSize;
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
                    containedElementLayerThree.size = newSize;
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
        div.size = newSize;
      }
    });
    setDivs(updateDivs);
  };

  const updateOnMouseDown = (newMouseDown: string) => {
    if (!selected) return;

    const updateDivs = [...divs];

    if (selected.containerName !== "") {
      updateDivs.map((div) => {
        if (div.uuid === selected.containerName) {
          div.containedElements.map((containedElement) => {
            if (containedElement.uuid === selected.uuid) {
              containedElement.onMouseDown = newMouseDown;
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
                    containedElementLayerThree.onMouseDown = newMouseDown;
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
        div.onMouseDown = newMouseDown;
      }
    });
    setDivs(updateDivs);
  };

  const updateActionType = (newActionType: ActionTypes) => {
    if (!selected) return;

    const updateDivs = [...divs];

    if (selected.containerName !== "") {
      updateDivs.map((div) => {
        if (div.uuid === selected.containerName) {
          div.containedElements.map((containedElement) => {
            if (containedElement.uuid === selected.uuid) {
              containedElement.actionType = newActionType;
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
                    containedElementLayerThree.actionType = newActionType;
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
        div.actionType = newActionType;
      }
    });
    setDivs(updateDivs);
  };

  const updateActionTypeShow = (newActionTypeShow: {
    setterDivUuid: string;
    setterDivName: string;
    targetDivUuid: string;
    targetDivName: string;
    show: boolean;
  }) => {
    if (!selected) return;

    const updateDivs = [...divs];

    if (selected.containerName !== "") {
      updateDivs.map((div) => {
        if (div.uuid === selected.containerName) {
          div.containedElements.map((containedElement) => {
            if (containedElement.uuid === selected.uuid) {
              containedElement.actionTypeShow = newActionTypeShow;
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
                    containedElementLayerThree.actionTypeShow =
                      newActionTypeShow;
                  }
                },
              );
            });
        }
      });

      setDivs(updateDivs);
    }

    updateDivs.map((div) => {
      if (div.uuid === newActionTypeShow.targetDivUuid) {
        div.actionType = "Show/Hide";
        div.actionTypeShow = newActionTypeShow;
      }
    });
    updateDivs.map((div) => {
      if (div.uuid === selected.uuid) {
        div.actionTypeShow = newActionTypeShow;
      }
    });
    setDivs(updateDivs);
  };

  const updateMargin = (newMargin: PositionTypes) => {
    if (!selected) return;

    const updateDivs = [...divs];

    if (selected.containerName !== "") {
      updateDivs.map((div) => {
        if (div.uuid === selected.containerName) {
          div.containedElements.map((containedElement) => {
            if (containedElement.uuid === selected.uuid) {
              containedElement.margin = newMargin;
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
                    containedElementLayerThree.margin = newMargin;
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
        div.margin = newMargin;
      }
    });
    setDivs(updateDivs);
  };

  const updatePadding = (newPadding: PositionTypes) => {
    if (!selected) return;

    const updateDivs = [...divs];

    if (selected.containerName !== "") {
      updateDivs.map((div) => {
        if (div.uuid === selected.containerName) {
          div.containedElements.map((containedElement) => {
            if (containedElement.uuid === selected.uuid) {
              containedElement.padding = newPadding;
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
                    containedElementLayerThree.padding = newPadding;
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
        div.padding = newPadding;
      }
    });
    setDivs(updateDivs);
  };

  const updateText = (newText: string) => {
    if (!selected) return;

    const updateDivs = [...divs];

    if (selected.containerName !== "") {
      updateDivs.map((div) => {
        if (div.uuid === selected.containerName) {
          div.containedElements.map((containedElement) => {
            if (containedElement.uuid === selected.uuid) {
              containedElement.text = newText;
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
                    containedElementLayerThree.text = newText;
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
        div.text = newText;
      }
    });
    setDivs(updateDivs);
  };

  const updateBackgroundColor = (newBackgroundColor: string) => {
    if (!selected) return;

    const updateDivs = [...divs];

    if (selected.containerName !== "") {
      updateDivs.map((div) => {
        if (div.uuid === selected.containerName) {
          div.containedElements.map((containedElement) => {
            if (containedElement.uuid === selected.uuid) {
              containedElement.backgroundColor = newBackgroundColor;
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
                    containedElementLayerThree.backgroundColor =
                      newBackgroundColor;
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
        div.backgroundColor = newBackgroundColor;
      }
    });
    setDivs(updateDivs);
  };

  const updateTextColor = (newTextColor: string) => {
    if (!selected) return;

    const updateDivs = [...divs];

    if (selected.containerName !== "") {
      updateDivs.map((div) => {
        if (div.uuid === selected.containerName) {
          div.containedElements.map((containedElement) => {
            if (containedElement.uuid === selected.uuid) {
              containedElement.textColor = newTextColor;
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
                    containedElementLayerThree.textColor = newTextColor;
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
        div.textColor = newTextColor;
      }
    });
    setDivs(updateDivs);
  };

  const handleIncreaseGridSize = () => {
    setGridSize((prevSize) => Math.min(5, prevSize + 1));
    setShowGrid(true);
  };

  const handleDecreaseGridSize = () => {
    setGridSize((prevSize) => Math.max(1, prevSize - 1));
    setShowGrid(true);
  };

  const handleDelete = () => {
    if (!selected) return;

    const updatedDivs = divs.map((div) => {
      if (div.uuid === selected.containerName) {
        return {
          ...div,
          containedElements: div.containedElements.filter(
            (containedElement) => containedElement.uuid !== selected.uuid,
          ),
        };
      } else {
        const updatedContainedElements = div.containedElements.map(
          (containedElementLayerTwo) => {
            if (containedElementLayerTwo.uiElementType === "container") {
              return {
                ...containedElementLayerTwo,
                containedElements:
                  containedElementLayerTwo.containedElements.filter(
                    (containedElementLayerThree) =>
                      containedElementLayerThree.uuid !== selected.uuid,
                  ),
              };
            }
            return containedElementLayerTwo;
          },
        );

        return {
          ...div,
          containedElements: updatedContainedElements,
        };
      }
    });

    if (selected.containerName === "") {
      const filteredDivs = divs.filter((div) => div.uuid !== selected.uuid);
      setDivs(filteredDivs);
    } else {
      setDivs(updatedDivs);
    }

    setSelected(null);
  };

  const handleSetBackgroundImage = (direction: number) => () => {
    let newIndex = 0;
    if (bgImageCount + direction === -1) {
      newIndex = 2;
    } else {
      newIndex = (bgImageCount + direction) % 3;
    }
    setBgImageCount(newIndex);
    const images = ["dclBgDay.png", "dclBgNight.png", "dclBgSunrise.png"];
    setBgImage(`url(${images[newIndex]})`);
  };

  const handleSetLock = (lock: boolean) => {
    if (!selected) return;

    const updateDivs = [...divs];

    if (selected.containerName !== "") {
      updateDivs.map((div) => {
        if (div.uuid === selected.containerName) {
          div.containedElements.map((containedElement) => {
            if (containedElement.uuid === selected.uuid) {
              containedElement.lock = lock;
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
                    containedElementLayerThree.lock = lock;
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
        div.lock = lock;
      }
    });
    setDivs(updateDivs);
  };

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex flex-row items-start justify-between ">
        <SideBar
          divs={divs}
          selected={selected}
          bgImage={bgImage}
          gridSize={gridSize}
          zoomLevel={zoomLevel}
          addDiv={addDiv}
          setBgImage={setBgImage}
          handleDecreaseGridSize={handleDecreaseGridSize}
          handleDivClick={handleDivClick}
          handleIncreaseGridSize={handleIncreaseGridSize}
          handleResetZoomLevel={handleResetZoomLevel}
          handleSetBackgroundImage={handleSetBackgroundImage}
          handleSetLock={handleSetLock}
          handleSetShowGrid={handleSetShowGrid}
          handleZoomChange={handleZoomChange}
          setBgImageCount={setBgImageCount}
        />
        <Canvas
          divs={divs}
          selected={selected}
          targetRef={targetRef}
          bgImage={bgImage}
          cellHeight={cellHeight}
          cellWidth={cellWidth}
          boundary={boundary}
          gridBackgroundStyle={gridBackgroundStyle}
          zoomLevel={zoomLevel}
          handleDivClick={handleDivClick}
          handleResetDivClick={handleResetDivClick}
          handleSetLock={handleSetLock}
          setDeleteItem={setDeleteItem}
          setShowDeleteModal={setShowDeleteModal}
          snapToGrid={snapToGrid}
          updatePosition={updatePosition}
          updateSize={updateSize}
          updateText={updateText}
        />
        <SelectedEditor
          divs={divs}
          selected={selected}
          handleDelete={handleDelete}
          handleSetLock={handleSetLock}
          setDivs={setDivs}
          updateBackgroundColor={updateBackgroundColor}
          updateMargin={updateMargin}
          updatePadding={updatePadding}
          updatePosition={updatePosition}
          updateSize={updateSize}
          updateText={updateText}
          updateTextColor={updateTextColor}
          updateOnMouseDown={updateOnMouseDown}
          updateActionType={updateActionType}
          updateActionTypeShow={updateActionTypeShow}
          setSelected={setSelected}
        />
      </div>
      <div className="absolute top-10 flex h-full flex-col items-center bg-slate-900 px-10 pt-20 text-center sm:hidden">
        <BlockIcon />
        <div className="mt-4">
          The Create UI Tool is not supported on touchscreen devices or narrow
          browser windows. Please access it on a desktop or laptop browser with
          a wider screen for the best experience.
        </div>
        <div className="mt-4">Minimum Requirements</div>
        <div>Screen width: 640px</div>
      </div>
      {showDeleteModal && (
        <DeleteModal
          div={deleteItem}
          setShowDeleteModal={setShowDeleteModal}
          onDelete={() => handleDelete()}
        />
      )}
    </div>
  );
};

export default CreateUi;
