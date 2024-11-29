
import React, { useContext } from "react";
import {domAnimation, LazyMotion, m} from "framer-motion";
import SignUpForm from "@/features/createTaskForm/signup-form";
import ScoresForm from "@/features/createTaskForm/scores-form";
import ChooseModulesForm from "@/features/createTaskForm/choose-modules-form";
import MultiStepSidebar from "@/features/createTaskForm/multistep-sidebar";
import MultistepNavigationButtons from "@/features/createTaskForm/multistep-navigation-buttons";
import { WizardFormProvider } from "@/features/createTaskForm/context/provider";
import { WizardFormContext } from "@/features/createTaskForm/context/use-creator-form-context";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/constant/appRoutes.constant";
import TaskInfoForm from "@/features/createTaskForm/task-info-form";



const variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    y: direction < 0 ? 30 : -30,
    opacity: 0,
  }),
};

export default function CreateTaskPage() {
	return <WizardFormProvider><WizardForm /></WizardFormProvider>
}

function WizardForm() {
	const navigate = useNavigate();
	const {
    page,
    direction,
    onBack,
    setSubmitTrigger,
    isSubmitting,
    onChangePage,
  } = useContext(WizardFormContext);

  const content = React.useMemo(() => {
    let component = <ChooseModulesForm />;

    switch (page) {
      case 1:
        component = <ScoresForm />;
        break;
      case 2:
        component = <TaskInfoForm />;
        break;
    }

    return (
      <LazyMotion features={domAnimation}>
        <m.div
          key={page}
          animate="center"
          className="col-span-12"
          custom={direction}
          exit="exit"
          initial="exit"
          transition={{
            y: {
              ease: "backOut",
              duration: 0.35,
            },
            opacity: {duration: 0.4},
          }}
          variants={variants}
        >
          {component}
        </m.div>
      </LazyMotion>
    );
  }, [direction, page]);

	const triggerSubmit = () => {
		console.log("submitted")
    setSubmitTrigger(true);
  };

  return (
    <MultiStepSidebar
      currentPage={page}
      onBack={onBack}
      onChangePage={onChangePage}
      onNext={triggerSubmit}
    >
      <div className="relative flex h-fit w-full flex-col pt-6 text-center lg:h-full lg:justify-center lg:pt-0">
        {content}
        <MultistepNavigationButtons
          backButtonProps={{isDisabled: page === 0}}
          className="hidden justify-start lg:flex"
          nextButtonProps={{
            children: page === 2 ? "Завершить" : "Далее",
          }}
          onBack={onBack}
          onNext={triggerSubmit}
					isFirstPage={page === 0}
        />
      </div>
    </MultiStepSidebar>
  );
}
