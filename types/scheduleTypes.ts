import { Schedule } from "../models/scheduleModels";

export type PlanType = {
  title: string;
  totalPage: number;
  dailyPage: number;
  startDate: string;
  endDate?: string;
};

export type DataType = {
  [title: string]: {
    totalPage: string;
    dailyPage: string;
    scheduleList: Schedule[];
  };
};

export type ScheduleObjType = {
  date: string;
  pagePlanOrigin: number | undefined;
  pagePlanModified: number | undefined;
  pageDone: number | undefined;
};

export type ActionType =
  | {
      type: "create";
      formDataObj: {
        [k: string]: string | number;
      };
    }
  | {
      type: "save";
      // plan: PlanType;
      scheduleList: Schedule[];
    }
  | {
      type: "updateBookList";
      bookList: string[];
    }
  | {
      type: "loadBookList";
      bookList: string[];
    }
  | {
      type: "loadScheduleList";
      title: string;
      data: DataType[string];
    }
  | {
      type: "updatePlan";
      plan: PlanType;
    }
  | {
      type: "updateSchedule";
      pageDone: number;
    }
  | {
      type: "reset";
    }
  | {
      type: "delete";
      bookList: string[];
    };
