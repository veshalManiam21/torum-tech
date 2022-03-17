import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import ReactModal from "react-modal";
import { useRouter } from "next/router";
import { scrollLock } from "@/utils/index";
import { QueueService } from "@/services/queueService";
import IconClose from "@/assets/icon_close.svg";

ReactModal.setAppElement("#__next"); // https://reactcommunity.org/react-modal/accessibility/

export type ModalOptions = {
  /**
   * Control the alignment of the content.
   * Uses grid from 1 to 9.
   *
   * See grid area below for corresponding screen area.
   * ```txt
   * _____________
   * | 1 | 2 | 3 |
   * | 4 | 5 | 6 |
   * | 7 | 8 | 9 |
   * ‾‾‾‾‾‾‾‾‾‾‾‾‾
   * ```
   */
  align?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  /** Set the direction for the content to show from and hide to. */
  animateContentFrom?: "top" | "left" | "right" | "bottom" | "center";
  /** Additional classes to apply to the modal overlay. */
  overlayClassName?: string;
  /** Replaces all existing classes of direct parent with the provided ones. */
  containerClassName?: string;
  /** Content to render inside modal. */
  content: React.ReactNode;
  /** Whether modal can be dismissed by clicking on overlay. */
  isDismissible?: boolean;
  /** Callback for when the modal is dismissed. */
  onClose?: () => void;
  /** Whether to render a button to close the modal. */
  showCloseButton?: boolean;
  /** Auto close within interval */
  autoClose?: number;
};

type ModalContextProps = {
  openModal: (options: ModalOptions | ModalOptions[]) => void;
  closeModal: () => void;
  closeAllModals: () => void;
};

const ModalContext = React.createContext<ModalContextProps | null>(null);

const defaultModalOptions: ModalOptions = {
  align: 5,
  animateContentFrom: "bottom",
  containerClassName: "flex relative max-h-full max-w-full",
  overlayClassName: "p-4",
  content: null,
  isDismissible: true,
  showCloseButton: false,
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === null) {
    throw new Error("ModalProvider was not found.");
  }
  return context;
};

export const ModalProvider: React.FC = (props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] =
    useState<ModalOptions>(defaultModalOptions);
  const queue = useRef(new QueueService<ModalOptions>("LIFO"));

  const showModal = () => {
    setIsOpen(true);
    scrollLock(true);
    setModalOptions({
      ...defaultModalOptions,
      ...queue.current.currentItem,
    });
  };

  const hideModal = () => {
    setIsOpen(false);
    if (queue.current.length < 1) {
      // only disable scroll lock if there are no pending modals in the queue
      scrollLock(false);
    }
  };

  const openModal = useCallback((options: ModalOptions | ModalOptions[]) => {
    if (Array.isArray(options)) {
      queue.current.add(...options);
      if (queue.current.length - options.length > 1) {
        // if there are existing modals currently open, they will be hidden
        // but remain at the back of the queue. react-modal's onAfterClose
        // will trigger the newly added modal after hide animation of the previous
        // modal is complete.
        hideModal();
        return;
      }
    } else {
      queue.current.add(options);
      if (queue.current.length > 1) {
        hideModal();
        return;
      }
    }
    showModal();
  }, []);

  const closeModal = useCallback(() => {
    queue.current.next();
    const { onClose } = modalOptions;
    if (onClose) {
      onClose();
    }
    hideModal();
  }, [modalOptions]);

  const closeAllModals = useCallback(() => {
    queue.current.clear();
    hideModal();
  }, []);

  // Ensure modals are closed when a user changes routes
  useEffect(() => {
    router.events.on("routeChangeStart", closeAllModals);
    return () => {
      router.events.off("routeChangeStart", closeAllModals);
    };
  }, [router.events, closeAllModals]);

  // Auto close
  useEffect(() => {
    if (modalOptions.autoClose) {
      let timer = setTimeout(() => closeModal(), modalOptions.autoClose);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [modalOptions.autoClose, closeModal]);

  const value = useMemo<ModalContextProps>(() => {
    return {
      openModal,
      closeModal,
      closeAllModals,
    };
  }, [openModal, closeModal, closeAllModals]);

  const alignmentClasses = () => {
    // prettier-ignore
    switch (modalOptions.align){
      case 1:  return 'items-start justify-start';
      case 2:  return 'items-start justify-center';
      case 3:  return 'items-start justify-end';
      case 4:  return 'items-center justify-start';
      case 5:  return 'items-center justify-center';
      case 6:  return 'items-center justify-end';
      case 7:  return 'items-end justify-start';
      case 8:  return 'items-end justify-center';
      case 9:  return 'items-end justify-end';
      default: return '';
    }
  };

  const transitionClasses = () => {
    // prettier-ignore
    switch (modalOptions.animateContentFrom) {
      case 'top':    return 'ReactModal__Content--from-top';
      case 'left':   return 'ReactModal__Content--from-left';
      case 'right':  return 'ReactModal__Content--from-right';
      case 'bottom': return 'ReactModal__Content--from-bottom';
      case 'center': return 'ReactModal__Content--from-center';
      default:       return '';
    }
  };

  return (
    <ModalContext.Provider value={value}>
      <ReactModal
        closeTimeoutMS={200} // needs to match duration in styles/reactModal.css
        overlayClassName={`${alignmentClasses()} z-50 fixed inset-0 flex w-full h-full bg-black-full bg-opacity-30 ${
          modalOptions.overlayClassName
        }`}
        className={`${transitionClasses()} ${modalOptions.containerClassName} `}
        shouldCloseOnOverlayClick={modalOptions.isDismissible}
        isOpen={isOpen}
        onRequestClose={closeModal}
        onAfterClose={() => {
          if (queue.current.length) {
            showModal();
          }
        }}
      >
        {modalOptions.content}
        {modalOptions.showCloseButton ? (
          <button
            aria-label="Close Button"
            className="absolute top-2 right-2"
            onClick={closeModal}
          >
            <IconClose />
          </button>
        ) : null}
      </ReactModal>
      {props.children}
    </ModalContext.Provider>
  );
};
