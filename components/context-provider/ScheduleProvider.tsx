import React, { createContext, useContext, useReducer } from "react";
import { scheduleReducer } from "../../utils/reducer";
import { Schedule, initialState } from "../../models/scheduleModels";
import { ActionType, PlanType } from "../../types/scheduleTypes";

export type ScheduleContextType = {
  bookList: string[];
  plan: PlanType;
  scheduleList: Schedule[];
  dispatch: React.Dispatch<ActionType>;
};

const ScheduleContext = createContext<ScheduleContextType | undefined>(
  undefined
);

export default function ScheduleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [{ bookList, plan, scheduleList }, dispatch] = useReducer(
    scheduleReducer,
    initialState
  );

  return (
    <ScheduleContext.Provider
      value={{ bookList, plan, scheduleList, dispatch }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export function useScheduleContext() {
  return useContext(ScheduleContext);
}
