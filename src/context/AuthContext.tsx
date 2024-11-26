import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";
import { Div } from "@/pages/CreateUi";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  uiDesigns: UiDesign[];
  setUiDesigns: React.Dispatch<React.SetStateAction<UiDesign[]>>;
  lastRefreshTime: number;
  setLastRefreshTime: React.Dispatch<React.SetStateAction<number>>;
  refreshTime: number;
  setRefreshTime: React.Dispatch<React.SetStateAction<number>>;
};

type UiDesign = {
  id: string;
  uid: string;
  created_at: string;
  name: string;
  element: Div[];
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  uiDesigns: [],
  setUiDesigns: () => {},
  lastRefreshTime: 0,
  setLastRefreshTime: () => {},
  refreshTime: 0,
  setRefreshTime: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [uiDesigns, setUiDesigns] = useState<UiDesign[]>([]);
  const [lastRefreshTime, setLastRefreshTime] = useState<number>(0);
  const [refreshTime, setRefreshTime] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);
  };

  useEffect(() => {
    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        uiDesigns,
        setUiDesigns,
        lastRefreshTime,
        setLastRefreshTime,
        refreshTime,
        setRefreshTime,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
