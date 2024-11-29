"use client";

import type { InputProps, SelectProps } from "@nextui-org/react";

import React, { useEffect } from "react";
import {
  Input,
  Select,
  SelectItem,
  DateRangePicker,
} from "@nextui-org/react";
import { cn } from "@nextui-org/react";
import { useCreatorFormContext } from "./context/use-creator-form-context";


export type TaskInfoFormProps = React.HTMLAttributes<HTMLFormElement>;

const TaskInfoForm = React.forwardRef<HTMLFormElement, TaskInfoFormProps>(
  ({ className, ...props }, ref) => {

    const inputProps: Pick<InputProps, "labelPlacement" | "classNames"> = {
      labelPlacement: "outside",
      classNames: {
        label:
          "text-small font-medium text-default-700 group-data-[filled-within=true]:text-default-700",
        description: "text-left",
      },
    };

    const selectProps: Pick<SelectProps, "labelPlacement" | "classNames"> = {
      labelPlacement: "outside",
      classNames: {
        label:
          "text-small font-medium text-default-700 group-data-[filled=true]:text-default-700",
      },
    };
    const { submitTrigger, setSubmitTrigger, onNext, setFormValues, formValues } =
    useCreatorFormContext();

    //TODO: Connect this to actual form
    useEffect(() => {
      if (submitTrigger) {
        onNext();
        setSubmitTrigger(false);
      }
    }, [submitTrigger, setSubmitTrigger, setFormValues, onNext]);

    return (
      <>
        <div className="text-3xl font-bold leading-9 text-default-foreground">
          Детали задания
        </div>
        <div className="py-4 text-base leading-5 text-default-500">
          Название, для каких групп и какие сроки выполнения
        </div>
        <form
          ref={ref}
          className={cn(
            "flex grid grid-cols-12 flex-col gap-4 py-8",
            className
          )}
          {...props}
        >
          <Input
            className="col-span-12"
            label="Название задания"
            name="name"
            placeholder="Задачи к семинару..."
            {...inputProps}
          />
          <Input
            className="col-span-12"
            label="Время на выполнение"
            description="В минутах"
            name="minutes_to_complete"
            placeholder="60"
            {...inputProps}
          />
            <DateRangePicker
              label="Сроки выполнения"
              className="col-span-12"
            />
          <Select
            className="col-span-12"
            label="Учебные группы"
            name="groups"
            selectionMode="multiple"
            {...selectProps}
          >
            <SelectItem key="B21-504">Б21-504</SelectItem>
            <SelectItem key="B21-514">Б21-514</SelectItem>
            <SelectItem key="B21-524">Б21-524</SelectItem>
            <SelectItem key="B21-534">Б21-534</SelectItem>
          </Select>
        </form>
      </>
    );
  }
);

TaskInfoForm.displayName = "ReviewAndPaymentForm";

export default TaskInfoForm;
