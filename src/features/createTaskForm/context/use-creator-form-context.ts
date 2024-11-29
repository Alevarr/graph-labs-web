import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
} from "react";
import type { CombinedFormValuesPartial } from "./schema";

interface FormContextType {
  page: number;
  direction: number;
  onChangePage: (newPage: number) => void;
  onBack: () => void;
  onNext: () => void;
  submitTrigger: boolean;
  setSubmitTrigger: (value: boolean) => void;
  formValues: CombinedFormValuesPartial;
  setFormValues: Dispatch<SetStateAction<Partial<CombinedFormValuesPartial>>>;
  isSubmitting: boolean;
  paginate: (newDirection: number) => void;
}

export const WizardFormContext = createContext<FormContextType>(
  {} as FormContextType
);

export const useCreatorFormContext = () => useContext(WizardFormContext);
