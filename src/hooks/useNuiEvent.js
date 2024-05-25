import { useEffect, useRef } from "react";
// import { noop } from "../utils/misc";
const noop = () => {};
export const useNuiEvent = (action, handler) => {
  const savedHandler = useRef(noop);

  // When handler value changes set mutable ref to handler val
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event) => {
      const { action: eventAction, data } = event.data;

      if (savedHandler.current) {
        if (eventAction === action) {
          savedHandler.current(data);
        }
      }
    };

    window.addEventListener("message", eventListener);
    // Remove Event Listener on component cleanup
    return () => window.removeEventListener("message", eventListener);
  }, [action]);
};

export default useNuiEvent;
