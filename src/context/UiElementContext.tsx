import { Position, Size } from "@/components/UiElement";
import {
  ActionTypeCount,
  ActionTypeShow,
  ActionTypes,
} from "@/components/selectedDiv/ClickActions";
import {
  Div,
  PositionTypes,
  PresetTypes,
  UiElementTypes,
} from "@/pages/CreateUi";
import { createContext, useContext, useState, ReactNode } from "react";

type UiElementContextValue = {
  divs: Div[];
  setDivs: React.Dispatch<React.SetStateAction<Div[]>>;
  selected: Div | null;
  setSelected: React.Dispatch<React.SetStateAction<Div | null>>;
  addDiv: (uiElementType: UiElementTypes, presetType?: PresetTypes) => void;
  handleDivClick: (div: Div, e: React.MouseEvent) => void;
  handleResetDivClick: () => void;
  deleteItem: Div | null;
  setDeleteItem: React.Dispatch<React.SetStateAction<Div | null>>;
  showDeleteModal: boolean;
  setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  updatePosition: (newPosition: Position) => void;
  updateSize: (newSize: Size) => void;
  updateOnMouseDown: (newMouseDown: string) => void;
  updateActionType: (newActionType: ActionTypes) => void;
  updateActionTypeShow: (newActionTypeShow: ActionTypeShow) => void;
  updateActionTypeCount: (
    newActionTypeCount: ActionTypeCount,
    remove?: boolean,
  ) => void;
  updateMargin: (newMargin: PositionTypes) => void;
  updatePadding: (newPadding: PositionTypes) => void;
  updateText: (newText: string) => void;
  updateBackgroundColor: (newBackgroundColor: string) => void;
  updateTextColor: (newTextColor: string) => void;
  handleDelete: () => void;
  handleSetLock: (lock: boolean) => void;
};

type UiElementProviderProps = {
  children: ReactNode;
};

export const UiElementContext = createContext<UiElementContextValue>({
  divs: [],
  setDivs: () => {},
  selected: null,
  setSelected: () => {},
  addDiv: () => {},
  handleDivClick: () => {},
  handleResetDivClick: () => {},
  deleteItem: null,
  setDeleteItem: () => {},
  showDeleteModal: false,
  setShowDeleteModal: () => {},
  updatePosition: () => {},
  updateSize: () => {},
  updateOnMouseDown: () => {},
  updateActionType: () => {},
  updateActionTypeShow: () => {},
  updateActionTypeCount: () => {},
  updateMargin: () => {},
  updatePadding: () => {},
  updateText: () => {},
  updateBackgroundColor: () => {},
  updateTextColor: () => {},
  handleDelete: () => {},
  handleSetLock: () => {},
});

export const useUiElement = () => {
  return useContext(UiElementContext);
};

export const UiElementProvider: React.FC<UiElementProviderProps> = ({
  children,
}) => {
  const [divs, setDivs] = useState<Div[]>([]);
  const [selected, setSelected] = useState<Div | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState<Div | null>(null);

  const addDiv = (uiElementType: UiElementTypes, presetType?: PresetTypes) => {
    const initialWidthPct = 156;
    // Math.round(150 / (cellWidth * zoomLevel)) * (cellWidth * zoomLevel);
    const initialHeightPct = 78;
    // Math.round(100 / (cellHeight * zoomLevel)) * (cellHeight * zoomLevel);
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
          actionType: "None",
        },
      ]);
    }
  };

  const handleDivClick = (div: Div, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(div);
  };

  const handleResetDivClick = () => {
    setSelected(null);
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
      // console.log(div.uuid, newActionTypeShow.targetDivUuid);
      if (div.uuid === newActionTypeShow.targetDivUuid) {
        // console.log("target updated");
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

  const updateActionTypeCount = (
    newActionTypeCount: ActionTypeCount,
    remove?: boolean,
  ) => {
    if (!selected) return;

    const updateDivs = [...divs];

    const updateElement = (element: Div) => {
      if (element.uuid === newActionTypeCount.targetDivUuid) {
        element.actionType = "Count";
        element.actionTypeCount = newActionTypeCount;
      }

      if (element.uuid === newActionTypeCount.setterDivUuid) {
        element.actionTypeCount = newActionTypeCount;
      }

      if (element.uiElementType === "container") {
        element.containedElements.forEach((containedElement) => {
          updateElement(containedElement);
        });
      }
    };

    const removeElement = (element: Div) => {
      if (element.uuid === newActionTypeCount.targetDivUuid) {
        element.actionType = "None";
        element.actionTypeCount = undefined;
      }

      if (element.uuid === newActionTypeCount.setterDivUuid) {
        element.actionType = "None";
        element.actionTypeCount = undefined;
      }

      if (element.uiElementType === "container") {
        element.containedElements.forEach((containedElement) => {
          removeElement(containedElement);
        });
      }
    };

    updateDivs.forEach((div) => {
      if (remove) {
        removeElement(div);
      } else {
        updateElement(div);
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
    <UiElementContext.Provider
      value={{
        divs,
        setDivs,
        selected,
        setSelected,
        addDiv,
        handleDivClick,
        handleResetDivClick,
        deleteItem,
        setDeleteItem,
        showDeleteModal,
        setShowDeleteModal,
        updatePosition,
        updateSize,
        updateOnMouseDown,
        updateActionType,
        updateActionTypeShow,
        updateActionTypeCount,
        updateMargin,
        updatePadding,
        updateText,
        updateBackgroundColor,
        updateTextColor,
        handleDelete,
        handleSetLock,
      }}
    >
      {children}
    </UiElementContext.Provider>
  );
};
