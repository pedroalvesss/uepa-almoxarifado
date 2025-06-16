import { Button } from "@/components/ui/button";
import {
  Dialog as ChadcnDialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

type DialogProps = {
  className?: string;
  dialogClassName?: string;
  buttonTitle: ReactNode;
  title: string;
  description: string;
  buttonActionTitle?: string;
  buttonSubmitClassname?: string;
  tooltipPropTitle?: string;
  tooltipPropClassName?: string;
  children: ReactNode;
  disabled?: boolean;
  onClose?: () => void;
};

export function Dialog({
  className,
  dialogClassName,
  buttonTitle,
  title,
  description,
  buttonActionTitle,
  buttonSubmitClassname,
  children,
  disabled,
  onClose,
}: DialogProps) {
  return (
    <ChadcnDialog>
      <DialogTrigger asChild>
        <Button
          disabled={disabled || false}
          className={
            className ||
            "dark: mb-4 max-w-[15.2rem] text-[0.8rem] text-white md:text-[1rem] dark:bg-primary/35 dark:hover:bg-primary/50"
          }
        >
          {buttonTitle}
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className={
          dialogClassName || "w-full md:min-w-[50rem] lg:min-w-[70rem]"
        }
      >
        <DialogHeader>
          <DialogTitle className="text-[1rem] md:text-[1.1rem] lg:text-[1.3rem] sm:[0.8rem]">
            {title}
          </DialogTitle>
          <DialogDescription className="text-[0.8rem] md:text-[1rem] sm:[0.6rem]">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">{children}</div>
        {buttonActionTitle ? (
          <DialogClose asChild>
            <DialogFooter>
              <Button
                type="submit"
                className={buttonSubmitClassname || "bg-green-600 text-white"}
                onClick={() => (onClose ? onClose() : null)}
              >
                {buttonActionTitle}
              </Button>
            </DialogFooter>
          </DialogClose>
        ) : null}
      </DialogContent>
    </ChadcnDialog>
  );
}
