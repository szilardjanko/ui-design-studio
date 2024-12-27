import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import Button from "@/components/Button";
import { Div } from "./create";
import { useUiElement } from "@/context/UiElementContext";
import { Trash, TrashFill } from "@/components/icons/Delete";
import { Open, Refresh } from "@/components/icons/File";
import { PopupModal } from "@/components/popup/PopupModal";
import { useSideBar } from "@/context/SideBarContext";

const COOLDOWN_PERIOD = 60000;

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [confirmDeleteIndexes, setConfirmDeleteIndexes] = useState<number[]>(
    [],
  );
  const {
    user,
    uiDesigns,
    setUiDesigns,
    lastRefreshTime,
    setLastRefreshTime,
    refreshTime,
    setRefreshTime,
  } = useAuth();
  const router = useRouter();
  const { setDivs } = useUiElement();
  const { popupText, setPopupText } = useSideBar();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      if (uiDesigns.length === 0 || uiDesigns[0].uid !== user?.id) {
        fetchUiDesigns();
      }
      setLoading(false);
    }
  }, [user]);

  const fetchUiDesigns = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("UiElements")
        .select("id, uid, created_at, name, element")
        .eq("uid", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setUiDesigns(data || []);
    } catch (error) {
      console.error("Error fetching UI designs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDesign = (element: Div[]) => {
    setDivs(element);
    router.push(`/CreateUi`);
  };

  const handleDeleteDesign = async (id: string) => {
    try {
      const { error } = await supabase.from("UiElements").delete().eq("id", id);
      if (error) throw error;
      setUiDesigns(uiDesigns.filter((design) => design.id !== id));
    } catch (error) {
      console.error("Error deleting UI design:", error);
    }
  };

  const handleDeleteConfirmation = (index: number) => {
    setConfirmDeleteIndexes((prev) => {
      const newIndexes = [...prev];
      if (newIndexes.includes(index)) {
        return newIndexes.filter((i) => i !== index);
      } else {
        newIndexes.push(index);
        return newIndexes;
      }
    });
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (refreshTime > 0) {
      intervalId = setInterval(() => {
        setRefreshTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [refreshTime]);

  const handleRefresh = () => {
    const currentTime = Date.now();
    if (currentTime - lastRefreshTime >= COOLDOWN_PERIOD) {
      fetchUiDesigns();
      setLastRefreshTime(currentTime);
      setRefreshTime(0);
    } else {
      const remainingCooldown = Math.ceil(
        (COOLDOWN_PERIOD - (currentTime - lastRefreshTime)) / 1000,
      );
      setRefreshTime(remainingCooldown);
    }
  };

  return (
    <div className="p-8">
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-8 flex w-full max-w-2xl items-center justify-between">
          <div className="w-5"></div>
          <h1 className="text-3xl font-bold">My UI Designs</h1>
          <button
            onClick={handleRefresh}
            className={`${loading ? "animate-spin" : ""} w-5`}
            disabled={loading}
          >
            {refreshTime > 0 ? (
              <span className="cursor-wait text-sm">{refreshTime}s</span>
            ) : (
              <Refresh />
            )}
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : uiDesigns.length > 0 ? (
          <div className="w-full max-w-2xl">
            {uiDesigns.map((design, index) => (
              <div
                key={design.id}
                className="mb-2.5 flex select-none items-center justify-between gap-4 rounded-xl border border-slate-300 bg-slate-300 bg-opacity-20 p-4 shadow-md shadow-slate-800 hover:shadow-slate-500"
                onClick={() => setConfirmDeleteIndexes([])}
              >
                <div>
                  <span className="hidden font-semibold md:inline">
                    {design.name}
                  </span>
                  <span className="inline font-semibold md:hidden">
                    {design.name.length > 14
                      ? `${design.name.slice(0, 14)}...`
                      : design.name}
                  </span>
                  <p className="text-sm text-gray-300">
                    Created: {new Date(design.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button
                    text="Open"
                    icon={<Open />}
                    onClick={() => handleOpenDesign(design.element)}
                    variant="selected"
                    padding="small"
                    width="small"
                  />
                  <Button
                    text=""
                    icon={
                      confirmDeleteIndexes.includes(index) ? (
                        <TrashFill />
                      ) : (
                        <Trash />
                      )
                    }
                    iconClasses="none"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!confirmDeleteIndexes.includes(index)) {
                        handleDeleteConfirmation(index);
                      } else {
                        handleDeleteDesign(design.id);
                        setConfirmDeleteIndexes(
                          confirmDeleteIndexes.filter((i) => i !== index),
                        );
                      }
                    }}
                    variant="remove"
                    padding="custom"
                    className="px-2 py-2"
                    width="xs"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No UI designs found. Start creating!</p>
        )}
        <Button
          text="Account"
          onClick={() =>
            setPopupText({
              buttonText: "",
              infoText: "Account",
              handleConfirm: "account",
            })
          }
          variant="selected"
          padding="medium"
          width="medium"
          className="mt-4"
        />
        <Button
          text="Sign Out"
          onClick={() => supabase.auth.signOut()}
          variant="remove"
          padding="medium"
          width="medium"
          className="mt-2"
        />
      </div>
      {popupText.infoText != "" && <PopupModal />}
      <div className="absolute inset-0 -left-full z-0 bg-[url('/uiIcon.png')] bg-cover blur-3xl brightness-50 md:left-0"></div>
    </div>
  );
}
