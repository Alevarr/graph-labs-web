import {
  type FC,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "sonner";

import { type CombinedFormValuesPartial, combinedFormSchema } from "./schema";
import { WizardFormContext } from "./use-creator-form-context";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/constant/appRoutes.constant";

export const WizardFormProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [[page, direction], setPage] = useState([0, 0]);

  const [submitTrigger, setSubmitTrigger] = useState(false);

  const [formValues, setFormValues] = useState<CombinedFormValuesPartial>({});

  const [isSubmitting, startSubmission] = useTransition();


  const paginate = useCallback((newDirection: number) => {
    setPage((prev) => {
      const nextPage = prev[0] + newDirection;

      if (nextPage < 0 || nextPage > 2) {
        return prev;
      }

      return [nextPage, newDirection];
    });
  }, []);

  const onChangePage = useCallback(
    (newPage: number) => {
      setPage((prev) => {
        if (newPage < 0 || newPage > 2) {
          return prev;
        }

        if (isSubmitting) return prev;

        const currentPage = prev[0];

        if (newPage > currentPage) return prev; //don't allow to skip to next steps as it would violate validation

        return [newPage, -1];
      });
    },
    [isSubmitting],
  );

  const onBack = useCallback(() => {
    paginate(-1);
  }, [paginate]);

  const onNext = useCallback(() => {
    paginate(1);
  }, [paginate]);

  const performSubmit = () => {
    // startSubmission(async () => {
    //   const { success, data } = combinedFormSchema.safeParse(formValues);

    //   if (!success) {
    //     toast.error(
    //       "Please, correct the errors in the form before submitting.",
    //     );

    //     return;
    //   }

    //   const { data: creatorProfileId, error } = await createCreatorProfile({
    //     age: formValues.age ?? 0,
    //     bio: formValues.bio ?? "",
    //     countryId: formValues.countryId ?? 0,
    //     gender: formValues.gender ?? "man",
    //     handle: formValues.handle ?? "",
    //     name: formValues.name ?? "",
    //     paypalEmail: formValues.paypalEmail,
    //     subscriptionPrice: formValues.subscriptionPrice ?? 0,
    //     tags: formValues.tags ?? [],
    //     socials: formValues.socials ?? [],
    //   });

    //   if (error || !creatorProfileId) {
    //     toast.error("Failed to create profile.");
    //     return;
    //   }

    //   if (data.profileImg) {
    //     const formData = new FormData();
    //     formData.append("file", data.profileImg);

    //     const res = await fetch(
    //       `/api/creator/profile/picture?creatorProfileId=${creatorProfileId}`,
    //       {
    //         method: "POST",
    //         body: formData,
    //       },
    //     );
    //     if (!res) {
    //       toast.error("Failed to save profile image.");
    //       return;
    //     }
    //   }
    //   if (data.coverImg) {
    //     const formData = new FormData();
    //     formData.append("file", data.coverImg);

    //     const res = await fetch(
    //       `/api/creator/profile/cover?creatorProfileId=${creatorProfileId}`,
    //       {
    //         method: "POST",
    //         body: formData,
    //       },
    //     );
    //     if (!res) {
    //       toast.error("Failed to save profile cover image.");
    //       return;
    //     }
    //   }

      toast.success("Задание успешно создано!");
      new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
        navigate(APP_ROUTES.admin.index);
      });

      
    // });
  };

  useEffect(() => {
    if (!(page === 2 && submitTrigger)) {
      return;
    }
    performSubmit();
    setSubmitTrigger(false);
  }, [submitTrigger, page]);

  return (
      <WizardFormContext.Provider
        value={{
          page,
          direction,
          onChangePage,
          onBack,
          onNext,
          submitTrigger,
          setSubmitTrigger,
          formValues,
          setFormValues,
          isSubmitting,
          paginate,
        }}
      >
        {children}
      </WizardFormContext.Provider>
      
  );
};
