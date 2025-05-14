import { useContext } from "react";
import { SessionContext } from "./SessionContext";

// useCounter는 커스텀 훅
export const useSession = () => useContext(SessionContext);
